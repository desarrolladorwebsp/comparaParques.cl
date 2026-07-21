import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { TextInputProps } from "@/types/ui";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      label,
      id,
      error,
      hint,
      className,
      wrapperClassName,
      type = "text",
      ...props
    },
    ref,
  ) {
    const inputId =
      id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={inputId}
        className={cn("flex min-w-0 flex-col gap-1.5", wrapperClassName)}
      >
        <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
          {label}
        </span>
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(
            "h-12 w-full rounded-xl border bg-white px-3.5 text-sm text-brand-dark outline-none transition",
            "placeholder:text-brand-dark/35",
            "hover:border-brand-dark/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
              : "border-brand-dark/10",
            className,
          )}
          {...props}
        />
        {error ? (
          <span id={`${inputId}-error`} className="text-xs text-red-600">
            {error}
          </span>
        ) : hint ? (
          <span id={`${inputId}-hint`} className="text-xs text-brand-dark/45">
            {hint}
          </span>
        ) : null}
      </label>
    );
  },
);
