"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import ProductDetailsContent from "./ProductDetailsContent";
import FaqContent from "./FaqContent";
import { Product } from "@/types/product.types";

type TabBtn = {
  id: number;
  label: string;
};

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: "Product Details",
  },
  {
    id: 2,
    label: "FAQs",
  },
];

const Tabs = ({ data }: { data?: Product }) => {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <div className="flex items-center mb-6 sm:mb-8 overflow-x-auto border-b border-black/10">
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            type="button"
            className={cn([
              active === tab.id
                ? "border-[#2F6BFF] border-b-2 font-bold text-[#0B1B3A]"
                : "text-slate-500 font-normal hover:text-slate-800",
              "p-5 sm:p-6 rounded-none flex-1 transition-colors",
            ])}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="mb-12 sm:mb-16">
        {active === 1 && <ProductDetailsContent data={data} />}
        {active === 2 && <FaqContent />}
      </div>
    </div>
  );
};

export default Tabs;
