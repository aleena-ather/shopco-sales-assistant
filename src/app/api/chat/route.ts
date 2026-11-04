import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetProducts } from "@/lib/sheets";
import { defaultAllProducts } from "@/lib/products";
import { Product } from "@/types/product.types";

export const dynamic = "force-dynamic";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim() || "";

// Strictly read SUPPORT_EMAIL from environment with NO hardcoded email fallback
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL?.trim() || "";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Checks if two product titles belong to a similar subcategory (e.g. both are speakers or headsets)
 */
function isSimilarSubcategory(titleA: string, titleB: string): boolean {
  const a = titleA.toLowerCase();
  const b = titleB.toLowerCase();

  const groups = [
    ["speaker", "soundbar"],
    ["headphone", "headset", "earbud"],
    ["charger", "adapter", "power bank", "charging pad"],
    ["mouse", "mouse pad", "wrist rest"],
    ["mic", "microphone"],
    ["cable", "cord"],
  ];

  for (const group of groups) {
    const aMatch = group.some((term) => a.includes(term));
    const bMatch = group.some((term) => b.includes(term));
    if (aMatch && bMatch) return true;
  }

  return false;
}

/**
 * Checks whether user query refers to a product using fuzzy word matching.
 * e.g. "wireless headset" matches "Wireless Gaming Headset".
 */
function matchesProductFuzzy(userText: string, productTitle: string): boolean {
  const u = userText.toLowerCase().trim();
  const t = productTitle.toLowerCase().trim();
  if (u.includes(t) || t.includes(u)) return true;

  const stopWords = new Set(["the", "and", "for", "with", "show", "what", "have", "you", "are", "items", "item", "product", "products", "under"]);
  const uWords = u.split(/[^a-z0-9]+/).filter((w) => w.length >= 3 && !stopWords.has(w));
  if (uWords.length >= 2 && uWords.every((w) => t.includes(w))) {
    return true;
  }
  return false;
}

