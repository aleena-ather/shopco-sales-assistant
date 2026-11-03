import ProductListSec from "@/components/common/ProductListSec";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import ValuePillars from "@/components/homepage/ValuePillars";
import BentoShowcase from "@/components/homepage/BentoShowcase";
import AiAssistantBanner from "@/components/homepage/AiAssistantBanner";
import { getLiveProducts, getCategoriesWithCounts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { allProducts } = await getLiveProducts();
  const featuredProducts = allProducts.slice(0, 8);
  const categories = getCategoriesWithCounts(allProducts);

  return (
    <div className="bg-[#0B1B3A] text-white min-h-screen">
      <Header />
      <ValuePillars />
      <main className="py-14 sm:py-20 space-y-20 sm:space-y-28">
        {/* Curated Bento Grid Showcase (Apple Style) */}
        <BentoShowcase />

        {/* Featured Products (First 8 live products from sheet) */}
        <ProductListSec
          title="Featured products"
          data={featuredProducts}
          viewAllLink="/shop"
          variant="dark"
        />

        {/* Interactive AI Assistant Banner */}
        <AiAssistantBanner />

        {/* Dynamic Categories Showcase */}
        <DressStyle categories={categories} />
      </main>
    </div>
  );
}
