import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await req.json();
    const data: any = {};
    if (body.slug !== undefined) data.slug = String(body.slug).trim();
    if (body.nameUz !== undefined) data.nameUz = String(body.nameUz).trim();
    if (body.nameRu !== undefined) data.nameRu = String(body.nameRu).trim();
    if (body.nameCy !== undefined) data.nameCy = String(body.nameCy).trim();
    if (body.icon !== undefined) data.icon = body.icon || null;
    if (body.color !== undefined) data.color = body.color || null;
    if (body.description !== undefined) data.description = body.description || null;
    if (body.orderIndex !== undefined) data.orderIndex = Number(body.orderIndex || 0);
    await prisma.category.update({ where: { id: params.id }, data });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (String(e?.message).includes("FORBIDDEN")) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    if (String(e?.message).includes("Unique")) return NextResponse.json({ error: "slug_exists" }, { status: 409 });
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
