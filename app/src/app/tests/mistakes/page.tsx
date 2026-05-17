import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MistakesClient from "./MistakesClient";

export const dynamic = "force-dynamic";

export default async function MistakesPage() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/auth/login?callbackUrl=/tests/mistakes");
  const userId = (session.user as any).id as string;

  // Foydalanuvchining xato javoblar bergan SAVOL ID'lari (oxirgi bo'yicha guruhlangan)
  const wrongAnswers = await prisma.userAnswer.findMany({
    where: { userId, isCorrect: false },
    orderBy: { answeredAt: "desc" },
    take: 200,
    include: {
      question: {
        include: {
          options: { orderBy: { orderIndex: "asc" } },
          category: true
        }
      }
    }
  });

  // Unique question ids — bir savolni faqat bir marta qaytarish
  const seen = new Set<string>();
  const unique = wrongAnswers.filter((a) => {
    if (seen.has(a.questionId)) return false;
    seen.add(a.questionId);
    return true;
  });

  const questions = unique.slice(0, 30).map((a) => ({
    id: a.question.id,
    textUz: a.question.textUz,
    textRu: a.question.textRu,
    textCy: a.question.textCy,
    explanationUz: a.question.explanationUz,
    explanationRu: a.question.explanationRu,
    explanationCy: a.question.explanationCy,
    imageUrl: a.question.imageUrl,
    categoryName: a.question.category?.nameUz || "—",
    options: a.question.options.map((o) => ({
      id: o.id,
      textUz: o.textUz,
      textRu: o.textRu,
      textCy: o.textCy
    }))
  }));

  const saved = await prisma.savedQuestion.findMany({
    where: { userId, questionId: { in: questions.map((q) => q.id) } },
    select: { questionId: true },
  });
  const initialSavedIds = saved.map((s) => s.questionId);

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg-0)" }}>
        <MistakesClient
          questions={questions}
          totalWrongCount={wrongAnswers.length}
          initialSavedIds={initialSavedIds}
        />
      </main>
      <Footer />
    </>
  );
}
