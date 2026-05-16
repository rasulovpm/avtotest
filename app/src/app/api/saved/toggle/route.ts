import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * Bitta savolni saqlash/saqlanganni olib tashlash.
 *
 * Body: { questionId: string, save?: boolean }
 *  - `save: true`   → saqlashga urinish (idempotent)
 *  - `save: false`  → saqlanganni olib tashlash
 *  - `save` berilmasa → toggle
 *
 * Javob: { saved: boolean }
 */
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const questionId: string | undefined = body?.questionId;
    if (!questionId) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const existing = await prisma.savedQuestion.findUnique({
      where: { userId_questionId: { userId: user.id, questionId } },
      select: { id: true },
    });

    const desired = typeof body.save === "boolean" ? body.save : !existing;

    if (desired && !existing) {
      // Savol haqiqatan mavjudligini tekshiramiz
      const exists = await prisma.question.findUnique({
        where: { id: questionId },
        select: { id: true },
      });
      if (!exists) {
        return NextResponse.json({ error: "question_not_found" }, { status: 404 });
      }
      await prisma.savedQuestion.create({
        data: { userId: user.id, questionId },
      });
      return NextResponse.json({ saved: true });
    }
    if (!desired && existing) {
      await prisma.savedQuestion.delete({ where: { id: existing.id } });
      return NextResponse.json({ saved: false });
    }
    return NextResponse.json({ saved: !!existing });
  } catch (e: any) {
    if (String(e?.message).includes("UNAUTHENTICATED")) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "internal_error", detail: String(e?.message) },
      { status: 500 }
    );
  }
}
