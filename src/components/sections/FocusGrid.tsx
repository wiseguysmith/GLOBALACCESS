import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FocusItem {
  title: string;
  body: ReactNode;
  icon?: ReactNode;
  meta?: string;
}

/**
 * Numbered grid of focus areas with fine top rules.
 * Used across initiative pages for "Areas of focus" and principles.
 */
export function FocusGrid({
  items,
  tone = "light",
  accent,
  columns = 3,
  numbered = true,
  className,
}: {
  items: FocusItem[];
  tone?: "light" | "dark";
  accent?: string;
  columns?: 2 | 3 | 4;
  numbered?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ul
      className={cn(
        "grid gap-x-10 gap-y-12 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
        className,
      )}
      style={accent ? ({ "--focus-accent": accent } as CSSProperties) : undefined}
    >
      {items.map((item, i) => (
        <li
          key={item.title}
          data-reveal
          className={cn("relative border-t pt-7", dark ? "border-white/15" : "border-navy/15")}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute -top-px left-0 h-px w-12",
              accent ? "bg-[var(--focus-accent)]" : dark ? "bg-gold" : "bg-gold-ink",
            )}
          />
          <div className="flex items-start justify-between gap-4">
            {numbered ? (
              <span
                className={cn(
                  "font-display text-sm tabular-nums",
                  accent ? "text-[var(--focus-accent)]" : dark ? "text-gold" : "text-gold-ink",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : null}
            {item.icon ? (
              <span className={cn("shrink-0", dark ? "text-white/60" : "text-ink-soft")}>
                {item.icon}
              </span>
            ) : null}
          </div>
          <h3
            className={cn(
              "mt-5 font-display text-xl font-medium tracking-[-0.02em]",
              dark ? "text-white" : "text-ink",
            )}
          >
            {item.title}
          </h3>
          <div className={cn("mt-3 leading-relaxed", dark ? "text-mist" : "text-ink-soft")}>
            {item.body}
          </div>
          {item.meta ? (
            <p className={cn("eyebrow mt-5", dark ? "text-white/60" : "text-slate")}>{item.meta}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
