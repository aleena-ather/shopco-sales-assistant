import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Product } from "@/types/product.types";

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID || "16yhy3AuPijjlOJ0OFatYNpIK8jKNyxI9aRGxfAPutkc";
const KEY_FILE_NAME =
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE ||
  "elemental-day-513013-h6-f5484ef6d241.json";

// In-memory cache for products
let cachedProducts: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15 * 1000; // 15 seconds cache for fresh sync

interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

/**
 * Generates Google OAuth2 JWT and exchanges it for an access token.
 */
async function getAccessToken(creds: ServiceAccountCredentials): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const claimSet = {
    iss: creds.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
    aud: creds.token_uri || "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const b64Url = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsignedToken = `${b64Url(header)}.${b64Url(claimSet)}`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  sign.end();
  const signature = sign.sign(creds.private_key, "base64url");
  const jwt = `${unsignedToken}.${signature}`;

  const tokenRes = await fetch(
    creds.token_uri || "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
      cache: "no-store",
    }
  );

  if (!tokenRes.ok) {
    const errorBody = await tokenRes.text();
    throw new Error(`Failed to obtain Google access token: ${errorBody}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

/**
 * Matches a specific image candidate based on the product title.
 * Returns null if no specific matching photo is available.
 */
function matchSpecificImage(title: string): string | null {
  const t = title.toLowerCase();

  // 1. Wireless Mouse
  if (t === "wireless mouse" || (t.includes("wireless") && t.includes("mouse") && !t.includes("optical") && !t.includes("gaming"))) {
    return "/images/electronics/wireless-mouse.jpg";
  }

  // 2. Optical Gaming Mouse
  if (t.includes("optical") || (t.includes("gaming") && t.includes("mouse"))) {
    return "/images/electronics/optical-gaming-mouse.jpg";
  }

  // 3. 65W GaN Wall Charger
  if (t.includes("65w") || t.includes("gan")) {
    return "/images/electronics/gan-charger.svg";
  }

  // 4. USB C Charger
  if (t.includes("usb c charger") || t.includes("usb-c charger") || (t.includes("charger") && !t.includes("pad") && !t.includes("wireless") && !t.includes("power bank"))) {
    return "/images/electronics/usbc-wall-charger.svg";
  }

  // 5. Magnetic Wireless Charging Pad
  if (t.includes("charging pad") || (t.includes("wireless") && t.includes("charg"))) {
    return "/images/electronics/magnetic-wireless-charging-pad.svg";
  }

  // 6. Waterproof Bluetooth Speaker
  if (t.includes("waterproof") && t.includes("speaker")) {
    return "/images/electronics/waterproof-bluetooth-speaker.svg";
  }

  // 7. Bluetooth Speaker
  if (t === "bluetooth speaker" || (t.includes("bluetooth") && t.includes("speaker"))) {
    return "/images/electronics/bluetooth-speaker.jpg";
  }

  // 8. Desktop Computer Soundbar
  if (t.includes("soundbar") || t.includes("sound bar")) {
    return "/images/electronics/desktop-soundbar.svg";
  }

  // 9. Wireless Gaming Headset
  if (t.includes("wireless") && t.includes("gaming headset")) {
    return "/images/electronics/gaming-headset.jpg";
  }

  // 10. Wired Gaming Headset
  if (t.includes("wired") && (t.includes("gaming") || t.includes("headset"))) {
    return "/images/electronics/wired-gaming-headset.svg";
  }

  // 11. Noise Cancelling Earbuds
  if (t.includes("earbuds") || t.includes("earbud")) {
    return "/images/electronics/earbuds.jpg";
  }

  // 12. Studio Monitor Headphones
  if (t.includes("studio") || t.includes("headphones") || t.includes("headphone")) {
    return "/images/electronics/wireless-headphones.jpg";
  }

  // 13. Lavalier Lapel Microphone
  if (t.includes("lavalier") || t.includes("lapel")) {
    return "/images/electronics/lavalier-microphone.svg";
  }

  // 14. USB Condenser Gaming Microphone
  if (t.includes("condenser") || (t.includes("microphone") && t.includes("usb")) || (t.includes("microphone") && t.includes("gaming"))) {
    return "/images/electronics/usb-condenser-mic.jpg";
  }

  // 15. Aluminum Laptop Stand
  if (t.includes("laptop stand") || (t.includes("stand") && t.includes("laptop"))) {
    return "/images/electronics/aluminum-laptop-stand.svg";
  }

  // 16. USB C Multiport Hub (Replaced paper shopping bag with dedicated illustration)
  if (t.includes("multiport") || t.includes("hub")) {
    return "/images/electronics/usb-c-multiport-hub.svg";
  }

  // 17. Extended Desk Mouse Pad
  if (t.includes("mouse pad") || t.includes("mousepad")) {
    return "/images/electronics/extended-desk-mouse-pad.svg";
  }

  // 18. Ergonomic Gel Wrist Rest
  if (t.includes("wrist rest") || t.includes("wrist")) {
    return "/images/electronics/ergonomic-wrist-rest.svg";
  }

  // 19. 20000mAh Portable Power Bank
  if (t.includes("power bank") || t.includes("powerbank") || t.includes("20000mah")) {
    return "/images/electronics/powerbank.svg";
  }

  // 20. Mechanical Gaming Keyboard
  if (t.includes("keyboard")) {
    return "/images/electronics/mechanical-gaming-keyboard.svg";
  }

  // 21. Wireless Game Controller
  if (t.includes("controller") || t.includes("gamepad")) {
    return "/images/electronics/wireless-game-controller.jpg";
  }

  // 22. Braided Lightning Cable
  if (t.includes("lightning") || t.includes("cable")) {
    return "/images/electronics/braided-lightning-cable.svg";
  }

  // 23. Magnetic Dashboard Car Mount
  if (t.includes("car mount") || t.includes("dashboard") || (t.includes("car") && t.includes("mount"))) {
    return "/images/electronics/magnetic-car-mount.svg";
  }

  // 24. Universal Phone Kickstand
  if (t.includes("kickstand")) {
    return "/images/electronics/phone-kickstand.svg";
  }

  // 25. Waterproof Phone Pouch
  if (t.includes("pouch") || (t.includes("waterproof") && t.includes("phone"))) {
    return "/images/electronics/waterproof-phone-pouch.svg";
  }

  return null;
}

/**
 * Fetches products from Google Sheets with caching and error handling.
 * Parses columns: Product Name, Category, Price, Stock Status, Description
 */
export async function getGoogleSheetProducts(forceRefresh = false): Promise<Product[]> {
  const now = Date.now();
  if (!forceRefresh && cachedProducts && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedProducts;
  }

  try {
    let creds: ServiceAccountCredentials;

    if (process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
      try {
        const raw = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS.trim();
        creds = raw.startsWith("{")
          ? JSON.parse(raw)
          : JSON.parse(Buffer.from(raw, "base64").toString("utf8"));

        if (creds && creds.private_key) {
          creds.private_key = creds.private_key.replace(/\\n/g, "\n");
        }
      } catch (parseErr) {
        console.error("[GoogleSheets] Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS:", parseErr);
        return cachedProducts || [];
      }
    } else {
      const keyPath = path.isAbsolute(KEY_FILE_NAME)
        ? KEY_FILE_NAME
        : path.join(process.cwd(), KEY_FILE_NAME);

      if (!fs.existsSync(keyPath)) {
        console.warn(`[GoogleSheets] Service account key not found at ${keyPath}`);
        return cachedProducts || [];
      }

      const credsRaw = fs.readFileSync(keyPath, "utf8");
      creds = JSON.parse(credsRaw);
      if (creds && creds.private_key) {
        creds.private_key = creds.private_key.replace(/\\n/g, "\n");
      }
    }

    const token = await getAccessToken(creds);

    const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:Z500`;
    const res = await fetch(sheetUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[GoogleSheets] API error: ${err}`);
      return cachedProducts || [];
    }

    const data = await res.json();
    const rows: string[][] = data.values || [];

    if (!rows || rows.length === 0) {
      return cachedProducts || [];
    }

    // Dynamically locate the header row containing "Product Name" or "Title"
    let headerRowIndex = -1;
    const colMap = {
      name: -1,
      category: -1,
      price: -1,
      stock: -1,
      desc: -1,
      rating: -1,
      discount: -1,
    };

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;
      const lower = row.map((cell) => String(cell || "").toLowerCase().trim());
      const nameIdx = lower.findIndex((c) => c === "product name" || c === "title");
      if (nameIdx !== -1) {
        headerRowIndex = i;
        colMap.name = nameIdx;
        colMap.category = lower.findIndex((c) => c === "category");
        colMap.price = lower.findIndex((c) => c === "price");
        colMap.stock = lower.findIndex((c) => c === "stock status" || c === "stock");
        colMap.desc = lower.findIndex((c) => c === "description" || c === "desc");
        colMap.rating = lower.findIndex((c) => c === "rating" || c === "ratings");
        colMap.discount = lower.findIndex((c) => c === "discount" || c === "discount %");
        break;
      }
    }

    if (headerRowIndex === -1 || colMap.name === -1) {
      console.warn("[GoogleSheets] Could not locate header row with 'Product Name'");
      return cachedProducts || [];
    }

    const products: Product[] = [];
    const usedImages = new Set<string>();
    let idCounter = 1;

    for (let i = headerRowIndex + 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || !row[colMap.name]) continue;

      const title = String(row[colMap.name] || "").trim();
      if (!title) continue;

      const category =
        colMap.category !== -1 && row[colMap.category]
          ? String(row[colMap.category]).trim()
          : "Electronics";

      const priceRaw =
        colMap.price !== -1 && row[colMap.price]
          ? String(row[colMap.price]).trim()
          : "$0";
      const price = parseFloat(priceRaw.replace(/[^0-9.]/g, "")) || 0;

      const stockStatus =
        colMap.stock !== -1 && row[colMap.stock]
          ? String(row[colMap.stock]).trim()
          : "In Stock";

      const description =
        colMap.desc !== -1 && row[colMap.desc]
          ? String(row[colMap.desc]).trim()
          : `Premium ${category.toLowerCase()} engineered for high performance.`;

      const ratingVal =
        colMap.rating !== -1 && row[colMap.rating]
          ? parseFloat(String(row[colMap.rating]).replace(/[^0-9.]/g, ""))
          : undefined;
      const rating = typeof ratingVal === "number" && !isNaN(ratingVal) ? ratingVal : undefined;

      const discountVal =
        colMap.discount !== -1 && row[colMap.discount]
          ? parseFloat(String(row[colMap.discount]).replace(/[^0-9.]/g, "")) || 0
          : 0;

      // Assign unique matching photo; if already used or none matched, flag as placeholder tile
      const specificImg = matchSpecificImage(title);
      let srcUrl = "";
      let isPlaceholder = true;
      let gallery: string[] = [];

      if (specificImg && !usedImages.has(specificImg)) {
        usedImages.add(specificImg);
        srcUrl = specificImg;
        isPlaceholder = false;
        gallery = [specificImg];
      } else {
        isPlaceholder = true;
        srcUrl = "";
        gallery = [];
      }

      products.push({
        id: idCounter++,
        title,
        srcUrl,
        gallery,
        price,
        discount: { amount: 0, percentage: discountVal },
        rating,
        category,
        stockStatus,
        sizes: ["Standard Edition", "Pro Edition"],
        description,
        isPlaceholder,
      });
    }

    cachedProducts = products;
    lastFetchTime = now;
    console.log(`[GoogleSheets] Successfully loaded ${products.length} products from sheet.`);
    return products;
  } catch (error) {
    console.error("[GoogleSheets] Failed to fetch products:", error);
    return cachedProducts || [];
  }
}
