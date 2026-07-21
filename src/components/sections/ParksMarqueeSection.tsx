"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Church,
  Flower2,
  Landmark,
  Leaf,
  MapPinned,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Park } from "@/types/park";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

type ParkTone = {
  card: string;
  tile: string;
  icon: string;
  badge: string;
  Icon: LucideIcon;
};

const PARK_TONES: Record<string, ParkTone> = {
  "1": {
    card: "border-[#cfe0d4] bg-gradient-to-br from-[#f4faf6] to-white",
    tile: "bg-[#d9eadf]",
    icon: "text-brand-dark",
    badge: "bg-brand-dark/10 text-brand-dark",
    Icon: Flower2,
  },
  "2": {
    card: "border-[#f3d5b5] bg-gradient-to-br from-[#fff7ef] to-white",
    tile: "bg-[#ffe2c6]",
    icon: "text-brand-orange",
    badge: "bg-brand-orange/15 text-[#b85c12]",
    Icon: MapPinned,
  },
  "3": {
    card: "border-[#d5ddd8] bg-gradient-to-br from-[#f2f5f3] to-white",
    tile: "bg-[#dde7e1]",
    icon: "text-[#2a4f3a]",
    badge: "bg-[#2a4f3a]/10 text-[#2a4f3a]",
    Icon: Landmark,
  },
  "4": {
    card: "border-[#e2d7c8] bg-gradient-to-br from-[#fbf6ef] to-white",
    tile: "bg-[#efe3d3]",
    icon: "text-[#6b5240]",
    badge: "bg-[#6b5240]/10 text-[#6b5240]",
    Icon: Users,
  },
  "5": {
    card: "border-[#d2dce8] bg-gradient-to-br from-[#f3f7fb] to-white",
    tile: "bg-[#d9e5f2]",
    icon: "text-[#355978]",
    badge: "bg-[#355978]/10 text-[#355978]",
    Icon: Church,
  },
  "6": {
    card: "border-[#cfe6d2] bg-gradient-to-br from-[#f1faf3] to-white",
    tile: "bg-[#d5edd9]",
    icon: "text-[#2f6b3f]",
    badge: "bg-[#2f6b3f]/10 text-[#2f6b3f]",
    Icon: Trees,
  },
  "7": {
    card: "border-[#d7e8cf] bg-gradient-to-br from-[#f5faf1] to-white",
    tile: "bg-[#e0efd6]",
    icon: "text-[#4a6b34]",
    badge: "bg-[#4a6b34]/10 text-[#4a6b34]",
    Icon: Leaf,
  },
  "8": {
    card: "border-[#e5d4c4] bg-gradient-to-br from-[#faf4ee] to-white",
    tile: "bg-[#f0e0d1]",
    icon: "text-[#7a5740]",
    badge: "bg-[#7a5740]/10 text-[#7a5740]",
    Icon: Building2,
  },
  "9": {
    card: "border-[#d7e0ea] bg-gradient-to-br from-[#f4f7fb] to-white",
    tile: "bg-[#dde7f1]",
    icon: "text-[#3d5873]",
    badge: "bg-[#3d5873]/10 text-[#3d5873]",
    Icon: Landmark,
  },
  "10": {
    card: "border-[#e0d8cf] bg-gradient-to-br from-[#faf6f1] to-white",
    tile: "bg-[#ebe2d8]",
    icon: "text-[#6d5644]",
    badge: "bg-[#6d5644]/10 text-[#6d5644]",
    Icon: Building2,
  },
};

const DEFAULT_TONE: ParkTone = {
  card: "border-brand-dark/10 bg-white",
  tile: "bg-brand-muted",
  icon: "text-brand-dark",
  badge: "bg-brand-muted text-brand-dark/60",
  Icon: Trees,
};

function ParkBadge({ park }: { park: Park }) {
  const tone = PARK_TONES[park.id] ?? DEFAULT_TONE;
  const Icon = tone.Icon;

  return (
    <Link
      href={`/parques/${park.slug}`}
      aria-label={`Ver ficha de ${park.name}`}
      className={cn(
        "flex w-[17.5rem] shrink-0 cursor-pointer items-center gap-4 rounded-3xl border px-4 py-4 shadow-soft",
        "transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        tone.card,
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]",
          tone.tile,
        )}
      >
        <Icon className={cn("h-8 w-8 sm:h-9 sm:w-9", tone.icon)} strokeWidth={1.6} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[0.95rem] font-semibold leading-snug tracking-tight text-brand-dark sm:text-base">
          {park.name}
        </p>
        <span
          className={cn(
            "mt-1.5 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
            tone.badge,
          )}
        >
          {park.region}
        </span>
      </div>
    </Link>
  );
}

export function ParksMarqueeSection({ className }: { className?: string }) {
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/parks");
        if (!response.ok) return;
        const data = (await response.json()) as {
          parks: Array<{
            id: string;
            name: string;
            region: string;
            logoUrl: string;
            slug: string;
          }>;
        };
        if (!cancelled) {
          setParks(
            data.parks.map((park) => ({
              id: park.id,
              name: park.name,
              region: park.region,
              logoUrl: park.logoUrl,
              slug: park.slug,
            })),
          );
        }
      } catch {
        /* empty marquee on error */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loopParks = useMemo(
    () => (parks.length > 0 ? [...parks, ...parks] : []),
    [parks],
  );

  return (
    <section
      id="parques"
      className={cn(
        "relative scroll-mt-24 overflow-hidden border-y border-brand-dark/5",
        "bg-brand-muted py-12 sm:py-14",
        className,
      )}
      aria-labelledby="parks-marquee-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          id="parks-marquee-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-brand-dark/60 sm:text-[0.95rem]"
        >
          Trabajamos con las principales entidades del país para que compares
          con libertad y sin sesgos
        </motion.p>
      </div>

      <div
        className="group relative mt-8 overflow-hidden sm:mt-10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {loopParks.length > 0 ? (
          <div
            className={cn(
              "flex w-max gap-4 will-change-transform sm:gap-5",
              "animate-marquee motion-reduce:animate-none",
              "group-hover:[animation-play-state:paused]",
            )}
          >
            {loopParks.map((park, index) => (
              <ParkBadge key={`${park.id}-${index}`} park={park} />
            ))}
          </div>
        ) : (
          <p className="px-4 text-center text-sm text-brand-dark/45">
            Cargando catálogo de parques...
          </p>
        )}
      </div>

      <span className="sr-only">
        Parques y cementerios disponibles:{" "}
        {parks.map((park) => park.name).join(", ")}
      </span>
    </section>
  );
}
