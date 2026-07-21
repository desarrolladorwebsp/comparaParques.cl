"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ButtonProps, ButtonSize, ButtonVariant } from "@/types/ui";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-orange text-white shadow-sm hover:bg-[#d35400] focus-visible:ring-brand-orange",
  secondary:
    "bg-brand-dark text-white shadow-sm hover:bg-[#162a1f] focus-visible:ring-brand-dark",
  outline:
    "border border-brand-dark/20 bg-transparent text-brand-dark hover:bg-brand-muted/60 focus-visible:ring-brand-dark",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm sm:text-base",
  lg: "h-14 px-6 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.015 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium tracking-tight",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
