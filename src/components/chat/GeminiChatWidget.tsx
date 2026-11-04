"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, X, Send, RotateCcw, ArrowRight, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { getCategoryIcon } from "@/components/common/CategoryPlaceholderTile";

interface RecommendedProduct {
  id: number;
  title: string;
  category: string;
  price: string;
  stockStatus: string;
  description?: string;
  srcUrl?: string;
  link: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendedProducts?: RecommendedProduct[];
  timestamp: string;
}

const DEFAULT_WELCOME_MSG: ChatMessage = {
  id: "welcome-1",
  role: "assistant",
  content:
    "👋 Hello! Welcome to **ShopCo Electronics**.\n\nHow can I help you find the right audio gear, chargers, or desk accessories today?",
  timestamp: "Just now",
};

// Dynamic suggestion chips based on conversation and page context
function getContextChips(messages: ChatMessage[], currentPath: string): string[] {
  const context = messages
    .slice(-4)
    .map((m) => m.content.toLowerCase())
    .join(" ");

  // If on a specific product page
  if (currentPath.includes("/shop/product/")) {
    const slugParts = currentPath.split("/");
    const productName = slugParts[slugParts.length - 1]?.replace(/-/g, " ");
    return [
      `Is this in stock?`,
      `Any alternatives in the same category?`,
      `Show other in-stock tech`,
      `Show accessories in stock`,
    ];
  }

  if (
    context.includes("audio") ||
    context.includes("headset") ||
    context.includes("speaker") ||
    context.includes("earbud")
  ) {
    return [
      "What speakers are in stock?",
      "Show earbuds under $80",
      "Do you have wired headsets?",
      "What items are under $40?",
    ];
  }

  if (
    context.includes("charger") ||
    context.includes("power") ||
    context.includes("cable") ||
    context.includes("gan")
  ) {
    return [
      "Tell me about the 65W GaN charger",
      "Do you have power banks in stock?",
      "What cables do you sell?",
      "Show chargers under $35",
    ];
  }

  if (
    context.includes("gaming") ||
    context.includes("keyboard") ||
    context.includes("controller") ||
    context.includes("mouse")
  ) {
    return [
      "Tell me about the Mechanical Keyboard",
      "What gaming gear is in stock?",
      "Do you have gaming mice?",
      "Show gaming items under $50",
    ];
  }

  if (
    context.includes("under $") ||
    context.includes("budget") ||
    context.includes("price")
  ) {
    return [
      "Show items under $25",
      "What audio gear is under $40?",
      "Are chargers under $40 in stock?",
      "What in-stock items are under $30?",
    ];
  }

  return [
    "What items do you have under $40?",
    "Show in-stock audio gear",
    "Do you have 65W GaN chargers?",
    "How do I contact customer support?",
  ];
}

