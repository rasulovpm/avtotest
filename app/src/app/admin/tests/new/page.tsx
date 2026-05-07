import { prisma } from "@/lib/prisma";
import AdminTopBar from "../../AdminTopBar";
import TestEditor from "./TestEditor";

export const dynamic = "force-dynamic";

export default async function NewTestPage() {
  const [categories, questionsCount] = await Promise.all([
    prisma.category.findMany({ orderBy: { orderIndex: "asc" } }),
    prisma.question.count({ where: { isPublished: true } })
  ]);

  // Barcha published savollarni jo'natamiz (kategoriya bilan)
  const questions = await prisma.question.findMany({
    where: { isPublished: true },
    include: { category: true, options: true },
    orderBy: { createdAt: "desc" },
    take: 200
  });

  return (
    <>
      <AdminTopBar
        title="Yangi test yaratish"
        sub={`${questionsCount} ta savol bazada`}
        breadcrumbs={[{ label: "Testlar", href: "/admin/tests" }, { label: "Yangi" }]}
      />
      <div style={{ padding: 28 }}>
        <TestEditor
          categories={categories.map((c) => ({ id: c.id, nameUz: c.nameUz }))}
          questions={questions.map((q) => ({
            id: q.id,
            textUz: q.textUz,
            categoryName: q.category?.nameUz || "—",
            difficulty: q.difficulty
          }))}
        />
      </div>
    </>
  );
}
