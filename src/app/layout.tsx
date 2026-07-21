import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComparaParques.cl",
  description:
    "Compara cementerios, sepulturas y servicios exequiales en Chile. Asesoría 100% independiente y gratuita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.className} antialiased bg-brand-light text-brand-dark`}>
        {children}
      </body>
    </html>
  );
}
