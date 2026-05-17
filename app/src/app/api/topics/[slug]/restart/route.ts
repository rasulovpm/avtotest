import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * Mavzu testini qayta yechishni boshlash.
 *
 * Foydalanuvchi yakunlangan mavzuni qayta yechmoqchi bo'lganda chaqiriladi.
 * Biz `TestResult` yozuvini saqlab qolamiz (tarix uchun) va shu vaqtga yangi
 * "marker" sifatida xizmat qiladigan TestResult yaratamiz — keyingi UserAnswer'lar
 * joriy attempt sifatida hisoblanadi.
 *
 * Aslida — joriy attemptdagi javoblar `lastResult.completedAt`'dan keyingi
 * UserAnswer'lar bo'lgani uchun, qayta boshlash uchun bizga `lastResult` ni
 * yangilash kifoya: shu attemptga "yakuniy" deb belgilash. Agar foydalanuvchi
 * yakunlamasdan tugma bossa — joriy javoblari saqlanib turadi (avval ham mavjud
 * UserAnswerlar). Demak bu API faqat YAKUNLANGAN mavzular uchun ma'noli.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await requireUser();
    const category = await prisma.category.findUnique({
      where: { slug: params.slug },
    });
    if (!category) {
      return NextResponse.json({ error: "category_not_found" }, { status: 404 });
    }

    // Joriy attempt javoblari — eng oxirgi TestResult'dan keyingi UserAnswerlar
    const lastResult = await prisma.testResult.findFirst({
      where: { userId: user.id, categoryId: category.id },
      orderBy: { completedAt: "desc" },
      select: { completedAt: true },
    });

    // Agar yakunlangan natija mavjud bo'lmasa va javoblar mavjud — bu IN_PROGRESS
    // holatdir. Bu holatda biz "yakuniy" marker yaratamiz: hozirgi javoblar
    // arxivga ko'chadi, qayta yechishda yangi attempt boshlanadi.
    const since = lastResult ? { gt: lastResult.completedAt } : undefined;
    const currentAttemptAnswers = await prisma.topicAnswer.findMany({
      where: {
        userId: user.id,
        categoryId: category.id,
        ...(since ? { answeredAt: since } : {}),
      },
      select: { questionId: true, isCorrect: true },
    });

    const latest = new Map<string, boolean>();
    for (const a of currentAttemptAnswers) {
      if (!latest.has(a.questionId)) latest.set(a.questionId, a.isCorrect);
    }
    let correctCount = 0;
    for (const ok of latest.values()) if (ok) correctCount++;
    const totalQuestions = await prisma.question.count({
      where: { categoryId: category.id, isPublished: true },
    });

    // Yakuniy marker yaratamiz — qisman bajarilgan attempt sifatida.
    await prisma.testResult.create({
      data: {
        userId: user.id,
        testId: null,
        categoryId: category.id,
        score:
          totalQuestions > 0
            ? Math.round((correctCount / totalQuestions) * 100)
            : 0,
        totalQuestions,
        correctCount,
        timeSpentSeconds: 0,
        passed: false,
      },
    });

    return NextResponse.json({ ok: true });
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
