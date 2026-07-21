export type CemeteryType =
  | "Parque Privado"
  | "Cementerio Tradicional"
  | "Crematorio";

export type PlanModality = "Prevención" | "Urgencia";

export interface CemeteryPlan {
  id: string;
  name: string;
  capacity: string;
  modality: PlanModality;
  priceFrom: number;
  description: string;
}

export interface CemeteryMaintenance {
  type: "Anual" | "Perpetua" | "Mixta";
  annualEstimate?: number;
  summary: string;
  includes: string[];
}

export interface Cemetery {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  region: string;
  commune: string;
  address: string;
  lat: number;
  lng: number;
  type: CemeteryType;
  rating: number;
  minPrice: number;
  imageUrl: string;
  mainImage: string;
  gallery: string[];
  videoUrl: string;
  description: string;
  features: string[];
  plans: CemeteryPlan[];
  maintenanceCosts: CemeteryMaintenance;
  accessNotes: string;
  transitNotes: string;
}

export const CEMETERY_TYPES: CemeteryType[] = [
  "Parque Privado",
  "Cementerio Tradicional",
  "Crematorio",
];

export const SANTIAGO_CENTER = {
  lat: -33.4489,
  lng: -70.6693,
} as const;
