"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Motion enhances visible server-rendered content; it never gates access to it. */
export function SignatureMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};
    const setup = () => {
      stop();
      if (preference.matches) return;
      const animations = new Set<Animation>();
      const play = (element: Element, delay = 0) => {
        const animation = element.animate(
          [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 850, delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      };
      page.querySelectorAll(".sg-hero-copy > .sg-kicker, .sg-hero h1, .sg-hero-bottom, .sg-hero-footer").forEach((element, index) => play(element, index * 110));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          play(entry.target, Number((entry.target as HTMLElement).dataset.motionDelay || 0));
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      page.querySelectorAll(".sg-intro > div, .sg-golf-story, .sg-format > div, .sg-summit-grid > div, .sg-program-heading > div, .sg-program-timeline article, .sg-program-pillars details, .sg-workshop > div, .sg-marketplace > div, .sg-section-head > *, .sg-package-layout > div, .sg-impact > div, .sg-stay-copy, .sg-registration > div, .sg-faq > div, .sg-partner-rows > a, .sg-closing .sg-container").forEach((element, index) => {
        (element as HTMLElement).dataset.motionDelay = String((index % 3) * 65);
        observer.observe(element);
      });
      const hero = page.querySelector<HTMLElement>(".sg-hero");
      const image = page.querySelector<HTMLElement>(".sg-hero-image");
      const progress = page.querySelector<HTMLElement>(".sg-reading-progress");
      let frame = 0;
      const update = () => {
        frame = 0;
        const rect = page.getBoundingClientRect();
        const distance = Math.max(1, page.offsetHeight - window.innerHeight);
        progress?.style.setProperty("transform", `scaleX(${Math.min(1, Math.max(0, -rect.top / distance))})`);
        if (hero && image) {
          const bounds = hero.getBoundingClientRect();
          const travel = Math.min(bounds.height, Math.max(0, -bounds.top));
          image.style.transform = `translateY(${travel * 0.1}px) scale(1.12)`;
        }
      };
      const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
      window.addEventListener("scroll", scroll, { passive: true });
      window.addEventListener("resize", scroll);
      update();
      stop = () => {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        window.removeEventListener("scroll", scroll);
        window.removeEventListener("resize", scroll);
        cancelAnimationFrame(frame);
        image?.style.removeProperty("transform");
        progress?.style.removeProperty("transform");
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { stop(); preference.removeEventListener("change", setup); };
  }, []);
  return <div ref={root} className="signature-page sg-event"><div className="sg-reading-progress" aria-hidden="true" />{children}</div>;
}
