"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";
import { cn } from "@/lib/cn";

/**
 * Secondary navigation for multi-page initiatives (Global Invitation).
 * Scrolls horizontally inside its own track on narrow screens.
 */
export function SectionNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label={label}
      className="surface-dark sticky top-[var(--header-h)] z-40 border-b border-white/10 bg-navy/95 text-white backdrop-blur-md"
    >
      <div className="container-x">
        <ul className="-mx-1 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = pathname === item.href;
            const isApply = item.href.endsWith("/apply");
            return (
              <li key={item.href} className={cn("shrink-0", isApply && "ml-auto pl-4")}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-13 items-center px-3 text-sm whitespace-nowrap transition-colors",
                    isApply
                      ? "font-semibold text-gold hover:text-gold-soft"
                      : active
                        ? "text-white"
                        : "text-white/65 hover:text-white",
                  )}
                >
                  {isApply ? "Request an Invitation" : item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-0 h-0.5 bg-gold transition-transform duration-500",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
