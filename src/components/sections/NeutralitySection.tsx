"use client";

import { motion } from "framer-motion";
import { BarChart3, Lightbulb, ShieldCheck } from "lucide-react";
import { IconFeature } from "@/components/ui";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { MotionCard } from "@/components/ui/MotionCard";
import { SceneMedia } from "@/components/ui/SceneMedia";
import { SITE_MEDIA } from "@/lib/media";
import { easeOut, fadeUpItem, staggerContainer } from "@/lib/motion";

const features = [
  {
    id: "independientes",
    title: "Independencia que protege tu tranquilidad",
    description:
      "Trabajamos con todas las entidades para mostrarte la realidad de cada opción, sin sesgos ni presiones.",
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    id: "comparacion",
    title: "Claridad en cada detalle",
    description:
      "Te explicamos con transparencia costos de mantención, tipos de dominio y trámites para que no haya sorpresas.",
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    id: "cero-presion",
    title: "Acompañamiento a tu propio ritmo",
    description:
      "Respetamos tu tiempo y tus decisiones. Estamos para guiarte, no para venderte.",
    icon: <Lightbulb className="h-5 w-5" strokeWidth={1.75} />,
  },
] as const;

export function NeutralitySection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-16 text-brand-light sm:py-20 lg:py-24">
      <BackgroundPattern variant="dots-light" />
      <BackgroundPattern variant="glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-orange sm:text-sm">
              Cuidado y acompañamiento
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-light sm:text-3xl md:text-4xl">
              Nuestro compromiso es contigo y con tus seres queridos
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-light/70 sm:text-base">
              Estamos de tu lado. Tu tranquilidad es nuestro único compromiso:
              te mostramos todas las alternativas con transparencia para que
              elijas con libertad lo mejor para los tuyos.
            </p>

            <div className="mt-8 hidden lg:block">
              <SceneMedia
                src={SITE_MEDIA.memorialPath}
                alt="Sendero sereno entre árboles"
                caption="Un espacio para decidir con calma y acompañamiento"
                className="animate-float"
              />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7 lg:grid-cols-1 xl:gap-6"
          >
            <div className="lg:hidden">
              <SceneMedia
                src={SITE_MEDIA.memorialPath}
                alt="Sendero sereno entre árboles"
                caption="Un espacio para decidir con calma y acompañamiento"
              />
            </div>

            {features.map((feature) => (
              <motion.div key={feature.id} variants={fadeUpItem}>
                <MotionCard
                  variant="white"
                  padding="md"
                  className="border-white/10 bg-brand-light/95"
                >
                  <IconFeature
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    iconClassName="bg-brand-orange/12 text-brand-orange"
                  />
                </MotionCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
