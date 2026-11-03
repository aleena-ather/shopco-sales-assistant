import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { getProductById, getLiveProducts } from "@/lib/products";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productId = Number(params.slug[0]);
  const productData = await getProductById(productId);

  if (!productData?.title) {
    notFound();
  }

  const { allProducts } = await getLiveProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== productId);

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs data={productData} />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="Recommended Tech & Gear" data={relatedProducts} />
      </div>
    </main>
  );
}
