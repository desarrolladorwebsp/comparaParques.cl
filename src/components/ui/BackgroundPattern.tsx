import { cn } from "@/lib/cn";

type PatternVariant = "dots" | "dots-light" | "grid" | "glow";

interface BackgroundPatternProps {
  variant?: PatternVariant;
  className?: string;
}

export function BackgroundPattern({
  variant = "dots",
  className,
}: BackgroundPatternProps) {
  if (variant === "glow") {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      >
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-brand-dark/10 blur-3xl" />
      </div>
    );
  }

  const patternClass =
    variant === "dots"
      ? "bg-dot-pattern bg-dot-md opacity-70"
      : variant === "dots-light"
        ? "bg-dot-pattern-light bg-dot-md opacity-60"
        : "bg-grid-pattern bg-grid-md opacity-60";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        patternClass,
        className,
      )}
    />
  );
}
