import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export interface Step {
  title: string;
  body: string;
}

/**
 * A clear, numbered sequence. Horizontal with a connecting rule on large
 * screens; a vertical timeline on small screens.
 */
export function ProcessSteps({
  steps,
  tone = "light",
  accent,
  label,
}: {
  steps: Step[];
  tone?: "light" | "dark";
  accent?: string;
  label: string;
}) {
  const dark = tone === "dark";
  const lgCols =
    steps.length === 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol
      aria-label={label}
      className={cn("relative grid gap-0 lg:gap-8", lgCols)}
      style={{ "--step-accent": accent ?? (dark ? "#C7A66D" : "#7D5F2A") } as CSSProperties}
    >
      <span
        aria-hidden="true"
        data-reveal="line"
        className={cn(
          "absolute top-5 right-0 left-0 hidden h-px origin-left lg:block",
          dark ? "bg-white/20" : "bg-navy/15",
        )}
      />
      {steps.map((step, i) => (
        <li key={step.title} data-reveal className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0">
          {/* vertical connector on small screens */}
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-10 bottom-0 left-5 w-px lg:hidden",
                dark ? "bg-white/15" : "bg-navy/15",
              )}
            />
          ) : null}
          <span
            className={cn(
              "relative z-10 flex size-10 items-center justify-center rounded-full border font-display text-sm tabular-nums",
              dark ? "border-white/25 bg-navy text-white" : "border-navy/20 bg-ivory text-ink",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-[-5px] rounded-full border border-[var(--step-accent)] opacity-40"
            />
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="lg:mt-8">
            <h3
              className={cn(
                "font-display text-lg font-medium tracking-[-0.015em]",
                dark ? "text-white" : "text-ink",
              )}
            >
              {step.title}
            </h3>
            <p className={cn("mt-2 text-[0.95rem] leading-relaxed", dark ? "text-mist" : "text-ink-soft")}>
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
