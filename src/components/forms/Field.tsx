"use client";

import type { ChangeEvent, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const control =
  "block w-full rounded-sm border bg-white px-4 text-[0.98rem] text-ink placeholder:text-slate/80 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:outline-none focus:border-navy focus:shadow-[0_0_0_3px_rgba(199,166,109,0.35)] disabled:bg-paper";

function stateClass(error?: string) {
  return error ? "border-[#9B2C2C]" : "border-navy/20 hover:border-navy/40";
}

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
      {label}
      {required ? (
        <span className="ml-1 text-gold-ink" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-2 text-xs font-normal text-slate">Optional</span>
      )}
    </label>
  );
}

function Messages({ id, error, hint }: { id: string; error?: string; hint?: ReactNode }) {
  return (
    <>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.82rem] leading-relaxed text-slate">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-[0.85rem] font-medium text-[#9B2C2C]">
          {error}
        </p>
      ) : null}
    </>
  );
}

function describedBy(id: string, error?: string, hint?: ReactNode) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  className,
  value,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
  inputMode,
  disabled,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  autoComplete?: string;
  maxLength?: number;
  inputMode?: "text" | "email";
  disabled?: boolean;
}) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        autoComplete={autoComplete}
        maxLength={maxLength}
        inputMode={inputMode}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(control, "h-12", stateClass(error))}
      />
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  required,
  className,
  value,
  onChange,
  maxLength,
  minLength,
  rows = 5,
  disabled,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  minLength?: number;
  rows?: number;
  disabled?: boolean;
}) {
  const count = value.trim().length;
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        name={id}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={[describedBy(id, error, hint), `${id}-count`].filter(Boolean).join(" ")}
        className={cn(control, "min-h-36 resize-y py-3 leading-relaxed", stateClass(error))}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Messages id={id} error={error} hint={hint} />
        </div>
        <p id={`${id}-count`} className="mt-2 shrink-0 text-xs tabular-nums text-slate">
          <span className="sr-only">Character count: </span>
          {count} / {maxLength}
          {minLength && count < minLength ? <span className="sr-only">, minimum {minLength}</span> : null}
        </p>
      </div>
    </div>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  className,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled,
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(control, "h-12 appearance-none pr-11", stateClass(error), !value && "text-slate")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate"
          strokeWidth={1.75}
        />
      </div>
      <Messages id={id} error={error} hint={hint} />
    </div>
  );
}

export function ConsentField({
  id,
  checked,
  onChange,
  error,
  children,
  disabled,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="flex items-start gap-3.5">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm border-navy/30 accent-navy"
        />
        <label htmlFor={id} className="cursor-pointer text-[0.9rem] leading-relaxed text-ink-soft">
          {children}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 pl-[2.125rem] text-[0.85rem] font-medium text-[#9B2C2C]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Off-screen honeypot field. Real visitors never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
