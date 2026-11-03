import React from "react";
import PhotoSection from "./PhotoSection";
import { Product } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import AddToCardSection from "./AddToCardSection";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

const Header = ({ data }: { data: Product }) => {
  const hasRating = typeof data.rating === "number" && data.rating > 0;
  const hasDiscount =
    Boolean(data.discount) &&
    (data.discount.percentage > 0 || data.discount.amount > 0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <PhotoSection data={data} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {data.category && (
              <span className="text-xs uppercase font-semibold tracking-wider text-black/50 bg-black/5 px-2.5 py-1 rounded-full">
                {data.category}
              </span>
            )}
            {data.stockStatus && (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  data.stockStatus.toLowerCase().includes("out")
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                }`}
              >
                ● {data.stockStatus}
              </span>
            )}
          </div>
          <h1
            className={cn([
              integralCF.className,
              "text-2xl md:text-[38px] md:leading-[42px] mb-3 md:mb-3.5 capitalize text-[#0B1B3A]",
            ])}
          >
            {data.title}
          </h1>

          {/* Rating only displayed if real rating data exists in sheet */}
          {hasRating && (
            <div className="flex items-center mb-3 sm:mb-3.5">
              <Rating
                initialValue={data.rating}
                allowFraction
                SVGclassName="inline-block"
                emptyClassName="fill-gray-50"
                size={25}
                readonly
              />
              <span className="text-black text-xs sm:text-sm ml-[11px] sm:ml-[13px] pb-0.5 sm:pb-0">
                {data.rating!.toFixed(1)}
                <span className="text-black/60">/5</span>
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2.5 sm:space-x-3 mb-5">
            {hasDiscount && data.discount.percentage > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${Math.round(
                  data.price - (data.price * data.discount.percentage) / 100
                )}`}
              </span>
            ) : hasDiscount && data.discount.amount > 0 ? (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                {`$${data.price - data.discount.amount}`}
              </span>
            ) : (
              <span className="font-bold text-black text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {hasDiscount && data.discount.percentage > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {hasDiscount && data.discount.amount > 0 && (
              <span className="font-bold text-black/40 line-through text-2xl sm:text-[32px]">
                ${data.price}
              </span>
            )}
            {hasDiscount && data.discount.percentage > 0 ? (
              <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                {`-${data.discount.percentage}%`}
              </span>
            ) : (
              hasDiscount &&
              data.discount.amount > 0 && (
                <span className="font-medium text-[10px] sm:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
                  {`-$${data.discount.amount}`}
                </span>
              )
            )}
          </div>
          <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
            {data.description ||
              "Engineered for high performance, premium ergonomics, and durable build quality."}
          </p>
          <hr className="h-[1px] border-t-black/10 my-6" />
          <AddToCardSection data={data} />

          {/* E-Commerce Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7 pt-6 border-t border-black/10">
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <Truck className="w-5 h-5 text-[#2F6BFF] shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Free Delivery</p>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Orders over $35</p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">1-Yr Warranty</p>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <RotateCcw className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">30-Day Return</p>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
