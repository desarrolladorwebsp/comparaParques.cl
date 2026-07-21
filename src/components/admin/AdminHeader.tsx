"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

const TITLES: { match: RegExp; title: string }[] = [
  { match: /^\/admin\/parques\/nuevo/, title: "Nuevo parque / cementerio" },
  { match: /^\/admin\/parques\/[^/]+\/editar/, title: "Editar parque" },
  { match: /^\/admin\/parques/, title: "Parques y Cementerios" },
  { match: /^\/admin\/servicios/, title: "Servicios y Planes" },
  { match: /^\/admin\/ejecutivos/, title: "Ejecutivos / Vendedores" },
  { match: /^\/admin\/leads/, title: "Leads / Solicitudes" },
  { match: /^\/admin$/, title: "Panel administrativo" },
];

function titleFromPath(pathname: string) {
  return (
    TITLES.find((item) => item.match.test(pathname))?.title ??
    "Panel administrativo"
  );
}

export function AdminHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = titleFromPath(pathname);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-brand-dark/10 bg-white/95 px-4 backdrop-blur sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-dark/10 text-brand-dark lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-dark/40">
              Backoffice
            </p>
            <h2 className="truncate text-base font-semibold tracking-tight text-brand-dark sm:text-lg">
              {title}
            </h2>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-brand-dark/10 bg-white px-3 text-sm font-medium text-brand-dark transition hover:bg-brand-muted sm:px-4"
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
          <span className="hidden sm:inline">Ver sitio público</span>
          <span className="sm:hidden">Sitio</span>
        </Link>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-brand-dark/50"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[17rem] flex-col shadow-lift">
            <div className="absolute right-3 top-3 z-10">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div onClick={() => setMobileOpen(false)} className="h-full">
              <AdminSidebar />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
