"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  Clock3,
  Handshake,
} from "lucide-react";
import { Button, SelectInput, TextInput } from "@/components/ui";
import {
  isValidChileanPhone,
  normalizeChileanPhone,
} from "@/lib/lead-form";
import { easeOut } from "@/lib/motion";
import type { Cemetery } from "@/types/cemetery";

interface PartnerFormValues {
  fullName: string;
  parkAffiliation: string;
  experience: string;
  phone: string;
  email: string;
  message: string;
}

const EXPERIENCE_OPTIONS = [
  { value: "1-2", label: "1 a 2 años" },
  { value: "3-5", label: "3 a 5 años" },
  { value: "5+", label: "Más de 5 años" },
];

const FALLBACK_PARK_OPTIONS = [
  { value: "otro", label: "Otro / Especificar" },
];

const REQUIREMENTS = [
  {
    icon: Building2,
    title: "Pertenencia activa",
    description:
      "Ser trabajador activo o con trayectoria comprobable en un parque cementerio o entidad exequial acreditada en Chile.",
  },
  {
    icon: BadgeCheck,
    title: "Excelencia y buenas prácticas",
    description:
      "Código de ética estricto, sin reclamos por malas prácticas comerciales o presiones a las familias.",
  },
  {
    icon: Clock3,
    title: "Experiencia comprobable",
    description:
      "Mínimo 2 años de experiencia en asesoría memorial o servicios previsionales.",
  },
  {
    icon: Handshake,
    title: "Vocación de servicio",
    description:
      "Enfoque 100% centrado en la empatía y la solución correcta para la familia, no solo en la venta.",
  },
] as const;

export function PartnerRecruitmentSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [parkOptions, setParkOptions] = useState(FALLBACK_PARK_OPTIONS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/parks");
        if (!response.ok) return;
        const data = (await response.json()) as { parks: Cemetery[] };
        if (cancelled) return;
        setParkOptions([
          ...data.parks.map((park) => ({
            value: park.slug,
            label: park.name,
          })),
          { value: "otro", label: "Otro / Especificar" },
        ]);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    defaultValues: {
      fullName: "",
      parkAffiliation: "",
      experience: "",
      phone: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(data: PartnerFormValues) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    console.info("[PartnerRecruitment] submitted", {
      ...data,
      phone: normalizeChileanPhone(data.phone),
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  }

  return (
    <section
      id="red-asesores"
      className="relative scroll-mt-24 overflow-hidden bg-brand-muted/70 py-16 sm:py-20 lg:py-24"
      aria-labelledby="partner-recruitment-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-pattern bg-dot-md opacity-40"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-brand-orange/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange sm:text-xs">
            Red de asesores independientes
          </span>
          <h2
            id="partner-recruitment-heading"
            className="mt-4 text-balance text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl md:text-4xl"
          >
            ¿Eres ejecutivo o especialista en el área exequial? Suma tu
            experiencia a nuestra red
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-brand-dark/65 sm:text-base">
            Buscamos profesionales comprometidos con la transparencia y el trato
            humano para brindar la mejor orientación a las familias en Chile.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-8">
          <motion.article
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="rounded-3xl bg-brand-dark p-6 text-brand-light shadow-xl sm:p-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-brand-orange">
              <Briefcase className="h-3.5 w-3.5" strokeWidth={1.8} />
              Manifiesto de excelencia
            </div>

            <p className="mt-5 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
              Trabajamos exclusivamente con expertos comprometidos, serios y con
              intachable reputación.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Solo trabajamos con los mejores y más comprometidos. Cada ingreso
              a la red es evaluado con rigor ético y profesional.
            </p>

            <ul className="mt-8 space-y-5">
              {REQUIREMENTS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-orange">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.08 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
          >
            {isSuccess ? (
              <div className="flex h-full min-h-[28rem] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <BadgeCheck className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand-dark">
                  Solicitud recibida
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-dark/65">
                  Revisaremos tu trayectoria con confidencialidad. Si tu perfil
                  se alinea con nuestra red, te contactaremos a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-sm font-medium text-brand-orange transition hover:text-[#d36f1b]"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-brand-dark sm:text-xl">
                    Solicitud de alianza
                  </h3>
                  <p className="mt-1.5 text-sm text-brand-dark/60">
                    Completa el formulario. Evaluamos cada postulación con
                    rigor y discreción.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="mt-6 space-y-4"
                >
                  <TextInput
                    label="Nombre completo"
                    placeholder="Tu nombre y apellido"
                    autoComplete="name"
                    error={errors.fullName?.message}
                    {...register("fullName", {
                      required: "Ingresa tu nombre completo",
                      minLength: {
                        value: 3,
                        message: "Ingresa al menos 3 caracteres",
                      },
                    })}
                  />

                  <Controller
                    control={control}
                    name="parkAffiliation"
                    rules={{ required: "Selecciona tu entidad actual" }}
                    render={({ field }) => (
                      <SelectInput
                        label="Parque / Cementerio / Crematorio actual"
                        placeholder="Selecciona dónde trabajas"
                        options={parkOptions}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        error={errors.parkAffiliation?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="experience"
                    rules={{ required: "Selecciona tus años de experiencia" }}
                    render={({ field }) => (
                      <SelectInput
                        label="Años de experiencia en la industria"
                        placeholder="Selecciona un rango"
                        options={EXPERIENCE_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        error={errors.experience?.message}
                      />
                    )}
                  />

                  <TextInput
                    label="Teléfono / WhatsApp"
                    placeholder="+56912345678"
                    type="tel"
                    autoComplete="tel"
                    error={errors.phone?.message}
                    {...register("phone", {
                      required: "Ingresa tu teléfono",
                      validate: (value) =>
                        isValidChileanPhone(value) ||
                        "Usa formato +569XXXXXXXX",
                    })}
                  />

                  <TextInput
                    label="Correo electrónico profesional"
                    placeholder="tu.nombre@empresa.cl"
                    type="email"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register("email", {
                      required: "Ingresa tu correo",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Correo inválido",
                      },
                    })}
                  />

                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/55">
                      Breve mensaje / Motivo
                    </span>
                    <textarea
                      rows={4}
                      placeholder="Cuéntanos brevemente sobre tu trayectoria y por qué deseas unirte"
                      className="w-full rounded-xl border border-brand-dark/10 bg-white px-3.5 py-3 text-sm text-brand-dark outline-none transition placeholder:text-brand-dark/35 hover:border-brand-dark/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                      aria-invalid={Boolean(errors.message)}
                      {...register("message", {
                        required: "Cuéntanos brevemente tu motivación",
                        minLength: {
                          value: 20,
                          message: "Escribe al menos 20 caracteres",
                        },
                      })}
                    />
                    {errors.message ? (
                      <span className="text-xs text-red-600">
                        {errors.message.message}
                      </span>
                    ) : null}
                  </label>

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Enviar Solicitud de Evaluación
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-brand-dark/45">
                    Todas las solicitudes son auditadas confidencialmente antes
                    de otorgar acceso a la plataforma.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
