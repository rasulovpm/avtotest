import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MistakesClient from "../mistakes/MistakesClient";

export const dynamic = "force-dynamic";

const TOP_LIMIT = 50;       // ko'rsatamiz: top 50 ta savol
const MIN_ATTEMPTS = 5;     // shovqindan qochish uchun kamida 5 urinish

export default async function PopularMistakesPage() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/auth/login?callbackUrl=/tests/popular-mistakes");
  const userId = (session.user as any).id as string;

  // Global statistika — UserAnswer + TopicAnswer + TicketAnswer ikkalasini ham
  // hisobga olamiz (savol qaerda yechilishidan qat'iy nazar).
  const [uaAll, taAll, tkaAll] = await Promise.all([
    prisma.userAnswer.findMany({ select: { questionId: true, isCorrect: true } }),
    prisma.topicAnswer.findMany({ select: { questionId: true, isCorrect: true } }),
    prisma.ticketAnswer.findMany({ select: { questionId: true, isCorrect: true } }),
  ]);

  type Stat = { total: number; wrong: number };
  const stats = new Map<string, Stat>();
  const tally = (rows: { questionId: string; isCorrect: boolean }[]) => {
    for (const r of rows) {
      const s = stats.get(r.questionId) ?? { total: 0, wrong: 0 };
      s.total++;
      if (!r.isCorrect) s.wrong++;
      stats.set(r.questionId, s);
    }
  };
  tally(uaAll);
  tally(taAll);
  tally(tkaAll);

  // Reyting: xato soni bo'yicha (eng ko'p xato birinchi), kamida MIN_ATTEMPTS
  // urinish bo'lishi sharti.
  const ranked = Array.from(stats.entries())
    .map(([qid, s]) => ({
      qid,
      total: s.total,
      wrong: s.wrong,
      pct: s.total > 0 ? Math.round((s.wrong / s.total) * 100) : 0,
    }))
    .filter((r) => r.total >= MIN_ATTEMPTS && r.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong || b.pct - a.pct)
    .slice(0, TOP_LIMIT);

  if (ranked.length === 0) {
    return (
      <>
        <Header />
        <main style={{ background: "var(--bg-0)", minHeight: "60vh", padding: 48 }}>
          <div className="bento" style={{ padding: 40, textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
            <h1 className="h-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
              Hali statistika yetarli emas
            </h1>
            <p style={{ color: "var(--fg-2)", fontSize: 14 }}>
              Foydalanuvchilar savollarni yechishni boshlasa, eng ko'p xato qilinganlari shu yerda paydo bo'ladi.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Savol matnlari va variantlar
  const ids = ranked.map((r) => r.qid);
  const questionRows = await prisma.question.findMany({
    where: { id: { in: ids } },
    include: {
      options: { orderBy: { orderIndex: "asc" } },
      category: true,
    },
  });
  const byId = new Map(questionRows.map((q) => [q.id, q] as const));

  const questions = ranked
    .map((r) => {
      const q = byId.get(r.qid);
      if (!q) return null;
      return {
        id: q.id,
        textUz: q.textUz,
        textRu: q.textRu,
        textCy: q.textCy,
        explanationUz: q.explanationUz,
        explanationRu: q.explanationRu,
        explanationCy: q.explanationCy,
        imageUrl: q.imageUrl,
        categoryName: q.category?.nameUz ?? "—",
        options: q.options.map((o) => ({
          id: o.id, textUz: o.textUz, textRu: o.textRu, textCy: o.textCy,
        })),
        globalStats: {
          wrongCount: r.wrong,
          totalAttempts: r.total,
          wrongPercent: r.pct,
        },
      };
    })
    .filter((q): q is NonNullable<typeof q> => !!q);

  const saved = await prisma.savedQuestion.findMany({
    where: { userId, questionId: { in: questions.map((q) => q.id) } },
    select: { questionId: true },
  });
  const initialSavedIds = saved.map((s) => s.questionId);

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg-0)" }}>
        <MistakesClient
          mode="popular"
          questions={questions}
          totalWrongCount={ranked.reduce((s, r) => s + r.wrong, 0)}
          initialSavedIds={initialSavedIds}
        />
      </main>
      <Footer />
    </>
  );
}
