"use client";

import { useMemo } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { MAP_STYLES, MARKER_ICON_URL } from "@/lib/map";

interface ParkMapProps {
  name: string;
  address: string;
  lat: number;
  lng: number;
  accessNotes: string;
  transitNotes: string;
}

const containerStyle = { width: "100%", height: "100%" };

export function ParkMap({
  name,
  address,
  lat,
  lng,
  accessNotes,
  transitNotes,
}: ParkMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const { isLoaded, loadError } = useJsApiLoader({
    id: "comparaparques-google-maps",
    googleMapsApiKey: apiKey,
  });

  const icon = useMemo(() => {
    if (!isLoaded || typeof google === "undefined") return undefined;
    return {
      url: MARKER_ICON_URL,
      scaledSize: new google.maps.Size(40, 51),
      anchor: new google.maps.Point(20, 51),
    };
  }, [isLoaded]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
        <div className="h-64 w-full sm:h-80 lg:h-96">
          {!apiKey || loadError ? (
            <div className="flex h-full items-center justify-center bg-brand-muted px-6 text-center text-sm text-brand-dark/60">
              {loadError
                ? "No pudimos cargar el mapa en este momento."
                : "Configura la clave de Google Maps para ver la ubicación."}
            </div>
          ) : !isLoaded ? (
            <div className="flex h-full items-center justify-center bg-brand-muted text-sm text-brand-dark/60">
              Preparando el mapa...
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat, lng }}
              zoom={14}
              options={{
                styles: MAP_STYLES,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            >
              <MarkerF position={{ lat, lng }} icon={icon} title={name} />
            </GoogleMap>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
            <MapPin className="h-4 w-4 text-brand-orange" strokeWidth={1.8} />
            Dirección
          </div>
          <p className="text-sm leading-relaxed text-brand-dark/70">{address}</p>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
            {accessNotes}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm font-semibold text-brand-dark">
            Accesibilidad y transporte
          </p>
          <p className="mt-2 text-sm leading-relaxed text-brand-dark/60">
            {transitNotes}
          </p>
        </div>
      </div>
    </div>
  );
}
