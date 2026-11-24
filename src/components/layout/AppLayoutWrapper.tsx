"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import GeminiChatWidget from "@/components/chat/GeminiChatWidget";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    // Clean, dedicated standalone Admin Portal view (no customer store banner, navbar, chatbot, or footer)
    return <main className="min-h-screen bg-[#F8FAFC]">{children}</main>;
  }

  // Regular Customer Storefront
  return (
    <>
      <TopBanner />
      <TopNavbar />
      {children}
      <GeminiChatWidget />
      <Footer />
    </>
  );
}

