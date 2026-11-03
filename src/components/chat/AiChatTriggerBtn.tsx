"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function AiChatTriggerBtn() {
  const triggerOpen = () => {
    window.dispatchEvent(new CustomEvent("open-gemini-chat"));
  };

  return (
    <button
      onClick={triggerOpen}
      className="hidden md:flex items-center space-x-1.5 bg-[#2F6BFF]/20 hover:bg-[#2F6BFF]/30 text-white border border-[#2F6BFF]/50 px-3.5 py-1.5 rounded-full text-xs font-semibold mr-3 transition-all transform hover:scale-105 shadow-sm"
      title="Ask ShopCo AI Assistant"
      type="button"
    >
      <Sparkles className="w-3.5 h-3.5 text-[#2F6BFF] animate-pulse" />
      <span>AI Assistant</span>
    </button>
  );
}
