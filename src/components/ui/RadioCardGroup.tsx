import { cn } from "@/lib/cn";
import type { RadioCardGroupProps } from "@/types/ui";

export function RadioCardGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  className,
}: RadioCardGroupProps) {
  return (
    <fieldset className={cn("space-y-3", className)}>
      <legend className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
        {label}
      </legend>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "relative flex cursor-pointer flex-col gap-1 rounded-2xl border-2 p-4 transition duration-200",
                "min-h-[5.5rem] hover:border-slate-300",
                selected
                  ? "border-brand-orange bg-orange-50 shadow-[0_8px_24px_-16px_rgba(230,126,34,0.55)] ring-1 ring-brand-orange/20"
                  : "border-slate-200 bg-white",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="pr-6 text-sm font-semibold text-brand-dark">
                {option.title}
              </span>
              {option.description ? (
                <span className="pr-6 text-xs leading-relaxed text-brand-dark/55 sm:text-sm">
                  {option.description}
                </span>
              ) : null}
              <span
                aria-hidden
                className={cn(
                  "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition",
                  selected
                    ? "border-brand-orange bg-brand-orange"
                    : "border-slate-300 bg-white",
                )}
              >
                {selected ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </fieldset>
  );
}
