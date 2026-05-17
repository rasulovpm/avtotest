import { prisma } from "@/lib/prisma";
import AdminTopBar from "../../AdminTopBar";
import QuestionEditor from "../QuestionEditor";

export const dynamic = "force-dynamic";

export default async function NewQuestionPage() {
  const [categories, tickets, max] = await Promise.all([
    prisma.category.findMany({ orderBy: { number: "asc" } }),
    prisma.ticket.findMany({ orderBy: { number: "asc" } }),
    prisma.question.aggregate({ _max: { number: true } })
  ]);
  const nextNumber = (max._max.number || 0) + 1;
  return (
    <>
      <AdminTopBar
        title="Yangi savol"
        sub={`Saqlangach #${nextNumber} raqamini oladi`}
        breadcrumbs={[{ label: "Savollar", href: "/admin/questions" }, { label: "Yangi" }]}
      />
      <div style={{ padding: 28 }}>
        <QuestionEditor
          categories={categories}
          tickets={tickets.map((t) => ({ id: t.id, number: t.number, titleUz: t.titleUz }))}
        />
      </div>
    </>
  );
}
