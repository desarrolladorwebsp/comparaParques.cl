"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  HeartHandshake,
  Scale,
  Shield,
} from "lucide-react";
import { Button, IconFeature } from "@/components/ui";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { MotionCard } from "@/components/ui/MotionCard";
import { easeOut, fadeUpItem, staggerContainer } from "@/lib/motion";

const benefits = [
  {
    id: "tranquilidad",
    title: "Tranquilidad para tus seres queridos",
    description:
      "Evitas que tu familia deba tomar decisiones difíciles, complejas o apresuradas en medio de un proceso de duelo.",
    icon: <HeartHandshake className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    id: "proteccion",
    title: "Protección contra la inflación y alza de costos",
    description:
      "Aseguras el valor actual del terreno o propiedad memorial, congelando el precio frente a futuros reajustes del mercado.",
    icon: <Shield className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    id: "eleccion",
    title: "Elección libre y sin presiones",
    description:
      "Puedes evaluar ubicaciones, tipos de parque, presupuesto y alternativas junto a un asesor independiente, al ritmo que tú decidas.",
    icon: <Scale className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    id: "pago",
    title: "Facilidades de pago a tu medida",
    description:
      "Accedes a convenios de pago en cuotas mensuales adaptadas a tu capacidad económica, algo que rara vez es posible en situaciones de urgencia.",
    icon: <CreditCard className="h-5 w-5" strokeWidth={1.75} />,
  },
] as const;

function scrollToAsesoria() {
  document.getElementById("asesoria")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function WhyPlanAheadSection() {
  return (
    <section
      id="planificacion"
      className="relative scroll-mt-24 overflow-hidden bg-brand-light py-16 sm:py-20 lg:py-24"
      aria-labelledby="plan-ahead-heading"
    >
      <BackgroundPattern variant="dots" />
      <BackgroundPattern variant="glow" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-orange sm:text-sm">
            Tranquilidad y previsión
          </p>
          <h2
            id="plan-ahead-heading"
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl md:text-4xl"
          >
            ¿Por qué es importante considerar la planificación a futuro?
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-brand-dark/65 sm:text-base">
            Tomar decisiones con tiempo no solo protege la economía de tu
            familia, sino que les regala la tranquilidad de saber que todo está
            resuelto con amor y claridad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.08 }}
          className="mt-10 sm:mt-12"
        >
          <div className="overflow-hidden rounded-3xl border border-brand-orange/25 bg-gradient-to-br from-orange-50 via-white to-brand-light p-6 shadow-soft sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-orange">
                  Beneficio económico
                </p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-brand-dark sm:text-5xl lg:text-[3.25rem]">
                  Hasta un{" "}
                  <span className="text-brand-orange">40%</span> de ahorro
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                  La compra en prevención (antes de necesitar el servicio)
                  permite acceder a tarifas preferenciales, descuentos de parque
                  y opciones de financiamiento en cuotas sin los sobrecostos
                  asociados a las urgencias inmediatas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div key={benefit.id} variants={fadeUpItem}>
              <MotionCard
                variant="white"
                padding="md"
                className="h-full border-slate-200 bg-white"
              >
                <IconFeature
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  iconClassName="bg-brand-orange/12 text-brand-orange"
                />
              </MotionCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-10 overflow-hidden rounded-3xl bg-brand-dark p-6 shadow-lift sm:mt-12 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-10"
        >
          <div className="max-w-2xl">
            <p className="text-lg font-semibold tracking-tight text-brand-light sm:text-xl">
              ¿Te gustaría conocer las opciones de compra en prevención
              disponibles en tu comuna?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-light/65">
              Te orientamos con empatía, sin prisa y sin compromiso comercial.
            </p>
          </div>
          <div className="mt-5 shrink-0 lg:mt-0">
            <Button
              variant="primary"
              onClick={scrollToAsesoria}
              className="w-full bg-brand-orange hover:bg-[#d36f1b] sm:w-auto"
            >
              Evaluar opciones a futuro
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
