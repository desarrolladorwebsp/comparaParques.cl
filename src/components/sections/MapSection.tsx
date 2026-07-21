"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { MapPin, Search, Star } from "lucide-react";
import cemeteriesData from "../../../data/cemeteries.json";
import { Badge, Button } from "@/components/ui";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { formatMinPrice, MAP_STYLES, MARKER_ICON_URL } from "@/lib/map";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/cn";
import {
  CEMETERY_TYPES,
  SANTIAGO_CENTER,
  type Cemetery,
  type CemeteryType,
} from "@/types/cemetery";

const cemeteries = cemeteriesData as Cemetery[];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

function scrollToAsesoria() {
  document.getElementById("asesoria")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function MapSection() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded, loadError } = useJsApiLoader({
    id: "comparaparques-google-maps",
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [communeQuery, setCommuneQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<CemeteryType[]>([]);

  const communes = useMemo(
    () =>
      Array.from(new Set(cemeteries.map((item) => item.commune))).sort((a, b) =>
        a.localeCompare(b, "es"),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const query = communeQuery.trim().toLowerCase();

    return cemeteries.filter((item) => {
      const matchesCommune =
        !query ||
        item.commune.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query);
      const matchesType =
        activeTypes.length === 0 || activeTypes.includes(item.type);
      return matchesCommune && matchesType;
    });
  }, [activeTypes, communeQuery]);

  const selected = filtered.find((item) => item.id === selectedId) ?? null;

  const markerIcon = useMemo(() => {
    if (!isLoaded || typeof google === "undefined") return undefined;
    return {
      url: MARKER_ICON_URL,
      scaledSize: new google.maps.Size(40, 51),
      anchor: new google.maps.Point(20, 51),
    };
  }, [isLoaded]);

  const onLoad = useCallback((instance: google.maps.Map) => {
    setMap(instance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  function toggleType(type: CemeteryType) {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type],
    );
  }

  function focusCemetery(cemetery: Cemetery) {
    setSelectedId(cemetery.id);
    map?.panTo({ lat: cemetery.lat, lng: cemetery.lng });
    map?.setZoom(13);
  }

  return (
    <section
      id="mapa"
      className="relative scroll-mt-24 overflow-hidden bg-brand-light py-16 sm:py-20 lg:py-24"
      aria-labelledby="map-heading"
    >
      <BackgroundPattern variant="dots" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-orange sm:text-sm">
            Cerca de tu familia
          </p>
          <h2
            id="map-heading"
            className="mt-3 text-balance text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl md:text-4xl"
          >
            Encuentra con calma el lugar que mejor acompaña a los tuyos
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-brand-dark/65 sm:text-base">
            Ubica parques y cementerios cercanos, compara con claridad y elige
            la opción que entregue más tranquilidad a tu familia.
          </p>
        </motion.div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:mt-12">
          {/* Mobile filters */}
          <div className="space-y-3 border-b border-slate-200 p-4 lg:hidden">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark/40" />
              <input
                value={communeQuery}
                onChange={(event) => setCommuneQuery(event.target.value)}
                list="map-commune-options"
                placeholder="Buscar por comuna o nombre"
                className="h-11 w-full rounded-xl border border-slate-200 bg-brand-light pl-10 pr-3 text-sm text-brand-dark outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
              />
            </label>
            <select
              value={activeTypes[0] ?? ""}
              onChange={(event) => {
                const value = event.target.value as CemeteryType | "";
                setActiveTypes(value ? [value] : []);
              }}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-brand-dark outline-none focus:border-brand-orange"
            >
              <option value="">Todos los tipos</option>
              {CEMETERY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <datalist id="map-commune-options">
              {communes.map((commune) => (
                <option key={commune} value={commune} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Desktop side panel */}
            <aside className="hidden border-r border-slate-200 lg:col-span-4 lg:flex lg:h-[34rem] lg:flex-col">
              <div className="space-y-3 border-b border-slate-200 p-4">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-dark/40" />
                  <input
                    value={communeQuery}
                    onChange={(event) => setCommuneQuery(event.target.value)}
                    placeholder="Buscar por comuna o nombre"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-brand-light pl-10 pr-3 text-sm text-brand-dark outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  />
                </label>
                <div className="flex flex-wrap gap-2">
                  {CEMETERY_TYPES.map((type) => {
                    const active = activeTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleType(type)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                          active
                            ? "border-brand-orange bg-orange-50 text-brand-orange"
                            : "border-slate-200 bg-white text-brand-dark/65 hover:border-slate-300",
                        )}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                {filtered.length === 0 ? (
                  <p className="px-2 py-8 text-center text-sm text-brand-dark/50">
                    No encontramos opciones con esos criterios. Prueba otra comuna o tipo.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {filtered.map((cemetery) => {
                      const active = cemetery.id === selectedId;
                      return (
                        <li key={cemetery.id}>
                          <button
                            type="button"
                            onClick={() => focusCemetery(cemetery)}
                            className={cn(
                              "w-full rounded-2xl border p-3 text-left transition",
                              active
                                ? "border-brand-orange bg-orange-50/70 shadow-sm"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-brand-light/80",
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-dark/8 text-brand-dark">
                                <MapPin className="h-4 w-4" strokeWidth={1.8} />
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-brand-dark">
                                  {cemetery.name}
                                </p>
                                <p className="mt-0.5 text-xs text-brand-dark/55">
                                  {cemetery.commune} · {cemetery.type}
                                </p>
                                <p className="mt-1 text-xs font-medium text-brand-orange">
                                  Desde {formatMinPrice(cemetery.minPrice)}
                                </p>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </aside>

            {/* Map canvas */}
            <div className="relative h-[22rem] sm:h-[28rem] lg:col-span-8 lg:h-[34rem]">
              {!apiKey ? (
                <MapFallback message="Para ver el mapa, configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en tu archivo .env.local." />
              ) : loadError ? (
                <MapFallback message="No pudimos cargar Google Maps. Revisa la clave API y las restricciones del dominio." />
              ) : !isLoaded ? (
                <MapFallback message="Preparando el mapa con cuidado..." loading />
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={SANTIAGO_CENTER}
                  zoom={10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  options={{
                    styles: MAP_STYLES,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    clickableIcons: false,
                  }}
                >
                  {filtered.map((cemetery) => (
                    <MarkerF
                      key={cemetery.id}
                      position={{ lat: cemetery.lat, lng: cemetery.lng }}
                      icon={markerIcon}
                      title={cemetery.name}
                      onClick={() => focusCemetery(cemetery)}
                    />
                  ))}

                  {selected ? (
                    <InfoWindowF
                      position={{ lat: selected.lat, lng: selected.lng }}
                      onCloseClick={() => setSelectedId(null)}
                      options={{ pixelOffset: new google.maps.Size(0, -42) }}
                    >
                      <div className="w-[16.5rem] overflow-hidden rounded-xl">
                        <div className="relative h-24 w-full overflow-hidden rounded-lg bg-brand-muted">
                          <Image
                            src={selected.imageUrl}
                            alt={selected.name}
                            fill
                            sizes="264px"
                            className="object-cover"
                          />
                        </div>
                        <div className="pt-3">
                          <h3 className="text-sm font-semibold text-brand-dark">
                            {selected.name}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant="soft" className="normal-case">
                              {selected.commune}
                            </Badge>
                            <Badge variant="outline" className="normal-case">
                              {selected.type}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-xs text-brand-dark/60">
                            <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
                            {selected.rating.toFixed(1)}
                            <span className="mx-1 text-brand-dark/25">·</span>
                            Desde {formatMinPrice(selected.minPrice)}
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            fullWidth
                            className="mt-3"
                            onClick={scrollToAsesoria}
                          >
                            Pedir orientación sobre este lugar
                          </Button>
                        </div>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapFallback({
  message,
  loading = false,
}: {
  message: string;
  loading?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-muted to-[#dfe8e2] px-6 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-dark/10 text-brand-dark">
        <MapPin className="h-6 w-6" strokeWidth={1.7} />
      </span>
      <p className="max-w-sm text-sm leading-relaxed text-brand-dark/70">
        {message}
      </p>
      {loading ? (
        <span className="h-1.5 w-24 animate-pulse rounded-full bg-brand-dark/20" />
      ) : null}
    </div>
  );
}
