"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { SearchInput, SelectInput } from "@/components/ui";
import { CEMETERY_TYPES } from "@/types/cemetery";

interface ParksToolbarProps {
  search: string;
  commune: string;
  type: string;
  communes: string[];
  onSearchChange: (value: string) => void;
  onCommuneChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  total: number;
  filtered: number;
}

export function ParksToolbar({
  search,
  commune,
  type,
  communes,
  onSearchChange,
  onCommuneChange,
  onTypeChange,
  total,
  filtered,
}: ParksToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-brand-dark/10 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-brand-dark/60">
            Mostrando{" "}
            <span className="font-semibold text-brand-dark">{filtered}</span> de{" "}
            <span className="font-semibold text-brand-dark">{total}</span>{" "}
            entidades
          </p>
        </div>
        <Link
          href="/admin/parques/nuevo"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-medium text-white shadow-glow transition hover:bg-[#d36f1b]"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Agregar Nuevo Parque
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <SearchInput
          label="Buscar"
          placeholder="Nombre del parque o cementerio..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <SelectInput
          label="Comuna"
          value={commune}
          onChange={(e) => onCommuneChange(e.target.value)}
          placeholder="Todas las comunas"
          options={[
            { value: "todas", label: "Todas las comunas" },
            ...communes.map((item) => ({ value: item, label: item })),
          ]}
        />
        <SelectInput
          label="Tipo"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          placeholder="Todos los tipos"
          options={[
            { value: "todos", label: "Todos los tipos" },
            ...CEMETERY_TYPES.map((item) => ({ value: item, label: item })),
          ]}
        />
      </div>
    </div>
  );
}
