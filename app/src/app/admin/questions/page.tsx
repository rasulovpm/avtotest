import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminTopBar from "../AdminTopBar";
import QuestionsTable from "./QuestionsTable";

export const dynamic = "force-dynamic";

export default async function AdminQuestionsPage({ searchParams }: { searchParams: { q?: string; cat?: string } }) {
  const where: any = {};
  if (searchParams.cat) where.categoryId = searchParams.cat;
  if (searchParams.q) {
    where.OR = [
      { textUz: { contains: searchParams.q } },
      { textRu: { contains: searchParams.q } }
    ];
  }

  const [questions, categories, totals] = await Promise.all([
    prisma.question.findMany({
      where,
      include: {
        category: true,
        options: true,
        tickets: { include: { ticket: true } },
        _count: { select: { answers: true } }
      },
      orderBy: { number: "asc" },
      take: 200
    }),
    prisma.category.findMany({ orderBy: { number: "asc" } }),
    prisma.question.count()
  ]);

  return (
    <>
      <AdminTopBar
        title="Savollar bazasi"
        sub={`${totals} ta savol · ${categories.length} mavzu · 3 til`}
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "Savollar" }]}
        actions={
          <Link href="/admin/questions/new" className="btn btn--primary" style={{ fontSize: 13, padding: "9px 14px" }}>
            + Yangi savol
          </Link>
        }
      />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        <QuestionsTable
          questions={questions.map((q) => ({
            id: q.id,
            number: q.number,
            textUz: q.textUz,
            textRu: q.textRu,
            categoryName: q.category?.nameUz || "—",
            categorySlug: q.category?.slug || "",
            difficulty: q.difficulty,
            isPublished: q.isPublished,
            optionCount: q.options.length,
            correctCount: q.options.filter((o) => o.isCorrect).length,
            answerCount: q._count.answers,
            tickets: q.tickets.map((t) => ({ id: t.ticketId, number: t.ticket.number })),
            createdAt: q.createdAt.toISOString()
          }))}
          categories={categories}
          currentCat={searchParams.cat || ""}
          currentQ={searchParams.q || ""}
          totalCount={totals}
        />
      </div>
    </>
  );
}
