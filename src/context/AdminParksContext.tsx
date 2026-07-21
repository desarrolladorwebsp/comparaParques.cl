"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AdminPark } from "@/types/admin";

interface AdminParksContextValue {
  parks: AdminPark[];
  ready: boolean;
  error: string | null;
  getParkById: (id: string) => AdminPark | undefined;
  upsertPark: (park: AdminPark, options?: { create?: boolean }) => Promise<void>;
  deletePark: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const AdminParksContext = createContext<AdminParksContextValue | null>(null);

export function AdminParksProvider({ children }: { children: ReactNode }) {
  const [parks, setParks] = useState<AdminPark[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/parks?scope=admin");
    if (!response.ok) {
      throw new Error("No se pudo cargar el catálogo desde la base de datos.");
    }
    const data = (await response.json()) as { parks: AdminPark[] };
    setParks(data.parks);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refresh();
        if (!cancelled) setError(null);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Error al cargar parques.",
          );
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const getParkById = useCallback(
    (id: string) => parks.find((park) => park.id === id),
    [parks],
  );

  const upsertPark = useCallback(
    async (park: AdminPark, options?: { create?: boolean }) => {
      const isCreate = options?.create ?? false;
      const response = await fetch(
        isCreate ? "/api/parks" : `/api/parks/${park.id}`,
        {
          method: isCreate ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(park),
        },
      );
      if (!response.ok) {
        throw new Error("No se pudo guardar el parque en la base de datos.");
      }
      const data = (await response.json()) as { park: AdminPark };
      setParks((prev) => {
        const index = prev.findIndex((item) => item.id === data.park.id);
        if (index === -1) return [data.park, ...prev];
        const next = [...prev];
        next[index] = data.park;
        return next;
      });
    },
    [],
  );

  const deletePark = useCallback(async (id: string) => {
    const response = await fetch(`/api/parks/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("No se pudo eliminar el parque.");
    }
    setParks((prev) => prev.filter((park) => park.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      parks,
      ready,
      error,
      getParkById,
      upsertPark,
      deletePark,
      refresh,
    }),
    [parks, ready, error, getParkById, upsertPark, deletePark, refresh],
  );

  return (
    <AdminParksContext.Provider value={value}>
      {children}
    </AdminParksContext.Provider>
  );
}

export function useAdminParks() {
  const context = useContext(AdminParksContext);
  if (!context) {
    throw new Error("useAdminParks debe usarse dentro de AdminParksProvider");
  }
  return context;
}
