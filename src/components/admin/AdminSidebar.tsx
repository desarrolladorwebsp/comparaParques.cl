"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ScrollText,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ADMIN_NAV_ITEMS, type AdminNavItem } from "@/types/admin";

const ICONS: Record<AdminNavItem["icon"], LucideIcon> = {
  trees: Trees,
  scroll: ScrollText,
  users: Users,
  chart: BarChart3,
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-brand-dark/10 bg-brand-dark text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
          ComparaParques.cl
        </p>
        <h1 className="mt-1 text-lg font-semibold tracking-tight">
          Panel administrativo
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-white/50">
          Gestión de parques, cementerios y crematorios
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Navegación admin">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const active =
            item.enabled &&
            (pathname === item.href || pathname.startsWith(`${item.href}/`));

          if (!item.enabled) {
            return (
              <div
                key={item.href}
                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/35"
                title="Próximamente"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/45">
                    {item.badge}
                  </span>
                ) : null}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-white/12 font-medium text-white"
                  : "text-white/70 hover:bg-white/8 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4 text-xs text-white/40">
        v1 · Sin autenticación (próximo)
      </div>
    </aside>
  );
}
