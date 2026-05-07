import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// Training rejimda foydalanuvchi har savoldan keyin to'g'ri/xato ko'radi.
// Real imtihon rejimida bu API chaqirilmaydi.
export async function POST(req: NextRequest) {
  try {
    await requireUser();
    const { questionId, optionId } = await req.json();
    if (!questionId) return NextResponse.json({ error: "bad_request" }, { status: 400 });

    const q = await prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true }
    });
    if (!q) return NextResponse.json({ error: "not_found" }, { status: 404 });

    const correct = q.options.find((o) => o.isCorrect);
    const isCorrect = !!optionId && optionId === correct?.id;

    return NextResponse.json({
      isCorrect,
      correctOptionId: correct?.id,
      explanation: {
        uz: q.explanationUz,
        ru: q.explanationRu,
        cy: q.explanationCy
      },
      relatedLawArticle: q.relatedLawArticle
    });
  } catch (e: any) {
    if (String(e?.message).includes("UNAUTH")) {
      return NextResponse.json({ error: "unauth" }, { status: 401 });
    }
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
