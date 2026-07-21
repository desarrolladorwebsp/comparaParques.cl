import Link from "next/link";

export default function ParkNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-brand-light px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-brand-orange">
        Parque no encontrado
      </p>
      <h1 className="mt-3 max-w-md text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">
        No encontramos la ficha que buscas
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-dark/65">
        Puede que el enlace haya cambiado. Vuelve al catálogo para explorar
        parques y cementerios disponibles.
      </p>
      <Link
        href="/#mapa"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-brand-dark px-5 text-sm font-medium text-white transition hover:bg-[#162a1f]"
      >
        Volver al catálogo de parques
      </Link>
    </div>
  );
}
