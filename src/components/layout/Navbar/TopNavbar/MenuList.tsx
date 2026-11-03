import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuListData } from "../navbar.types";

export type MenuListProps = {
  data: MenuListData;
  label: string;
};

export function MenuList({ data, label }: MenuListProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="font-medium px-3.5 text-white bg-transparent hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#2F6BFF] after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-2xl shadow-xl border border-slate-100">
          {data.map((item) => (
            <ListItem key={item.id} title={item.label} href={item.url ?? "/"}>
              {item.description ?? ""}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50/70 hover:text-[#2F6BFF] focus:bg-blue-50 focus:text-[#2F6BFF]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold text-[#0B1B3A] leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-[#64748B] mt-1">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
