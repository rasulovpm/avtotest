import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestsCatalogClient from "./TestsCatalogClient";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function TestsPage() {
  const session = await getAuthSession();
  const [tests, categories, mistakesCount] = await Promise.all([
    prisma.test.findMany({
      where: { isPublished: true },
      orderBy: { orderIndex: "asc" },
      include: { category: true, _count: { select: { questions: true } } }
    }),
    prisma.category.findMany({ orderBy: { orderIndex: "asc" } }),
    session?.user
      ? prisma.userAnswer.count({
          where: { userId: (session.user as any).id, isCorrect: false }
        })
      : 0
  ]);

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg-0)" }}>
        <TestsCatalogClient
          tests={tests.map((tst) => ({
            id: tst.id,
            titleUz: tst.titleUz,
            titleRu: tst.titleRu,
            titleCy: tst.titleCy,
            isExamSimulation: tst.isExamSimulation,
            timeLimitMinutes: tst.timeLimitMinutes,
            questionCount: tst._count.questions || tst.questionCount,
            difficulty: tst.difficulty,
            category: tst.category
              ? {
                  slug: tst.category.slug,
                  nameUz: tst.category.nameUz,
                  nameRu: tst.category.nameRu,
                  nameCy: tst.category.nameCy,
                  color: tst.category.color || "#0A84FF",
                  icon: tst.category.icon || "ScrollText"
                }
              : null
          }))}
          categories={categories}
          hasMistakes={mistakesCount > 0}
        />
      </main>
      <Footer />
    </>
  );
}
