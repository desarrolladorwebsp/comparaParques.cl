import type {
  Cemetery,
  CemeteryMaintenance,
  CemeteryType,
  PlanModality,
} from "@/types/cemetery";

/** Estado de publicación en el catálogo público */
export type AdminParkStatus = "Activo" | "Inactivo";

/**
 * Necesidad del plan en backoffice.
 * "Ambas" permite ofrecer el mismo plan en urgencia y prevención.
 */
export type AdminPlanNeedType = "urgencia" | "prevencion" | "ambas";

export type AdminMaintenanceType = CemeteryMaintenance["type"];

export interface AdminParkPlan {
  id: string;
  name: string;
  capacity: string;
  needType: AdminPlanNeedType;
  priceFrom: number;
  description: string;
  /** Nota de mantención específica del plan (opcional) */
  maintenanceNote?: string;
}

/**
 * Entidad administrable: parque cementerio, cementerio tradicional o crematorio.
 * Campos `assignedExecutiveIds` / `partnerSellerIds` quedan listos para vincular
 * ejecutivos y vendedores socios en una fase posterior.
 */
export interface AdminPark {
  id: string;
  slug: string;
  name: string;
  type: CemeteryType;
  status: AdminParkStatus;
  region: string;
  commune: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  logoUrl: string;
  imageUrl: string;
  mainImage: string;
  gallery: string[];
  videoUrl: string;
  features: string[];
  plans: AdminParkPlan[];
  maintenanceCosts: CemeteryMaintenance;
  accessNotes: string;
  transitNotes: string;
  rating: number;
  minPrice: number;
  /** IDs de ejecutivos internos asignados (futuro) */
  assignedExecutiveIds: string[];
  /** IDs de vendedores socios (futuro) */
  partnerSellerIds: string[];
  updatedAt: string;
  createdAt: string;
}

export interface AdminParkFormValues {
  name: string;
  type: CemeteryType | "";
  status: AdminParkStatus;
  region: string;
  commune: string;
  address: string;
  lat: string;
  lng: string;
  description: string;
  logoUrl: string;
  mainImage: string;
  gallery: string[];
  videoUrl: string;
  features: string[];
  plans: AdminParkPlan[];
  maintenanceType: AdminMaintenanceType;
  maintenanceAnnualEstimate: string;
  maintenanceSummary: string;
  maintenanceIncludes: string;
  accessNotes: string;
  transitNotes: string;
  assignedExecutiveIds: string[];
  partnerSellerIds: string[];
}

export interface AdminNavItem {
  href: string;
  label: string;
  icon: "trees" | "scroll" | "users" | "chart";
  enabled: boolean;
  badge?: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: "/admin/parques",
    label: "Parques y Cementerios",
    icon: "trees",
    enabled: true,
  },
  {
    href: "/admin/servicios",
    label: "Servicios y Planes",
    icon: "scroll",
    enabled: true,
  },
  {
    href: "/admin/ejecutivos",
    label: "Ejecutivos / Vendedores",
    icon: "users",
    enabled: false,
    badge: "Próximamente",
  },
  {
    href: "/admin/leads",
    label: "Leads / Solicitudes",
    icon: "chart",
    enabled: false,
    badge: "Próximamente",
  },
];

export const ADMIN_FEATURE_SUGGESTIONS = [
  "Áreas verdes sustentables",
  "Crematorio propio",
  "Criptas familiares",
  "Seguridad 24/7",
  "Estacionamiento privado",
  "Abono de mantención perpetua",
  "Capilla ecuménica",
  "Sala de velación",
] as const;

export const ADMIN_PLAN_NEED_OPTIONS: {
  value: AdminPlanNeedType;
  label: string;
}[] = [
  { value: "prevencion", label: "Prevención a futuro" },
  { value: "urgencia", label: "Urgencia inmediata" },
  { value: "ambas", label: "Ambas" },
];

export const ADMIN_STATUS_OPTIONS: {
  value: AdminParkStatus;
  label: string;
}[] = [
  { value: "Activo", label: "Activo" },
  { value: "Inactivo", label: "Inactivo" },
];

export function needTypeToModality(needType: AdminPlanNeedType): PlanModality {
  if (needType === "urgencia") return "Urgencia";
  return "Prevención";
}

export function modalityToNeedType(modality: PlanModality): AdminPlanNeedType {
  return modality === "Urgencia" ? "urgencia" : "prevencion";
}

export function cemeteryToAdminPark(cemetery: Cemetery): AdminPark {
  const now = new Date().toISOString();
  return {
    ...cemetery,
    status: "Activo",
    plans: cemetery.plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      capacity: plan.capacity,
      needType: modalityToNeedType(plan.modality),
      priceFrom: plan.priceFrom,
      description: plan.description,
      maintenanceNote: "",
    })),
    assignedExecutiveIds: [],
    partnerSellerIds: [],
    createdAt: now,
    updatedAt: now,
  };
}

export type { CemeteryType };
