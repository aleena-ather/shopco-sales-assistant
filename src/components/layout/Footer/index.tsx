import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

const Footer = () => {
  const supportEmail = process.env.SUPPORT_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";

  return (
    <footer className="mt-16 bg-[#0B1B3A] text-white">
      {/* Newsletter Section */}
      <div className="relative pt-6 px-4">
        <NewsLetterSection />
      </div>

      {/* Main Footer Links & Info */}
      <div className="pt-12 md:pt-16 px-4 pb-8">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-12 gap-8">
            {/* Brand Column */}
            <div className="flex flex-col lg:col-span-3 lg:max-w-[280px] mb-8 lg:mb-0">
              <Link
                href="/"
                className={cn([
                  integralCF.className,
                  "text-2xl lg:text-[28px] mb-4 flex items-center gap-2 text-white",
                ])}
              >
                <span>SHOP.CO</span>
                <span className="text-[10px] tracking-widest font-sans font-extrabold uppercase bg-[#2F6BFF] text-white px-2 py-0.5 rounded shadow-sm">
                  TECH
                </span>
              </Link>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Your premier destination for high-fidelity audio, rapid GaN chargers, and precision tech accessories engineered for everyday performance.
              </p>
              <div className="flex items-center space-x-3">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Social Link"
                    className="bg-white/10 hover:bg-[#2F6BFF] hover:text-white text-slate-300 transition-all w-8 h-8 rounded-full border border-white/10 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-6">
              <LinksSection supportEmail={supportEmail} />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4 gap-6">
              <LinksSection supportEmail={supportEmail} />
            </div>
          </nav>

          <hr className="h-[1px] border-t-white/10 mb-8" />

          {/* Bottom Bar with Learning Store Notice */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p className="font-medium text-slate-300">
                ShopCo &copy; 2026 ShopCo Electronics Store. All Rights Reserved.
              </p>
              <span className="hidden sm:inline text-white/20">&bull;</span>
              <p className="text-slate-400 font-medium">
                Sample store built for learning. No real orders are processed.
              </p>
            </div>

            <div className="flex items-center">
              {paymentBadgesData.map((badge, _, arr) => (
                <span
                  key={badge.id}
                  className={cn([
                    arr.length !== badge.id && "mr-2.5",
                    "w-[46px] h-[30px] rounded-md border border-white/10 bg-white/10 flex items-center justify-center p-1",
                  ])}
                >
                  <Image
                    priority
                    src={badge.srcUrl}
                    width={33}
                    height={100}
                    alt="Payment method"
                    className="max-h-[16px] object-contain"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
