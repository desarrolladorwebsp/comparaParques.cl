"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

interface SceneMediaProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  overlayClassName?: string;
  caption?: string;
}

export function SceneMedia({
  src,
  alt,
  className,
  priority = false,
  overlayClassName,
  caption,
}: SceneMediaProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className={cn(
        "group relative overflow-hidden rounded-3xl shadow-soft",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full bg-brand-muted sm:aspect-[16/11]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-brand-dark/55 via-brand-dark/15 to-transparent",
            overlayClassName,
          )}
        />
      </div>
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-brand-light sm:p-5 sm:text-base">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
