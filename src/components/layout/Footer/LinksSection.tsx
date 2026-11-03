import React from "react";
import Link from "next/link";

interface LinksSectionProps {
  supportEmail?: string;
}

const LinksSection = ({ supportEmail }: LinksSectionProps) => {
  return (
    <>
      {/* Category Links */}
      <section className="flex flex-col mt-5">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-5">
          Categories
        </h3>
        <div className="flex flex-col space-y-3">
          <Link
            href="/shop?category=Audio"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Audio & Headsets
          </Link>
          <Link
            href="/shop?category=Chargers"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            GaN & Fast Chargers
          </Link>
          <Link
            href="/shop?category=Accessories"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Tech Accessories
          </Link>
          <Link
            href="/shop?category=Gaming"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Gaming Peripherals
          </Link>
          <Link
            href="/shop?category=Mobile%20Accessories"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Mobile Accessories
          </Link>
          <Link
            href="/shop"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors font-medium"
          >
            All Products &rarr;
          </Link>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="flex flex-col mt-5">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-5">
          Navigation
        </h3>
        <div className="flex flex-col space-y-3">
          <Link
            href="/"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Shop Catalog
          </Link>
          <Link
            href="/cart"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Shopping Cart
          </Link>
          <Link
            href="/#categories"
            className="text-slate-400 hover:text-[#2F6BFF] text-sm transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </section>

      {/* Customer Support */}
      <section className="flex flex-col mt-5">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-5">
          Customer Support
        </h3>
        <div className="flex flex-col space-y-3">
          {supportEmail ? (
            <a
              href={`mailto:${supportEmail}`}
              className="text-[#2F6BFF] hover:underline text-sm font-medium transition-colors break-all"
            >
              {supportEmail}
            </a>
          ) : (
            <span className="text-slate-400 text-sm">
              Live AI Assistant (24/7)
            </span>
          )}
          <span className="text-slate-400 text-sm">Fast Dispatch & Delivery</span>
          <span className="text-slate-400 text-sm">Safe & Secure Checkout</span>
          <span className="text-slate-400 text-sm">Hassle-free Tech Returns</span>
        </div>
      </section>

      {/* Policies */}
      <section className="flex flex-col mt-5">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-5">
          Store Info
        </h3>
        <div className="flex flex-col space-y-3">
          <span className="text-slate-400 text-sm">About ShopCo Tech</span>
          <span className="text-slate-400 text-sm">Terms & Conditions</span>
          <span className="text-slate-400 text-sm">Privacy Policy</span>
          <span className="text-slate-400 text-sm">Sample Learning Project</span>
        </div>
      </section>
    </>
  );
};

export default LinksSection;
