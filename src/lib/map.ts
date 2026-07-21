/** Estilos sobrios alineados a brand-dark / brand-light */
export const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#e9ecef" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#1E3A2B" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f8f9fa" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c5d0c8" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#c5d9cb" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1E3A2B" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d5ddd8" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dde5df" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c2cfc6" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#b7c9c4" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5a7266" }],
  },
];

export const MARKER_ICON_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="56" viewBox="0 0 44 56" fill="none">
  <path d="M22 0C10.954 0 2 8.954 2 20c0 14.5 20 36 20 36s20-21.5 20-36C42 8.954 33.046 0 22 0z" fill="#1E3A2B"/>
  <circle cx="22" cy="20" r="9" fill="#F8F9FA"/>
  <path d="M22 12.5c-2.8 0-5 2-5 4.6 0 3.2 3.3 6.3 4.6 7.4a.7.7 0 0 0 .8 0c1.3-1.1 4.6-4.2 4.6-7.4 0-2.6-2.2-4.6-5-4.6z" fill="#E67E22"/>
</svg>
`)}`;

export function formatMinPrice(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}
