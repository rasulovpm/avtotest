import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const tickets = await prisma.ticket.findMany({
      orderBy: { number: "asc" },
      include: { _count: { select: { questions: true } } }
    });
    return NextResponse.json({
      tickets: tickets.map((t) => ({
        id: t.id,
        number: t.number,
        titleUz: t.titleUz,
        titleRu: t.titleRu,
        titleCy: t.titleCy,
        description: t.description,
        isPublished: t.isPublished,
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
    if (!body.titleUz) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    const max = await prisma.ticket.aggregate({ _max: { number: true } });
    const next = (max._max.number || 0) + 1;
    const created = await prisma.ticket.create({
      data: {
        number: next,
        titleUz: String(body.titleUz).trim(),
        titleRu: String(body.titleRu || body.titleUz).trim(),
        titleCy: String(body.titleCy || body.titleUz).trim(),
        description: body.description || null,
        isPublished: body.isPublished !== false,
        orderIndex: Number(body.orderIndex || next)
      }
    });
    return NextResponse.json({ id: created.id, number: created.number });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
