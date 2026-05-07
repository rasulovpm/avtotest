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
      take: 2000,
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

  // 14 haftalik heatmap
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const COLS = 14;
  const ROWS = 7;
  const dow = (today.getDay() + 6) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - dow - (COLS - 1) * 7);

  const dayCounts: Record<string, number> = {};
  const dayCorrect: Record<string, number> = {};
  for (const a of allAnswers) {
    const d = new Date(a.answeredAt);
    d.setHours(0, 0, 0, 0);
    const k = d.toISOString().slice(0, 10);
    dayCounts[k] = (dayCounts[k] || 0) + 1;
    if (a.isCorrect) dayCorrect[k] = (dayCorrect[k] || 0) + 1;
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

  // Streak
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = d.toISOString().slice(0, 10);
    if (dayCounts[k] && dayCounts[k] > 0) streak++;
    else if (i > 0) break;
  }

  // Haftalik (oxirgi 7 kun) — bar chart
  const weekDays: { d: string; date: string; q: number; c: number; today?: boolean }[] = [];
  const dowLabels = ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = d.toISOString().slice(0, 10);
    const dwIdx = (d.getDay() + 6) % 7;
    weekDays.push({
      d: dowLabels[dwIdx],
      date: String(d.getDate()),
      q: dayCounts[k] || 0,
      c: dayCorrect[k] || 0,
      today: i === 0
    });
  }

  // Oylik (oxirgi 30 kun) — bar chart
  const monthDays: { d: string; date: string; q: number; c: number; today?: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = d.toISOString().slice(0, 10);
    monthDays.push({
      d: String(d.getDate()),
      date: String(d.getDate()),
      q: dayCounts[k] || 0,
      c: dayCorrect[k] || 0,
      today: i === 0
    });
  }

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
          weekDays={weekDays}
          monthDays={monthDays}
          today={today.toISOString().slice(0, 10)}
        />
      </main>
      <Footer />
    </>
  );
}
