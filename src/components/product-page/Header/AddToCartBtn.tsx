"use client";

import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { Product } from "@/types/product.types";
import React, { useState } from "react";
import { Check } from "lucide-react";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const dispatch = useAppDispatch();
  const isOutOfStock = data.stockStatus?.toLowerCase().includes("out");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        price: data.price,
        attributes: [data.category || "Standard Edition"],
        discount: data.discount || { amount: 0, percentage: 0 },
        quantity: data.quantity,
      })
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      disabled={isOutOfStock}
      className={`w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base font-semibold transition-all shadow-md flex items-center justify-center space-x-2 ${
        isOutOfStock
          ? "bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300"
          : isAdded
          ? "bg-emerald-600 text-white shadow-emerald-500/25 scale-[1.02]"
          : "bg-[#2F6BFF] hover:bg-[#1E58E8] text-white shadow-[#2F6BFF]/20"
      }`}
      onClick={handleAddToCart}
    >
      {isOutOfStock ? (
        <span>Out of Stock</span>
      ) : isAdded ? (
        <>
          <Check className="w-5 h-5 animate-in zoom-in-75 duration-200" />
          <span>Added to Cart!</span>
        </>
      ) : (
        <span>Add to Cart</span>
      )}
    </button>
  );
};

export default AddToCartBtn;