export default function GeminiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MSG]);
  const pathname = usePathname();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastAssistantMsgRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key closes the chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 1. Session Storage Persistence: Load saved chat history on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("shopco_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load saved chat history:", e);
    }
  }, []);

  // 2. Save conversation whenever messages change
  useEffect(() => {
    try {
      if (messages.length > 1) {
        sessionStorage.setItem("shopco_chat_history", JSON.stringify(messages));
      }
    } catch (e) {
      console.warn("Could not save chat history:", e);
    }
  }, [messages]);

  // Scroll behavior:
  // - When assistant responds: scroll to the START of the assistant's response so user sees the answer text from the top
  // - When user sends: scroll to the bottom so user question and typing indicator are visible
  useEffect(() => {
    if (!isOpen || messages.length === 0) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === "assistant" && messages.length > 1) {
      const timer = setTimeout(() => {
        lastAssistantMsgRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 60);
      return () => clearTimeout(timer);
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Listen for global open events (e.g. from hero button, AI banner, navbar)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-gemini-chat", handleOpen);
    return () => window.removeEventListener("open-gemini-chat", handleOpen);
  }, []);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          recommendedProducts: data.recommendedProducts || [],
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "Failed to get reply");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content:
            "⚠️ Sorry, I could not complete your request at this moment. Please try again shortly.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    try {
      sessionStorage.removeItem("shopco_chat_history");
    } catch {}
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "👋 Hello! Welcome to **ShopCo Electronics**.\n\nHow can I help you find the right audio gear, chargers, or desk accessories today?",
        timestamp: "Just now",
      },
    ]);
  };

  const dynamicChips = getContextChips(messages, pathname || "");

  return (
    <>
      {/* Floating Toggle Button (shown when chat is closed) */}
      <div
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 transition-all duration-200 ease-in-out font-sans ${
          isOpen
            ? "opacity-0 scale-90 pointer-events-none translate-y-3"
            : "opacity-100 scale-100 pointer-events-auto translate-y-0"
        }`}
        aria-hidden={isOpen}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 bg-[#0B1B3A] hover:bg-[#102550] text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-[#0B1B3A]/40 transition-all duration-300 transform hover:-translate-y-1 border border-[#2F6BFF]/30 cursor-pointer"
          aria-label="Open AI Assistant"
          type="button"
        >
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#2F6BFF] via-blue-400 to-indigo-500 opacity-60 blur-sm group-hover:opacity-90 animate-pulse transition-opacity"></span>
          <div className="relative flex items-center space-x-2.5">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#2F6BFF] text-white shadow-inner">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight leading-tight flex items-center gap-1.5">
                ShopCo AI Tech
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              <span className="text-[10px] text-blue-200/80 leading-tight">
                Instant Tech Advice &bull; Online
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Chat Window Panel (shown when chat is open) */}
      <div
        className={`fixed z-50 transition-all duration-200 ease-in-out origin-bottom-right font-sans ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none translate-y-3"
        } ${
          "fixed inset-2 sm:inset-auto sm:top-auto sm:left-auto sm:bottom-6 sm:right-6 flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-blue-900/15 overflow-hidden"
        } ${
          isExpanded
            ? "sm:w-[560px] sm:h-[82vh] sm:max-h-[750px] w-auto h-auto max-w-[calc(100vw-32px)]"
            : "sm:w-[440px] sm:h-[560px] sm:max-h-[calc(100vh-48px)] w-auto h-auto max-w-[calc(100vw-32px)]"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="bg-[#0B1B3A] text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#2F6BFF] text-white shadow-md shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0B1B3A] rounded-full"></span>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-white truncate">
                ShopCo AI Tech Assistant
              </h3>
              <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online &bull; Real-Time Stock
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-slate-300 shrink-0">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              title={isExpanded ? "Collapse window (580px -> 480px)" : "Expand window (480px -> 580px)"}
              className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center justify-center text-slate-300"
              type="button"
              aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={clearChat}
              title="Restart conversation"
              className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              type="button"
              aria-label="Restart chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="Close chat (Esc)"
              className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              type="button"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

          {/* Subheader Store Indicator */}
          <div className="bg-[#F3F5F9] px-4 py-2 border-b border-slate-200/80 flex items-center justify-between text-[11px] text-[#0B1B3A] shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#2F6BFF]"></span>
              Store Assistant: <strong className="font-bold">Electronics & Accessories</strong>
            </span>
            <span className="text-[10px] text-[#2F6BFF] bg-blue-100 font-semibold px-2 py-0.5 rounded-full">
              Real-Time Stock
            </span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8FAFC]">
            {messages.map((msg, idx) => {
              const isLastAssistant =
                msg.role === "assistant" && idx === messages.length - 1;
              return (
                <div
                  key={msg.id}
                  ref={isLastAssistant ? lastAssistantMsgRef : null}
                  className={`flex flex-col scroll-mt-3 ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed break-words [overflow-wrap:anywhere] ${
                    msg.role === "user"
                      ? "bg-[#2F6BFF] text-white rounded-br-none shadow-sm"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans space-y-1 break-words [overflow-wrap:anywhere]">
                    {msg.content.split("\n").map((line, idx) => {
                      if (!line.trim()) return <div key={idx} className="h-1" />;

                      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
                      const cleanedLine = isBullet ? line.trim().replace(/^[-*]\s+/, "") : line;

                      const parsedLine = cleanedLine
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(
                          /\[(.*?)\]\((.*?)\)/g,
                          '<a href="$2" class="underline font-semibold text-blue-600 hover:text-blue-800" target="_self">$1</a>'
                        );

                      if (isBullet) {
                        return (
                          <div key={idx} className="flex items-start space-x-2 pl-1">
                            <span className="text-[#2F6BFF] font-bold text-xs mt-0.5">•</span>
                            <span dangerouslySetInnerHTML={{ __html: parsedLine }} />
                          </div>
                        );
                      }

                      return (
                        <p
                          key={idx}
                          dangerouslySetInnerHTML={{ __html: parsedLine }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Structured Product Recommendation Cards */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1 flex items-center justify-between">
                      <span>Suggested products</span>
                      <span className="text-[10px] text-slate-400 font-normal">Click to view details</span>
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={p.link}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl hover:border-[#2F6BFF]/60 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center space-x-2.5 overflow-hidden">
                            <div className="w-11 h-11 rounded-lg bg-[#F3F5F9] border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                              {p.srcUrl ? (
                                <Image
                                  src={p.srcUrl}
                                  alt={p.title}
                                  width={44}
                                  height={44}
                                  unoptimized={Boolean(p.srcUrl?.endsWith(".svg"))}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="text-[#2F6BFF] scale-75">
                                  {getCategoryIcon(p.category)}
                                </div>
                              )}
                            </div>
                            <div className="text-left overflow-hidden">
                              <p className="text-xs font-bold text-slate-900 group-hover:text-[#2F6BFF] transition-colors truncate">
                                {p.title}
                              </p>
                              <p className="text-[11px] text-[#64748B] truncate">
                                {p.category} &bull; {p.description || "Electronics"}
                              </p>
                              <span className="text-[10px] text-[#2F6BFF] font-semibold flex items-center gap-0.5 mt-0.5">
                                View Product Details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0 pl-2">
                            <span className="text-xs font-bold text-[#0B1B3A] block">
                              {p.price}
                            </span>
                            <span
                              className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                                p.stockStatus.toLowerCase().includes("out")
                                  ? "bg-red-50 text-[#EF4444]"
                                  : "bg-emerald-50 text-[#10B981]"
                              }`}
                            >
                              {p.stockStatus}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Next-Step Suggestions */}
          <div className="px-3.5 py-2.5 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0 pr-6">
            {dynamicChips.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                type="button"
                className="whitespace-nowrap text-[11px] font-medium bg-[#F3F5F9] hover:bg-blue-50 hover:text-[#2F6BFF] text-slate-700 px-3 py-1.5 rounded-full transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about audio, chargers, stock, budget..."
              className="flex-1 min-w-0 bg-slate-100 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 px-4 py-2.5 rounded-full border border-transparent focus:border-[#2F6BFF] outline-none transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2F6BFF] hover:bg-[#1E58E8] text-white disabled:bg-slate-200 disabled:text-slate-400 transition-colors shrink-0 shadow-md shadow-[#2F6BFF]/20 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Branding */}
          <div className="py-1.5 bg-[#F8FAFC] border-t border-slate-100 text-center text-[10px] text-slate-400 shrink-0">
            Powered by Gemini &bull; ShopCo AI Tech Assistant
          </div>
        </div>
    </>
  );
}
