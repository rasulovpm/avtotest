import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import QuizEngine from "./QuizEngine";
import { getAuthSession } from "@/lib/auth";

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

  const test = await prisma.test.findUnique({
    where: { id: params.id },
    include: {
      questions: {
        include: { question: { include: { options: { orderBy: { orderIndex: "asc" } } } } },
        orderBy: { orderIndex: "asc" }
      }
    }
  });

  if (!test) notFound();

  const questions = test.questions.map((tq) => ({
    id: tq.question.id,
    textUz: tq.question.textUz,
    textRu: tq.question.textRu,
    textCy: tq.question.textCy,
    explanationUz: tq.question.explanationUz,
    explanationRu: tq.question.explanationRu,
    explanationCy: tq.question.explanationCy,
    imageUrl: tq.question.imageUrl,
    options: tq.question.options.map((o) => ({
      id: o.id,
      textUz: o.textUz,
      textRu: o.textRu,
      textCy: o.textCy
    }))
  }));

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
      questions={questions}
      mode={mode}
    />
  );
}
