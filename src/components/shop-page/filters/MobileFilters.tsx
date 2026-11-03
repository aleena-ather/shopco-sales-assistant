"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FiSliders } from "react-icons/fi";
import Filters from ".";
import { CategoryItem } from "./CategoriesSection";

type MobileFiltersProps = {
  categories?: CategoryItem[];
  priceBounds?: { minPrice: number; maxPrice: number };
};

const MobileFilters = ({ categories, priceBounds }: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            aria-label="Filter products"
            className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 p-1 md:hidden flex items-center justify-center transition-colors"
          >
            <FiSliders className="text-base" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[85%] bg-white">
          <DrawerHeader className="border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-lg">Filters</span>
              <FiSliders className="text-xl text-slate-400" />
            </div>
            <DrawerTitle className="hidden">Filters</DrawerTitle>
            <DrawerDescription className="hidden">Filter electronics products</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[80vh] overflow-y-auto w-full px-5 py-5">
            <Filters
              categories={categories}
              priceBounds={priceBounds}
              onApplyComplete={() => setOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileFilters;
