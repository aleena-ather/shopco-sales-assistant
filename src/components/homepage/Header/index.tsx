"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { ArrowRight, Sparkles, Headphones, Zap, Gamepad2, ShieldCheck } from "lucide-react";

const Header = () => {
  const handleOpenChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-gemini-chat"));
    }
  };

  return (
    <header className="relative bg-[#0B1B3A] text-white pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-white/10">
      {/* Background ambient radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2F6BFF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle geometric grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="max-w-frame mx-auto px-4 xl:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Bold Typography & Actions */}
        <section className="lg:col-span-7 text-left">
          {/* Top Pill Beacon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#38BDF8] mb-6 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Gadgets and accessories</span>
          </motion.div>

          {/* Main Cinematic Headline */}
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Everyday tech for your desk
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#94A3B8] text-base sm:text-lg mb-8 max-w-[560px] leading-relaxed font-normal"
          >
            Browse audio, chargers, gaming gear and accessories. Check live stock and ask our assistant for help.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center space-x-2.5 bg-[#2F6BFF] hover:bg-[#1E58E8] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#2F6BFF]/30 hover:shadow-[#2F6BFF]/50 transition-all transform hover:-translate-y-0.5 text-base"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/shop#categories"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 text-base backdrop-blur-sm"
            >
              <span>Browse Categories</span>
            </Link>

            <button
              type="button"
              onClick={handleOpenChat}
              className="inline-flex items-center justify-center space-x-2 bg-[#2F6BFF]/20 hover:bg-[#2F6BFF]/30 text-[#38BDF8] border border-[#2F6BFF]/40 font-semibold px-6 py-3.5 rounded-full transition-all hover:-translate-y-0.5 text-sm backdrop-blur-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span>Ask AI Assistant</span>
            </button>
          </motion.div>

          {/* Quick Category Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10"
          >
            <span className="text-xs text-slate-400 font-medium mr-1">Trending:</span>
            <Link
              href="/shop?category=Audio"
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-[#2F6BFF]/20 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              🎧 Audio Gear
            </Link>
            <Link
              href="/shop?category=Chargers"
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-[#2F6BFF]/20 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              ⚡ GaN Chargers
            </Link>
            <Link
              href="/shop?category=Gaming"
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-[#2F6BFF]/20 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              🎮 Gaming Gear
            </Link>
            <Link
              href="/shop?category=Accessories"
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-[#2F6BFF]/20 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              🖥️ Desk Setup
            </Link>
          </motion.div>
        </section>

        {/* Right Column: Apple-Style Flagship Showcase */}
        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-[460px] lg:max-w-none">
            {/* Ambient halo glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2F6BFF]/30 via-cyan-400/20 to-indigo-500/20 rounded-3xl blur-2xl -z-10 transform scale-105" />

            {/* Main Showcase Glass Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#12264D]/95 to-[#0B1B3A]/95 p-6 shadow-2xl backdrop-blur-xl">
              {/* Featured Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] bg-[#2F6BFF]/20 border border-[#2F6BFF]/30 px-3 py-1 rounded-full">
                  Flagship Spotlight
                </span>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Stock & Ready
                </span>
              </div>

              {/* Main Product Hero Visual */}
              <Link 
                href="/shop/product/6/Noise-Cancelling-Earbuds"
                className="group block relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4 p-4 hover:border-[#2F6BFF]/60 transition-all"
              >
                <Image
                  src="/images/electronics/earbuds.jpg"
                  alt="Flagship Noise-Cancelling Earbuds"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-semibold text-[#38BDF8] inline-flex items-center gap-1">
                    View Specs & Price <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

              {/* Product Info Bar */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    Noise-Cancelling Earbuds
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bluetooth 5.3 · Active Noise Suppression · 40h Battery
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-white">
                    $79.99
                  </span>
                  <p className="text-[10px] text-emerald-400 font-semibold">Free Express Ship</p>
                </div>
              </div>

              {/* Secondary Duo Row: Keyboard & GaN Charger */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/shop/product/18/Mechanical-Gaming-Keyboard"
                  className="group flex items-center space-x-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#2F6BFF]/40 transition-all"
                >
                  <div className="relative w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 p-1">
                    <Image
                      src="/images/electronics/mechanical-gaming-keyboard.svg"
                      alt="Mechanical Keyboard"
                      fill
                      unoptimized
                      className="object-contain p-1 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">Mechanical Keyboard</p>
                    <p className="text-xs font-bold text-[#38BDF8]">$69.99</p>
                  </div>
                </Link>

                <Link
                  href="/shop/product/15/65W-GaN-Wall-Charger"
                  className="group flex items-center space-x-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#2F6BFF]/40 transition-all"
                >
                  <div className="relative w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 p-1">
                    <Image
                      src="/images/electronics/gan-charger.svg"
                      alt="65W GaN Charger"
                      fill
                      unoptimized
                      className="object-contain p-1 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">65W GaN Charger</p>
                    <p className="text-xs font-bold text-[#38BDF8]">$38.00</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </header>
  );
};

export default Header;
