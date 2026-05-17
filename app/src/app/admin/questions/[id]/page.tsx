import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminTopBar from "../../AdminTopBar";
import QuestionEditor from "../QuestionEditor";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({ params }: { params: { id: string } }) {
  const [question, categories, tickets] = await Promise.all([
    prisma.question.findUnique({
      where: { id: params.id },
      include: {
        options: { orderBy: { orderIndex: "asc" } },
        tickets: { include: { ticket: true } }
      }
    }),
    prisma.category.findMany({ orderBy: { number: "asc" } }),
    prisma.ticket.findMany({ orderBy: { number: "asc" } })
  ]);

  if (!question) notFound();

  return (
    <>
      <AdminTopBar
        title={`Savol #${question.number}`}
        sub={question.textUz.slice(0, 80)}
        breadcrumbs={[{ label: "Savollar", href: "/admin/questions" }, { label: `#${question.number}` }]}
      />
      <div style={{ padding: 28 }}>
        <QuestionEditor
          categories={categories}
          tickets={tickets.map((t) => ({ id: t.id, number: t.number, titleUz: t.titleUz }))}
          initial={{
            id: question.id,
            number: question.number,
            categoryId: question.categoryId,
            textUz: question.textUz,
            textRu: question.textRu,
            textCy: question.textCy,
            explanationUz: question.explanationUz,
            explanationRu: question.explanationRu,
            explanationCy: question.explanationCy,
            imageUrl: question.imageUrl,
            difficulty: question.difficulty,
            isPublished: question.isPublished,
            options: question.options.map((o) => ({
              id: o.id,
              textUz: o.textUz,
              textRu: o.textRu,
              textCy: o.textCy,
              isCorrect: o.isCorrect
            })),
            ticketIds: question.tickets.map((t) => t.ticketId)
          }}
        />
      </div>
    </>
  );
}
