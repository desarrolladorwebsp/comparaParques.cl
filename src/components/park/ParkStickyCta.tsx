"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONTACT } from "@/lib/navigation";

interface ParkStickyCtaProps {
  parkName: string;
  slug: string;
}

export function ParkStickyCta({ parkName, slug }: ParkStickyCtaProps) {
  const whatsappUrl = `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(
    `Hola, me interesa conocer más sobre ${parkName} y me gustaría recibir orientación independiente.`,
  )}`;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lift sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-orange">
          Orientación neutral
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-brand-dark">
          ¿Te interesa este parque?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-dark/65">
          Te ayudamos a cotizar y conseguir las mejores condiciones o descuentos
          de preventa en {parkName}, sin cobros adicionales.
        </p>

        <div className="mt-5 space-y-3">
          <a
            href={`/?park=${encodeURIComponent(slug)}#asesoria`}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-orange px-5 text-sm font-medium text-white shadow-glow transition hover:bg-[#d36f1b]"
          >
            Solicitar Asesoría para este Parque
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-brand-dark/15 bg-white px-5 text-sm font-medium text-brand-dark transition hover:bg-brand-muted"
          >
            <MessageCircle className="h-4 w-4 text-brand-orange" strokeWidth={1.8} />
            Consultar por WhatsApp con un Asesor
          </a>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-brand-dark/45">
          Independientes y sin presión. Tu tranquilidad es nuestra prioridad.
        </p>
      </div>
    </aside>
  );
}
