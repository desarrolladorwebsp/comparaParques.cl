"use client";

import { useMemo, useState } from "react";
import { ParksTable } from "@/components/admin/parks/ParksTable";
import { ParksToolbar } from "@/components/admin/parks/ParksToolbar";
import { useAdminParks } from "@/context/AdminParksContext";

export default function AdminParksPage() {
  const { parks, deletePark, ready, error } = useAdminParks();
  const [search, setSearch] = useState("");
  const [commune, setCommune] = useState("todas");
  const [type, setType] = useState("todos");

  const communes = useMemo(
    () =>
      Array.from(new Set(parks.map((park) => park.commune))).sort((a, b) =>
        a.localeCompare(b, "es"),
      ),
    [parks],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return parks.filter((park) => {
      const matchesSearch =
        !q ||
        park.name.toLowerCase().includes(q) ||
        park.commune.toLowerCase().includes(q);
      const matchesCommune = commune === "todas" || park.commune === commune;
      const matchesType = type === "todos" || park.type === type;
      return matchesSearch && matchesCommune && matchesType;
    });
  }, [parks, search, commune, type]);

  if (!ready) {
    return (
      <div className="rounded-3xl border border-brand-dark/10 bg-white px-6 py-16 text-center text-sm text-brand-dark/55 shadow-soft">
        Cargando catálogo desde la base de datos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center text-sm text-red-700 shadow-soft">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-brand-dark">
          Gestión de parques y cementerios
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-brand-dark/60">
          Administra la ficha transparente de cada entidad: parques cementerios,
          cementerios tradicionales y crematorios.
        </p>
      </div>

      <ParksToolbar
        search={search}
        commune={commune}
        type={type}
        communes={communes}
        onSearchChange={setSearch}
        onCommuneChange={setCommune}
        onTypeChange={setType}
        total={parks.length}
        filtered={filtered.length}
      />

      <ParksTable parks={filtered} onDelete={deletePark} />
    </div>
  );
}
