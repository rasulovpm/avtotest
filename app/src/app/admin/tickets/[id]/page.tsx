import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminTopBar from "../../AdminTopBar";
import TicketEditor from "./TicketEditor";

export const dynamic = "force-dynamic";

export default async function EditTicketPage({ params }: { params: { id: string } }) {
  const [ticket, topics, questions] = await Promise.all([
    prisma.ticket.findUnique({
      where: { id: params.id },
      include: { questions: { orderBy: { orderIndex: "asc" } } }
    }),
    prisma.category.findMany({ orderBy: { number: "asc" } }),
    prisma.question.findMany({
      orderBy: { number: "asc" },
      select: { id: true, number: true, textUz: true, categoryId: true }
    })
  ]);
  if (!ticket) notFound();

  return (
    <>
      <AdminTopBar
        title={`Bilet #${ticket.number}`}
        sub={ticket.titleUz}
        breadcrumbs={[
          { label: "Boshqaruv" },
          { label: "Biletlar", href: "/admin/tickets" },
          { label: `#${ticket.number}` }
        ]}
      />
      <div style={{ padding: 28 }}>
        <TicketEditor
          topics={topics.map((t) => ({ id: t.id, number: t.number, nameUz: t.nameUz }))}
          questions={questions.map((q) => ({
            id: q.id,
            number: q.number,
            textUz: q.textUz,
            categoryId: q.categoryId
          }))}
          initial={{
            id: ticket.id,
            number: ticket.number,
            titleUz: ticket.titleUz,
            titleRu: ticket.titleRu,
            titleCy: ticket.titleCy,
            description: ticket.description,
            isPublished: ticket.isPublished,
            orderIndex: ticket.orderIndex,
            questionIds: ticket.questions.map((q) => q.questionId)
          }}
        />
      </div>
    </>
  );
}
