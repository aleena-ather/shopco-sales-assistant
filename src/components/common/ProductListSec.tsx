import React from "react";
import * as motion from "framer-motion/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProductListSecProps = {
  title: string;
  data: Product[];
  viewAllLink?: string;
  variant?: "dark" | "light";
};

const ProductListSec = ({
  title,
  data,
  viewAllLink,
  variant = "dark",
}: ProductListSecProps) => {
  const isDark = variant === "dark";

  return (
    <section className="max-w-frame mx-auto text-center px-4 xl:px-0">
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-10"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[#38BDF8] bg-[#2F6BFF]/15 px-3.5 py-1 rounded-full mb-3 inline-block border border-[#2F6BFF]/30">
          Live Inventory
        </span>
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold tracking-normal ${
            isDark ? "text-white" : "text-[#0B1B3A]"
          }`}
        >
          {title}
        </h2>
        <p className="text-[#94A3B8] text-xs sm:text-sm mt-2 max-w-md mx-auto font-normal">
          Everyday tech accessories and gadgets with real-time stock availability.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mb-8 md:mb-10"
        >
          <CarouselContent className="space-x-4 sm:space-x-5 py-2">
            {data.map((product) => (
              <CarouselItem
                key={product.id}
                className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[295px] pl-0"
              >
                <ProductCard data={product} variant={variant} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {viewAllLink && (
          <div className="w-full text-center">
            <Link
              href={viewAllLink}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full transition-all duration-300 font-medium text-sm sm:text-base shadow-sm hover:shadow-md ${
                isDark
                  ? "bg-[#12264D] border border-[#2F6BFF]/40 text-white hover:bg-[#2F6BFF] hover:border-[#2F6BFF]"
                  : "border-2 border-[#2F6BFF] text-[#2F6BFF] hover:bg-[#2F6BFF] hover:text-white"
              }`}
            >
              <span>View all products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ProductListSec;
