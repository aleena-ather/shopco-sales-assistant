import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { ArrowRight, Eye } from "lucide-react";
import CategoryPlaceholderTile from "./CategoryPlaceholderTile";

type ProductCardProps = {
  data: Product;
  variant?: "dark" | "light";
};

const ProductCard = ({ data, variant = "light" }: ProductCardProps) => {
  const isOutOfStock = data.stockStatus?.toLowerCase().includes("out");
  const isDark = variant === "dark";

  return (
    <Link
      href={`/shop/product/${data.id}/${encodeURIComponent(data.title.split(" ").join("-"))}`}
      className={`group flex flex-col justify-between rounded-2xl p-4 card-lift transition-all duration-300 h-full ${
        isDark
          ? "bg-[#12264D] border border-white/10 hover:border-[#2F6BFF]/50 shadow-md hover:shadow-2xl hover:shadow-[#0B1B3A]/40 text-white"
          : "bg-white border border-slate-200/80 hover:border-[#2F6BFF]/50 shadow-sm hover:shadow-xl hover:shadow-[#0B1B3A]/5 text-slate-900"
      } ${isOutOfStock ? "opacity-85" : ""}`}
    >
      <div>
        {/* White image container behind photos for crisp contrast */}
        <div className="relative bg-white rounded-xl w-full aspect-square mb-3.5 overflow-hidden flex items-center justify-center border border-slate-200/40 p-2">
          {data.isPlaceholder || !data.srcUrl ? (
            <CategoryPlaceholderTile category={data.category} />
          ) : (
            <Image
              src={data.srcUrl}
              width={295}
              height={298}
              unoptimized={data.srcUrl.endsWith(".svg")}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
              alt={data.title}
            />
          )}

          {/* Green / Red Stock Status Badge */}
          {data.stockStatus && (
            <span
              className={`absolute top-2.5 left-2.5 text-[10px] xl:text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-md z-10 ${
                isOutOfStock
                  ? "bg-[#EF4444] text-white"
                  : "bg-[#10B981] text-white"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOutOfStock ? "bg-white" : "bg-white animate-pulse"
                }`}
              />
              {data.stockStatus}
            </span>
          )}
        </div>

        {/* Category Pill */}
        {data.category && (
          <span
            className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${
              isDark
                ? "text-[#38BDF8] bg-[#2F6BFF]/15 border border-[#2F6BFF]/30"
                : "text-[#2F6BFF] bg-[#2F6BFF]/10 border border-[#2F6BFF]/20"
            }`}
          >
            {data.category}
          </span>
        )}

        {/* Title */}
        <h3
          className={`font-semibold text-base sm:text-lg line-clamp-1 group-hover:text-[#2F6BFF] transition-colors ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {data.title}
        </h3>

        {/* Rating - Only displayed if real rating data exists */}
        {typeof data.rating === "number" && data.rating > 0 && (
          <div className="flex items-center mt-1.5 mb-2.5">
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName="inline-block"
              emptyClassName={isDark ? "fill-slate-600" : "fill-gray-100"}
              size={16}
              readonly
            />
            <span
              className={`text-xs font-semibold ml-2 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              {data.rating.toFixed(1)}
              <span className="text-slate-400 font-normal">/5</span>
            </span>
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center space-x-2 mt-2">
          {data.discount?.percentage > 0 ? (
            <span
              className={`font-extrabold text-xl xl:text-2xl ${
                isDark ? "text-white" : "text-[#0B1B3A]"
              }`}
            >
              {`$${Math.round(
                data.price - (data.price * data.discount.percentage) / 100
              )}`}
            </span>
          ) : data.discount?.amount > 0 ? (
            <span
              className={`font-extrabold text-xl xl:text-2xl ${
                isDark ? "text-white" : "text-[#0B1B3A]"
              }`}
            >
              {`$${data.price - data.discount.amount}`}
            </span>
          ) : (
            <span
              className={`font-extrabold text-xl xl:text-2xl ${
                isDark ? "text-white" : "text-[#0B1B3A]"
              }`}
            >
              ${data.price}
            </span>
          )}

          {data.discount?.percentage > 0 && (
            <span className="font-semibold text-slate-400 line-through text-sm">
              ${data.price}
            </span>
          )}

          {data.discount?.percentage > 0 && (
            <span className="font-bold text-[10px] py-1 px-2 rounded bg-red-100 text-red-600">
              {`-${data.discount.percentage}%`}
            </span>
          )}
        </div>
      </div>

      {/* Electric-Blue View Details Action Button */}
      <div
        className={`mt-4 pt-3 ${
          isDark ? "border-t border-white/10" : "border-t border-slate-100"
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
            isOutOfStock
              ? isDark
                ? "bg-white/10 text-slate-300 hover:bg-white/15"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              : "bg-[#2F6BFF] hover:bg-[#1E58E8] text-white shadow-blue-500/20 group-hover:shadow-md"
          }`}
        >
          {isOutOfStock ? (
            <span>Out of Stock &bull; View details</span>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
