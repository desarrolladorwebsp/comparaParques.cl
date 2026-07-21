"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/cn";

function BrandMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-xl",
          inverted
            ? "bg-brand-light/15 text-brand-light"
            : "bg-brand-dark text-brand-light",
        )}
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
      <span
        className={cn(
          "text-base font-semibold tracking-tight sm:text-lg",
          inverted ? "text-white" : "text-brand-dark",
        )}
      >
        ComparaParques<span className="text-brand-orange">.cl</span>
      </span>
    </span>
  );
}

function scrollToHash(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleNavClick(href: string) {
    setOpen(false);
    scrollToHash(href);
  }

  const inverted = !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-dark/10 bg-white shadow-soft backdrop-blur-xl"
          : "border-b border-white/10 bg-brand-dark/95 shadow-[0_10px_32px_-14px_rgba(0,0,0,0.55)] backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a
          href="#inicio"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#inicio");
          }}
          className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          <BrandMark inverted={inverted} />
        </a>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(link.href);
              }}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                inverted
                  ? "text-white hover:bg-white/10"
                  : "text-brand-dark/80 hover:bg-brand-muted hover:text-brand-dark",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleNavClick("#asesoria")}
          >
            Recibir orientación
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition lg:hidden",
            inverted
              ? "border-white/20 bg-white/10 text-brand-light hover:bg-white/15"
              : "border-brand-dark/10 bg-white text-brand-dark hover:bg-brand-muted",
          )}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.75} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className="fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              className="fixed right-0 top-0 z-50 flex h-dvh w-[min(100%,20rem)] flex-col bg-brand-light shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <div className="flex h-16 items-center justify-between border-b border-brand-dark/8 px-4">
                <BrandMark />
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-dark hover:bg-brand-muted"
                  aria-label="Cerrar menú"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index + 0.08 }}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="rounded-2xl px-4 py-3.5 text-base font-medium text-brand-dark transition hover:bg-brand-muted"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="border-t border-brand-dark/8 p-4">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleNavClick("#asesoria")}
                >
                  Recibir orientación
                </Button>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
