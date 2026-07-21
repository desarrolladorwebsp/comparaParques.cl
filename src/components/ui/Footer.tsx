import {
  FOOTER_SERVICE_LINKS,
  NAV_LINKS,
  SITE_CONTACT,
} from "@/lib/navigation";

function FooterBrand() {
  return (
    <div className="space-y-4">
      <a href="#inicio" className="inline-flex items-center gap-2.5">
        <span
          aria-hidden
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-light/10 text-brand-light"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 2.2 3.5 5v4.2c0 3.5 2.3 6.1 5.5 7 3.2-.9 5.5-3.5 5.5-7V5L9 2.2Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="m6.6 9 1.6 1.6 3.2-3.3"
              stroke="#E67E22"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-lg font-semibold tracking-tight text-brand-light">
          ComparaParques<span className="text-brand-orange">.cl</span>
        </span>
      </a>
      <p className="max-w-xs text-sm leading-relaxed text-brand-light/70">
        Acompañamos a las familias chilenas a decidir con calma, claridad y
        total independencia.
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <FooterBrand />

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-brand-light">
              Encuéntranos aquí
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-light/65 transition hover:text-brand-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#asesoria"
                  className="text-sm text-brand-light/65 transition hover:text-brand-orange"
                >
                  Recibir orientación
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-brand-light">
              Soluciones memoriales
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-light/65 transition hover:text-brand-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-brand-light">
              Estamos para escucharte
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-light/65">
              <li>
                <span className="block text-xs uppercase tracking-wide text-brand-light/40">
                  WhatsApp
                </span>
                <a
                  href={SITE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-block transition hover:text-brand-orange"
                >
                  {SITE_CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-brand-light/40">
                  Correo
                </span>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="mt-0.5 inline-block transition hover:text-brand-orange"
                >
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wide text-brand-light/40">
                  Horario
                </span>
                <span className="mt-0.5 block">{SITE_CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-light/10 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-brand-light/45 sm:text-[0.8rem]">
            © 2026 ComparaParques.cl — Todos los derechos reservados. Orientación
            independiente, humana y sin presión comercial.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-brand-light/55">
            <a
              href="#privacidad"
              className="transition hover:text-brand-orange"
            >
              Políticas de Privacidad
            </a>
            <a href="#terminos" className="transition hover:text-brand-orange">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
