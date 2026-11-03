"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { Sparkles, ArrowRight, MessageSquare, Bot } from "lucide-react";

const AiAssistantBanner = () => {
  const handleOpenChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-gemini-chat"));
    }
  };

  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0">
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12264D] via-[#10254D] to-[#0E1E3C] border border-[#2F6BFF]/30 p-8 sm:p-12 shadow-2xl"
      >
        {/* Ambient glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2F6BFF]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-[#2F6BFF]/20 border border-[#2F6BFF]/40 px-3.5 py-1.5 rounded-full mb-4">
            <Bot className="w-4 h-4 text-[#38BDF8]" />
            <span>Intelligent Store Assistance</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Find the right gear in seconds with our AI Assistant
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Need an alternative to an out-of-stock item, looking for products under $40, or comparing chargers? Our conversational assistant checks live inventory in real time.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleOpenChat}
              className="inline-flex items-center space-x-2.5 bg-[#2F6BFF] hover:bg-[#1E58E8] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-[#2F6BFF]/30 hover:shadow-[#2F6BFF]/50 transition-all text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Chat with Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400">
              Live stock checks · Instant answers · No guessing
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AiAssistantBanner;

