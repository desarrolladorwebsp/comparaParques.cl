"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Badge, Button, SearchInput, SelectInput } from "@/components/ui";
import type { HeroSearchValues } from "@/types/hero";
import type { SelectOption } from "@/types/ui";

const LOCATION_OPTIONS: SelectOption[] = [
  { value: "rm", label: "Región Metropolitana" },
  { value: "valparaiso", label: "Valparaíso" },
  { value: "biobio", label: "Biobío" },
  { value: "araucania", label: "La Araucanía" },
  { value: "los-lagos", label: "Los Lagos" },
  { value: "antofagasta", label: "Antofagasta" },
];

const SERVICE_OPTIONS: SelectOption[] = [
  { value: "sepultura", label: "Sepultura / Parcela" },
  { value: "cripta", label: "Cripta / Nicho" },
  { value: "cremacion", label: "Cremación" },
];

const NEED_OPTIONS: SelectOption[] = [
  { value: "inmediata", label: "Necesidad Inmediata" },
  { value: "planificacion", label: "Planificación a Futuro" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

const initialValues: HeroSearchValues = {
  location: "",
  serviceType: "",
  needType: "",
};

export function HeroSection() {
  const [values, setValues] = useState<HeroSearchValues>(initialValues);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="relative overflow-hidden bg-brand-light">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,43,0.06),_transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center lg:max-w-4xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Badge withDot variant="outline">
              Asesoría 100% Independiente y Gratuita
            </Badge>
          </motion.div>

          <motion.h1
            custom={0.08}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-brand-dark sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            Compara cementerios, sepulturas y servicios exequiales en un solo
            lugar
          </motion.h1>

          <motion.p
            custom={0.16}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-brand-dark/70 sm:text-lg"
          >
            No estamos asociados a ninguna funeraria ni parque cementerio.
            Te ayudamos a comparar con claridad para que tu familia elija la
            mejor opción, con tranquilidad y sin presión.
          </motion.p>
        </div>

        <motion.div
          custom={0.28}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-10 w-full max-w-5xl sm:mt-12"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-brand-dark/5 bg-white p-4 shadow-[0_18px_50px_-28px_rgba(30,58,43,0.35)] sm:p-5 lg:p-3"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-2">
              <SearchInput
                label="Ubicación"
                name="location"
                placeholder="Comuna o región"
                value={values.location}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
                list="hero-location-suggestions"
                autoComplete="off"
              />
              <datalist id="hero-location-suggestions">
                {LOCATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label} />
                ))}
              </datalist>

              <SelectInput
                label="Tipo de Servicio"
                name="serviceType"
                options={SERVICE_OPTIONS}
                placeholder="Elige un servicio"
                value={values.serviceType}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    serviceType: event.target.value,
                  }))
                }
              />

              <SelectInput
                label="Tipo de Necesidad"
                name="needType"
                options={NEED_OPTIONS}
                placeholder="¿Cuándo lo necesitas?"
                value={values.needType}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    needType: event.target.value,
                  }))
                }
              />

              <div className="flex w-full shrink-0 flex-col gap-1.5 lg:w-auto">
                <span className="hidden text-xs font-medium uppercase tracking-wide lg:invisible lg:block">
                  Acción
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  className="lg:min-w-[10.5rem] lg:px-6"
                >
                  Buscar Opciones
                </Button>
              </div>
            </div>
          </form>

          <p className="mt-4 text-center text-xs text-brand-dark/45 sm:text-sm">
            Cotización rápida, sin compromiso y sin datos de contacto
            obligatorios.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
