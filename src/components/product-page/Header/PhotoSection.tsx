"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState } from "react";
import CategoryPlaceholderTile from "@/components/common/CategoryPlaceholderTile";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl || "");

  if (data.isPlaceholder || !selected) {
    return (
      <div className="flex items-center justify-center bg-[#F3F5F9] rounded-2xl w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0 border border-slate-200">
        <CategoryPlaceholderTile
          category={data.category}
          className="rounded-2xl w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
      {data?.gallery && data.gallery.length > 1 && (
        <div className="flex lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3.5 w-full lg:w-fit items-center lg:justify-start justify-center">
          {data.gallery.map((photo, index) => (
            <button
              key={index}
              type="button"
              className={`bg-[#F3F5F9] rounded-xl xl:rounded-2xl w-full max-w-[111px] xl:max-w-[152px] max-h-[106px] xl:max-h-[167px] xl:min-h-[167px] aspect-square overflow-hidden border-2 transition-all ${
                selected === photo ? "border-[#2F6BFF]" : "border-transparent"
              }`}
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo}
                width={152}
                height={167}
                className="rounded-md w-full h-full object-cover hover:scale-105 transition-all duration-300"
                alt={data.title}
              />
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center bg-[#F3F5F9] rounded-2xl w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0 border border-slate-200/80">
        <Image
          src={selected}
          width={444}
          height={530}
          className="rounded-xl w-full h-full object-cover hover:scale-105 transition-all duration-500"
          alt={data.title}
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

export default PhotoSection;
