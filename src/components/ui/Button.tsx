import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "outline-dark" | "outline-light" | "solid-navy";
type Size = "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-soft)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-navy hover:bg-[#d4b67f] shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]",
  light: "bg-white text-navy hover:bg-ivory",
  "solid-navy": "bg-navy text-white hover:bg-midnight",
  "outline-dark": "border border-white/30 text-white hover:border-white/70 hover:bg-white/[0.06]",
  "outline-light": "border border-navy/25 text-navy hover:border-navy/60 hover:bg-navy/[0.03]",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: "arrow" | "external" | "none";
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  icon = "arrow",
  children,
  ...props
}: ButtonLinkProps) {
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      <span>{children}</span>
      {icon !== "none" ? (
        <Icon
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
          strokeWidth={1.75}
        />
      ) : null}
    </Link>
  );
}

/** Understated text link with arrow, used inside cards and lists. */
export function ArrowLink({
  href,
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & { className?: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-2 text-sm font-medium tracking-[0.01em]",
        className,
      )}
      {...props}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover/arrow:translate-x-1"
        strokeWidth={1.75}
      />
    </Link>
  );
}
