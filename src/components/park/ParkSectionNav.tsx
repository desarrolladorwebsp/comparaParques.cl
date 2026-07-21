"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const TABS = [
  { id: "general", label: "Información general" },
  { id: "planes", label: "Planes memoriales" },
  { id: "mantencion", label: "Mantenciones" },
  { id: "ubicacion", label: "Ubicación" },
] as const;

export function ParkSectionNav() {
  const [active, setActive] = useState<string>("general");

  useEffect(() => {
    const sections = TABS.map((tab) => document.getElementById(tab.id)).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Secciones del parque"
      className="sticky top-16 z-30 -mx-4 overflow-x-auto border-b border-slate-200 bg-brand-light/95 px-4 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-2"
    >
      <ul className="flex min-w-max gap-1 py-2">
        {TABS.map((tab) => (
          <li key={tab.id}>
            <a
              href={`#${tab.id}`}
              className={cn(
                "inline-flex rounded-xl px-3 py-2 text-sm font-medium transition",
                active === tab.id
                  ? "bg-brand-dark text-white"
                  : "text-brand-dark/60 hover:bg-brand-muted hover:text-brand-dark",
              )}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
