export type CemeteryType =
  | "Parque Privado"
  | "Cementerio Tradicional"
  | "Crematorio";

export interface Cemetery {
  id: string;
  name: string;
  region: string;
  commune: string;
  address: string;
  lat: number;
  lng: number;
  type: CemeteryType;
  rating: number;
  minPrice: number;
  slug: string;
  imageUrl: string;
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
