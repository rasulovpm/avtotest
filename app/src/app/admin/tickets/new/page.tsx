import { prisma } from "@/lib/prisma";
import AdminTopBar from "../../AdminTopBar";
import TicketEditor from "../[id]/TicketEditor";

export const dynamic = "force-dynamic";

export default async function NewTicketPage() {
  const [topics, questions] = await Promise.all([
    prisma.category.findMany({ orderBy: { number: "asc" } }),
    prisma.question.findMany({
      orderBy: { number: "asc" },
      select: { id: true, number: true, textUz: true, categoryId: true }
    })
  ]);

  return (
    <>
      <AdminTopBar
        title="Yangi bilet"
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "Biletlar", href: "/admin/tickets" }, { label: "Yangi" }]}
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
          initial={null}
        />
      </div>
    </>
  );
}
