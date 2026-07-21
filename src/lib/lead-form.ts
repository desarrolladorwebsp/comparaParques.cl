import {
  COMMUNE_OPTIONS,
  CONTACT_SCHEDULE_OPTIONS,
  NEED_TYPE_OPTIONS,
  PARK_OPTIONS,
  type LeadFormValues,
} from "@/types/lead-form";

function findLabel(
  options: ReadonlyArray<{ value: string; label?: string; title?: string }>,
  value: string,
) {
  const match = options.find((option) => option.value === value);
  return match?.label ?? match?.title ?? value;
}

export function getLeadSummaryLabels(values: LeadFormValues) {
  return {
    needType: findLabel(
      NEED_TYPE_OPTIONS.map((o) => ({ value: o.value, title: o.title })),
      values.needType,
    ),
    parkPreference: findLabel([...PARK_OPTIONS], values.parkPreference),
    commune: findLabel([...COMMUNE_OPTIONS], values.commune),
    contactSchedule: findLabel(
      CONTACT_SCHEDULE_OPTIONS.map((o) => ({
        value: o.value,
        title: o.title,
      })),
      values.contactSchedule,
    ),
  };
}

export function normalizeChileanPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("569") && digits.length === 11) {
    return `+${digits}`;
  }

  if (digits.startsWith("9") && digits.length === 9) {
    return `+56${digits}`;
  }

  if (digits.startsWith("56") && digits.length === 11) {
    return `+${digits}`;
  }

  return value.trim();
}

export function isValidChileanPhone(value: string) {
  return /^\+569\d{8}$/.test(normalizeChileanPhone(value));
}

export function buildWhatsAppUrl(phone: string, name: string) {
  const normalized = normalizeChileanPhone(phone).replace("+", "");
  const message = encodeURIComponent(
    `Hola, soy ${name}. Solicité orientación en ComparaParques.cl y me gustaría continuar la conversación por WhatsApp.`,
  );

  return `https://wa.me/${normalized}?text=${message}`;
}
