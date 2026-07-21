"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

const FAQS = [
  {
    id: "independiente",
    question: "¿Ustedes pertenecen a algún parque o cementerio?",
    answer:
      "No. Estamos de tu lado. Tu tranquilidad es nuestro único compromiso, por eso te mostramos todas las alternativas con total transparencia para que elijas con libertad lo mejor para los tuyos.",
  },
  {
    id: "costo",
    question: "¿Pedir orientación tiene algún costo?",
    answer:
      "No. La orientación inicial es gratuita. Te acompañamos a entender opciones y costos con calma, sin compromiso de contratar nada.",
  },
  {
    id: "tiempo",
    question: "¿Cuánto tardan en responder?",
    answer:
      "En la mayoría de los casos te escribimos el mismo día hábil, respetando el horario que nos indiques. Sin llamadas insistentes ni presión.",
  },
] as const;

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-brand-muted py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <BackgroundPattern variant="grid" />

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-orange sm:text-sm">
            Con calma, te respondemos
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl"
          >
            Preguntas que suelen aparecer en el camino
          </h2>
          <p className="mt-3 text-sm text-brand-dark/65 sm:text-base">
            Respuestas claras, humanas y sin letra chica.
          </p>
        </motion.div>

        <div className="mt-8 space-y-3 sm:mt-10">
          {FAQS.map((faq, index) => {
            const open = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: easeOut }}
                className="overflow-hidden rounded-3xl border border-brand-dark/8 bg-white/95 shadow-soft backdrop-blur-sm"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  onClick={() => setOpenId(open ? null : faq.id)}
                >
                  <span className="text-sm font-semibold text-brand-dark sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition",
                      open
                        ? "bg-brand-orange text-white"
                        : "bg-brand-muted text-brand-dark",
                    )}
                  >
                    {open ? (
                      <Minus className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: easeOut }}
                    >
                      <p className="border-t border-brand-dark/5 px-4 pb-4 pt-3 text-sm leading-relaxed text-brand-dark/65 sm:px-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
