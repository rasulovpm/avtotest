import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminTopBar from "../../AdminTopBar";
import QuestionEditor from "../QuestionEditor";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({ params }: { params: { id: string } }) {
  const [question, categories] = await Promise.all([
    prisma.question.findUnique({
      where: { id: params.id },
      include: { options: { orderBy: { orderIndex: "asc" } } }
    }),
    prisma.category.findMany({ orderBy: { orderIndex: "asc" } })
  ]);

  if (!question) notFound();

  return (
    <>
      <AdminTopBar
        title={`Savol #${question.id.slice(-5)}`}
        sub={question.textUz.slice(0, 80)}
        breadcrumbs={[{ label: "Savollar", href: "/admin/questions" }, { label: "Tahrirlash" }]}
      />
      <div style={{ padding: 28 }}>
        <QuestionEditor categories={categories} initial={question} />
      </div>
    </>
  );
}
