import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { getTopicProgress } from "@/lib/topic-progress";
import Header from "@/components/layout/Header";
import TopicQuiz from "./TopicQuiz";

export const dynamic = "force-dynamic";

export default async function TopicPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect(`/auth/login?callbackUrl=/topics/${params.slug}`);
  }
  const userId = (session.user as any).id as string;

  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });
  if (!category) notFound();

  const questions = await prisma.question.findMany({
    where: { categoryId: category.id, isPublished: true },
    include: { options: { orderBy: { orderIndex: "asc" } } },
    orderBy: { number: "asc" },
  });

  if (questions.length === 0) {
    return (
      <>
        <Header />
        <main style={{ padding: 48, textAlign: "center" }}>
          <h1 className="h-display" style={{ fontSize: 24 }}>Bu mavzuda hali savollar yo'q</h1>
          <p style={{ color: "var(--fg-2)", marginTop: 8 }}>Boshqa mavzuni tanlang.</p>
        </main>
      </>
    );
  }

  // Foydalanuvchining joriy attemptdagi javoblarini olib kelamiz (resume uchun)
  const progress = await getTopicProgress(userId, category.id);

  // Eng oxirgi yakunlangan TestResult'dan keyingi javoblarni qidiramiz
  const lastResult = progress.lastResultId
    ? await prisma.testResult.findUnique({
        where: { id: progress.lastResultId },
        select: { completedAt: true },
      })
    : null;

  const sinceFilter = lastResult ? { gt: lastResult.completedAt } : undefined;
  const existingAnswers = await prisma.topicAnswer.findMany({
    where: {
      userId,
      categoryId: category.id,
      ...(sinceFilter ? { answeredAt: sinceFilter } : {}),
    },
    select: {
      questionId: true,
      selectedOptionId: true,
      isCorrect: true,
      answeredAt: true,
    },
    orderBy: { answeredAt: "desc" },
  });

  // Har savol uchun eng oxirgi javobni olamiz
  const byQ = new Map<
    string,
    { selectedOptionId: string | null; isCorrect: boolean }
  >();
  for (const a of existingAnswers) {
    if (!byQ.has(a.questionId)) {
      byQ.set(a.questionId, {
        selectedOptionId: a.selectedOptionId,
        isCorrect: a.isCorrect,
      });
    }
  }

  const saved = await prisma.savedQuestion.findMany({
    where: { userId, questionId: { in: questions.map((q) => q.id) } },
    select: { questionId: true },
  });
  const initialSavedIds = saved.map((s) => s.questionId);

  return (
    <>
      <Header />
      <TopicQuiz
        category={{
          id: category.id,
          slug: category.slug,
          nameUz: category.nameUz,
          number: category.number,
        }}
        questions={questions.map((q) => ({
          id: q.id,
          number: q.number,
          textUz: q.textUz,
          imageUrl: q.imageUrl,
          options: q.options.map((o) => ({
            id: o.id,
            textUz: o.textUz,
          })),
        }))}
        initialAnswers={Object.fromEntries(
          Array.from(byQ.entries()).map(([qid, v]) => [
            qid,
            { selectedOptionId: v.selectedOptionId, isCorrect: v.isCorrect },
          ])
        )}
        alreadyCompleted={
          progress.status === "COMPLETED" && progress.answeredCount === 0
        }
        initialSavedIds={initialSavedIds}
      />
    </>
  );
}
