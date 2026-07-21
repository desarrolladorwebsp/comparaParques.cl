import { Badge } from "@/components/ui";
import { formatMinPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { CemeteryPlan } from "@/types/cemetery";

interface ParkPlansProps {
  plans: CemeteryPlan[];
}

export function ParkPlans({ plans }: ParkPlansProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => {
        const prevention = plan.modality === "Prevención";

        return (
          <article
            key={plan.id}
            className={cn(
              "flex h-full flex-col rounded-3xl border p-5 shadow-soft",
              prevention
                ? "border-brand-orange/30 bg-gradient-to-br from-orange-50/80 to-white"
                : "border-slate-200 bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold tracking-tight text-brand-dark">
                {plan.name}
              </h3>
              <Badge
                variant={prevention ? "solid" : "soft"}
                className="shrink-0 normal-case"
              >
                {plan.modality}
              </Badge>
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-brand-dark/45">
              Capacidad: {plan.capacity}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-dark/65">
              {plan.description}
            </p>
            <p className="mt-4 text-lg font-semibold text-brand-orange">
              Desde {formatMinPrice(plan.priceFrom)}
            </p>
            <p className="mt-1 text-xs text-brand-dark/45">
              Precio de referencia orientativo. Te ayudamos a validar condiciones
              vigentes.
            </p>
          </article>
        );
      })}
    </div>
  );
}
