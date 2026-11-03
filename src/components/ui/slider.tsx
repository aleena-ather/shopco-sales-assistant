"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "value" | "defaultValue"> {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  value?: [number, number];
  label?: string;
  onValueChange?: (values: number[]) => void;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      min,
      max,
      step = 1,
      defaultValue = [min, max],
      value,
      label,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValues, setInternalValues] = React.useState<[number, number]>(
      value ?? defaultValue
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValues(value);
      } else if (defaultValue !== undefined) {
        setInternalValues(defaultValue);
      }
    }, [value, defaultValue?.[0], defaultValue?.[1]]);

    const currentValues = isControlled ? value! : internalValues;

    const handleValueChange = (newValues: number[]) => {
      if (!isControlled) {
        setInternalValues([newValues[0], newValues[1]]);
      }
      onValueChange?.(newValues);
    };

    const rangeSpan = Math.max(1, max - min);

    return (
      <div className="w-full relative pb-6">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          min={min}
          max={max}
          step={step}
          value={currentValues}
          onValueChange={handleValueChange}
          {...props}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-200">
            <SliderPrimitive.Range className="absolute h-full bg-[#0B132B]" />
          </SliderPrimitive.Track>

          {/* Thumb 1 with Label */}
          <div
            className="absolute -translate-x-1/2 -bottom-7 text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded shadow-sm z-10"
            style={{
              left: `${Math.min(100, Math.max(0, ((currentValues[0] - min) / rangeSpan) * 100))}%`,
            }}
          >
            {label}
            {currentValues[0]}
          </div>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border-2 border-white bg-[#0B132B] shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />

          {/* Thumb 2 with Label */}
          <div
            className="absolute -translate-x-1/2 -bottom-7 text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded shadow-sm z-10"
            style={{
              left: `${Math.min(100, Math.max(0, ((currentValues[1] - min) / rangeSpan) * 100))}%`,
            }}
          >
            {label}
            {currentValues[1]}
          </div>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border-2 border-white bg-[#0B132B] shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
        </SliderPrimitive.Root>
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
