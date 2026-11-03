import { NextRequest, NextResponse } from "next/server";
import { getLiveProducts } from "@/lib/products";
import { smartSearchProducts } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    const { allProducts } = await getLiveProducts();
    const results = q.trim() ? smartSearchProducts(allProducts, q) : allProducts;

    return NextResponse.json({
      success: true,
      query: q,
      count: results.length,
      products: results,
      suggestions: results.slice(0, 6).map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        price: p.price,
        srcUrl: p.srcUrl,
        stockStatus: p.stockStatus,
      })),
    });
  } catch (error) {
    console.error("Error in /api/search:", error);
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    );
  }
}

