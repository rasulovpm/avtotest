import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { getTopicProgress } from "@/lib/topic-progress";

/**
 * Bitta savolga javob saqlash (real-time).
 *
 * Body: { questionId: string, optionId: string | null }
 *
 * Agar shu javob bilan birga foydalanuvchi kategoriya BARCHA savollariga
 * javob bergan bo'lsa — biz darrov `TestResult` yozamiz va `completed: true`
 * qaytaramiz (frontend yakuniy ekranga o'tadi).
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await requireUser();
    const { questionId, optionId } = await req.json();
    if (!questionId) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: { slug: params.slug },
    });
    if (!category) {
      return NextResponse.json({ error: "category_not_found" }, { status: 404 });
    }

    // Savol shu kategoriyaga tegishli ekanini tekshiramiz
    const question = await prisma.question.findFirst({
      where: { id: questionId, categoryId: category.id },
      include: { options: { select: { id: true, isCorrect: true } } },
    });
    if (!question) {
      return NextResponse.json(
        { error: "question_not_in_category" },
        { status: 400 }
      );
    }

    const correctOpt = question.options.find((o) => o.isCorrect);
    const isCorrect = !!optionId && optionId === correctOpt?.id;

    // Mavzu javoblari ALOHIDA jadvalga yoziladi — boshqa testlardagi
    // javoblar shu kategoriya progressiga aralashmasligi uchun.
    await prisma.topicAnswer.create({
      data: {
        userId: user.id,
        categoryId: category.id,
        questionId,
        selectedOptionId: optionId || null,
        isCorrect,
      },
    });

    // Progress yangilanishi va auto-complete tekshiruvi
    const progress = await getTopicProgress(user.id, category.id);

    let completed = false;
    let resultId: string | null = null;

    if (
      progress.totalQuestions > 0 &&
      progress.answeredCount >= progress.totalQuestions
    ) {
      // Hammasiga javob berildi — natijani yozamiz
      const score = Math.round(
        (progress.correctCount / progress.totalQuestions) * 100
      );
      const passed = progress.correctCount === progress.totalQuestions;
      const result = await prisma.testResult.create({
        data: {
          userId: user.id,
          testId: null,
          categoryId: category.id,
          score,
          totalQuestions: progress.totalQuestions,
          correctCount: progress.correctCount,
          timeSpentSeconds: 0,
          passed,
        },
      });
      completed = true;
      resultId = result.id;

      const xpGain = progress.correctCount * 3;
      if (xpGain > 0) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            totalXp: { increment: xpGain },
            lastActiveAt: new Date(),
          },
        });
      }
    }

    return NextResponse.json({
      isCorrect,
      correctOptionId: correctOpt?.id ?? null,
      explanation: {
        uz: question.explanationUz,
        ru: question.explanationRu,
        cy: question.explanationCy,
      },
      relatedLawArticle: question.relatedLawArticle,
      progress: {
        answeredCount: progress.answeredCount,
        correctCount: progress.correctCount,
        totalQuestions: progress.totalQuestions,
        percent: progress.percent,
      },
      completed,
      resultId,
    });
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
