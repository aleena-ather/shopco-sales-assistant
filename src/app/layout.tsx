import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import GeminiChatWidget from "@/components/chat/GeminiChatWidget";

export const metadata: Metadata = {
  title: "ShopCo Electronics | Premium Tech, Audio & Gadgets Store",
  description:
    "ShopCo Electronics - Premium tech accessories, high-performance audio, fast GaN chargers, and gaming gear engineered for reliability.",
};

export const viewport: Viewport = {
  themeColor: "#0B1B3A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${satoshi.className} overflow-x-hidden w-full max-w-full min-h-screen bg-[#0B1B3A]`}>
        <HolyLoader color="#2F6BFF" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
          <GeminiChatWidget />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
