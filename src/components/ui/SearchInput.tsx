import { cn } from "@/lib/cn";
import type { SearchInputProps } from "@/types/ui";

export function SearchInput({
  label,
  id,
  className,
  wrapperClassName,
  ...props
}: SearchInputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={inputId}
      className={cn("flex min-w-0 flex-1 flex-col gap-1.5", wrapperClassName)}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
        {label}
      </span>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-brand-dark/40"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.25 12.5a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M11.5 11.5 14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          id={inputId}
          type="search"
          className={cn(
            "h-12 w-full rounded-xl border border-brand-dark/10 bg-white",
            "pl-10 pr-3.5 text-sm text-brand-dark outline-none transition",
            "placeholder:text-brand-dark/35",
            "hover:border-brand-dark/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </div>
    </label>
  );
}
