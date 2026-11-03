"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  const { cart } = useAppSelector((state: RootState) => state.carts);

  return (
    <Link href="/cart" className="relative mr-[14px] p-1.5 hover:bg-white/10 rounded-full transition-colors" aria-label="Shopping Cart">
      <Image
        priority
        src="/icons/cart.svg"
        height={100}
        width={100}
        alt="cart"
        className="max-w-[22px] max-h-[22px] invert"
      />
      {cart && cart.totalQuantities > 0 && (
        <span className="bg-[#2F6BFF] text-white font-extrabold rounded-full px-1.5 py-0.2 text-[10px] absolute -top-1 right-0 shadow-sm border border-[#0B1B3A]">
          {cart.totalQuantities}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
