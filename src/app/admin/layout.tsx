import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminParksProvider } from "@/context/AdminParksContext";

export const metadata = {
  title: "Admin | ComparaParques.cl",
  description: "Panel de gestión de parques, cementerios y crematorios.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminParksProvider>
      <div className="flex min-h-screen bg-brand-light">
        <div className="hidden w-64 shrink-0 lg:block xl:w-72">
          <div className="fixed inset-y-0 left-0 w-64 xl:w-72">
            <AdminSidebar />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </AdminParksProvider>
  );
}
