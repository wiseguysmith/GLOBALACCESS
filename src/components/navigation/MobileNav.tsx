"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import type { NavItem } from "@/types";
import { HeaderWordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";
import { isActivePath } from "./NavLinks";

/**
 * Accessible full-screen navigation for small and medium screens.
 * Uses the native <dialog> element for focus containment, Escape handling,
 * and an inert background.
 */
export function MobileNav({
  items,
  secondary,
  cta,
}: {
  items: NavItem[];
  secondary: NavItem[];
  cta: NavItem;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    setOpen(true);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.style.overflow = "hidden";
    else root.style.overflow = "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:border-white/50 xl:hidden"
      >
        <span>Menu</span>
        <Menu aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label="Site navigation"
        className="surface-dark fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-navy p-0 text-white backdrop:bg-abyss/80 open:flex open:flex-col"
      >
        <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-white/10">
          <Link href="/" onClick={close} aria-label="GLOBAL Access home" className="mix-blend-lighten">
            <HeaderWordmark />
          </Link>
          <button
            type="button"
            onClick={close}
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/20 px-4 text-sm font-medium transition-colors hover:border-white/50"
          >
            <span>Close</span>
            <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col py-8">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {items.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="group flex min-h-16 items-center justify-between gap-6 py-4"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="w-6 font-display text-xs tabular-nums text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[1.65rem] font-medium tracking-[-0.02em] sm:text-3xl",
                          active ? "text-gold" : "text-white",
                        )}
                      >
                        {item.label}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-gold"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-4 text-gold">Global Invitation</p>
              <ul className="space-y-1">
                {secondary.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="inline-flex min-h-11 items-center text-white/75 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:self-end">
              <Link
                href={cta.href}
                onClick={close}
                className="inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-gold px-7 font-medium text-navy sm:w-auto"
              >
                {cta.label}
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </nav>
      </dialog>
    </>
  );
}
