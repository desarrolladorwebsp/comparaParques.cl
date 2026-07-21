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
    title: "100% Independientes de las cadenas",
    description:
      "No tenemos acuerdos de exclusividad ni metas comerciales con ningún cementerio. Te mostramos la realidad de cada opción sin sesgos.",
    icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    id: "comparacion",
    title: "Transparencia total en costos",
    description:
      "Te explicamos sin letra chica los precios de compra, gastos de mantención anual y trámites para que nunca te lleves sorpresas.",
    icon: <BarChart3 className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    id: "cero-presion",
    title: "Asesoría centrada en tu familia",
    description:
      "Respetamos tu ritmo y tu presupuesto. No estamos para presionarte a comprar, sino para guiarte a tomar la decisión correcta.",
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
              Quiénes somos y cómo te ayudamos
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-light sm:text-3xl md:text-4xl">
              Somos tu guía neutral para tomar decisiones con calma
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-light/70 sm:text-base">
              En ComparaParques.cl no pertenecemos a ningún parque ni cementerio
              en particular. Nacimos para ponernos de tu lado: comparamos todas
              las alternativas del mercado con total transparencia para que
              elijas libremente lo mejor para tu familia y tu economía.
            </p>

            <div className="mt-8 hidden lg:block">
              <SceneMedia
                src={SITE_MEDIA.memorialPath}
                alt="Sendero sereno entre árboles"
                caption="Un aliado transparente en los momentos que más importan."
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
                caption="Un aliado transparente en los momentos que más importan."
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
