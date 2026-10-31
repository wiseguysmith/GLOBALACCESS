import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  tone = "light",
  accent,
  rule = true,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  /** "light" = on ivory surfaces, "dark" = on navy surfaces. */
  tone?: "light" | "dark";
  /** Optional accent color override for the rule and text. */
  accent?: string;
  rule?: boolean;
  as?: "p" | "span" | "div";
}) {
  const style = accent ? ({ "--eyebrow-accent": accent } as CSSProperties) : undefined;
  return (
    <Tag
      style={style}
      className={cn(
        "eyebrow flex items-center gap-3",
        accent
          ? "text-[var(--eyebrow-accent)]"
          : tone === "dark"
            ? "text-gold"
            : "text-gold-ink",
        className,
      )}
    >
      {rule ? <span aria-hidden="true" className="h-px w-8 bg-current opacity-80" /> : null}
      <span>{children}</span>
    </Tag>
  );
}
