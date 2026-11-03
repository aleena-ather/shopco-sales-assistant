import { NextResponse } from "next/server";
import { getLiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getLiveProducts();
    return NextResponse.json({
      success: true,
      source: "Google Sheets & Catalog",
      count: data.allProducts.length,
      sheetProductsCount: data.sheetProducts.length,
      data,
    });
  } catch (error) {
    console.error("Error in /api/products:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load products",
      },
      { status: 500 }
    );
  }
}
