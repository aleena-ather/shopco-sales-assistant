import React from "react";

const techBrands = [
  { name: "SONY", tag: "AUDIO" },
  { name: "APPLE", tag: "ECOSYSTEM" },
  { name: "LOGITECH", tag: "ACCESSORIES" },
  { name: "ANKER", tag: "CHARGERS" },
  { name: "RAZER", tag: "GAMING" },
  { name: "JBL", tag: "SPEAKERS" },
  { name: "SAMSUNG", tag: "DEVICES" },
];

const Brands = () => {
  return (
    <div className="bg-[#070D1E] border-y border-blue-950/80 py-6 sm:py-8 overflow-hidden">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <p className="text-center text-[11px] font-semibold tracking-widest text-blue-300/50 uppercase mb-5">
          Compatible & Certified With Industry Leaders
        </p>
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 sm:gap-8">
          {techBrands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center space-x-1.5 opacity-65 hover:opacity-100 transition-opacity duration-300 group cursor-default"
            >
              <span className="font-extrabold tracking-widest text-lg sm:text-2xl text-slate-200 group-hover:text-cyan-400 transition-colors font-mono">
                {brand.name}
              </span>
              <span className="text-[9px] font-bold text-blue-400 bg-blue-950/80 border border-blue-800/40 px-1.5 py-0.5 rounded uppercase">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
