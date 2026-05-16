import { prisma } from "./prisma";

/**
 * Topic (category) progress mantig'i.
 *
 * Manba — faqat `TopicAnswer` jadvali (mavzu testidan kelgan javoblar).
 * Real imtihon, mavzu imtihoni, biletlar va boshqa testlardagi javoblar
 * mavzu progressiga ta'sir qilmaydi.
 *
 * "Joriy attempt" — eng oxirgi yakunlangan `TestResult` (categoryId bo'yicha)
 * `completedAt`'idan keyingi `TopicAnswer`'lar. Agar hali yakunlamagan bo'lsa —
 * barcha `TopicAnswer`'lar.
 *
 * Foiz — faqat to'g'ri javoblar / jami savol (foydalanuvchi shartiga ko'ra
 * noto'g'ri javob progressga + bo'lmaydi).
 *
 * Auto-complete: BARCHA savollarga (to'g'ri yoki noto'g'ri) javob berilganda
 * yakuniy `TestResult` yoziladi va attempt yopiladi.
 */

export type TopicProgress = {
  categoryId: string;
  totalQuestions: number;
  answeredCount: number;     // joriy attemptda javob berilgan unique savollar (to'g'ri + noto'g'ri)
  correctCount: number;       // joriy attemptda to'g'ri javob berilgan unique savollar
  percent: number;            // correctCount / totalQuestions (0..100) — faqat to'g'ri
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  lastResultId: string | null;
};

/** Bitta kategoriya uchun joriy attempt progressini hisoblaydi. */
export async function getTopicProgress(
  userId: string,
  categoryId: string
): Promise<TopicProgress> {
  const totalQuestions = await prisma.question.count({
    where: { categoryId, isPublished: true },
  });

  const lastResult = await prisma.testResult.findFirst({
    where: { userId, categoryId },
    orderBy: { completedAt: "desc" },
    select: { id: true, completedAt: true },
  });

  const since = lastResult ? { gt: lastResult.completedAt } : undefined;
  const answers = await prisma.topicAnswer.findMany({
    where: {
      userId,
      categoryId,
      ...(since ? { answeredAt: since } : {}),
    },
    select: { questionId: true, isCorrect: true, answeredAt: true },
    orderBy: { answeredAt: "desc" },
  });

  const latestByQuestion = new Map<string, { isCorrect: boolean }>();
  for (const a of answers) {
    if (!latestByQuestion.has(a.questionId)) {
      latestByQuestion.set(a.questionId, { isCorrect: a.isCorrect });
    }
  }
  const answeredCount = latestByQuestion.size;
  let correctCount = 0;
  for (const v of latestByQuestion.values()) if (v.isCorrect) correctCount++;

  let status: TopicProgress["status"] = "NOT_STARTED";
  if (lastResult && answeredCount === 0) status = "COMPLETED";
  else if (answeredCount === 0) status = "NOT_STARTED";
  else status = "IN_PROGRESS";

  return {
    categoryId,
    totalQuestions,
    answeredCount,
    correctCount,
    percent:
      totalQuestions > 0
        ? Math.round((correctCount / totalQuestions) * 100)
        : 0,
    status,
    lastResultId: lastResult?.id ?? null,
  };
}

/** Bir nechta kategoriya uchun progressni bitta query'da hisoblaydi. */
export async function getTopicProgressMap(
  userId: string,
  categoryIds: string[]
): Promise<Map<string, TopicProgress>> {
  const result = new Map<string, TopicProgress>();
  if (categoryIds.length === 0) return result;

  const totals = await prisma.question.groupBy({
    by: ["categoryId"],
    where: { categoryId: { in: categoryIds }, isPublished: true },
    _count: { _all: true },
  });
  const totalsByCat = new Map<string, number>();
  for (const t of totals) {
    if (t.categoryId) totalsByCat.set(t.categoryId, t._count._all);
  }

  const lastResults = await prisma.testResult.findMany({
    where: { userId, categoryId: { in: categoryIds } },
    orderBy: { completedAt: "desc" },
    select: { id: true, categoryId: true, completedAt: true },
  });
  const lastByCat = new Map<string, { id: string; completedAt: Date }>();
  for (const r of lastResults) {
    if (r.categoryId && !lastByCat.has(r.categoryId)) {
      lastByCat.set(r.categoryId, { id: r.id, completedAt: r.completedAt });
    }
  }

  const allAnswers = await prisma.topicAnswer.findMany({
    where: {
      userId,
      categoryId: { in: categoryIds },
    },
    select: {
      questionId: true,
      categoryId: true,
      isCorrect: true,
      answeredAt: true,
    },
    orderBy: { answeredAt: "desc" },
  });

  const perCategory = new Map<string, Map<string, { isCorrect: boolean }>>();
  for (const cid of categoryIds) perCategory.set(cid, new Map());

  for (const a of allAnswers) {
    const cid = a.categoryId;
    if (!perCategory.has(cid)) continue;
    const last = lastByCat.get(cid);
    if (last && a.answeredAt <= last.completedAt) continue;
    const map = perCategory.get(cid)!;
    if (!map.has(a.questionId)) {
      map.set(a.questionId, { isCorrect: a.isCorrect });
    }
  }

  for (const cid of categoryIds) {
    const total = totalsByCat.get(cid) ?? 0;
    const answers = perCategory.get(cid) ?? new Map();
    let correctCount = 0;
    for (const v of answers.values()) if (v.isCorrect) correctCount++;
    const answeredCount = answers.size;
    const last = lastByCat.get(cid);
    let status: TopicProgress["status"];
    if (answeredCount > 0) status = "IN_PROGRESS";
    else if (last) status = "COMPLETED";
    else status = "NOT_STARTED";

    result.set(cid, {
      categoryId: cid,
      totalQuestions: total,
      answeredCount,
      correctCount,
      percent: total > 0 ? Math.round((correctCount / total) * 100) : 0,
      status,
      lastResultId: last?.id ?? null,
    });
  }

  return result;
}
