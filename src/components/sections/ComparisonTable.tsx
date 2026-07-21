"use client";

import { motion } from "framer-motion";
import { Check, Minus, Sparkles } from "lucide-react";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { MotionCard } from "@/components/ui/MotionCard";
import { SceneMedia } from "@/components/ui/SceneMedia";
import type { ComparisonColumn } from "@/types/comparison";
import { cn } from "@/lib/cn";
import { SITE_MEDIA } from "@/lib/media";
import { easeOut, fadeUpItem, staggerContainer } from "@/lib/motion";

const columns: ComparisonColumn[] = [
  {
    id: "tradicional",
    label: "El camino habitual",
    tone: "traditional",
    points: [
      {
        id: "t1",
        text: "Ir parque por parque, repitiendo la misma historia una y otra vez.",
      },
      {
        id: "t2",
        text: "Conversaciones orientadas a cerrar una venta, no a entender tu momento.",
      },
      {
        id: "t3",
        text: "Costos de mantención o traspasos que aparecen cuando ya es tarde.",
      },
    ],
  },
  {
    id: "comparaparques",
    label: "Contigo, en ComparaParques.cl",
    tone: "preferred",
    points: [
      {
        id: "c1",
        text: "Todas las alternativas, juntas, para que compares con claridad.",
      },
      {
        id: "c2",
        text: "Una persona independiente que escucha primero lo que tu familia necesita.",
      },
      {
        id: "c3",
        text: "Un desglose honesto de costos: adquisición, mantención y lo que viene después.",
      },
    ],
  },
];

function PointIcon({ preferred }: { preferred: boolean }) {
  if (preferred) {
    return (
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
        <Check className="h-3 w-3" strokeWidth={2.4} />
      </span>
    );
  }

  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-dark/10 text-brand-dark/45">
      <Minus className="h-3 w-3" strokeWidth={2.4} />
    </span>
  );
}

function ComparisonColumnCard({ column }: { column: ComparisonColumn }) {
  const preferred = column.tone === "preferred";

  return (
    <MotionCard
      as="article"
      variant={preferred ? "highlighted" : "muted"}
      padding="lg"
      className={cn("relative overflow-hidden", preferred && "ring-brand-orange/20")}
    >
      {preferred ? (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-orange via-[#f0a05a] to-brand-orange"
        />
      ) : null}

      <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
        <div>
          <p
            className={cn(
              "text-xs font-medium uppercase tracking-[0.14em]",
              preferred ? "text-brand-orange" : "text-brand-dark/45",
            )}
          >
            {preferred ? "Con acompañamiento" : "Sin orientación"}
          </p>
          <h3
            className={cn(
              "mt-1 text-xl font-semibold tracking-tight",
              preferred ? "text-brand-dark" : "text-brand-dark/75",
            )}
          >
            {column.label}
          </h3>
        </div>
        {preferred ? (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-orange/12 text-brand-orange">
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
          </span>
        ) : null}
      </div>

      <ul className="space-y-4">
        {column.points.map((point) => (
          <li key={point.id} className="flex items-start gap-3">
            <PointIcon preferred={preferred} />
            <p
              className={cn(
                "text-sm leading-relaxed sm:text-[0.95rem]",
                preferred ? "text-brand-dark/80" : "text-brand-dark/60",
              )}
            >
              {point.text}
            </p>
          </li>
        ))}
      </ul>
    </MotionCard>
  );
}

export function ComparisonTable() {
  return (
    <section
      id="como-funciona"
      className="relative scroll-mt-24 overflow-hidden bg-brand-muted py-16 sm:py-20 lg:py-24"
    >
      <BackgroundPattern variant="grid" />
      <BackgroundPattern variant="glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-orange sm:text-sm">
              Una decisión con más calma
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl md:text-4xl">
              Hay una forma más humana de afrontar este momento
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-brand-dark/65 sm:text-base">
              Dejamos atrás la confusión y la presión comercial. Aquí encuentras
              comparación independiente, lenguaje claro y respeto por el ritmo
              de tu familia.
            </p>
          </motion.div>

          <div className="lg:col-span-5">
            <SceneMedia
              src={SITE_MEDIA.sereneTrees}
              alt="Paisaje natural luminoso"
              caption="Menos prisa. Más comprensión."
              className="[&>div]:aspect-[16/10]"
            />
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6"
        >
          {columns.map((column) => (
            <motion.div key={column.id} variants={fadeUpItem}>
              <ComparisonColumnCard column={column} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
