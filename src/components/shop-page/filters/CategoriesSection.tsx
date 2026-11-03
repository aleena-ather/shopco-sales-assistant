"use client";

import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from "next/navigation";

export type CategoryItem = {
  name: string;
  count: number;
  slug: string;
};

type CategoriesSectionProps = {
  categories?: CategoryItem[];
};

const CategoriesSection = ({ categories = [] }: CategoriesSectionProps) => {
  const searchParams = useSearchParams();
  const currentCategory = (searchParams?.get("category") || "").toLowerCase();

  // Helper to construct URL preserving search or sort if desired
  const buildCategoryUrl = (catName?: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.delete("page");
    if (!catName || catName.toLowerCase() === "all") {
      params.delete("category");
    } else {
      params.set("category", catName);
    }
    const query = params.toString();
    return `/shop${query ? `?${query}` : ""}`;
  };

  const totalCount = categories.reduce((acc, c) => acc + c.count, 0);

  return (
    <div className="flex flex-col space-y-1 text-slate-600">
      <Link
        href={buildCategoryUrl()}
        className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors ${
          !currentCategory
            ? "bg-blue-50 font-bold text-[#2F6BFF]"
            : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        <span>All Products</span>
        <span className="text-xs bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
          {totalCount}
        </span>
      </Link>

      {categories.map((category) => {
        const isSelected =
          currentCategory === category.name.trim().toLowerCase();

        return (
          <Link
            key={category.name}
            href={buildCategoryUrl(category.name)}
            className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors ${
              isSelected
                ? "bg-blue-50 font-bold text-[#2F6BFF]"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>{category.name}</span>
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-xs bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                {category.count}
              </span>
              <MdKeyboardArrowRight className="text-base opacity-40" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesSection;
