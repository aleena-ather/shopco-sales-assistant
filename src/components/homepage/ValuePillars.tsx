import React from "react";
import { Zap, Database, CheckCircle2, Sparkles } from "lucide-react";

const ValuePillars = () => {
  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 p-5 sm:p-6 bg-[#12264D]/90 border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Desk & Audio Tech</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">GaN power, audio & gaming</p>
          </div>
        </div>

        <div className="flex items-center space-x-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Live Inventory</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">25 verified store products</p>
          </div>
        </div>

        <div className="flex items-center space-x-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Real-Time Stock</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">Check availability instantly</p>
          </div>
        </div>

        <div className="flex items-center space-x-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">24/7 AI Tech Assistant</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">Instant recommendations & stock</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;

