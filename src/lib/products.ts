import { Product } from "@/types/product.types";
import { getGoogleSheetProducts } from "./sheets";
import { smartSearchProducts } from "./search";

// Fallback baseline electronics items in case Google Sheets is temporarily offline
export const defaultAllProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Mouse",
    srcUrl: "/images/electronics/wireless-mouse.jpg",
    gallery: ["/images/electronics/wireless-mouse.jpg"],
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
    gallery: ["/images/electronics/usbc-wall-charger.svg"],
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
    gallery: ["/images/electronics/bluetooth-speaker.jpg"],
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
    gallery: ["/images/electronics/gaming-headset.jpg"],
    price: 49,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "Out of Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Comfortable wireless gaming headset with immersive audio and microphone",
  },
  {
    id: 5,
    title: "Wired Gaming Headset",
    srcUrl: "/images/electronics/wired-gaming-headset.svg",
    gallery: ["/images/electronics/wired-gaming-headset.svg"],
    price: 29,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Comfortable wired gaming headset with clear sound and microphone",
  },
  {
    id: 6,
    title: "Noise-Cancelling Earbuds",
    srcUrl: "/images/electronics/earbuds.jpg",
    gallery: ["/images/electronics/earbuds.jpg"],
    price: 79.99,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Wireless earbuds featuring active noise cancellation technology and a rechargeable battery offering 6h of continuous playback.",
  },
  {
    id: 7,
    title: "Studio Monitor Headphones",
    srcUrl: "/images/electronics/wireless-headphones.jpg",
    gallery: ["/images/electronics/wireless-headphones.jpg"],
    price: 89.5,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Over-ear closed-back headphones equipped with 50mm neodymium drivers and a detachable 3m coiled audio cable.",
  },
  {
    id: 8,
    title: "Waterproof Bluetooth Speaker",
    srcUrl: "/images/electronics/waterproof-bluetooth-speaker.svg",
    gallery: ["/images/electronics/waterproof-bluetooth-speaker.svg"],
    price: 45,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "Out of Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Compact portable speaker with an IPX7 waterproof rating and dual passive radiators for enhanced bass reproduction.",
  },
  {
    id: 9,
    title: "Desktop Computer Soundbar",
    srcUrl: "/images/electronics/desktop-soundbar.svg",
    gallery: ["/images/electronics/desktop-soundbar.svg"],
    price: 34.99,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Slim auxiliary soundbar powered via USB connection featuring dual 5W speakers and front volume dial controls.",
  },
  {
    id: 10,
    title: "Lavalier Lapel Microphone",
    srcUrl: "/images/electronics/lavalier-microphone.svg",
    gallery: ["/images/electronics/lavalier-microphone.svg"],
    price: 19.99,
    discount: { amount: 0, percentage: 0 },
    category: "Audio",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Omnidirectional condenser lapel microphone with a standard 3.5mm jack and 6ft shielded cable.",
  },
  {
    id: 11,
    title: "Aluminum Laptop Stand",
    srcUrl: "/images/electronics/aluminum-laptop-stand.svg",
    gallery: ["/images/electronics/aluminum-laptop-stand.svg"],
    price: 28.5,
    discount: { amount: 0, percentage: 0 },
    category: "Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Adjustable aluminum riser designed to elevate laptops up to 6\" for improved airflow and cooling efficiency.",
  },
  {
    id: 12,
    title: "USB-C Multiport Hub",
    srcUrl: "/images/electronics/usb-c-multiport-hub.svg",
    gallery: ["/images/electronics/usb-c-multiport-hub.svg"],
    price: 42,
    discount: { amount: 0, percentage: 0 },
    category: "Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "7-in-1 aluminum hub featuring a 4K HDMI port, 3 USB 3.0 ports, and SD card reader slots.",
  },
  {
    id: 13,
    title: "Extended Desk Mouse Pad",
    srcUrl: "/images/electronics/extended-desk-mouse-pad.svg",
    gallery: ["/images/electronics/extended-desk-mouse-pad.svg"],
    price: 16.99,
    discount: { amount: 0, percentage: 0 },
    category: "Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Large non-slip rubber base mouse pad measuring 31\" x 12\" with stitched edges to prevent fraying.",
  },
  {
    id: 14,
    title: "Ergonomic Gel Wrist Rest",
    srcUrl: "/images/electronics/ergonomic-wrist-rest.svg",
    gallery: ["/images/electronics/ergonomic-wrist-rest.svg"],
    price: 12.99,
    discount: { amount: 0, percentage: 0 },
    category: "Accessories",
    stockStatus: "Out of Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Memory foam wrist support pad with non-skid backing designed for full-size desktop computer keyboards to reduce strain.",
  },
  {
    id: 15,
    title: "65W GaN Wall Charger",
    srcUrl: "/images/electronics/gan-charger.svg",
    gallery: ["/images/electronics/gan-charger.svg"],
    price: 38,
    discount: { amount: 0, percentage: 0 },
    category: "Chargers",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Gallium nitride dual-port wall plug delivering 65W of power through 2 USB-C fast charging outputs.",
  },
  {
    id: 16,
    title: "Magnetic Wireless Charging Pad",
    srcUrl: "/images/electronics/magnetic-wireless-charging-pad.svg",
    gallery: ["/images/electronics/magnetic-wireless-charging-pad.svg"],
    price: 24.5,
    discount: { amount: 0, percentage: 0 },
    category: "Chargers",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Slim circular magnetic inductive charging pad supporting up to 15W wireless output with an integrated cable.",
  },
  {
    id: 17,
    title: "20000mAh Portable Power Bank",
    srcUrl: "/images/electronics/powerbank.svg",
    gallery: ["/images/electronics/powerbank.svg"],
    price: 49.99,
    discount: { amount: 0, percentage: 0 },
    category: "Chargers",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "High capacity battery pack featuring 20000mAh with dual USB-A outputs and bidirectional USB-C input.",
  },
  {
    id: 18,
    title: "Mechanical Gaming Keyboard",
    srcUrl: "/images/electronics/mechanical-gaming-keyboard.svg",
    gallery: ["/images/electronics/mechanical-gaming-keyboard.svg"],
    price: 69.99,
    discount: { amount: 0, percentage: 0 },
    category: "Gaming",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Compact tenkeyless wired keyboard featuring linear red mechanical switches and customizable per-key backlighting effects.",
  },
  {
    id: 19,
    title: "Optical Gaming Mouse",
    srcUrl: "/images/electronics/optical-gaming-mouse.jpg",
    gallery: ["/images/electronics/optical-gaming-mouse.jpg"],
    price: 39.5,
    discount: { amount: 0, percentage: 0 },
    category: "Gaming",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Lightweight ergonomic mouse equipped with 12000 DPI optical sensor and 6 programmable macro side buttons.",
  },
  {
    id: 20,
    title: "USB Condenser Gaming Microphone",
    srcUrl: "/images/electronics/usb-condenser-mic.jpg",
    gallery: ["/images/electronics/usb-condenser-mic.jpg"],
    price: 54,
    discount: { amount: 0, percentage: 0 },
    category: "Gaming",
    stockStatus: "Out of Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Cardioid pickup pattern condenser microphone with tap-to-mute sensor, built-in shock mount, and USB plug-and-play connectivity.",
  },
  {
    id: 21,
    title: "Wireless Game Controller",
    srcUrl: "/images/electronics/wireless-game-controller.jpg",
    gallery: ["/images/electronics/wireless-game-controller.jpg"],
    price: 59.99,
    discount: { amount: 0, percentage: 0 },
    category: "Gaming",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Ergonomic wireless gamepad with dual vibration rumble motors, textured grip handles, and rechargeable lithium battery.",
  },
  {
    id: 22,
    title: "Braided Lightning Cable",
    srcUrl: "/images/electronics/braided-lightning-cable.svg",
    gallery: ["/images/electronics/braided-lightning-cable.svg"],
    price: 14.99,
    discount: { amount: 0, percentage: 0 },
    category: "Mobile Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "6ft heavy-duty nylon braided charging cable with reinforced aluminum connectors supporting 2.4A charging.",
  },
  {
    id: 23,
    title: "Magnetic Dashboard Car Mount",
    srcUrl: "/images/electronics/magnetic-car-mount.svg",
    gallery: ["/images/electronics/magnetic-car-mount.svg"],
    price: 18.5,
    discount: { amount: 0, percentage: 0 },
    category: "Mobile Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Universal magnetic smartphone car holder with 360° rotational ball joint and strong suction base.",
  },
  {
    id: 24,
    title: "Universal Phone Kickstand",
    srcUrl: "/images/electronics/phone-kickstand.svg",
    gallery: ["/images/electronics/phone-kickstand.svg"],
    price: 9.99,
    discount: { amount: 0, percentage: 0 },
    category: "Mobile Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Slim zinc alloy adhesive kickstand for smartphones supporting both vertical and horizontal hands-free viewing angles.",
  },
  {
    id: 25,
    title: "Waterproof Phone Pouch",
    srcUrl: "/images/electronics/waterproof-phone-pouch.svg",
    gallery: ["/images/electronics/waterproof-phone-pouch.svg"],
    price: 11.5,
    discount: { amount: 0, percentage: 0 },
    category: "Mobile Accessories",
    stockStatus: "In Stock",
    sizes: ["Standard Edition", "Pro Edition"],
    description: "Clear touch-responsive waterproof dry bag certified IPX8 up to 30m depth for phones under 7\".",
  },
];

export const defaultNewArrivals: Product[] = defaultAllProducts.slice(0, 8);
export const defaultTopSelling: Product[] = [...defaultAllProducts].reverse().slice(0, 8);
export const defaultRelatedProducts: Product[] = defaultAllProducts;

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
      newArrivals: sheetProducts.slice(0, 8),
      topSelling: [...sheetProducts].reverse().slice(0, 8),
      relatedProducts: sheetProducts,
    };
  }

  // Graceful fallback if sheet is offline or not yet connected:
  // Returns all 25 catalog items with accurate stock status and pricing
  return {
    sheetProducts: defaultAllProducts,
    allProducts: defaultAllProducts,
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
