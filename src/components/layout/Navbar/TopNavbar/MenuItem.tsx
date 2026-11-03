import * as React from "react";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  label: string;
  url?: string;
};

export function MenuItem({ label, url }: MenuItemProps) {
  return (
    <NavigationMenuItem>
      <Link href={url ?? "/"} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn([
            "group inline-flex h-9 w-max items-center justify-center px-3.5 py-2 text-sm font-medium transition-colors text-white hover:text-white bg-transparent hover:bg-white/10 rounded-md relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#2F6BFF] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          ])}
        >
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
