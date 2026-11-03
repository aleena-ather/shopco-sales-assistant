"use client";

import React, { useState } from "react";
import CategoriesSection, { CategoryItem } from "@/components/shop-page/filters/CategoriesSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

type FiltersProps = {
  categories?: CategoryItem[];
  priceBounds?: { minPrice: number; maxPrice: number };
  onApplyComplete?: () => void;
};

const Filters = ({
  categories = [],
  priceBounds = { minPrice: 0, maxPrice: 100 },
  onApplyComplete,
}: FiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMin = searchParams?.get("minPrice")
    ? parseFloat(searchParams.get("minPrice")!)
    : priceBounds.minPrice;
  const currentMax = searchParams?.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice")!)
    : priceBounds.maxPrice;

  const [selectedRange, setSelectedRange] = useState<[number, number]>([
    currentMin,
    currentMax,
  ]);

  const hasActiveFilters = Boolean(
    searchParams?.get("q") ||
      searchParams?.get("category") ||
      searchParams?.get("minPrice") ||
      searchParams?.get("maxPrice")
  );

  const handleApply = () => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.delete("page");
    params.set("minPrice", selectedRange[0].toString());
    params.set("maxPrice", selectedRange[1].toString());

    router.push(`/shop?${params.toString()}`);
    onApplyComplete?.();
  };

  const handleReset = () => {
    router.push("/shop");
    onApplyComplete?.();
  };

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Categories
        </h4>
        <CategoriesSection categories={categories} />
      </div>

      <hr className="border-t-slate-200" />

      <div>
        <PriceSection
          min={priceBounds.minPrice}
          max={priceBounds.maxPrice}
          currentMin={currentMin}
          currentMax={currentMax}
          onChange={(newRange) => setSelectedRange(newRange)}
        />
      </div>

      <div className="pt-2 flex flex-col gap-2.5">
        <Button
          type="button"
          onClick={handleApply}
          className="bg-[#2F6BFF] hover:bg-[#1E58E8] text-white w-full rounded-full text-sm font-semibold py-3 h-11 transition-all shadow-md shadow-blue-500/20"
        >
          Apply Filter
        </Button>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full rounded-full text-xs font-semibold py-2.5 h-10 border-slate-300 text-slate-600 hover:text-black flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All Filters</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Filters;
