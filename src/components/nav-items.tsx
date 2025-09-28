"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function NavItems() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={cn("hover:text-yellow-500 transition-colors", {
              "text-gray-100": isActive(item.href),
            })}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
