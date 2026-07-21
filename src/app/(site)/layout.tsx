import { Footer, NavBar } from "@/components/ui";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
