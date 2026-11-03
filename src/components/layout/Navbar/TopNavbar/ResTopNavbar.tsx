import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <button
          type="button"
          aria-label="Open mobile navigation menu"
          className="p-1 hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
        >
          <Image
            priority
            src="/icons/menu.svg"
            height={100}
            width={100}
            alt="menu"
            className="max-w-[22px] max-h-[22px] invert"
          />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto bg-white border-r border-slate-200">
        <SheetHeader className="mb-8 border-b border-slate-100 pb-4">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className={cn([integralCF.className, "text-2xl flex items-center gap-2 text-[#0B1B3A]"])}>
                <span>SHOP.CO</span>
                <span className="text-[10px] tracking-widest font-sans font-extrabold bg-[#2F6BFF] text-white px-2 py-0.5 rounded">
                  TECH
                </span>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start w-full">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "MenuItem" && (
                <SheetClose asChild>
                  <Link
                    href={item.url ?? "/"}
                    className="mb-4 text-slate-800 hover:text-[#2F6BFF] font-medium text-base transition-colors"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === "MenuList" && (
                <div className="mb-4 w-full">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger className="text-left p-0 py-1 font-semibold text-base text-slate-900 hover:text-[#2F6BFF]">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="p-3 pl-4 pb-0 border-l-2 border-[#2F6BFF]/30 flex flex-col space-y-2 mt-2">
                        {item.children.map((itemChild) => (
                          <SheetClose
                            key={itemChild.id}
                            asChild
                            className="w-fit py-1.5 text-sm text-slate-600 hover:text-[#2F6BFF] transition-colors"
                          >
                            <Link href={itemChild.url ?? "/"}>
                              {itemChild.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
