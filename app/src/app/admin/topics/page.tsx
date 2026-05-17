import { prisma } from "@/lib/prisma";
import AdminTopBar from "../AdminTopBar";
import TopicsClient from "./TopicsClient";

export const dynamic = "force-dynamic";

export default async function AdminTopicsPage() {
  const topics = await prisma.category.findMany({
    orderBy: { number: "asc" },
    include: { _count: { select: { questions: true } } }
  });

  return (
    <>
      <AdminTopBar
        title="Mavzular"
        sub={`${topics.length} ta mavzu — savollar shu mavzular ostida tasniflanadi`}
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "Mavzular" }]}
      />
      <div style={{ padding: 28 }}>
        <TopicsClient
          topics={topics.map((t) => ({
            id: t.id,
            number: t.number,
            slug: t.slug,
            nameUz: t.nameUz,
            nameRu: t.nameRu,
            nameCy: t.nameCy,
            icon: t.icon,
            color: t.color,
            description: t.description,
            orderIndex: t.orderIndex,
            questionCount: t._count.questions
          }))}
        />
      </div>
    </>
  );
}
