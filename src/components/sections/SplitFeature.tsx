import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/cn";

/** Image beside text — a reusable editorial composition. */
export function SplitFeature({
  image,
  children,
  reverse = false,
  tone = "light",
  aspect = "aspect-[4/5]",
  caption,
}: {
  image: ImageAsset;
  children: ReactNode;
  reverse?: boolean;
  tone?: "light" | "dark";
  aspect?: string;
  caption?: string;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <figure
        data-reveal="fade"
        className={cn("lg:col-span-6", reverse ? "lg:order-2 lg:col-start-7" : "")}
      >
        <div className={cn("relative overflow-hidden rounded-sm", aspect)}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={70}
            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] hover:scale-[1.03]"
          />
        </div>
        {caption ? (
          <figcaption
            className={cn("mt-3 text-xs tracking-[0.04em]", tone === "dark" ? "text-white/60" : "text-slate")}
          >
            {caption}
          </figcaption>
        ) : null}
      </figure>
      <div
        data-reveal
        className={cn("lg:col-span-5", reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}
      >
        {children}
      </div>
    </div>
  );
}
