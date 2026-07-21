"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { AdminPark } from "@/types/admin";

interface ParksTableProps {
  parks: AdminPark[];
  onDelete: (id: string) => void | Promise<void>;
}

export function ParksTable({ parks, onDelete }: ParksTableProps) {
  if (parks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-brand-dark/15 bg-white px-6 py-16 text-center shadow-soft">
        <p className="text-sm font-medium text-brand-dark">
          No hay parques con esos filtros
        </p>
        <p className="mt-1 text-sm text-brand-dark/55">
          Prueba otro nombre, comuna o tipo de entidad.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-dark/10 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-brand-dark/8 bg-brand-muted/60 text-[11px] uppercase tracking-[0.12em] text-brand-dark/50">
            <tr>
              <th className="px-4 py-3 font-medium sm:px-5">Entidad</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">
                Ubicación
              </th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">
                Tipo
              </th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 text-right font-medium sm:px-5">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {parks.map((park) => (
              <tr
                key={park.id}
                className="border-b border-brand-dark/6 last:border-0 hover:bg-brand-muted/30"
              >
                <td className="px-4 py-3.5 sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-brand-muted">
                      {park.logoUrl || park.imageUrl ? (
                        <Image
                          src={park.logoUrl || park.imageUrl}
                          alt=""
                          fill
                          unoptimized={park.logoUrl?.endsWith(".svg")}
                          sizes="44px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-brand-dark">
                        {park.name}
                      </p>
                      <p className="truncate text-xs text-brand-dark/50 md:hidden">
                        {park.commune}, {park.region}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3.5 md:table-cell">
                  <p className="text-brand-dark/75">
                    {park.commune}
                    <span className="text-brand-dark/35"> · </span>
                    {park.region}
                  </p>
                </td>
                <td className="hidden px-4 py-3.5 sm:table-cell">
                  <Badge variant="soft" className="normal-case">
                    {park.type}
                  </Badge>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      park.status === "Activo"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {park.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 sm:px-5">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/admin/parques/${park.id}/editar`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-brand-dark transition hover:bg-brand-muted"
                      title="Editar"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={1.8} />
                      <span className="hidden lg:inline">Editar</span>
                    </Link>
                    <Link
                      href={`/parques/${park.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-brand-dark transition hover:bg-brand-muted"
                      title="Ver ficha"
                    >
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
                      <span className="hidden lg:inline">Ver ficha</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            `¿Eliminar "${park.name}" de la base de datos?`,
                          )
                        ) {
                          void onDelete(park.id);
                        }
                      }}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      title="Eliminar"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                      <span className="hidden lg:inline">Eliminar</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
