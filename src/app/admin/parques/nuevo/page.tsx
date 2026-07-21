"use client";

import { ParkForm } from "@/components/admin/parks/ParkForm";
import { createEmptyParkFormValues } from "@/lib/admin-parks";

export default function AdminNewParkPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-brand-dark">
          Agregar nuevo parque
        </h3>
        <p className="mt-1 text-sm text-brand-dark/60">
          Completa la ficha en pestañas. Los cambios se guardan en Neon
          (Vercel Postgres).
        </p>
      </div>
      <ParkForm mode="create" initialValues={createEmptyParkFormValues()} />
    </div>
  );
}
