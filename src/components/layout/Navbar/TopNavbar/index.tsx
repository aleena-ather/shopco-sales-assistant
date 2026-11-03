import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import AiChatTriggerBtn from "@/components/chat/AiChatTriggerBtn";
import NavbarSearch from "./NavbarSearch";
import { getLiveProducts, getCategoriesWithCounts } from "@/lib/products";

const TopNavbar = async () => {
  const { allProducts } = await getLiveProducts();
  const dynamicCategories = getCategoriesWithCounts(allProducts);

  const categoriesChildren = dynamicCategories.map((cat, idx) => ({
    id: 10 + idx,
    label: `${cat.name} (${cat.count})`,
    url: `/shop?category=${encodeURIComponent(cat.name)}`,
    description: `Explore our selection of ${cat.name.toLowerCase()} products and accessories`,
  }));

  categoriesChildren.push({
    id: 99,
    label: "All Electronics",
    url: "/shop",
    description: "Explore our complete electronics and components catalog",
  });

  const directCategoryItems = dynamicCategories.slice(0, 3).map((cat, idx) => ({
    id: 2 + idx,
    type: "MenuItem" as const,
    label: cat.name,
    url: `/shop?category=${encodeURIComponent(cat.name)}`,
    children: [],
  }));

  const data: NavMenu = [
    {
      id: 1,
      label: "Categories",
      type: "MenuList",
      children: categoriesChildren,
    },
    ...directCategoryItems,
  ];

  return (
    <nav className="sticky top-0 bg-[#0B1B3A] z-20 shadow-md border-b border-white/10 text-white">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-3.5 md:py-4 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-3">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[28px] mb-0.5 mr-3 lg:mr-8 flex items-center gap-2 text-white hover:opacity-95 transition-opacity",
            ])}
          >
            <span>SHOP.CO</span>
            <span className="text-[10px] tracking-widest font-sans font-extrabold uppercase bg-[#2F6BFF] text-white px-2 py-0.5 rounded-md shadow-sm">
              TECH
            </span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList className="space-x-1">
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <NavbarSearch />

        <div className="flex items-center ml-auto">
          <AiChatTriggerBtn />
          {/* Mobile search icon points to /shop */}
          <Link
            href="/shop"
            className="block md:hidden mr-3 p-1.5 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Search Shop"
          >
            <Image
              priority
              src="/icons/search-black.svg"
              height={100}
              width={100}
              alt="search"
              className="max-w-[20px] max-h-[20px] invert"
            />
          </Link>
          <CartBtn />
          <Link
            href="/shop"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors hidden sm:block"
            aria-label="Account / Catalog"
          >
            <Image
              priority
              src="/icons/user.svg"
              height={100}
              width={100}
              alt="user"
              className="max-w-[20px] max-h-[20px] invert"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
