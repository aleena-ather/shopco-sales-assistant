"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React, { useState } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks/redux";
import Link from "next/link";
import { CheckCircle2, X, ShieldCheck, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default function CartPage() {
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoApplied(true);
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-[#0B1B3A] uppercase mb-5 md:mb-6",
              ])}
            >
              your cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10 bg-white shadow-sm">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10 bg-white shadow-sm">
                <h6 className="text-xl md:text-2xl font-bold text-[#0B1B3A]">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Subtotal</span>
                    <span className="md:text-xl font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Discount (-
                      {Math.round(
                        ((totalPrice - adjustedTotalPrice) / (totalPrice || 1)) * 100
                      )}
                      %)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -${Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Delivery Fee
                    </span>
                    <span className="md:text-xl font-bold text-emerald-600">Free</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold text-[#0B1B3A]">
                      ${Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-3">
                    <InputGroup className="bg-[#F3F5F9] border border-slate-200">
                      <InputGroup.Text>
                        <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                      </InputGroup.Text>
                      <InputGroup.Input
                        type="text"
                        name="code"
                        placeholder="Add promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-transparent placeholder:text-black/40"
                      />
                    </InputGroup>
                    <Button
                      type="button"
                      onClick={handleApplyPromo}
                      className="bg-[#2F6BFF] hover:bg-[#1E58E8] text-white rounded-full w-full max-w-[119px] h-[48px] font-semibold transition-all shadow-sm"
                    >
                      {promoApplied ? "Applied ✓" : "Apply"}
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 pl-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Promo code applied to your order!
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="text-sm md:text-base font-semibold bg-[#2F6BFF] hover:bg-[#1E58E8] text-white rounded-full w-full py-4 h-[54px] md:h-[60px] group transition-all shadow-md shadow-blue-500/20"
                >
                  Go to Checkout{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-slate-400 mt-24">
            <TbBasketExclamation strokeWidth={1} className="text-6xl text-slate-400 mb-2" />
            <span className="block mb-4 text-base font-medium text-slate-600">Your shopping cart is empty.</span>
            <Button className="rounded-full px-8 bg-[#2F6BFF] hover:bg-[#1E58E8] text-white" asChild>
              <Link href="/shop">Shop Tech Gear</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Checkout Demo Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-[#0B1B3A] mb-2">
              Ready for Checkout!
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
              Your items have been reserved from live inventory. ShopCo is currently running in showcase mode.
            </p>

            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 mb-6 text-left space-y-2.5">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Items in Order:</span>
                <span className="font-semibold text-slate-800">{cart?.items.reduce((s, i) => s + i.quantity, 0)} items</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Shipping:</span>
                <span className="font-semibold text-emerald-600">Free Express</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Order Total:</span>
                <span className="text-[#2F6BFF] text-base">${Math.round(adjustedTotalPrice)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>1-Year Manufacturer Warranty included</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="w-full bg-[#2F6BFF] hover:bg-[#1E58E8] text-white rounded-full h-12 font-semibold"
                asChild
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="w-full border-slate-200 text-slate-700 hover:bg-slate-100 rounded-full h-12 font-medium"
              >
                Close Summary
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
