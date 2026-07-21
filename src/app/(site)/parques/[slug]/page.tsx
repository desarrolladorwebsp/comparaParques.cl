import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ParkFeatures, ParkMaintenance } from "@/components/park/ParkFeatures";
import { ParkGallery } from "@/components/park/ParkGallery";
import { ParkHero } from "@/components/park/ParkHero";
import { ParkMap } from "@/components/park/ParkMap";
import { ParkPlans } from "@/components/park/ParkPlans";
import { ParkSectionNav } from "@/components/park/ParkSectionNav";
import { ParkStickyCta } from "@/components/park/ParkStickyCta";
import {
  getAllCemeterySlugs,
  getCemeteryBySlug,
} from "@/lib/cemeteries";

interface ParkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCemeterySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ParkPageProps) {
  const { slug } = await params;
  const park = await getCemeteryBySlug(slug);
  if (!park) return { title: "Parque no encontrado | ComparaParques.cl" };

  return {
    title: `${park.name} | ComparaParques.cl`,
    description: park.description,
  };
}

export default async function ParkDetailPage({ params }: ParkPageProps) {
  const { slug } = await params;
  const park = await getCemeteryBySlug(slug);
  if (!park) notFound();

  return (
    <div className="bg-brand-light pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/#mapa"
          className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-brand-dark/70 transition hover:bg-brand-muted hover:text-brand-dark"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          Volver al catálogo de parques
        </Link>
      </div>

      <ParkHero park={park} />

      <div className="mx-auto mt-8 w-full max-w-6xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 space-y-8 lg:col-span-8">
            <ParkSectionNav />

            <section id="general" className="scroll-mt-36 space-y-5">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
                  Información general
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/70 sm:text-base">
                  {park.description}
                </p>
              </div>
              <ParkFeatures features={park.features} />
              <ParkGallery
                name={park.name}
                gallery={park.gallery}
                videoUrl={park.videoUrl}
              />
            </section>

            <section id="planes" className="scroll-mt-36 space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
                  Planes y soluciones memoriales
                </h2>
                <p className="mt-2 text-sm text-brand-dark/65">
                  Compara opciones de prevención y urgencia con precios de
                  referencia, sin presión comercial.
                </p>
              </div>
              <ParkPlans plans={park.plans} />
            </section>

            <section id="mantencion" className="scroll-mt-36">
              <ParkMaintenance maintenance={park.maintenanceCosts} />
            </section>

            <section id="ubicacion" className="scroll-mt-36 space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
                  Ubicación y accesibilidad
                </h2>
                <p className="mt-2 text-sm text-brand-dark/65">
                  Revisa cómo llegar y evalúa si el lugar es conveniente para tu
                  familia.
                </p>
              </div>
              <ParkMap
                name={park.name}
                address={park.address}
                lat={park.lat}
                lng={park.lng}
                accessNotes={park.accessNotes}
                transitNotes={park.transitNotes}
              />
            </section>
          </div>

          <div className="lg:col-span-4">
            <ParkStickyCta parkName={park.name} slug={park.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
