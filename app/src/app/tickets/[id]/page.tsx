import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import QuizEngine from "@/app/tests/[id]/QuizEngine";

export const dynamic = "force-dynamic";

export default async function TicketQuizPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { mode?: string };
}) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect(`/auth/login?callbackUrl=/tickets/${params.id}`);
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
    include: {
      questions: {
        include: { question: { include: { options: { orderBy: { orderIndex: "asc" } } } } },
        orderBy: { orderIndex: "asc" }
      }
    }
  });

  if (!ticket) notFound();

  const questions = ticket.questions.map((tq) => ({
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

  const mode = searchParams.mode === "exam" ? "exam" : "training";
  const total = questions.length;
  const passing = Math.ceil(total * 0.9);

  const userId = (session.user as any).id as string;
  const saved = await prisma.savedQuestion.findMany({
    where: { userId, questionId: { in: questions.map((q) => q.id) } },
    select: { questionId: true },
  });
  const initialSavedIds = saved.map((s) => s.questionId);

  return (
    <QuizEngine
      testId={`ticket:${ticket.id}`}
      titleUz={ticket.titleUz}
      titleRu={ticket.titleRu}
      titleCy={ticket.titleCy}
      timeLimitSec={Math.max(8, total) * 60}
      passingScore={passing}
      questions={questions}
      mode={mode}
      initialSavedIds={initialSavedIds}
    />
  );
}
