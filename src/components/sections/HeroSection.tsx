"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trees } from "lucide-react";
import { Badge, Button, SearchInput, SelectInput } from "@/components/ui";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import type { HeroSearchValues } from "@/types/hero";
import type { SelectOption } from "@/types/ui";
import { SITE_MEDIA } from "@/lib/media";
import { easeOut } from "@/lib/motion";

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
  { value: "inmediata", label: "Necesidad inmediata" },
  { value: "planificacion", label: "Planificación con anticipación" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay },
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
    <section
      id="inicio"
      className="relative scroll-mt-24 overflow-hidden bg-brand-dark"
    >
      <div className="absolute inset-0">
        <Image
          src={SITE_MEDIA.heroGarden}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-brand-dark/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/55 to-brand-dark" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent" />
      </div>
      <BackgroundPattern variant="dots-light" className="opacity-15" />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center lg:max-w-4xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Badge
              withDot
              variant="outline"
              className="border-white/25 bg-white/15 text-brand-light backdrop-blur-md"
            >
              Orientación independiente y gratuita
            </Badge>
          </motion.div>

          <motion.div
            custom={0.06}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-light/10 px-3 py-1 text-xs font-medium text-brand-light/85 backdrop-blur-md"
          >
            <Trees className="h-3.5 w-3.5 text-brand-orange" strokeWidth={1.75} />
            Estamos de tu lado, con calma y claridad
          </motion.div>

          <motion.h1
            custom={0.12}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-brand-light sm:text-4xl md:text-5xl lg:text-[3.4rem]"
          >
            Un lugar de calma para tomar la decisión correcta para tu familia.
          </motion.h1>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-brand-light/80 sm:text-lg"
          >
            Te acompañamos paso a paso a comparar parques, cementerios y
            servicios exequiales. Sin prisa ni compromisos comerciales: nuestra
            única prioridad es brindarte la orientación humana y transparente
            que necesitas.
          </motion.p>
        </div>

        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-10 w-full max-w-5xl sm:mt-12"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/40 bg-white/95 p-4 shadow-lift backdrop-blur-md sm:p-5 lg:p-3"
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
                label="Tipo de servicio"
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
                label="Momento de tu familia"
                name="needType"
                options={NEED_OPTIONS}
                placeholder="¿En qué momento estás?"
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
                  className="lg:min-w-[12.5rem] lg:px-6"
                >
                  Buscar con tranquilidad
                </Button>
              </div>
            </div>
          </form>

          <p className="mt-4 text-center text-xs text-brand-light/65 sm:text-sm">
            Una búsqueda sencilla, sin compromiso y sin datos personales
            obligatorios.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
