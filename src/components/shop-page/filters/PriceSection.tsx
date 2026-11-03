"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

type PriceSectionProps = {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  onChange?: (values: [number, number]) => void;
};

const PriceSection = ({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
}: PriceSectionProps) => {
  // If min and max are the same (e.g. only 1 product), create a sensible span
  const safeMin = Math.floor(min);
  const safeMax = Math.ceil(max) === safeMin ? safeMin + 50 : Math.ceil(max);

  const initialMin =
    typeof currentMin === "number" && !isNaN(currentMin)
      ? Math.max(safeMin, currentMin)
      : safeMin;
  const initialMax =
    typeof currentMax === "number" && !isNaN(currentMax)
      ? Math.min(safeMax, currentMax)
      : safeMax;

  const [range, setRange] = useState<[number, number]>([initialMin, initialMax]);

  useEffect(() => {
    setRange([initialMin, initialMax]);
  }, [initialMin, initialMax]);

  const handleSliderChange = (vals: number[]) => {
    const newRange: [number, number] = [vals[0], vals[1]];
    setRange(newRange);
    onChange?.(newRange);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-lg hover:no-underline p-0 py-1">
          Price Range
        </AccordionTrigger>
        <AccordionContent className="pt-4 overflow-visible">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4">
            <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
              Min: ${range[0]}
            </span>
            <span className="text-slate-400">&mdash;</span>
            <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
              Max: ${range[1]}
            </span>
          </div>
          <Slider
            min={safeMin}
            max={safeMax}
            step={1}
            value={range}
            onValueChange={handleSliderChange}
            label="$"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
