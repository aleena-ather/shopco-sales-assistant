import React from "react";
import {
  Headphones,
  Zap,
  Gamepad2,
  Smartphone,
  Cpu,
  Speaker,
  Mouse,
  Layers,
} from "lucide-react";

interface CategoryPlaceholderTileProps {
  category?: string;
  className?: string;
}

export function getCategoryIcon(category = ""): React.ReactElement {
  const c = category.toLowerCase();
  if (c.includes("audio") || c.includes("headset") || c.includes("headphone")) {
    return <Headphones className="w-8 h-8" />;
  }
  if (c.includes("charger") || c.includes("power") || c.includes("cable")) {
    return <Zap className="w-8 h-8" />;
  }
  if (c.includes("gaming")) {
    return <Gamepad2 className="w-8 h-8" />;
  }
  if (c.includes("mobile") || c.includes("phone")) {
    return <Smartphone className="w-8 h-8" />;
  }
  if (c.includes("speaker") || c.includes("sound")) {
    return <Speaker className="w-8 h-8" />;
  }
  if (c.includes("mouse") || c.includes("keyboard")) {
    return <Mouse className="w-8 h-8" />;
  }
  return <Cpu className="w-8 h-8" />;
}

export default function CategoryPlaceholderTile({
  category = "Electronics",
  className = "",
}: CategoryPlaceholderTileProps) {
  const icon = getCategoryIcon(category);

  return (
    <div
      className={`relative w-full h-full aspect-square flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F8FAFC] via-[#EDF2F7] to-[#E2E8F0] rounded-xl border border-slate-200/80 text-center select-none overflow-hidden ${className}`}
    >
      {/* Subtle tech background circuit lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0B1B3A_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Centered Icon Container */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm border border-blue-100 flex items-center justify-center text-[#2F6BFF] mb-3 group-hover:scale-105 group-hover:border-[#2F6BFF]/40 group-hover:shadow-md transition-all duration-300">
        {icon}
      </div>

      {/* Category Name */}
      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B1B3A] line-clamp-1 px-2">
        {category}
      </span>
    </div>
  );
}

