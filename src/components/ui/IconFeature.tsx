import { cn } from "@/lib/cn";
import type { IconFeatureProps } from "@/types/ui";

export function IconFeature({
  icon,
  title,
  description,
  className,
  iconClassName,
}: IconFeatureProps) {
  return (
    <div className={cn("flex h-full flex-col gap-4", className)}>
      <div
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-dark/5 text-brand-dark",
          iconClassName,
        )}
        aria-hidden
      >
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-brand-dark">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-brand-dark/65 sm:text-[0.95rem]">
          {description}
        </p>
      </div>
    </div>
  );
}
