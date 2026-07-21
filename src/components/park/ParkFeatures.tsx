import {
  Check,
  Leaf,
  Lock,
  Car,
  Trees,
  Users,
} from "lucide-react";
import type { CemeteryMaintenance } from "@/types/cemetery";
import { formatMinPrice } from "@/lib/format";

const FEATURE_ICONS = [Trees, Leaf, Users, Lock, Car, Check] as const;

interface ParkFeaturesProps {
  features: string[];
}

export function ParkFeatures({ features }: ParkFeaturesProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {features.map((feature, index) => {
        const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
        return (
          <li
            key={feature}
            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-brand-light/80 p-4"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange/12 text-brand-orange">
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className="pt-1.5 text-sm font-medium text-brand-dark">
              {feature}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

interface ParkMaintenanceProps {
  maintenance: CemeteryMaintenance;
}

export function ParkMaintenance({ maintenance }: ParkMaintenanceProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold text-brand-dark">
          Transparencia de mantenciones
        </h3>
        <span className="rounded-full bg-brand-muted px-2.5 py-1 text-xs font-medium text-brand-dark/65">
          Modalidad {maintenance.type}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-brand-dark/70">
        {maintenance.summary}
      </p>
      {typeof maintenance.annualEstimate === "number" ? (
        <p className="mt-4 text-base font-semibold text-brand-orange">
          Estimación anual referencial:{" "}
          {formatMinPrice(maintenance.annualEstimate)}
        </p>
      ) : null}
      <ul className="mt-4 space-y-2">
        {maintenance.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-brand-dark/70"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-brand-dark/45">
        Sin letra chica escondida: te ayudamos a confirmar montos vigentes y
        condiciones exactas antes de cualquier decisión.
      </p>
    </div>
  );
}
