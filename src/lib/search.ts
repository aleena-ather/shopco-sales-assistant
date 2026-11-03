import { Product } from "@/types/product.types";

/**
 * Levenshtein distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  const al = a.length;
  const bl = b.length;
  if (Math.abs(al - bl) > 1) return 2; // Bail out if length difference is greater than 1

  const matrix: number[][] = [];
  for (let i = 0; i <= al; i++) matrix[i] = [i];
  for (let j = 0; j <= bl; j++) matrix[0][j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[al][bl];
}

/**
 * Synonym groups: words in the same group are treated as interchangeable.
 */
const SYNONYM_GROUPS: string[][] = [
  // Headphones & Audio listening
  ["headphone", "headphones", "headset", "headsets", "earphone", "earphones", "earbud", "earbuds"],
  // Speakers & Soundbars
  ["speaker", "speakers", "soundbar", "soundbars", "sound bar"],
  // Chargers & Power
  ["charger", "chargers", "adapter", "adapters", "power bank", "powerbank", "power banks", "powerbanks"],
  // Mouse & Mice
  ["mouse", "mice"],
  // Cables
  ["cable", "cables", "cord", "cords", "wire", "wires"],
  // Stands & Risers
  ["stand", "stands", "riser", "risers", "mount", "mounts", "holder", "holders"],
  // Microphones
  ["microphone", "microphones"],
  // Controllers
  ["controller", "controllers", "gamepad", "gamepads"],
];

/**
 * Irregular plural / singular mapping.
 */
const IRREGULAR_PLURALS: Record<string, string> = {
  mice: "mouse",
  mouse: "mice",
};

/**
 * Normalizes singular/plural forms of English words.
 */
export function normalizePlural(word: string): string[] {
  const w = word.toLowerCase().trim();
  const forms = new Set<string>([w]);

  if (IRREGULAR_PLURALS[w]) {
    forms.add(IRREGULAR_PLURALS[w]);
    return Array.from(forms);
  }

  if (w.endsWith("ies") && w.length > 4) {
    forms.add(w.slice(0, -3) + "y"); // accessories -> accessory
  } else if (w.endsWith("es") && w.length > 4) {
    forms.add(w.slice(0, -2)); // pouches -> pouch
  } else if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) {
    forms.add(w.slice(0, -1)); // speakers -> speaker, headphones -> headphone
  } else if (!w.endsWith("s") && w.length >= 3) {
    forms.add(w + "s"); // speaker -> speakers
    forms.add(w + "es"); // pouch -> pouches
  }

  return Array.from(forms);
}

/**
 * Finds all synonyms and inflections for a query word.
 */
export function getSynonymsAndInflections(rawWord: string): string[] {
  const w = rawWord.toLowerCase().trim();
  const allVariants = new Set<string>();

  // 1. Plural/singular normalization
  const plForms = normalizePlural(w);
  plForms.forEach((f) => allVariants.add(f));

  // 2. Typo-tolerant mapping for 5+ letter query words into canonical synonym groups
  const expandedRoots = new Set<string>(plForms);
  if (w.length >= 5) {
    for (const group of SYNONYM_GROUPS) {
      for (const member of group) {
        if (member.length >= 5 && Math.abs(w.length - member.length) <= 1) {
          if (levenshteinDistance(w, member) <= 1) {
            expandedRoots.add(member);
          }
        }
      }
    }
  }

  // 3. Expand matching synonym groups
  for (const group of SYNONYM_GROUPS) {
    const matchesGroup = group.some((member) => expandedRoots.has(member));
    if (matchesGroup) {
      for (const member of group) {
        allVariants.add(member);
        normalizePlural(member).forEach((mForm) => allVariants.add(mForm));
      }
    }
  }

  return Array.from(allVariants);
}

/**
 * Tokenizes text into lowercase words/terms, stripping punctuation.
 */
