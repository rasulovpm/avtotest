import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.titleUz?.trim() || !Array.isArray(body.questionIds) || body.questionIds.length === 0) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    const test = await prisma.test.create({
      data: {
        titleUz: body.titleUz,
        titleRu: body.titleRu || body.titleUz,
        titleCy: body.titleCy || body.titleUz,
        categoryId: body.categoryId || null,
        timeLimitMinutes: Number(body.timeLimitMinutes) || 25,
        passingScore: Number(body.passingScore) || Math.floor(body.questionIds.length * 0.9),
        questionCount: body.questionIds.length,
        isExamSimulation: !!body.isExamSimulation,
        isPublished: !!body.isPublished,
        questions: {
          create: body.questionIds.map((qid: string, i: number) => ({
            questionId: qid,
            orderIndex: i
          }))
        }
      }
    });
    return NextResponse.json({ id: test.id });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
