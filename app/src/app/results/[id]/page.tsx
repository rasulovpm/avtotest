import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResultsClient from "./ResultsClient";
import { getAuthSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ResultPage({ params }: { params: { id: string } }) {
  const session = await getAuthSession();
  if (!session?.user) redirect("/auth/login");

  const result = await prisma.testResult.findUnique({
    where: { id: params.id },
    include: {
      test: true
    }
  });
  if (!result || result.userId !== (session.user as any).id) notFound();

  // Xato javoblarni topamiz
  const wrongAnswers = await prisma.userAnswer.findMany({
    where: {
      userId: result.userId,
      testId: result.testId,
      isCorrect: false,
      answeredAt: { gte: new Date(result.completedAt.getTime() - 60 * 60 * 1000) }
    },
    include: {
      question: { include: { category: true } }
    },
    take: 50
  });

  // Kategoriya bo'yicha taqsimlash
  const allAnswers = await prisma.userAnswer.findMany({
    where: {
      userId: result.userId,
      testId: result.testId,
      answeredAt: { gte: new Date(result.completedAt.getTime() - 60 * 60 * 1000) }
    },
    include: { question: { include: { category: true } } }
  });

  const catStats: Record<string, { correct: number; total: number; nameUz: string; nameRu: string; nameCy: string }> = {};
  for (const a of allAnswers) {
    const c = a.question.category;
    if (!c) continue;
    if (!catStats[c.id]) catStats[c.id] = { correct: 0, total: 0, nameUz: c.nameUz, nameRu: c.nameRu, nameCy: c.nameCy };
    catStats[c.id].total++;
    if (a.isCorrect) catStats[c.id].correct++;
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <ResultsClient
          result={{
            id: result.id,
            score: result.score,
            correctCount: result.correctCount,
            totalQuestions: result.totalQuestions,
            timeSpentSeconds: result.timeSpentSeconds,
            passed: result.passed,
            testTitle: {
              uz: result.test.titleUz,
              ru: result.test.titleRu,
              cy: result.test.titleCy
            },
            testId: result.test.id
          }}
          wrongAnswers={wrongAnswers.map((a) => ({
            id: a.id,
            questionUz: a.question.textUz,
            questionRu: a.question.textRu,
            questionCy: a.question.textCy
          }))}
          categoryStats={Object.values(catStats)}
        />
      </main>
      <Footer />
    </>
  );
}
