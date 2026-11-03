import { Product } from "@/types/product.types";
import { getGoogleSheetProducts } from "./sheets";
import { smartSearchProducts } from "./search";

// Fallback baseline electronics items in case Google Sheets is temporarily offline
export const defaultNewArrivals: Product[] = [
  {
    id: 1,
    title: "Wireless Mouse",
    srcUrl: "/images/electronics/wireless-mouse.jpg",
    gallery: [
      "/images/electronics/wireless-mouse.jpg",
      "/images/electronics/mousepad.jpg",
      "/images/electronics/cat-accessories.jpg",
    ],
    price: 25,
    discount: { amount: 0, percentage: 0 },
    category: "Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Ergonomic wireless mouse with comfortable grip",
  },
  {
    id: 2,
    title: "USB-C Charger",
    srcUrl: "/images/electronics/usbc-wall-charger.svg",
    gallery: [
      "/images/electronics/usbc-wall-charger.svg",
      "/images/electronics/gan-charger.svg",
      "/images/electronics/powerbank.svg",
    ],
    price: 35,
    discount: { amount: 0, percentage: 0 },
    category: "Chargers",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Fast charging adapter for compatible devices",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    srcUrl: "/images/electronics/bluetooth-speaker.jpg",
    gallery: [
      "/images/electronics/bluetooth-speaker.jpg",
      "/images/electronics/waterproof-bluetooth-speaker.svg",
      "/images/electronics/desktop-soundbar.svg",
    ],
    price: 39,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Portable speaker with clear sound",
  },
  {
    id: 4,
    title: "Wireless Gaming Headset",
    srcUrl: "/images/electronics/gaming-headset.jpg",
    gallery: [
      "/images/electronics/gaming-headset.jpg",
      "/images/electronics/wireless-headphones.jpg",
      "/images/electronics/wired-gaming-headset.svg",
    ],
    price: 49,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "Out of Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Wireless headset with immersive gaming audio",
  },
  {
    id: 5,
    title: "Wired Gaming Headset",
    srcUrl: "/images/electronics/wired-gaming-headset.svg",
    gallery: [
      "/images/electronics/wired-gaming-headset.svg",
      "/images/electronics/gaming-headset.jpg",
      "/images/electronics/wireless-headphones.jpg",
    ],
    price: 29,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Comfortable wired gaming headset with clear sound and microphone",
  },
];

export const defaultTopSelling: Product[] = defaultNewArrivals;
export const defaultRelatedProducts: Product[] = defaultNewArrivals;

/**
 * Returns products directly from Google Sheets.
 * If Google Sheets contains products, they are the primary source of truth.
 */
export async function getLiveProducts(): Promise<{
  sheetProducts: Product[];
  allProducts: Product[];
  newArrivals: Product[];
  topSelling: Product[];
  relatedProducts: Product[];
}> {
  const sheetProducts = await getGoogleSheetProducts();

  if (sheetProducts && sheetProducts.length > 0) {
    return {
      sheetProducts,
      allProducts: sheetProducts,
      newArrivals: sheetProducts,
      topSelling: [...sheetProducts].reverse(),
      relatedProducts: sheetProducts,
    };
  }

  // Graceful fallback if sheet returned empty
  return {
    sheetProducts: [],
    allProducts: defaultNewArrivals,
    newArrivals: defaultNewArrivals,
    topSelling: defaultTopSelling,
    relatedProducts: defaultRelatedProducts,
  };
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const { allProducts } = await getLiveProducts();
  return allProducts.find((p) => p.id === id);
}

/**
 * Extracts unique categories and their live product counts from the Google Sheet.
 */
export function getCategoriesWithCounts(
  products: Product[]
): { name: string; count: number; slug: string }[] {
  const counts: Record<string, number> = {};

  for (const product of products) {
    const cat = (product.category || "Uncategorized").trim();
    if (cat) {
      counts[cat] = (counts[cat] || 0) + 1;
    }
  }

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    slug: `/shop?category=${encodeURIComponent(name)}`,
  }));
}

/**
 * Computes lowest and highest price bounds from the real products in the sheet.
 */
export function getPriceBounds(products: Product[]): {
  minPrice: number;
  maxPrice: number;
} {
  if (!products || products.length === 0) {
    return { minPrice: 0, maxPrice: 100 };
  }

  const prices = products
    .map((p) => p.price)
    .filter((price) => typeof price === "number" && !isNaN(price));

  if (prices.length === 0) {
    return { minPrice: 0, maxPrice: 100 };
  }

  return {
    minPrice: Math.floor(Math.min(...prices)),
    maxPrice: Math.ceil(Math.max(...prices)),
  };
}

export interface FilterOptions {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

/**
 * Filters and sorts products based on search term, category, price, and sort order.
 */
export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  let list = [...products];

  // 1. Smart search filter: matches name, category, or description with ranking, synonyms, plurals, typos
  if (options.q && options.q.trim()) {
    list = smartSearchProducts(list, options.q);
  }

  // 2. Category filter: case-insensitive match
  if (options.category && options.category.trim()) {
    const cat = options.category.trim().toLowerCase();
    if (cat !== "all") {
      list = list.filter(
        (p) => p.category?.trim().toLowerCase() === cat
      );
    }
  }

  // 3. Price filter
  if (typeof options.minPrice === "number" && !isNaN(options.minPrice)) {
    list = list.filter((p) => p.price >= (options.minPrice as number));
  }
  if (typeof options.maxPrice === "number" && !isNaN(options.maxPrice)) {
    list = list.filter((p) => p.price <= (options.maxPrice as number));
  }

  // 4. Sort dropdown
  if (options.sort === "low-price" || options.sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (options.sort === "high-price" || options.sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  }
  // "most-popular" keeps original sheet order

  return list;
}
