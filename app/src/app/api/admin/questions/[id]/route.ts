import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.options.some((o: any) => o.isCorrect)) {
      return NextResponse.json({ error: "no_correct_option" }, { status: 400 });
    }

    const ops: any[] = [
      prisma.option.deleteMany({ where: { questionId: params.id } }),
      prisma.question.update({
        where: { id: params.id },
        data: {
          categoryId: body.categoryId || null,
          textUz: body.textUz,
          textRu: body.textRu || body.textUz,
          textCy: body.textCy || body.textUz,
          explanationUz: body.explanationUz || null,
          explanationRu: body.explanationRu || null,
          explanationCy: body.explanationCy || null,
          imageUrl: body.imageUrl || null,
          difficulty: body.difficulty || "MEDIUM",
          isPublished: !!body.isPublished,
          options: {
            create: body.options.map((o: any, i: number) => ({
              textUz: o.textUz,
              textRu: o.textRu || o.textUz,
              textCy: o.textCy || o.textUz,
              isCorrect: !!o.isCorrect,
              orderIndex: i
            }))
          }
        }
      })
    ];

    if (Array.isArray(body.ticketIds)) {
      ops.push(prisma.ticketQuestion.deleteMany({ where: { questionId: params.id } }));
      if (body.ticketIds.length > 0) {
        ops.push(
          prisma.ticketQuestion.createMany({
            data: (body.ticketIds as string[]).map((tid, i) => ({
              ticketId: tid,
              questionId: params.id,
              orderIndex: i
            }))
          })
        );
      }
    }

    await prisma.$transaction(ops);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    await prisma.question.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
