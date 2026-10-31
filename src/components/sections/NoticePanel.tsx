import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A calm, clearly labelled notice for scope limitations and disclosures. */
export function NoticePanel({
  title = "Important",
  children,
  tone = "light",
  className,
}: {
  title?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <aside
      className={cn(
        "flex gap-4 rounded-sm border p-6 sm:p-7",
        dark ? "border-white/15 bg-white/[0.03] text-mist" : "border-navy/12 bg-white text-ink-soft",
        className,
      )}
    >
      <Info
        aria-hidden="true"
        className={cn("mt-0.5 size-5 shrink-0", dark ? "text-gold" : "text-gold-ink")}
        strokeWidth={1.5}
      />
      <div className="text-[0.92rem] leading-relaxed">
        <p className={cn("mb-1.5 font-semibold", dark ? "text-white" : "text-ink")}>{title}</p>
        {children}
      </div>
    </aside>
  );
}
