import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import QuizEngine from "./QuizEngine";
import { getAuthSession } from "@/lib/auth";
import { sampleQuestionsByTopic } from "@/lib/exam-sampler";

export const dynamic = "force-dynamic";

export default async function QuizPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { mode?: string };
}) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect(`/auth/login?callbackUrl=/tests/${params.id}`);
  }

  const test = await prisma.test.findUnique({ where: { id: params.id } });
  if (!test) notFound();

  // Savollarni tanlash strategiyasi
  let questionRows: { id: string; textUz: string; textRu: string; textCy: string; explanationUz: string | null; explanationRu: string | null; explanationCy: string | null; imageUrl: string | null; options: { id: string; textUz: string; textRu: string; textCy: string }[] }[] = [];

  if (test.generationMode === "RANDOM_BY_TOPIC") {
    const ids = await sampleQuestionsByTopic(test.questionCount);
    const rows = await prisma.question.findMany({
      where: { id: { in: ids } },
      include: { options: { orderBy: { orderIndex: "asc" } } }
    });
    // ids tartibini saqlaymiz (sample shuffle qilingan)
    const byId = new Map(rows.map((r) => [r.id, r] as const));
    questionRows = ids
      .map((id) => byId.get(id))
      .filter((r): r is NonNullable<typeof r> => !!r)
      .map((q) => ({
        id: q.id,
        textUz: q.textUz,
        textRu: q.textRu,
        textCy: q.textCy,
        explanationUz: q.explanationUz,
        explanationRu: q.explanationRu,
        explanationCy: q.explanationCy,
        imageUrl: q.imageUrl,
        options: q.options.map((o) => ({ id: o.id, textUz: o.textUz, textRu: o.textRu, textCy: o.textCy }))
      }));
  } else {
    const tqs = await prisma.testQuestion.findMany({
      where: { testId: test.id },
      include: { question: { include: { options: { orderBy: { orderIndex: "asc" } } } } },
      orderBy: { orderIndex: "asc" }
    });
    questionRows = tqs.map((tq) => ({
      id: tq.question.id,
      textUz: tq.question.textUz,
      textRu: tq.question.textRu,
      textCy: tq.question.textCy,
      explanationUz: tq.question.explanationUz,
      explanationRu: tq.question.explanationRu,
      explanationCy: tq.question.explanationCy,
      imageUrl: tq.question.imageUrl,
      options: tq.question.options.map((o) => ({ id: o.id, textUz: o.textUz, textRu: o.textRu, textCy: o.textCy }))
    }));
  }

  // Default rejim — exam (real imtihon). ?mode=training bo'lsa training rejim.
  const mode = searchParams.mode === "training" ? "training" : "exam";

  return (
    <QuizEngine
      testId={test.id}
      titleUz={test.titleUz}
      titleRu={test.titleRu}
      titleCy={test.titleCy}
      timeLimitSec={test.timeLimitMinutes * 60}
      passingScore={test.passingScore}
      questions={questionRows}
      mode={mode}
    />
  );
}
