import { NextResponse } from "next/server";
import {
  getAllAdminParks,
  getAllCemeteriesFromDb,
  upsertAdminPark,
} from "@/lib/parks-db";
import type { AdminPark } from "@/types/admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scope = searchParams.get("scope");

    if (scope === "admin") {
      const parks = await getAllAdminParks();
      return NextResponse.json({ parks });
    }

    const parks = await getAllCemeteriesFromDb();
    return NextResponse.json({ parks });
  } catch (error) {
    console.error("[GET /api/parks]", error);
    return NextResponse.json(
      { error: "No se pudo cargar el catálogo de parques." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminPark;
    if (!body?.name || !body?.slug) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (name, slug)." },
        { status: 400 },
      );
    }
    const park = await upsertAdminPark(body);
    return NextResponse.json({ park }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/parks]", error);
    return NextResponse.json(
      { error: "No se pudo crear el parque." },
      { status: 500 },
    );
  }
}
