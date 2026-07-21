import { cn } from "@/lib/cn";
import type { SelectInputProps } from "@/types/ui";

export function SelectInput({
  label,
  id,
  options,
  placeholder = "Selecciona una opción",
  className,
  wrapperClassName,
  ...props
}: SelectInputProps) {
  const selectId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={selectId}
      className={cn("flex min-w-0 flex-1 flex-col gap-1.5", wrapperClassName)}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
        {label}
      </span>
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "h-12 w-full appearance-none rounded-xl border border-brand-dark/10 bg-white",
            "px-3.5 pr-10 text-sm text-brand-dark outline-none transition",
            "hover:border-brand-dark/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-brand-dark/40"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </label>
  );
}
