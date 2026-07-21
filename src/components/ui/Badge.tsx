import { cn } from "@/lib/cn";
import type { BadgeProps } from "@/types/ui";

const variantStyles = {
  soft: "bg-brand-muted/80 text-brand-dark",
  solid: "bg-brand-orange text-white",
  outline: "border border-brand-dark/15 bg-white/70 text-brand-dark",
} as const;

export function Badge({
  children,
  variant = "soft",
  className,
  withDot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide sm:text-sm",
        variantStyles[variant],
        className,
      )}
    >
      {withDot ? (
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
        />
      ) : null}
      {children}
    </span>
  );
}