// In-memory product cache for instant responses (60s TTL)
let cachedSheetProducts: Product[] = [];
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: Message[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    // 1. Fetch live product data from Google Sheets (with 60s cache for fast latency)
    let sheetProducts: Product[] = [];
    const now = Date.now();
    if (cachedSheetProducts.length > 0 && now - lastFetchTime < CACHE_TTL_MS) {
      sheetProducts = cachedSheetProducts;
    } else {
      try {
        sheetProducts = await getGoogleSheetProducts();
        if (sheetProducts.length > 0) {
          cachedSheetProducts = sheetProducts;
          lastFetchTime = now;
        }
      } catch (e) {
        console.warn("Could not load Google Sheets for chatbot context:", e);
        if (cachedSheetProducts.length > 0) {
          sheetProducts = cachedSheetProducts;
        }
      }
    }

    if (sheetProducts.length === 0) {
      sheetProducts = defaultAllProducts;
    }

    const catalogData = sheetProducts.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      price: `$${p.price}`,
      numericPrice: p.price,
      stockStatus: p.stockStatus || "In Stock",
      description: p.description || "",
      srcUrl: p.srcUrl,
      link: `/shop/product/${p.id}/${encodeURIComponent(
        p.title.replace(/\s+/g, "-")
      )}`,
    }));

    const supportEmailInstruction = SUPPORT_EMAIL
      ? `The official customer support email is: ${SUPPORT_EMAIL}. When asked how to contact customer support, provide this exact email address: ${SUPPORT_EMAIL}.`
      : `No customer support email is currently configured for the store. If asked how to contact customer support, state clearly that we do not have a customer support email address yet.`;

    const systemInstruction = `You are the ShopCo Sales Concierge — an expert, welcoming, and consultative retail specialist for ShopCo Electronics & Tech Accessories.

ROLE & DEMEANOR:
- Tone: Warm, knowledgeable, consultative, and concise. Speak naturally like a skilled in-store technology advisor at Apple or a premier retail store.
- Mission: Guide customers to the right gear, answer product questions accurately, verify real-time availability, and help them shop with confidence.

STORE CATALOG (LIVE VERIFIED DATA):
${JSON.stringify(catalogData, null, 2)}

SUPPORT & ESCALATION:
${supportEmailInstruction}

CONSULTATIVE E-COMMERCE GUIDELINES:
1. RESPONSE FORMAT (JSON STRICT):
You MUST respond with valid JSON containing exactly two keys:
{
  "reply": "Your warm, natural 2 to 3 sentence conversational reply to the customer.",
  "recommended": ["Exact Product Name 1", "Exact Product Name 2"]
}

2. PRODUCT CARDS & RECOMMENDATIONS:
- Populate "recommended" ONLY when the customer asks about products (budget search, categories, recommendations, alternatives, or availability).
- "recommended" must ONLY contain products whose stockStatus is "In Stock" (maximum 4 products).
- NEVER include an "Out of Stock" product in the "recommended" array.

3. OUT-OF-STOCK & AVAILABILITY HANDLING:
- If a customer asks about a specific out-of-stock product (e.g. "Is the Wireless Gaming Headset available?"):
  a) In "reply", graciously and clearly state that the item is currently out of stock.
  b) In "recommended", provide up to 4 IN-STOCK alternatives from the SAME category.
  c) NEVER put the requested out-of-stock item in "recommended".
- If asked generally which items are out of stock / sold out (e.g. "what are the sold out items", "tell the name which are out of stock"):
  a) In "reply", directly list the exact names of the out-of-stock items from the catalog.
  b) In "recommended", set "recommended": [].
- If asked for an alternative or "what else can I have instead":
  a) Provide in-stock alternatives from the same category first, never including the out-of-stock item asked about.

4. BUDGET & CATEGORY QUERIES:
- When a customer specifies a price ceiling (e.g. "under $40"), curate only matching in-stock products that cost less than or equal to that budget.

5. NON-PRODUCT & SUPPORT INQUIRIES:
- For greetings, thank-you messages, support, shipping, or returns inquiries, set "recommended": [].
- When asked how to contact support, provide the official support channel: ${SUPPORT_EMAIL || "our support team"}.
- If asked about items we do not sell (e.g. laptops, smartphones, clothes), politely clarify that we specialize in tech and desk accessories (stands, chargers, audio, multiport hubs) and set "recommended": [].

6. RETAIL INTEGRITY & SPEECH RULES:
- Strictly keep "reply" to 2 to 3 short, helpful lines.
- Do NOT repeat the product specs or card prices in the text when interactive cards are displayed.
- NEVER fabricate claims not found in the catalog (never say "free shipping", "fast delivery", "warranty", "best seller", or make up discounts).
- Never refer to "Google Sheets", "databases", "data feeds", or say "connected to live inventory" or "connected to 25 products". Speak naturally as an official store representative for ShopCo.`;

    // 2. Format history for Google Generative AI API
    const contents = [
      {
        role: "user",
        parts: [{ text: systemInstruction }],
      },
      {
        role: "model",
        parts: [
          {
            text: JSON.stringify({
              reply: "Hello! Welcome to ShopCo. How can I help you find gadgets or accessories today?",
              recommended: [],
            }),
          },
        ],
      },
    ];

    for (const msg of messages) {
      const contentStr = typeof msg?.content === "string" ? msg.content : String(msg?.content || "");
      let partText = contentStr;
      if (msg.role === "assistant" && !contentStr.trim().startsWith("{")) {
        partText = JSON.stringify({
          reply: contentStr,
          recommended: [],
        });
      }
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: partText }],
      });
    }

    // 3. Model selection: ultra-fast Gemini 3 models first with zero thinking budget
    const envModel = process.env.GEMINI_MODEL?.trim();
    const candidateModels = [
      "gemini-3-flash-preview",
      "gemini-3.6-flash",
      ...(envModel && envModel !== "gemini-3.1-flash-lite" ? [envModel] : []),
      "gemini-3.5-flash",
    ];
    const modelsToTry = Array.from(new Set(candidateModels));

    let lastError: any = null;
    let rawText = "";
    let modelUsed = "";

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const geminiRes = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(3500),
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.2,
              topP: 0.95,
              maxOutputTokens: 1024,
              thinkingConfig: {
                thinkingBudget: 0,
              },
              responseMimeType: "application/json",
            },
          }),
        });

        const data = await geminiRes.json();
        if (geminiRes.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          rawText = data.candidates[0].content.parts[0].text;
          modelUsed = model;
          break;
        } else {
          lastError = data.error || { message: `HTTP ${geminiRes.status}` };
          console.warn(`[Gemini] Model ${model} returned:`, lastError);
        }
      } catch (err) {
        lastError = err;
        console.warn(`[Gemini] Exception on model ${model}:`, err);
      }
    }

    // 4. Parse Structured JSON output from model or generate catalog-grounded response
    let parsedReply = "";
    let parsedRecommended: string[] = [];

    // 5. Context & Intent Analysis
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const lowerUserMsg = lastUserMessage.toLowerCase().trim();
    const prevAssistantMessage =
      messages.length >= 2 ? messages[messages.length - 2]?.content || "" : "";
    const conversationContext = `${lastUserMessage} ${prevAssistantMessage}`.toLowerCase();

    // Specific non-product intents that must NEVER show cards
    const isGreeting =
      /^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|greetings|thanks|thank\s*you)[!.?]*$/i.test(lowerUserMsg) ||
      lowerUserMsg === "hi" ||
      lowerUserMsg === "hello" ||
      lowerUserMsg === "thanks" ||
      lowerUserMsg === "thank you";

    const isSupport =
      lowerUserMsg.includes("support") ||
      lowerUserMsg.includes("contact") ||
      lowerUserMsg.includes("customer service") ||
      lowerUserMsg.includes("help desk") ||
      lowerUserMsg.includes("reach") ||
      lowerUserMsg.includes("email");

    const isPolicy =
      lowerUserMsg.includes("return") ||
      lowerUserMsg.includes("policy") ||
      lowerUserMsg.includes("policies") ||
      lowerUserMsg.includes("warranty") ||
      lowerUserMsg.includes("refund") ||
      lowerUserMsg.includes("shipping") ||
      lowerUserMsg.includes("delivery");

    const isLaptop =
      /\blaptop(s)?\b/i.test(lowerUserMsg) &&
      !/\bstand(s)?\b/i.test(lowerUserMsg) &&
      !/\bhub(s)?\b/i.test(lowerUserMsg) &&
      !/\baccessory\b/i.test(lowerUserMsg) &&
      !/\baccessories\b/i.test(lowerUserMsg);

    const isNonProductIntent = isGreeting || isSupport || isPolicy || isLaptop;

    const isAskingOutOfStockList =
      (lowerUserMsg.includes("out of stock") ||
        lowerUserMsg.includes("sold out") ||
        lowerUserMsg.includes("unavailable")) &&
      (lowerUserMsg.includes("what") ||
        lowerUserMsg.includes("which") ||
        lowerUserMsg.includes("tell") ||
        lowerUserMsg.includes("name") ||
        lowerUserMsg.includes("list") ||
        lowerUserMsg.includes("show") ||
        lowerUserMsg.includes("items") ||
        lowerUserMsg.includes("products") ||
        lowerUserMsg.includes("are there") ||
        lowerUserMsg.includes("many") ||
        lowerUserMsg.includes("who") ||
        lowerUserMsg === "what are the sold out items" ||
        lowerUserMsg === "tell the name which are out of stock");

    // Identify out-of-stock product mentioned in user message or recent history
    const outOfStockProducts = catalogData.filter(
      (p) => p.stockStatus.toLowerCase() !== "in stock"
    );

    let mentionedOutProduct = outOfStockProducts.find((p) =>
      matchesProductFuzzy(lowerUserMsg, p.title)
    );

    if (!mentionedOutProduct && !isNonProductIntent && !isAskingOutOfStockList) {
      // Find the most recently mentioned out-of-stock product in recent messages
      for (let i = messages.length - 1; i >= 0; i--) {
        const text = (messages[i]?.content || "").toLowerCase();
        const found = outOfStockProducts.find((p) => matchesProductFuzzy(text, p.title));
        if (found) {
          mentionedOutProduct = found;
          break;
        }
      }
    }

    const isAskingAlternative =
      lowerUserMsg.includes("alternative") ||
      lowerUserMsg.includes("instead") ||
      lowerUserMsg.includes("what else") ||
      lowerUserMsg.includes("other") ||
      lowerUserMsg.includes("available") ||
      lowerUserMsg.includes("in stock");

    const budgetMatch = lowerUserMsg.match(/under\s*\$?(\d+(?:\.\d+)?)/i);
    const maxBudget = budgetMatch ? parseFloat(budgetMatch[1]) : null;

    if (rawText) {
      try {
        const cleanJson = rawText
          .replace(/```json\s*/gi, "")
          .replace(/```\s*$/g, "")
          .trim();
        const obj = JSON.parse(cleanJson);
        if (typeof obj.reply === "string") parsedReply = obj.reply.trim();
        if (Array.isArray(obj.recommended)) {
          parsedRecommended = obj.recommended.map((n: any) => String(n || "").trim());
        }
      } catch {
        // Fallback regex if wrapped in unescaped text
        const match = rawText.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            const obj = JSON.parse(match[0]);
            if (typeof obj.reply === "string") parsedReply = obj.reply.trim();
            if (Array.isArray(obj.recommended)) {
              parsedRecommended = obj.recommended.map((n: any) => String(n || "").trim());
            }
          } catch {}
        }
        if (!parsedReply) {
          parsedReply = rawText;
        }
      }
    }

    // Specific non-product overrides
    if (isSupport) {
      parsedReply = SUPPORT_EMAIL
        ? `You can contact our customer support team directly by emailing ${SUPPORT_EMAIL}.\nPlease reach out if you have any questions or need assistance.`
        : `We do not have a customer support email address configured yet.`;
      parsedRecommended = [];
    } else if (isGreeting) {
      parsedReply = `Hello! Welcome to ShopCo.\nHow can I help you find audio gear, chargers, or tech accessories today?`;
      parsedRecommended = [];
    } else if (isPolicy) {
      parsedReply = SUPPORT_EMAIL
        ? `We do not have return policy details listed in our product catalog.\nPlease contact our customer support team at ${SUPPORT_EMAIL} for help with returns.`
        : `We do not have return policy details listed in our catalog.\nPlease contact our customer support team for assistance.`;
      parsedRecommended = [];
    } else if (isLaptop) {
      parsedReply = `We do not sell laptops in our store.\nWe only carry electronics accessories such as laptop stands, chargers, and multiport hubs.`;
      parsedRecommended = [];
    } else if (isAskingOutOfStockList) {
      const outNames = outOfStockProducts.map((p) => p.title).join(", ");
      parsedReply = `The products currently out of stock in our store are: ${outNames}.\nFeel free to ask for in-stock alternatives in any of these categories!`;
      parsedRecommended = [];
    } else if (!parsedReply) {
      // Grounded fallback if model was unreachable or gave empty reply
      if (mentionedOutProduct) {
        parsedReply = `The ${mentionedOutProduct.title} is currently out of stock.\nI have selected some in-stock alternatives from our ${mentionedOutProduct.category} collection for you below.`;
      } else {
        const budgetMatch = lastUserMessage.match(/under\s*\$?(\d+(?:\.\d+)?)/i);
        if (budgetMatch) {
          const maxBudget = parseFloat(budgetMatch[1]);
          const underBudgetItems = catalogData.filter(
            (p) => p.numericPrice <= maxBudget && p.stockStatus.toLowerCase() === "in stock"
          );
          parsedReply = `Here are some of our in-stock products under $${maxBudget} available right now.\nLet me know if you would like recommendations in a specific category!`;
          parsedRecommended = underBudgetItems.slice(0, 4).map((p) => p.title);
        } else {
          parsedReply = `Welcome to ShopCo! How can I assist you with gadgets and accessories today?`;
        }
      }
    }

    // 6. Validate and Build Cards ONLY from "recommended", strictly enforcing:
    // - Name matches real sheet product
    // - Stock Status is STRICTLY "In Stock"
    // - Never include the product asked about if it was out of stock
    let validCards: typeof catalogData = [];

    if (!isNonProductIntent) {
      for (const recName of parsedRecommended) {
        if (!recName) continue;
        const lowerRec = recName.toLowerCase();

        // Find exact or closest title match in catalog
        const product = catalogData.find(
          (p) =>
            p.title.toLowerCase() === lowerRec ||
            p.title.toLowerCase().includes(lowerRec) ||
            lowerRec.includes(p.title.toLowerCase())
        );

        // Must be a valid sheet product AND strictly In Stock
        if (
          product &&
          product.stockStatus.toLowerCase() === "in stock" &&
          (!mentionedOutProduct || product.id !== mentionedOutProduct.id)
        ) {
          if (!validCards.some((v) => v.id === product.id)) {
            validCards.push(product);
          }
        }
      }

      // If customer asked about an out-of-stock product or asked for alternatives,
      // and validCards is empty or lacks same-category items, automatically populate
      // with in-stock alternatives from the SAME category:
      if (mentionedOutProduct && (validCards.length === 0 || isAskingAlternative)) {
        const outCat = (mentionedOutProduct.category || "").toLowerCase();
        const sameCategoryInStock = catalogData
          .filter(
            (p) =>
              (p.category || "").toLowerCase() === outCat &&
              p.stockStatus.toLowerCase() === "in stock" &&
              p.id !== mentionedOutProduct.id
          )
          .sort((a, b) => {
            const aSim = isSimilarSubcategory(a.title, mentionedOutProduct.title);
            const bSim = isSimilarSubcategory(b.title, mentionedOutProduct.title);
            if (aSim && !bSim) return -1;
            if (!aSim && bSim) return 1;
            return 0;
          });

        validCards = sameCategoryInStock.slice(0, 4);
      }

      // If customer asked about a budget (e.g. "under $40"), enforce budget on all cards
      if (maxBudget !== null) {
        validCards = validCards.filter((p) => p.numericPrice <= maxBudget);
        if (validCards.length < 4) {
          const underBudgetItems = catalogData.filter(
            (p) =>
              p.numericPrice <= maxBudget &&
              p.stockStatus.toLowerCase() === "in stock" &&
              !validCards.some((v) => v.id === p.id)
          );
          validCards = [...validCards, ...underBudgetItems].slice(0, 4);
        }
      }

      // If cards are still empty for a product-related query, smartly auto-match catalog in-stock items
      if (validCards.length === 0 && !isAskingOutOfStockList) {
        const queryWords = lowerUserMsg
          .split(/[^a-z0-9]+/)
          .filter(
            (w) =>
              w.length >= 3 &&
              !["what", "show", "have", "with", "item", "items", "stock", "under", "price", "store", "your", "give", "list"].includes(w)
          );

        const keywordMatches = catalogData.filter((p) => {
          if (p.stockStatus.toLowerCase() !== "in stock") return false;
          if (mentionedOutProduct && p.id === mentionedOutProduct.id) return false;
          if (maxBudget !== null && p.numericPrice > maxBudget) return false;

          const pTitle = (p.title || "").toLowerCase();
          const pCat = (p.category || "").toLowerCase();

          return queryWords.some((w) => pTitle.includes(w) || pCat.includes(w));
        });

        if (keywordMatches.length > 0) {
          validCards = keywordMatches.slice(0, 4);
        }
      }
    }

    // Final safety enforcement:
    // 1. Cap at 4 cards maximum
    // 2. ABSOLUTELY NO OUT-OF-STOCK PRODUCT
    // 3. Exclude any mentioned out-of-stock item
    // 4. Non-product questions (support, greeting, policy, laptop, out-of-stock list) MUST HAVE 0 CARDS
    if (isNonProductIntent || isAskingOutOfStockList) {
      validCards = [];
    } else {
      validCards = validCards
        .filter((p) => p.stockStatus.toLowerCase() === "in stock")
        .filter((p) => !mentionedOutProduct || p.id !== mentionedOutProduct.id)
        .slice(0, 4);
    }

    // Ensure out-of-stock query text states it is out of stock
    if (mentionedOutProduct && !isNonProductIntent && !isAskingOutOfStockList) {
      if (!parsedReply.toLowerCase().includes("out of stock")) {
        parsedReply = `The ${mentionedOutProduct.title} is currently out of stock.\nHere are some in-stock alternatives from our ${mentionedOutProduct.category} collection for you below.`;
      }
    }

    // Scrubber for forbidden phrases not in the sheet
    parsedReply = parsedReply
      .replace(/\bready to ship\b/gi, "available")
      .replace(/\bfast delivery\b/gi, "")
      .replace(/\bfast shipping\b/gi, "")
      .replace(/\bfree shipping\b/gi, "")
      .replace(/\bbest[- ]?sellers?\b/gi, "popular items")
      .replace(/\bwarrant(?:y|ies)\b/gi, "")
      .replace(/\bguarantee\b/gi, "")
      .replace(/[ ]{2,}/g, " ")
      .trim();

    // Ensure strictly 2 to 3 short lines, naturally written, no card details repeated
    const cleanLines = parsedReply
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => !/^[-*•]\s+.*\$?\d+/i.test(l))
      .filter((l) => !/^[-*•]\s+/i.test(l))
      .filter(Boolean);

    if (cleanLines.length > 3) {
      parsedReply = cleanLines.slice(0, 3).join("\n");
    } else if (cleanLines.length >= 1) {
      parsedReply = cleanLines.join("\n");
    }

    return NextResponse.json({
      success: true,
      reply: parsedReply,
      model: modelUsed,
      recommendedProducts: validCards,
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
