import React from "react";
import * as motion from "framer-motion/client";
import Link from "next/link";
import { ArrowUpRight, Headphones, Zap, Gamepad2, Smartphone, Mouse, Layers } from "lucide-react";

export type CategoryWithCount = {
  name: string;
  count: number;
  slug: string;
};

function getCategoryIconAndColor(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("audio") || lower.includes("sound") || lower.includes("headset") || lower.includes("earbud")) {
    return {
      icon: <Headphones className="w-6 h-6 text-[#38BDF8]" />,
      desc: "Headsets, earbuds & audio gear",
    };
  }
  if (lower.includes("charger") || lower.includes("power") || lower.includes("cable")) {
    return {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      desc: "GaN adapters, docks & cables",
    };
  }
  if (lower.includes("gaming")) {
    return {
      icon: <Gamepad2 className="w-6 h-6 text-indigo-400" />,
      desc: "Controllers, mice & gaming setups",
    };
  }
  if (lower.includes("mobile") || lower.includes("phone")) {
    return {
      icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
      desc: "Mounts, cases & phone accessories",
    };
  }
  if (lower.includes("mouse") || lower.includes("keyboard")) {
    return {
      icon: <Mouse className="w-6 h-6 text-[#2F6BFF]" />,
      desc: "Precision input & desk peripherals",
    };
  }
  return {
    icon: <Layers className="w-6 h-6 text-slate-400" />,
    desc: "Everyday tech essentials",
  };
}

const DressStyle = ({ categories }: { categories?: CategoryWithCount[] }) => {
  const topCategories =
    categories && categories.length > 0
      ? categories.slice(0, 6)
      : [
          { name: "Audio", count: 8, slug: "/shop?category=Audio" },
          { name: "Accessories", count: 6, slug: "/shop?category=Accessories" },
          { name: "Chargers", count: 5, slug: "/shop?category=Chargers" },
          { name: "Gaming", count: 4, slug: "/shop?category=Gaming" },
          { name: "Mobile Accessories", count: 2, slug: "/shop?category=Mobile%20Accessories" },
        ];

  return (
    <div id="categories" className="px-4 xl:px-0 scroll-mt-24">
      <section className="max-w-frame mx-auto bg-[#12264D] border border-white/10 px-6 sm:px-10 pb-10 pt-12 md:p-14 rounded-3xl text-center shadow-xl">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8] bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 px-3.5 py-1 rounded-full mb-3 inline-block">
            Categories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-normal">
            Browse by category
          </h2>
          <p className="text-[#94A3B8] text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal">
            Select a category to discover curated audio, fast charging, and electronic components.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-left">
          {topCategories.map((cat, idx) => {
            const meta = getCategoryIconAndColor(cat.name);

            return (
              <motion.div
                key={cat.name}
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * idx, duration: 0.4 }}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group relative block p-6 bg-[#0B1B3A] rounded-2xl border border-white/10 hover:border-[#2F6BFF]/50 shadow-md hover:shadow-2xl hover:shadow-[#0B1B3A]/40 card-lift transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#12264D] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {meta.icon}
                    </div>
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#2F6BFF] group-hover:text-white flex items-center justify-center text-slate-300 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#2F6BFF] transition-colors mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-1 mb-3">
                      {meta.desc}
                    </p>
                    <span className="inline-block text-xs font-medium text-[#38BDF8] bg-[#2F6BFF]/15 border border-[#2F6BFF]/30 px-2.5 py-1 rounded-md">
                      {cat.count} {cat.count === 1 ? "Product" : "Products"} Available
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DressStyle;
