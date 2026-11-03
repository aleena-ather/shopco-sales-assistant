"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShopSortSelect({
  currentSort = "most-popular",
}: {
  currentSort?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    params.delete("page");
    if (newSort === "most-popular") {
      params.delete("sort");
    } else {
      params.set("sort", newSort);
    }
    const query = params.toString();
    router.push(`/shop${query ? `?${query}` : ""}`);
  };

  return (
    <div className="flex items-center text-sm text-slate-500">
      <span className="mr-2 hidden sm:inline">Sort by:</span>
      <Select defaultValue={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="font-semibold text-xs sm:text-sm px-2.5 py-1.5 w-auto text-slate-800 bg-slate-50 border border-slate-200 rounded-lg shadow-none focus:ring-1 focus:ring-blue-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most-popular">Most Popular</SelectItem>
          <SelectItem value="low-price">Price: Low to High</SelectItem>
          <SelectItem value="high-price">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

