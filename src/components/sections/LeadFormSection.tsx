"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Card,
  FormStepper,
  RadioCardGroup,
  SelectInput,
  TextInput,
} from "@/components/ui";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import {
  buildWhatsAppUrl,
  getLeadSummaryLabels,
  isValidChileanPhone,
  normalizeChileanPhone,
} from "@/lib/lead-form";
import {
  COMMUNE_OPTIONS,
  CONTACT_SCHEDULE_OPTIONS,
  LEAD_FORM_DEFAULT_VALUES,
  LEAD_FORM_STEPS,
  NEED_TYPE_OPTIONS,
  PARK_OPTIONS,
  type LeadFormStep,
  type LeadFormValues,
} from "@/types/lead-form";

const easeOut = [0.22, 1, 0.36, 1] as const;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -56 : 56,
    opacity: 0,
    transition: { duration: 0.25, ease: easeOut },
  }),
};

const STEP_FIELDS: Record<LeadFormStep, (keyof LeadFormValues)[]> = {
  1: ["needType", "parkPreference", "commune"],
  2: ["fullName", "phone", "email", "contactSchedule"],
  3: ["consent"],
};

export function LeadFormSection() {
  const [step, setStep] = useState<LeadFormStep>(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm<LeadFormValues>({
    defaultValues: LEAD_FORM_DEFAULT_VALUES,
    mode: "onTouched",
  });

  const values = watch();
  const summary = getLeadSummaryLabels(values);

  async function goNext() {
    const valid = await trigger(STEP_FIELDS[step], { shouldFocus: true });
    if (!valid || step === 3) return;

    setDirection(1);
    setStep((prev) => (prev + 1) as LeadFormStep);
  }

  function goBack() {
    if (step === 1) return;
    setDirection(-1);
    setStep((prev) => (prev - 1) as LeadFormStep);
  }

  async function onSubmit(data: LeadFormValues) {
    setIsSubmitting(true);

    // Simulación de envío — reemplazar por API real cuando exista backend
    await new Promise((resolve) => setTimeout(resolve, 900));

    const payload = {
      ...data,
      phone: normalizeChileanPhone(data.phone),
    };

    console.info("[LeadForm] submitted", payload);
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  return (
    <section
      id="asesoria"
      className="relative scroll-mt-24 overflow-hidden bg-brand-dark py-16 sm:py-20 lg:py-24"
      aria-labelledby="lead-form-heading"
    >
      <BackgroundPattern variant="dots-light" />
      <BackgroundPattern variant="glow" />
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-orange sm:text-sm">
            Solicitud de orientación
          </p>
          <h2
            id="lead-form-heading"
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-light sm:text-3xl md:text-4xl"
          >
            Déjanos ayudarte a aligerar el camino
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-brand-light/70 sm:text-base">
            Cuéntanos qué necesitas. Un asesor independiente te escuchará con
            empatía y te presentará las opciones más convenientes para tu
            familia.
          </p>
        </motion.div>

        <Card
          variant="white"
          padding="lg"
          className="mt-10 rounded-3xl border border-white/15 bg-white/95 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-md sm:mt-12"
        >
          {isSuccess ? (
            <SuccessState values={getValues()} />
          ) : (
            <>
              <FormStepper
                steps={[...LEAD_FORM_STEPS]}
                currentStep={step}
                className="mb-8"
              />

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[20rem]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="space-y-5"
                    >
                      {step === 1 ? (
                        <StepRequirement
                          control={control}
                          register={register}
                          errors={errors}
                        />
                      ) : null}

                      {step === 2 ? (
                        <StepContact
                          control={control}
                          register={register}
                          errors={errors}
                        />
                      ) : null}

                      {step === 3 ? (
                        <StepConfirmation
                          values={values}
                          summary={summary}
                          register={register}
                          errors={errors}
                        />
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={step === 1 || isSubmitting}
                    className="w-full border-slate-300 bg-white text-slate-600 hover:bg-slate-100 sm:w-auto"
                  >
                    Anterior
                  </Button>

                  {step < 3 ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={goNext}
                      className="w-full bg-[#E67E22] hover:bg-[#d36f1b] sm:w-auto sm:min-w-[9.5rem]"
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      className="w-full bg-[#E67E22] hover:bg-[#d36f1b] sm:w-auto sm:min-w-[14rem]"
                    >
                      Solicitar orientación gratuita
                    </Button>
                  )}
                </div>
              </form>
            </>
          )}
        </Card>
      </div>
    </section>
  );
}

type FieldErrors = ReturnType<
  typeof useForm<LeadFormValues>
>["formState"]["errors"];

type FormRegister = ReturnType<typeof useForm<LeadFormValues>>["register"];
type FormControl = ReturnType<typeof useForm<LeadFormValues>>["control"];

function StepRequirement({
  control,
  register,
  errors,
}: {
  control: FormControl;
  register: FormRegister;
  errors: FieldErrors;
}) {
  return (
    <>
      <Controller
        name="needType"
        control={control}
        rules={{ required: "Cuéntanos en qué momento se encuentra tu familia" }}
        render={({ field }) => (
          <RadioCardGroup
            label="¿En qué momento se encuentra tu familia?"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            options={[...NEED_TYPE_OPTIONS]}
            error={errors.needType?.message}
          />
        )}
      />

      <div className="space-y-1.5">
        <p className="text-sm leading-relaxed text-brand-dark/70">
          Si ya tienes un parque o cementerio en mente, indícalo. Si no, con
          gusto te orientamos desde el comienzo.
        </p>
        <SelectInput
          label="Parque o cementerio de interés"
          placeholder="Elige una opción"
          options={[...PARK_OPTIONS]}
          error={errors.parkPreference?.message}
          {...register("parkPreference", {
            required: "Elige una preferencia para poder orientarte mejor",
          })}
        />
      </div>

      <SelectInput
        label="Comuna o zona donde prefieres buscar"
        placeholder="Selecciona tu comuna"
        options={[...COMMUNE_OPTIONS]}
        error={errors.commune?.message}
        {...register("commune", {
          required: "Indica una comuna o zona para acercarte opciones útiles",
        })}
      />
    </>
  );
}

function StepContact({
  control,
  register,
  errors,
}: {
  control: FormControl;
  register: FormRegister;
  errors: FieldErrors;
}) {
  return (
    <>
      <TextInput
        label="Nombre completo"
        autoComplete="name"
        placeholder="Ej. María González"
        error={errors.fullName?.message}
        {...register("fullName", {
          required: "Ingresa tu nombre completo",
          minLength: {
            value: 3,
            message: "Ingresa al menos 3 caracteres",
          },
        })}
      />

      <TextInput
        label="Teléfono / WhatsApp"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+56912345678"
        hint="Formato chileno: +569 seguido de 8 dígitos"
        error={errors.phone?.message}
        {...register("phone", {
          required: "Ingresa tu teléfono o WhatsApp",
          validate: (value) =>
            isValidChileanPhone(value) ||
            "Usa un número válido (+569XXXXXXXX)",
        })}
      />

      <TextInput
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        placeholder="tu@correo.cl"
        error={errors.email?.message}
        {...register("email", {
          required: "Ingresa tu correo electrónico",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Ingresa un correo válido",
          },
        })}
      />

      <Controller
        name="contactSchedule"
        control={control}
        rules={{ required: "Indica cuándo te resulta más cómodo conversar" }}
        render={({ field }) => (
          <RadioCardGroup
            label="¿Cuándo te resulta más cómodo que te contactemos?"
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            options={[...CONTACT_SCHEDULE_OPTIONS]}
            error={errors.contactSchedule?.message}
          />
        )}
      />
    </>
  );
}

function StepConfirmation({
  values,
  summary,
  register,
  errors,
}: {
  values: LeadFormValues;
  summary: ReturnType<typeof getLeadSummaryLabels>;
  register: FormRegister;
  errors: FieldErrors;
}) {
  const rows = [
    { label: "Momento", value: summary.needType },
    { label: "Parque o cementerio", value: summary.parkPreference },
    { label: "Comuna o zona", value: summary.commune },
    { label: "Nombre", value: values.fullName },
    { label: "Teléfono", value: values.phone },
    { label: "Correo", value: values.email },
    { label: "Horario", value: summary.contactSchedule },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-brand-dark/8 bg-brand-light p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-brand-dark">
          Resumen de tu solicitud de orientación
        </h3>
        <dl className="mt-4 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-0.5 border-b border-brand-dark/5 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-brand-dark/45">
                {row.label}
              </dt>
              <dd className="text-sm text-brand-dark sm:text-right">
                {row.value || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-dark/10 bg-white p-4">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-brand-dark/25 text-brand-orange focus:ring-brand-orange"
          {...register("consent", {
            required:
              "Necesitamos tu autorización para poder contactarte con respeto",
          })}
        />
        <span className="text-xs leading-relaxed text-brand-dark/70 sm:text-sm">
          Autorizo a ComparaParques.cl a tratar mis datos personales únicamente
          para contactarme y ofrecerme la orientación solicitada, conforme a la
          Ley N° 19.628 sobre Protección de la Vida Privada en Chile.
        </span>
      </label>
      {errors.consent?.message ? (
        <p className="text-xs text-red-600">{errors.consent.message}</p>
      ) : null}
    </div>
  );
}

function SuccessState({ values }: { values: LeadFormValues }) {
  const whatsappUrl = buildWhatsAppUrl(values.phone, values.fullName);
  const firstName = values.fullName.trim().split(/\s+/)[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="flex flex-col items-center py-4 text-center sm:py-6"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 13.2 9.2 17.5 19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-brand-dark">
        Recibimos tu solicitud con cuidado
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-dark/65 sm:text-base">
        Gracias{firstName ? `, ${firstName}` : ""}. Pronto alguien de nuestro
        equipo te escribirá con empatía, respetando el horario que nos
        compartiste.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:max-w-sm">
        <Button
          variant="primary"
          fullWidth
          onClick={() => {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
          }}
        >
          Continuar la conversación por WhatsApp
        </Button>
        <p className="text-xs text-brand-dark/45">
          Orientación independiente, gratuita y sin presión.
        </p>
      </div>
    </motion.div>
  );
}
