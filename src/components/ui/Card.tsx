import { cn } from "@/lib/cn";
import type { CardPadding, CardProps, CardVariant } from "@/types/ui";

const variantStyles: Record<CardVariant, string> = {
  light:
    "border border-brand-dark/5 bg-brand-light/90 shadow-soft backdrop-blur-sm",
  muted: "border border-transparent bg-brand-muted/90 shadow-none",
  white: "border border-brand-dark/5 bg-white/95 shadow-soft backdrop-blur-sm",
  highlighted:
    "border border-brand-orange/35 bg-white shadow-glow ring-1 ring-brand-orange/15",
};

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  children,
  variant = "white",
  padding = "md",
  className,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-3xl",
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
}
