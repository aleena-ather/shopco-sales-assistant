"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { ArrowUpRight, Zap, Headphones, Gamepad2, Layers } from "lucide-react";

const BentoShowcase = () => {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0">
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-14"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8] bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 px-3.5 py-1 rounded-full mb-3 inline-block">
          Curated Hardware
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Engineered for performance
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base mt-3 max-w-xl mx-auto font-normal">
          Explore our signature categories built for modern desk setups, mobile creators, and competitive gaming.
        </p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Bento 1: Large Featured Card (Audio) - 8 cols */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12264D] to-[#0B1B3A] border border-white/10 hover:border-[#2F6BFF]/60 shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[360px] sm:min-h-[420px]"
        >
          <div className="p-7 sm:p-9 z-10 max-w-md">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-[#2F6BFF]/20 px-3 py-1 rounded-full mb-4">
              <Headphones className="w-3.5 h-3.5" />
              <span>Acoustic Excellence</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Studio Sound & Noise-Cancelling
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Precision-tuned dynamic drivers, active noise suppression, and ultra-low latency wireless soundscapes.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/shop?category=Audio"
                className="inline-flex items-center space-x-2 bg-[#2F6BFF] hover:bg-[#1E58E8] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-md shadow-blue-500/20"
              >
                <span>Shop Audio Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-slate-400 font-medium">From $19.99</span>
            </div>
          </div>

          {/* Background / Floating Hardware Graphic */}
          <div className="absolute right-0 bottom-0 w-3/5 sm:w-1/2 h-full opacity-40 sm:opacity-90 pointer-events-none group-hover:scale-105 transition-transform duration-700">
            <Image
              src="/images/electronics/cat-audio.jpg"
              alt="Studio Audio"
              fill
              className="object-contain object-bottom-right p-4"
            />
          </div>
        </motion.div>

        {/* Bento 2: Fast GaN Charging - 4 cols */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-4 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12264D] to-[#0B1B3A] border border-white/10 hover:border-[#2F6BFF]/60 shadow-xl transition-all duration-300 flex flex-col justify-between p-7 sm:p-8 min-h-[360px] sm:min-h-[420px]"
        >
          <div className="z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Next-Gen GaN</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              High-Speed Charging
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              65W GaN wall chargers & magnetic wireless pads for phones and laptops.
            </p>
            <Link
              href="/shop?category=Chargers"
              className="inline-flex items-center space-x-1.5 text-[#38BDF8] hover:text-white text-sm font-semibold transition-colors"
            >
              <span>Explore Chargers</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative w-full h-44 sm:h-48 mt-4 group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/electronics/gan-charger.jpg"
              alt="GaN Fast Chargers"
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        {/* Bento 3: Gaming Rig - 4 cols */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="lg:col-span-4 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12264D] to-[#0B1B3A] border border-white/10 hover:border-[#2F6BFF]/60 shadow-xl transition-all duration-300 flex flex-col justify-between p-7 sm:p-8 min-h-[360px] sm:min-h-[400px]"
        >
          <div className="z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full mb-4">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Zero-Latency</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Competitive Gaming
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Mechanical switches, high-DPI optical mice, and game controllers.
            </p>
            <Link
              href="/shop?category=Gaming"
              className="inline-flex items-center space-x-1.5 text-[#38BDF8] hover:text-white text-sm font-semibold transition-colors"
            >
              <span>Explore Gaming</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative w-full h-44 sm:h-48 mt-4 group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/electronics/cat-gaming.jpg"
              alt="Gaming Rig"
              fill
              className="object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        {/* Bento 4: Desk Setup & Accessories - 8 cols */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#12264D] to-[#0B1B3A] border border-white/10 hover:border-[#2F6BFF]/60 shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[360px] sm:min-h-[400px]"
        >
          <div className="p-7 sm:p-9 z-10 max-w-md">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Workstation Architecture</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Ergonomic Desk Essentials
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Aircraft aluminum laptop stands, 7-in-1 multiport hubs, and extended micro-weave desk pads.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/shop?category=Accessories"
                className="inline-flex items-center space-x-2 bg-[#2F6BFF] hover:bg-[#1E58E8] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-md shadow-blue-500/20"
              >
                <span>Shop Accessories</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-slate-400 font-medium">From $12.99</span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-3/5 sm:w-1/2 h-full opacity-40 sm:opacity-90 pointer-events-none group-hover:scale-105 transition-transform duration-700">
            <Image
              src="/images/electronics/laptop-stand.jpg"
              alt="Ergonomic Laptop Stand"
              fill
              className="object-contain object-bottom-right p-4"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BentoShowcase;

