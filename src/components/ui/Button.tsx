"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ButtonProps, ButtonSize, ButtonVariant } from "@/types/ui";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-orange text-white shadow-glow hover:bg-[#cf6d16] hover:shadow-[0_18px_44px_-14px_rgba(230,126,34,0.7)] focus-visible:ring-brand-orange",
  secondary:
    "bg-brand-dark text-white shadow-soft hover:bg-[#162a1f] focus-visible:ring-brand-dark",
  outline:
    "border border-brand-dark/15 bg-white/70 text-brand-dark backdrop-blur-sm hover:bg-brand-muted/80 focus-visible:ring-brand-dark",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm sm:text-base",
  lg: "h-14 px-6 text-base",
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M4 12a8 8 0 0 1 8-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  disabled,
  isLoading = false,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={isDisabled ? undefined : { scale: 1.015 }}
      whileTap={isDisabled ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {isLoading ? <Spinner /> : null}
      <span>{isLoading ? "Enviando tu solicitud..." : children}</span>
    </motion.button>
  );
}
