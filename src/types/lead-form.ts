export type NeedType = "urgencia" | "planificacion";
export type ContactSchedule = "manana" | "tarde" | "indiferente";

export interface LeadFormValues {
  needType: NeedType | "";
  parkPreference: string;
  commune: string;
  fullName: string;
  phone: string;
  email: string;
  contactSchedule: ContactSchedule | "";
  consent: boolean;
}

export type LeadFormStep = 1 | 2 | 3;

export const LEAD_FORM_STEPS = [
  { id: 1, label: "Tu situación" },
  { id: 2, label: "Cómo contactarte" },
  { id: 3, label: "Confirmación" },
] as const;

export const NEED_TYPE_OPTIONS = [
  {
    value: "urgencia",
    title: "Necesidad inmediata",
    description: "Un momento reciente que requiere orientación pronto",
  },
  {
    value: "planificacion",
    title: "Planificación con anticipación",
    description: "Quieres decidir con calma, pensando en el futuro",
  },
] as const;

export const CONTACT_SCHEDULE_OPTIONS = [
  {
    value: "manana",
    title: "Por la mañana",
    description: "09:00 – 13:00",
  },
  {
    value: "tarde",
    title: "Por la tarde",
    description: "14:00 – 19:00",
  },
  {
    value: "indiferente",
    title: "Cuando puedan",
    description: "Cualquier horario está bien",
  },
] as const;

export const PARK_OPTIONS = [
  { value: "orientacion", label: "Prefiero que me orienten desde cero" },
  { value: "parque-del-recuerdo", label: "Parque del Recuerdo" },
  { value: "parque-el-prado", label: "Parque El Prado" },
  { value: "cementerio-general", label: "Cementerio General" },
  { value: "parque-los-olivos", label: "Parque Los Olivos" },
  { value: "otro", label: "Otro / Lo conversaré con quien me oriente" },
] as const;

export const COMMUNE_OPTIONS = [
  { value: "santiago", label: "Santiago" },
  { value: "providencia", label: "Providencia" },
  { value: "las-condes", label: "Las Condes" },
  { value: "nunoa", label: "Ñuñoa" },
  { value: "maipu", label: "Maipú" },
  { value: "la-florida", label: "La Florida" },
  { value: "puente-alto", label: "Puente Alto" },
  { value: "vina-del-mar", label: "Viña del Mar" },
  { value: "concepcion", label: "Concepción" },
  { value: "otra", label: "Otra comuna / zona" },
] as const;

export const LEAD_FORM_DEFAULT_VALUES: LeadFormValues = {
  needType: "",
  parkPreference: "",
  commune: "",
  fullName: "",
  phone: "",
  email: "",
  contactSchedule: "",
  consent: false,
};
