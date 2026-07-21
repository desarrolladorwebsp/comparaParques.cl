import type { Park } from "@/generated/prisma/client";
import type { AdminPark, AdminParkPlan, AdminParkStatus } from "@/types/admin";
import type {
  Cemetery,
  CemeteryMaintenance,
  CemeteryPlan,
  CemeteryType,
  PlanModality,
} from "@/types/cemetery";
import { modalityToNeedType, needTypeToModality } from "@/types/admin";

function asMaintenance(value: unknown): CemeteryMaintenance {
  if (value && typeof value === "object") {
    return value as CemeteryMaintenance;
  }
  return {
    type: "Anual",
    summary: "",
    includes: [],
  };
}

function normalizePlan(raw: Record<string, unknown>): CemeteryPlan {
  const needType = raw.needType as AdminParkPlan["needType"] | undefined;
  const modality =
    (raw.modality as PlanModality | undefined) ??
    needTypeToModality(needType ?? "prevencion");

  return {
    id: String(raw.id ?? ""),
    name: String(raw.name ?? ""),
    capacity: String(raw.capacity ?? ""),
    modality,
    priceFrom: Number(raw.priceFrom) || 0,
    description: String(raw.description ?? ""),
  };
}

function asCemeteryPlans(value: unknown): CemeteryPlan[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => normalizePlan(item as Record<string, unknown>));
}

function asAdminPlans(value: unknown): AdminParkPlan[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const raw = item as Record<string, unknown>;
    const needType =
      (raw.needType as AdminParkPlan["needType"] | undefined) ??
      modalityToNeedType(
        (raw.modality as PlanModality | undefined) ?? "Prevención",
      );

    return {
      id: String(raw.id ?? ""),
      name: String(raw.name ?? ""),
      capacity: String(raw.capacity ?? ""),
      needType,
      priceFrom: Number(raw.priceFrom) || 0,
      description: String(raw.description ?? ""),
      maintenanceNote: String(raw.maintenanceNote ?? ""),
    };
  });
}

export function parkToCemetery(park: Park): Cemetery {
  return {
    id: park.id,
    slug: park.slug,
    name: park.name,
    logoUrl: park.logoUrl,
    region: park.region,
    commune: park.commune,
    address: park.address,
    lat: park.lat,
    lng: park.lng,
    type: park.type as CemeteryType,
    rating: park.rating,
    minPrice: park.minPrice,
    imageUrl: park.imageUrl,
    mainImage: park.mainImage,
    gallery: park.gallery,
    videoUrl: park.videoUrl,
    description: park.description,
    features: park.features,
    plans: asCemeteryPlans(park.plans),
    maintenanceCosts: asMaintenance(park.maintenanceCosts),
    accessNotes: park.accessNotes,
    transitNotes: park.transitNotes,
  };
}

export function parkToAdminPark(park: Park): AdminPark {
  return {
    id: park.id,
    slug: park.slug,
    name: park.name,
    type: park.type as CemeteryType,
    status: park.status as AdminParkStatus,
    region: park.region,
    commune: park.commune,
    address: park.address,
    lat: park.lat,
    lng: park.lng,
    description: park.description,
    logoUrl: park.logoUrl,
    imageUrl: park.imageUrl,
    mainImage: park.mainImage,
    gallery: park.gallery,
    videoUrl: park.videoUrl,
    features: park.features,
    plans: asAdminPlans(park.plans),
    maintenanceCosts: asMaintenance(park.maintenanceCosts),
    accessNotes: park.accessNotes,
    transitNotes: park.transitNotes,
    rating: park.rating,
    minPrice: park.minPrice,
    assignedExecutiveIds: park.assignedExecutiveIds,
    partnerSellerIds: park.partnerSellerIds,
    createdAt: park.createdAt.toISOString(),
    updatedAt: park.updatedAt.toISOString(),
  };
}

export function adminParkToDbInput(park: AdminPark) {
  const plansForPublic = park.plans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    capacity: plan.capacity,
    modality: needTypeToModality(plan.needType),
    needType: plan.needType,
    priceFrom: plan.priceFrom,
    description: plan.description,
    maintenanceNote: plan.maintenanceNote ?? "",
  }));

  return {
    slug: park.slug,
    name: park.name,
    type: park.type,
    status: park.status,
    region: park.region,
    commune: park.commune,
    address: park.address,
    lat: park.lat,
    lng: park.lng,
    description: park.description,
    logoUrl: park.logoUrl,
    imageUrl: park.imageUrl || park.mainImage,
    mainImage: park.mainImage,
    gallery: park.gallery,
    videoUrl: park.videoUrl,
    features: park.features,
    plans: plansForPublic as unknown as object,
    maintenanceCosts: park.maintenanceCosts as unknown as object,
    accessNotes: park.accessNotes,
    transitNotes: park.transitNotes,
    rating: park.rating,
    minPrice: park.minPrice,
    assignedExecutiveIds: park.assignedExecutiveIds,
    partnerSellerIds: park.partnerSellerIds,
  };
}
