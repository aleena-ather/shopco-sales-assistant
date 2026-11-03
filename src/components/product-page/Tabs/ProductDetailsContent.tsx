import React from "react";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types/product.types";

const ProductDetailsContent = ({ data }: { data?: Product }) => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Product specifications
      </h3>
      <ProductDetails data={data} />
    </section>
  );
};

export default ProductDetailsContent;
