"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { youtubeEmbedUrl } from "@/lib/format";

interface ParkGalleryProps {
  name: string;
  gallery: string[];
  videoUrl: string;
}

export function ParkGallery({ name, gallery, videoUrl }: ParkGalleryProps) {
  const [active, setActive] = useState(0);
  const embed = youtubeEmbedUrl(videoUrl);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-brand-muted shadow-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={gallery[active] ?? gallery[0]}
              alt={`${name} — imagen ${active + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {gallery.slice(0, 4).map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-2xl border-2 transition",
              active === index
                ? "border-brand-orange"
                : "border-transparent opacity-80 hover:opacity-100",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-soft">
        <div className="relative aspect-video w-full">
          <iframe
            src={embed}
            title={`Video de ${name}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
