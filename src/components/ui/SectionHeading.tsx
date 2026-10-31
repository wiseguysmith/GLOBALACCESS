import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  accent,
  align = "split",
  className,
  id,
  level = 2,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  accent?: string;
  /** "split" places intro beside the title on large screens. */
  align?: "split" | "stack" | "center";
  className?: string;
  id?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  const introColor = tone === "dark" ? "text-mist" : "text-ink-soft";
  return (
    <div
      className={cn(
        align === "split" && "grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-7")}>
        {eyebrow ? (
          <Eyebrow
            tone={tone}
            accent={accent}
            className={cn("mb-6", align === "center" && "justify-center")}
          >
            {eyebrow}
          </Eyebrow>
        ) : null}
        <Heading id={id} className={cn("text-headline", tone === "dark" ? "text-white" : "text-ink")}>
          {title}
        </Heading>
      </div>
      {intro ? (
        <div
          className={cn(
            "text-lede",
            introColor,
            align === "split" && "lg:col-span-5 lg:pb-2",
            align === "stack" && "mt-6 max-w-2xl",
            align === "center" && "mt-6",
          )}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
