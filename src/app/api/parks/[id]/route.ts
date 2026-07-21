import { NextResponse } from "next/server";
import {
  deleteAdminPark,
  getAdminParkById,
  upsertAdminPark,
} from "@/lib/parks-db";
import type { AdminPark } from "@/types/admin";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const park = await getAdminParkById(id);
    if (!park) {
      return NextResponse.json({ error: "Parque no encontrado." }, { status: 404 });
    }
    return NextResponse.json({ park });
  } catch (error) {
    console.error("[GET /api/parks/:id]", error);
    return NextResponse.json(
      { error: "No se pudo cargar el parque." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as AdminPark;
    const existing = await getAdminParkById(id);
    if (!existing) {
      return NextResponse.json({ error: "Parque no encontrado." }, { status: 404 });
    }
    const park = await upsertAdminPark({ ...body, id });
    return NextResponse.json({ park });
  } catch (error) {
    console.error("[PUT /api/parks/:id]", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el parque." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const existing = await getAdminParkById(id);
    if (!existing) {
      return NextResponse.json({ error: "Parque no encontrado." }, { status: 404 });
    }
    await deleteAdminPark(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[DELETE /api/parks/:id]", error);
    return NextResponse.json(
      { error: "No se pudo eliminar el parque." },
      { status: 500 },
    );
  }
}
