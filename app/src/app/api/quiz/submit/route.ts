import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const { testId, answers, timeSpentSeconds, questionIds } = await req.json();

    if (!testId || typeof answers !== "object") {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    // Tickets — javoblar ALOHIDA `ticketAnswer` jadvaliga yoziladi; bilet
    // natijasi faqat shu jadval orqali hisoblanadi (real imtihon/mavzu
    // testidagi javoblar bilet natijasiga ta'sir qilmaydi).
    if (typeof testId === "string" && testId.startsWith("ticket:")) {
      const ticketId = testId.slice("ticket:".length);
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          questions: {
            include: { question: { include: { options: true } } },
            orderBy: { orderIndex: "asc" }
          }
        }
      });
      if (!ticket) return NextResponse.json({ error: "ticket_not_found" }, { status: 404 });

      let correct = 0;
      const ta: any[] = [];
      for (const tq of ticket.questions) {
        const q = tq.question;
        const selectedOptionId = (answers as any)[q.id] as string | undefined;
        const correctOpt = q.options.find((o) => o.isCorrect);
        const isCorrect = !!selectedOptionId && selectedOptionId === correctOpt?.id;
        if (isCorrect) correct++;
        if (selectedOptionId) {
          ta.push({
            userId: user.id,
            ticketId: ticket.id,
            questionId: q.id,
            selectedOptionId,
            isCorrect,
          });
        }
      }
      if (ta.length) await prisma.ticketAnswer.createMany({ data: ta });
      const total = ticket.questions.length;
      const xpGain = correct * 3;
      if (xpGain > 0) {
        await prisma.user.update({
          where: { id: user.id },
          data: { totalXp: { increment: xpGain }, lastActiveAt: new Date() }
        });
      }
      return NextResponse.json({
        ticket: true,
        ticketId: ticket.id,
        correct,
        total,
        score: total > 0 ? Math.round((correct / total) * 100) : 0
      });
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

    // Savollar manbai: agar test RANDOM_BY_TOPIC bo'lsa — clientdan kelgan questionIds,
    // aks holda — testning bog'langan savollari.
    let questionsList: { id: string; options: { id: string; isCorrect: boolean }[] }[];

    if (test.generationMode === "RANDOM_BY_TOPIC") {
      const ids = Array.isArray(questionIds) && questionIds.length > 0
        ? (questionIds as string[])
        : Object.keys(answers as any);
      const rows = await prisma.question.findMany({
        where: { id: { in: ids } },
        include: { options: true }
      });
      const byId = new Map(rows.map((r) => [r.id, r] as const));
      questionsList = ids
        .map((id) => byId.get(id))
        .filter((r): r is NonNullable<typeof r> => !!r)
        .map((q) => ({ id: q.id, options: q.options.map((o) => ({ id: o.id, isCorrect: o.isCorrect })) }));
    } else {
      questionsList = test.questions.map((tq) => ({
        id: tq.question.id,
        options: tq.question.options.map((o) => ({ id: o.id, isCorrect: o.isCorrect }))
      }));
    }

    let correct = 0;
    const userAnswerData: any[] = [];

    for (const q of questionsList) {
      const selectedOptionId = (answers as any)[q.id] as string | undefined;
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

    const totalQ = questionsList.length;
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
