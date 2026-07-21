import { Construction } from "lucide-react";

interface AdminComingSoonProps {
  title: string;
  description: string;
}

export function AdminComingSoon({ title, description }: AdminComingSoonProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-dashed border-brand-dark/15 bg-white px-6 py-16 text-center shadow-soft">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-muted text-brand-dark">
        <Construction className="h-6 w-6" strokeWidth={1.7} />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand-dark">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-dark/60">
        {description}
      </p>
      <span className="mt-5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-orange">
        Próximamente
      </span>
    </div>
  );
}
