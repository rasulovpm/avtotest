import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await req.json();
    const data: any = {};
    if (body.titleUz !== undefined) data.titleUz = String(body.titleUz).trim();
    if (body.titleRu !== undefined) data.titleRu = String(body.titleRu).trim();
    if (body.titleCy !== undefined) data.titleCy = String(body.titleCy).trim();
    if (body.description !== undefined) data.description = body.description || null;
    if (body.isPublished !== undefined) data.isPublished = !!body.isPublished;
    if (body.orderIndex !== undefined) data.orderIndex = Number(body.orderIndex || 0);

    if (Array.isArray(body.questionIds)) {
      // To'liq qaytadan biriktiramiz
      await prisma.$transaction([
        prisma.ticketQuestion.deleteMany({ where: { ticketId: params.id } }),
        prisma.ticket.update({ where: { id: params.id }, data }),
        prisma.ticketQuestion.createMany({
          data: (body.questionIds as string[]).map((qid, i) => ({
            ticketId: params.id,
            questionId: qid,
            orderIndex: i
          }))
        })
      ]);
    } else {
      await prisma.ticket.update({ where: { id: params.id }, data });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    await prisma.ticket.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
