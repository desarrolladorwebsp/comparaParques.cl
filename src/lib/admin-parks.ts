import type { AdminPark, AdminParkFormValues, AdminParkPlan } from "@/types/admin";

export function slugifyParkName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createEmptyPlan(): AdminParkPlan {
  return {
    id: `plan-${crypto.randomUUID()}`,
    name: "",
    capacity: "",
    needType: "prevencion",
    priceFrom: 0,
    description: "",
    maintenanceNote: "",
  };
}

export function createEmptyParkFormValues(): AdminParkFormValues {
  return {
    name: "",
    type: "",
    status: "Activo",
    region: "RM",
    commune: "",
    address: "",
    lat: "",
    lng: "",
    description: "",
    logoUrl: "",
    mainImage: "",
    gallery: [""],
    videoUrl: "",
    features: [],
    plans: [createEmptyPlan()],
    maintenanceType: "Anual",
    maintenanceAnnualEstimate: "",
    maintenanceSummary: "",
    maintenanceIncludes: "",
    accessNotes: "",
    transitNotes: "",
    assignedExecutiveIds: [],
    partnerSellerIds: [],
  };
}

export function adminParkToFormValues(park: AdminPark): AdminParkFormValues {
  return {
    name: park.name,
    type: park.type,
    status: park.status,
    region: park.region,
    commune: park.commune,
    address: park.address,
    lat: String(park.lat),
    lng: String(park.lng),
    description: park.description,
    logoUrl: park.logoUrl,
    mainImage: park.mainImage,
    gallery: park.gallery.length > 0 ? park.gallery : [""],
    videoUrl: park.videoUrl,
    features: [...park.features],
    plans:
      park.plans.length > 0
        ? park.plans.map((plan) => ({ ...plan }))
        : [createEmptyPlan()],
    maintenanceType: park.maintenanceCosts.type,
    maintenanceAnnualEstimate:
      park.maintenanceCosts.annualEstimate != null
        ? String(park.maintenanceCosts.annualEstimate)
        : "",
    maintenanceSummary: park.maintenanceCosts.summary,
    maintenanceIncludes: park.maintenanceCosts.includes.join("\n"),
    accessNotes: park.accessNotes,
    transitNotes: park.transitNotes,
    assignedExecutiveIds: [...park.assignedExecutiveIds],
    partnerSellerIds: [...park.partnerSellerIds],
  };
}

export function formValuesToAdminPark(
  values: AdminParkFormValues,
  existing?: AdminPark,
): AdminPark {
  const now = new Date().toISOString();
  const gallery = values.gallery.map((url) => url.trim()).filter(Boolean);
  const plans = values.plans
    .filter((plan) => plan.name.trim())
    .map((plan) => ({
      ...plan,
      name: plan.name.trim(),
      capacity: plan.capacity.trim(),
      description: plan.description.trim(),
      maintenanceNote: plan.maintenanceNote?.trim() ?? "",
      priceFrom: Number(plan.priceFrom) || 0,
    }));

  const minPrice =
    plans.length > 0
      ? Math.min(...plans.map((plan) => plan.priceFrom))
      : (existing?.minPrice ?? 0);

  const mainImage = values.mainImage.trim();
  const slugBase = slugifyParkName(values.name) || "parque";
  const slug = existing?.slug ?? slugBase;

  return {
    id: existing?.id ?? `park-${crypto.randomUUID()}`,
    slug,
    name: values.name.trim(),
    type: values.type || "Parque Privado",
    status: values.status,
    region: values.region.trim(),
    commune: values.commune.trim(),
    address: values.address.trim(),
    lat: Number(values.lat) || 0,
    lng: Number(values.lng) || 0,
    description: values.description.trim(),
    logoUrl: values.logoUrl.trim(),
    imageUrl: mainImage || existing?.imageUrl || "",
    mainImage,
    gallery,
    videoUrl: values.videoUrl.trim(),
    features: values.features.map((f) => f.trim()).filter(Boolean),
    plans,
    maintenanceCosts: {
      type: values.maintenanceType,
      annualEstimate: values.maintenanceAnnualEstimate
        ? Number(values.maintenanceAnnualEstimate)
        : undefined,
      summary: values.maintenanceSummary.trim(),
      includes: values.maintenanceIncludes
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    },
    accessNotes: values.accessNotes.trim(),
    transitNotes: values.transitNotes.trim(),
    rating: existing?.rating ?? 4.5,
    minPrice,
    assignedExecutiveIds: values.assignedExecutiveIds,
    partnerSellerIds: values.partnerSellerIds,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}
