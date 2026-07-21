import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui";
import type { Cemetery } from "@/types/cemetery";

interface ParkHeroProps {
  park: Cemetery;
}

export function ParkHero({ park }: ParkHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[18rem] w-full sm:h-[22rem] lg:h-[26rem]">
        <Image
          src={park.mainImage}
          alt={park.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-brand-dark/25" />
      </div>

      <div className="relative mx-auto -mt-24 w-full max-w-6xl px-4 sm:-mt-28 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-white/95 p-5 shadow-lift backdrop-blur-md sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-brand-muted sm:h-20 sm:w-20">
                <Image
                  src={park.logoUrl}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="soft" className="normal-case">
                    {park.commune}, {park.region}
                  </Badge>
                  <Badge variant="outline" className="normal-case">
                    {park.type}
                  </Badge>
                </div>
                <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl md:text-4xl">
                  {park.name}
                </h1>
                <p className="mt-2 text-sm text-brand-dark/60">{park.address}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-brand-orange">
                <Star className="h-4 w-4 fill-brand-orange" />
                {park.rating.toFixed(1)} promedio
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-dark/55">
                <BadgeCheck className="h-4 w-4 text-brand-dark" strokeWidth={1.8} />
                Información auditada por ComparaParques.cl
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
