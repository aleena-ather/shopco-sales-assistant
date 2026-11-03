import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import {
  getLiveProducts,
  getCategoriesWithCounts,
  getPriceBounds,
  filterAndSortProducts,
} from "@/lib/products";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ShopSortSelect from "@/components/shop-page/ShopSortSelect";
import Link from "next/link";
import { Search, RotateCcw, X } from "lucide-react";

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams?: {
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  };
}

export default async function ShopPage({ searchParams = {} }: ShopPageProps) {
  const { allProducts } = await getLiveProducts();
  const categoriesWithCounts = getCategoriesWithCounts(allProducts);
  const priceBounds = getPriceBounds(allProducts);

  const q = searchParams?.q?.trim() || "";
  const category = searchParams?.category?.trim() || "";
  const parsedMin = searchParams?.minPrice ? parseFloat(searchParams.minPrice) : undefined;
  const parsedMax = searchParams?.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
  const sort = searchParams?.sort || "most-popular";

  // Filter and sort products
  const filteredProducts = filterAndSortProducts(allProducts, {
    q,
    category,
    minPrice: parsedMin,
    maxPrice: parsedMax,
    sort,
  });

  // Working pagination (12 products per page)
  const PAGE_SIZE = 12;
  const totalFiltered = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, parseInt(searchParams?.page || "1", 10) || 1),
    totalPages
  );
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const hasActiveFilters = Boolean(
    q || category || searchParams?.minPrice || searchParams?.maxPrice
  );

  // Helper to generate pagination links preserving active filters
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (searchParams?.minPrice) params.set("minPrice", searchParams.minPrice);
    if (searchParams?.maxPrice) params.set("maxPrice", searchParams.maxPrice);
    if (sort && sort !== "most-popular") params.set("sort", sort);
    if (pageNumber > 1) params.set("page", pageNumber.toString());
    const query = params.toString();
    return `/shop${query ? `?${query}` : ""}`;
  };

  // Helper to remove a single filter chip
  const createRemoveFilterUrl = (filterType: "q" | "category" | "price") => {
    const params = new URLSearchParams();
    if (filterType !== "q" && q) params.set("q", q);
    if (filterType !== "category" && category) params.set("category", category);
    if (filterType !== "price") {
      if (searchParams?.minPrice) params.set("minPrice", searchParams.minPrice);
      if (searchParams?.maxPrice) params.set("maxPrice", searchParams.maxPrice);
    }
    if (sort && sort !== "most-popular") params.set("sort", sort);
    const query = params.toString();
    return `/shop${query ? `?${query}` : ""}`;
  };

  return (
    <main className="min-h-screen bg-[#F3F5F9] pb-24 pt-6">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <BreadcrumbShop />

        <div className="flex md:space-x-6 items-start mt-4">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block min-w-[280px] max-w-[280px] border border-slate-200/80 bg-white rounded-2xl px-5 py-5 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-[#0B1B3A] text-lg">Filters</span>
              <FiSliders className="text-xl text-slate-400" />
            </div>
            <Filters
              categories={categoriesWithCounts}
              priceBounds={priceBounds}
            />
          </div>

          {/* Main Products Grid & Controls */}
          <div className="flex flex-col w-full space-y-5">
            {/* Top Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-4 border-b border-slate-200/80 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-extrabold text-2xl md:text-3xl text-[#0B1B3A] tracking-tight">
                    {category ? `${category}` : "ShopCo Electronics"}
                  </h1>
                  <p className="text-xs text-[#64748B] font-medium mt-1">
                    Browse our latest gadgets, accessories and components
                  </p>
                </div>
                <MobileFilters
                  categories={categoriesWithCounts}
                  priceBounds={priceBounds}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs sm:text-sm text-[#64748B] font-medium">
                  Showing {totalFiltered} of {allProducts.length} Products
                </span>
                <ShopSortSelect currentSort={sort} />
              </div>
            </div>

            {/* Active Filters Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                  Active:
                </span>
                {q && (
                  <Link
                    href={createRemoveFilterUrl("q")}
                    className="inline-flex items-center text-xs font-medium bg-blue-50 text-[#2F6BFF] border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors gap-1.5"
                  >
                    <span>Search: &ldquo;{q}&rdquo;</span>
                    <X className="w-3 h-3" />
                  </Link>
                )}
                {category && (
                  <Link
                    href={createRemoveFilterUrl("category")}
                    className="inline-flex items-center text-xs font-medium bg-blue-50 text-[#2F6BFF] border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors gap-1.5"
                  >
                    <span>Category: {category}</span>
                    <X className="w-3 h-3" />
                  </Link>
                )}
                {(searchParams?.minPrice || searchParams?.maxPrice) && (
                  <Link
                    href={createRemoveFilterUrl("price")}
                    className="inline-flex items-center text-xs font-medium bg-blue-50 text-[#2F6BFF] border border-blue-200 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors gap-1.5"
                  >
                    <span>
                      Price: ${parsedMin ?? priceBounds.minPrice} - $
                      {parsedMax ?? priceBounds.maxPrice}
                    </span>
                    <X className="w-3 h-3" />
                  </Link>
                )}
                <Link
                  href="/shop"
                  className="text-xs font-semibold text-[#64748B] hover:text-[#0B1B3A] underline ml-2 inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear all</span>
                </Link>
              </div>
            )}

            {/* Products Grid or Friendly Empty State */}
            {totalFiltered === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-dashed border-slate-300 rounded-3xl mt-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2F6BFF] mb-4 shadow-sm">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1B3A] mb-2">
                  No products found
                </h3>
                <p className="text-[#64748B] max-w-md mb-5 text-sm leading-relaxed">
                  We couldn&apos;t find any electronics matching your criteria. Try adjusting your search term, or explore our top product categories below:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  {categoriesWithCounts.slice(0, 5).map((c) => (
                    <Link
                      key={c.name}
                      href={`/shop?category=${encodeURIComponent(c.name)}`}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-[#2F6BFF] hover:text-white text-slate-700 transition-all border border-slate-200"
                    >
                      {c.name} ({c.count})
                    </Link>
                  ))}
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-[#2F6BFF] hover:bg-[#1E58E8] text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20"
                >
                  Clear All Filters
                </Link>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            )}

            {/* Working Pagination (12 products per page) */}
            {totalPages > 1 && (
              <>
                <hr className="border-t-slate-200 mt-6" />
                <Pagination className="justify-between pt-2">
                  <PaginationPrevious
                    href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
                    className={`border border-slate-200 bg-white ${
                      currentPage <= 1
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-slate-50"
                    }`}
                  />

                  <PaginationContent>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href={createPageUrl(pageNum)}
                            isActive={currentPage === pageNum}
                            className={`font-semibold text-sm ${
                              currentPage === pageNum
                                ? "bg-[#2F6BFF] text-white hover:bg-[#1E58E8] hover:text-white"
                                : "text-slate-600 hover:bg-slate-100 bg-white border border-slate-200"
                            }`}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                  </PaginationContent>

                  <PaginationNext
                    href={
                      currentPage < totalPages
                        ? createPageUrl(currentPage + 1)
                        : "#"
                    }
                    className={`border border-slate-200 bg-white ${
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-slate-50"
                    }`}
                  />
                </Pagination>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
