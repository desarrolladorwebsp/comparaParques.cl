import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComparaParques.cl",
  description:
    "Orientación humana e independiente para comparar parques, cementerios y servicios exequiales en Chile. Con calma, claridad y cero presión.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.className} flex min-h-full flex-col antialiased bg-brand-light text-brand-dark`}
      >
        {children}
      </body>
    </html>
  );
}
