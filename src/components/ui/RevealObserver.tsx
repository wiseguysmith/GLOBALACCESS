"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Progressive, one-time entrance animations for elements marked [data-reveal].
 *
 * Content is fully visible without JavaScript. Once this runs, elements
 * already on screen are marked visible immediately (no flash), and the rest
 * animate in as they enter the viewport. Disabled for reduced-motion users.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    const viewportHeight = window.innerHeight;
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) el.setAttribute("data-visible", "");
      else observer.observe(el);
    }
    document.documentElement.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
