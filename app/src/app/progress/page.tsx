import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProgressClient from "./ProgressClient";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/auth/login?callbackUrl=/progress");
  const userId = (session.user as any).id as string;

  const [user, results, allAnswers] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.testResult.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 30,
      include: { test: true }
    }),
    prisma.userAnswer.findMany({
      where: { userId },
      include: { question: { include: { category: true } } },
      take: 1000,
      orderBy: { answeredAt: "desc" }
    })
  ]);

  // Kategoriya bo'yicha statistika
  const catStats: Record<string, { name: string; correct: number; total: number }> = {};
  for (const a of allAnswers) {
    const c = a.question.category;
    if (!c) continue;
    if (!catStats[c.id]) catStats[c.id] = { name: c.nameUz, correct: 0, total: 0 };
    catStats[c.id].total++;
    if (a.isCorrect) catStats[c.id].correct++;
  }

  // 14 haftalik heatmap — har kun (Du..Yak)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const COLS = 14;
  const ROWS = 7;
  const dow = (today.getDay() + 6) % 7; // 0=Du..6=Yak
  const start = new Date(today);
  start.setDate(today.getDate() - dow - (COLS - 1) * 7);

  // Kunlik javob soni
  const dayCounts: Record<string, number> = {};
  for (const a of allAnswers) {
    const d = new Date(a.answeredAt);
    d.setHours(0, 0, 0, 0);
    const k = d.toISOString().slice(0, 10);
    dayCounts[k] = (dayCounts[k] || 0) + 1;
  }

  const cells: { date: string; count: number; level: number }[][] = [];
  for (let c = 0; c < COLS; c++) {
    const col: { date: string; count: number; level: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      const d = new Date(start);
      d.setDate(start.getDate() + c * 7 + r);
      const k = d.toISOString().slice(0, 10);
      const count = dayCounts[k] || 0;
      let level = 0;
      if (d > today) level = -1;
      else if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 10) level = 3;
      else level = 4;
      col.push({ date: k, count, level });
    }
    cells.push(col);
  }

  // Streak hisoblash — bugundan teskari kunma-kun
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = d.toISOString().slice(0, 10);
    if (dayCounts[k] && dayCounts[k] > 0) streak++;
    else if (i > 0) break;
  }

  // Haftalik chart (oxirgi 8 hafta)
  const weekly = Array.from({ length: 8 }, (_, i) => {
    const wEnd = new Date(today);
    wEnd.setDate(today.getDate() - (7 - i) * 7);
    const wStart = new Date(wEnd);
    wStart.setDate(wEnd.getDate() - 7);
    let count = 0;
    for (const k in dayCounts) {
      const d = new Date(k);
      if (d >= wStart && d < wEnd) count += dayCounts[k];
    }
    return count;
  });

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg-0)" }}>
        <ProgressClient
          totalXp={user?.totalXp || 0}
          streakCount={streak}
          totalTests={results.length}
          avgScore={results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0}
          recentResults={results.slice(0, 8).map((r) => ({
            id: r.id,
            score: r.score,
            passed: r.passed,
            titleUz: r.test.titleUz,
            titleRu: r.test.titleRu,
            titleCy: r.test.titleCy,
            completedAt: r.completedAt.toISOString()
          }))}
          categoryStats={Object.values(catStats)}
          heatmap={cells}
          weeklyChart={weekly}
          today={today.toISOString().slice(0, 10)}
        />
      </main>
      <Footer />
    </>
  );
}
