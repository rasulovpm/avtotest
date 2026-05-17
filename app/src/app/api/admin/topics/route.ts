import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const topics = await prisma.category.findMany({
      orderBy: { number: "asc" },
      include: { _count: { select: { questions: true } } }
    });
    return NextResponse.json({
      topics: topics.map((t) => ({
        id: t.id,
        number: t.number,
        slug: t.slug,
        nameUz: t.nameUz,
        nameRu: t.nameRu,
        nameCy: t.nameCy,
        icon: t.icon,
        color: t.color,
        description: t.description,
        orderIndex: t.orderIndex,
        questionCount: t._count.questions
      }))
    });
  } catch (e: any) {
    if (String(e?.message).includes("FORBIDDEN")) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    if (String(e?.message).includes("UNAUTH")) return NextResponse.json({ error: "unauth" }, { status: 401 });
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.slug || !body.nameUz) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    const max = await prisma.category.aggregate({ _max: { number: true } });
    const next = (max._max.number || 0) + 1;

    const created = await prisma.category.create({
      data: {
        number: next,
        slug: String(body.slug).trim(),
        nameUz: String(body.nameUz).trim(),
        nameRu: String(body.nameRu || body.nameUz).trim(),
        nameCy: String(body.nameCy || body.nameUz).trim(),
        icon: body.icon || null,
        color: body.color || null,
        description: body.description || null,
        orderIndex: Number(body.orderIndex || next)
      }
    });
    return NextResponse.json({ id: created.id, number: created.number });
  } catch (e: any) {
    if (String(e?.message).includes("FORBIDDEN")) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    if (String(e?.message).includes("Unique")) return NextResponse.json({ error: "slug_exists" }, { status: 409 });
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
