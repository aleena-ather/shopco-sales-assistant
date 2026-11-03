"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import InputGroup from "@/components/ui/input-group";
import { Search, X, Loader2, ArrowRight } from "lucide-react";

interface SuggestionProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  srcUrl: string;
  stockStatus: string;
}

export default function NavbarSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQ = searchParams?.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(currentQ);
  const [suggestions, setSuggestions] = useState<SuggestionProduct[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(currentQ);
  }, [currentQ]);

  // Click outside listener to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Live suggestions fetch with debounce
  useEffect(() => {
    const trimmed = searchTerm.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setTotalCount(0);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const json = await res.json();
          setSuggestions(json.suggestions || []);
          setTotalCount(json.count || 0);
          setIsOpen(true);
        }
      } catch (e) {
        console.error("Failed to fetch suggestions:", e);
      } finally {
        setIsLoading(false);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const trimmed = searchTerm.trim();
    if (trimmed) {
      router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/shop");
    }
  };

  const handleSelectSuggestion = (title: string) => {
    setIsOpen(false);
    router.push(`/shop?q=${encodeURIComponent(title)}`);
  };

  return (
    <div
      ref={containerRef}
      className="relative hidden md:flex flex-1 max-w-[500px] mr-3 lg:mr-8"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <InputGroup className="bg-white/10 border border-white/15 focus-within:border-[#2F6BFF] focus-within:bg-[#102550] transition-all rounded-full overflow-hidden">
          <InputGroup.Text>
            <button
              type="submit"
              aria-label="Submit search"
              className="focus:outline-none flex items-center justify-center"
            >
              <Image
                priority
                src="/icons/search.svg"
                height={20}
                width={20}
                alt="search"
                className="min-w-5 min-h-5 invert opacity-70 hover:opacity-100 transition-opacity"
              />
            </button>
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="q"
            value={searchTerm}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audio, chargers, accessories..."
            className="bg-transparent text-white placeholder:text-slate-300 focus:outline-none text-sm"
            autoComplete="off"
          />
          {isLoading && (
            <div className="pr-3 flex items-center text-slate-300">
              <Loader2 className="w-4 h-4 animate-spin text-[#2F6BFF]" />
            </div>
          )}
          {!isLoading && searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSuggestions([]);
                setIsOpen(false);
              }}
              className="pr-3 text-slate-300 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </InputGroup>
      </form>

      {/* Live Search Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Suggested Products
            </span>
            <span className="text-xs font-medium text-[#2F6BFF] bg-blue-50 px-2 py-0.5 rounded-full">
              {totalCount} {totalCount === 1 ? "match" : "matches"}
            </span>
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {suggestions.map((item) => {
              const inStock = item.stockStatus?.toLowerCase() === "in stock";
              const isSvg = item.srcUrl?.endsWith(".svg");

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item.title)}
                  className="flex items-center gap-3.5 p-3 hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 flex items-center justify-center">
                    {item.srcUrl ? (
                      <Image
                        src={item.srcUrl}
                        alt={item.title}
                        width={48}
                        height={48}
                        unoptimized={Boolean(isSvg)}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <Search className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                          inStock
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {item.stockStatus}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-[#2F6BFF] transition-colors">
                      {item.title}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-slate-900">
                      ${item.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2.5 bg-slate-50 border-t border-slate-100">
            <Link
              href={`/shop?q=${encodeURIComponent(searchTerm.trim())}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs font-semibold text-[#2F6BFF] hover:bg-blue-50/70 rounded-xl transition-colors"
            >
              <span>View all {totalCount} results for &ldquo;{searchTerm}&rdquo;</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
