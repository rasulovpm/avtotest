import { prisma } from "@/lib/prisma";
import AdminTopBar from "../../AdminTopBar";
import QuestionEditor from "../QuestionEditor";

export const dynamic = "force-dynamic";

export default async function NewQuestionPage() {
  const categories = await prisma.category.findMany({ orderBy: { orderIndex: "asc" } });
  return (
    <>
      <AdminTopBar
        title="Yangi savol"
        sub="Hali saqlanmagan"
        breadcrumbs={[{ label: "Savollar", href: "/admin/questions" }, { label: "Yangi" }]}
      />
      <div style={{ padding: 28 }}>
        <QuestionEditor categories={categories} />
      </div>
    </>
  );
}
