import { prisma } from "@/lib/db";
import {
  adminParkToDbInput,
  parkToAdminPark,
  parkToCemetery,
} from "@/lib/park-mappers";
import type { AdminPark } from "@/types/admin";
import type { Cemetery } from "@/types/cemetery";

export async function getAllCemeteriesFromDb(
  options?: { includeInactive?: boolean },
): Promise<Cemetery[]> {
  const parks = await prisma.park.findMany({
    where: options?.includeInactive ? undefined : { status: "Activo" },
    orderBy: { name: "asc" },
  });
  return parks.map(parkToCemetery);
}

export async function getCemeteryBySlugFromDb(
  slug: string,
): Promise<Cemetery | undefined> {
  const park = await prisma.park.findFirst({
    where: { slug, status: "Activo" },
  });
  return park ? parkToCemetery(park) : undefined;
}

export async function getAllCemeterySlugsFromDb(): Promise<string[]> {
  const parks = await prisma.park.findMany({
    where: { status: "Activo" },
    select: { slug: true },
    orderBy: { name: "asc" },
  });
  return parks.map((park) => park.slug);
}

export async function getAllAdminParks(): Promise<AdminPark[]> {
  const parks = await prisma.park.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return parks.map(parkToAdminPark);
}

export async function getAdminParkById(
  id: string,
): Promise<AdminPark | undefined> {
  const park = await prisma.park.findUnique({ where: { id } });
  return park ? parkToAdminPark(park) : undefined;
}

export async function upsertAdminPark(park: AdminPark): Promise<AdminPark> {
  const data = adminParkToDbInput(park);
  const jsonSafe = {
    ...data,
    plans: JSON.parse(JSON.stringify(data.plans)),
    maintenanceCosts: JSON.parse(JSON.stringify(data.maintenanceCosts)),
  };
  const saved = await prisma.park.upsert({
    where: { id: park.id },
    create: { id: park.id, ...jsonSafe },
    update: jsonSafe,
  });
  return parkToAdminPark(saved);
}

export async function deleteAdminPark(id: string): Promise<void> {
  await prisma.park.delete({ where: { id } });
}