export function tokenizeText(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/[\s-]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Tests if a query word (and its synonyms/typos) matches against a list of target tokens or full text.
 */
function wordMatchesField(
  wordVariants: string[],
  primaryWord: string,
  fieldText: string,
  fieldTokens: string[]
): { matched: boolean; score: number } {
  const lowerField = fieldText.toLowerCase();

  // 1. Direct whole-token match
  for (const token of fieldTokens) {
    if (token === primaryWord) {
      return { matched: true, score: 50 };
    }
  }

  // 2. Token match with synonym or plural variant
  for (const token of fieldTokens) {
    for (const variant of wordVariants) {
      if (token === variant) {
        return { matched: true, score: 40 };
      }
    }
  }

  // 3. Multi-word phrase or compound check (e.g. "sound bar", "power bank", "usb-c")
  for (const variant of wordVariants) {
    if (variant.includes(" ") && lowerField.includes(variant)) {
      return { matched: true, score: 45 };
    }
  }

  // 4. Substring / Prefix match with word boundaries
  for (const token of fieldTokens) {
    for (const variant of wordVariants) {
      if (variant.length >= 4 && token.startsWith(variant)) {
        return { matched: true, score: 35 };
      }
    }
  }

  // 5. Typo tolerance: 1 letter off for words with 5 or more letters
  if (primaryWord.length >= 5) {
    for (const token of fieldTokens) {
      if (token.length >= 5 && Math.abs(primaryWord.length - token.length) <= 1) {
        if (levenshteinDistance(primaryWord, token) <= 1) {
          return { matched: true, score: 30 };
        }
      }

      // Also check against stemmed forms of the target token
      const tokenStems = normalizePlural(token);
      for (const tStem of tokenStems) {
        if (tStem.length >= 5 && Math.abs(primaryWord.length - tStem.length) <= 1) {
          if (levenshteinDistance(primaryWord, tStem) <= 1) {
            return { matched: true, score: 28 };
          }
        }
      }
    }
  }

  return { matched: false, score: 0 };
}

export interface SearchMatch {
  product: Product;
  score: number;
  matchedInTitle: boolean;
  matchedInCategory: boolean;
  matchedInDescription: boolean;
}

/**
 * Executes smart ranked search across a products list:
 * - Case-insensitive
 * - Splits typed query into words; ALL words must match somewhere
 * - Singular / plural equivalence
 * - Synonym expansion (headphones/headset/earbuds, speaker/soundbar, etc.)
 * - Typo tolerance (1 letter off for words >= 5 characters)
 * - Strict ranking: Title matches first, then Category, then Description
 */
export function smartSearchProducts(
  products: Product[],
  query: string
): Product[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return products;

  // Split typed query into individual word tokens
  const queryWords = tokenizeText(cleanQuery);
  if (queryWords.length === 0) return products;

  // Expand each query word with its synonyms, plurals, and typo mappings
  const queryWordSpecs = queryWords.map((word) => {
    const variants = getSynonymsAndInflections(word);
    return {
      word,
      variants,
    };
  });

  const matches: SearchMatch[] = [];

  for (const product of products) {
    const title = product.title || "";
    const category = product.category || "";
    const description = product.description || "";

    const titleTokens = tokenizeText(title);
    const categoryTokens = tokenizeText(category);
    const descTokens = tokenizeText(description);

    let allWordsMatched = true;
    let totalScore = 0;
    let titleWordMatches = 0;
    let catWordMatches = 0;
    let descWordMatches = 0;

    for (const spec of queryWordSpecs) {
      const titleRes = wordMatchesField(spec.variants, spec.word, title, titleTokens);
      const catRes = wordMatchesField(spec.variants, spec.word, category, categoryTokens);
      const descRes = wordMatchesField(spec.variants, spec.word, description, descTokens);

      if (titleRes.matched) {
        titleWordMatches++;
        totalScore += 2000 + titleRes.score; // Title matches get high tier
      }
      if (catRes.matched) {
        catWordMatches++;
        totalScore += 200 + catRes.score; // Category matches get medium tier
      }
      if (descRes.matched) {
        descWordMatches++;
        totalScore += 20 + descRes.score; // Description matches get lower tier
      }

      // Word must match somewhere in Title, Category, OR Description
      if (!titleRes.matched && !catRes.matched && !descRes.matched) {
        allWordsMatched = false;
        break;
      }
    }

    if (!allWordsMatched) {
      continue;
    }

    // Bonuses for exact full-string phrase matches
    const lowerTitle = title.toLowerCase();
    const lowerCat = category.toLowerCase();
    const lowerDesc = description.toLowerCase();

    if (lowerTitle === cleanQuery) {
      totalScore += 50000;
    } else if (lowerTitle.includes(cleanQuery)) {
      totalScore += 10000;
    }

    if (lowerCat === cleanQuery) {
      totalScore += 5000;
    } else if (lowerCat.includes(cleanQuery)) {
      totalScore += 1000;
    }

    if (lowerDesc.includes(cleanQuery)) {
      totalScore += 200;
    }

    // Strict Tier Enforcement:
    // If ANY word matched in title, boost into title tier
    if (titleWordMatches === queryWords.length) {
      totalScore += 100000; // All words in title = supreme rank
    } else if (titleWordMatches > 0) {
      totalScore += 50000; // Some words in title
    } else if (catWordMatches > 0) {
      totalScore += 10000; // Category rank
    }
    // Otherwise description only rank (< 10000)

    matches.push({
      product,
      score: totalScore,
      matchedInTitle: titleWordMatches > 0,
      matchedInCategory: catWordMatches > 0,
      matchedInDescription: descWordMatches > 0,
    });
  }

  // Sort ranked: Highest score first, then shorter title, then ID
  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (a.product.title.length !== b.product.title.length) {
      return a.product.title.length - b.product.title.length;
    }
    return a.product.id - b.product.id;
  });

  return matches.map((m) => m.product);
}
