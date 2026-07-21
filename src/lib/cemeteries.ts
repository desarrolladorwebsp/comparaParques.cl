import type { Cemetery } from "@/types/cemetery";
import {
  getAllCemeteriesFromDb,
  getAllCemeterySlugsFromDb,
  getCemeteryBySlugFromDb,
} from "@/lib/parks-db";

/** Catálogo público de parques/cementerios/crematorios (desde Neon). */
export async function getAllCemeteries(): Promise<Cemetery[]> {
  return getAllCemeteriesFromDb();
}

export async function getCemeteryBySlug(
  slug: string,
): Promise<Cemetery | undefined> {
  return getCemeteryBySlugFromDb(slug);
}

export async function getAllCemeterySlugs(): Promise<string[]> {
  return getAllCemeterySlugsFromDb();
}
