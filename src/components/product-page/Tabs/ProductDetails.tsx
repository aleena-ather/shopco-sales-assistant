import React from "react";
import { Product } from "@/types/product.types";

export type SpecItem = {
  label: string;
  value: string;
};

function getSpecsForProduct(product?: Product): SpecItem[] {
  const cat = (product?.category || "").toLowerCase();
  const title = (product?.title || "").toLowerCase();

  const baseWarranty: SpecItem = {
    label: "Warranty & Guarantee",
    value: "1-Year Full Manufacturer Warranty with 30-day money-back guarantee",
  };
  const baseQA: SpecItem = {
    label: "Quality Assurance",
    value: "Factory tested & certified for electronic reliability and safety standards",
  };

  if (cat.includes("audio") || title.includes("speaker") || title.includes("headset") || title.includes("earbud") || title.includes("mic")) {
    return [
      {
        label: "Audio Engineering",
        value: "Precision-tuned acoustic drivers with balanced mids, clear highs, and deep bass",
      },
      {
        label: "Connectivity",
        value: title.includes("wired") ? "Low-latency 3.5mm gold-plated cable" : "High-speed Bluetooth wireless / USB-C audio",
      },
      {
        label: "Compatibility",
        value: "Universal: iOS, Android, PC, macOS, PlayStation and Xbox",
      },
      baseWarranty,
      baseQA,
    ];
  }

  if (cat.includes("charger") || title.includes("charger") || title.includes("power bank")) {
    return [
      {
        label: "Power & Efficiency",
        value: "GaN fast-charge architecture with dynamic Power Delivery (PD) protocols",
      },
      {
        label: "Circuit Protection",
        value: "MultiProtect: surge suppression, over-voltage, and dynamic temperature control",
      },
      {
        label: "Compatibility",
        value: "Universal: Laptops, smartphones, tablets, handheld consoles, and smartwatches",
      },
      baseWarranty,
      baseQA,
    ];
  }

  if (cat.includes("gaming") || title.includes("keyboard") || title.includes("controller")) {
    return [
      {
        label: "Response & Latency",
        value: "Ultra-low response time engineered for competitive and precision gaming",
      },
      {
        label: "Key & Switch Durability",
        value: "Rated for 50M+ actuations with tactile feedback and anti-ghosting",
      },
      {
        label: "Platform Compatibility",
        value: "Windows PC, macOS, Linux, Steam Deck, Xbox and PlayStation",
      },
      baseWarranty,
      baseQA,
    ];
  }

  if (cat.includes("mobile") || title.includes("phone")) {
    return [
      {
        label: "Device Compatibility",
        value: "Universal fit for iPhone, Samsung Galaxy, Google Pixel, and standard smartphones",
      },
      {
        label: "Materials & Finish",
        value: "Shock-absorbing silicone, reinforced grip points, and scratch-resistant coating",
      },
      {
        label: "Usability",
        value: "Tool-free instant setup designed for daily commute, travel, and desk use",
      },
      baseWarranty,
      baseQA,
    ];
  }

  // Accessories & Desk Gear
  return [
    {
      label: "Ergonomics & Design",
      value: "Contoured profile designed to optimize desk ergonomics and reduce physical fatigue",
    },
    {
      label: "Build & Materials",
      value: "Premium aircraft-grade anodized aluminum and reinforced anti-slip base",
    },
    {
      label: "Compatibility",
      value: "Universal plug-and-play support for all modern desktop and laptop workstations",
    },
    baseWarranty,
    baseQA,
  ];
}

const ProductDetails = ({ data }: { data?: Product }) => {
  const specs = getSpecsForProduct(data);

  return (
    <>
      {specs.map((item, i) => (
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-black/5" key={i}>
          <div>
            <p className="text-sm py-3 sm:py-4 pr-2 text-slate-500 font-medium">
              {item.label}
            </p>
          </div>
          <div className="sm:col-span-2 py-3 sm:py-4">
            <p className="text-sm text-slate-800 font-semibold leading-relaxed">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
