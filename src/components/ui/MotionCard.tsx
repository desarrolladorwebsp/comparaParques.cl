"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import type { CardProps } from "@/types/ui";
import { cn } from "@/lib/cn";

interface MotionCardProps extends CardProps {
  hoverLift?: boolean;
}

export function MotionCard({
  children,
  hoverLift = true,
  className,
  ...cardProps
}: MotionCardProps) {
  return (
    <motion.div
      whileHover={
        hoverLift
          ? { y: -6, transition: { type: "spring", stiffness: 380, damping: 24 } }
          : undefined
      }
      className="h-full"
    >
      <Card
        {...cardProps}
        className={cn(
          "h-full transition-shadow duration-300",
          hoverLift && "hover:shadow-lift",
          className,
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
}
