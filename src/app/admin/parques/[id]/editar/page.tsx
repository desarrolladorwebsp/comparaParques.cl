"use client";

import { use } from "react";
import Link from "next/link";
import { ParkForm } from "@/components/admin/parks/ParkForm";
import { useAdminParks } from "@/context/AdminParksContext";
import { adminParkToFormValues } from "@/lib/admin-parks";

interface EditParkPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditParkPage({ params }: EditParkPageProps) {
  const { id } = use(params);
  const { getParkById, ready } = useAdminParks();
  const park = getParkById(id);

  if (!ready) {
    return (
      <div className="rounded-3xl border border-brand-dark/10 bg-white px-6 py-16 text-center text-sm text-brand-dark/55 shadow-soft">
        Cargando ficha...
      </div>
    );
  }

  if (!park) {
    return (
      <div className="rounded-3xl border border-dashed border-brand-dark/15 bg-white px-6 py-16 text-center shadow-soft">
        <h3 className="text-lg font-semibold text-brand-dark">
          Parque no encontrado
        </h3>
        <p className="mt-2 text-sm text-brand-dark/60">
          Puede que haya sido eliminado del panel local.
        </p>
        <Link
          href="/admin/parques"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-brand-dark px-4 text-sm font-medium text-white"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-brand-dark">
          Editar: {park.name}
        </h3>
        <p className="mt-1 text-sm text-brand-dark/60">
          Actualiza datos generales, multimedia, beneficios y planes.
        </p>
      </div>
      <ParkForm
        mode="edit"
        existing={park}
        initialValues={adminParkToFormValues(park)}
      />
    </div>
  );
}
