import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const { testId, answers, timeSpentSeconds } = await req.json();

    if (!testId || typeof answers !== "object") {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          include: { question: { include: { options: true } } }
        }
      }
    });
    if (!test) return NextResponse.json({ error: "test_not_found" }, { status: 404 });

    let correct = 0;
    const userAnswerData: any[] = [];

    for (const tq of test.questions) {
      const q = tq.question;
      const selectedOptionId = answers[q.id] as string | undefined;
      const correctOpt = q.options.find((o) => o.isCorrect);
      const isCorrect = !!selectedOptionId && selectedOptionId === correctOpt?.id;
      if (isCorrect) correct++;

      userAnswerData.push({
        userId: user.id,
        questionId: q.id,
        testId: test.id,
        selectedOptionId: selectedOptionId || null,
        isCorrect,
        timeSpentSeconds: 0
      });
    }

    const totalQ = test.questions.length;
    const score = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
    const passed = correct >= test.passingScore;

    const result = await prisma.testResult.create({
      data: {
        userId: user.id,
        testId: test.id,
        score,
        totalQuestions: totalQ,
        correctCount: correct,
        timeSpentSeconds: Number(timeSpentSeconds || 0),
        passed
      }
    });

    if (userAnswerData.length) {
      await prisma.userAnswer.createMany({ data: userAnswerData });
    }

    // XP
    const xpGain = correct * 5 + (passed ? 50 : 0);
    await prisma.user.update({
      where: { id: user.id },
      data: { totalXp: { increment: xpGain }, lastActiveAt: new Date() }
    });

    return NextResponse.json({ resultId: result.id, score, correct, total: totalQ, passed });
  } catch (e: any) {
    if (String(e?.message).includes("UNAUTHENTICATED")) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
