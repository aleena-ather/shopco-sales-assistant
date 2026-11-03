import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-[#0B1B3A] text-white text-center py-2 px-2 sm:px-4 xl:px-0 border-b border-white/10">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          ⚡ Gadgets and accessories in one place &bull;{" "}
          <Link
            href="/shop"
            className="underline font-semibold text-white hover:text-[#2F6BFF] transition-colors ml-1"
          >
            Explore Tech Gear
          </Link>
        </p>
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex text-slate-300 hover:text-white"
          size="icon"
          type="button"
          aria-label="close banner"
        >
          <Image
            priority
            src="/icons/times.svg"
            height={13}
            width={13}
            alt="close banner"
            className="invert opacity-70 hover:opacity-100 transition-opacity"
          />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
