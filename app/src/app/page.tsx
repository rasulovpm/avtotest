import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import LandingClient from "./LandingClient";
import GuestLanding from "./GuestLanding";
import { getOverallProgress } from "@/lib/progress-stats";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getAuthSession();

  // Mehmon — soddagina marketing landing
  if (!session?.user) {
    return (
      <>
        <Header />
        <GuestLanding />
      </>
    );
  }

  const userId = (session.user as any).id as string;
  const [user, mistakesCount, savedCount, recentResults, payments, todayResults, examTest] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.userAnswer.count({ where: { userId, isCorrect: false } }),
    prisma.savedQuestion.count({ where: { userId } }),
    prisma.testResult.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 1
    }),
    prisma.payment.findMany({
      where: { userId },
      include: { tariff: true },
      orderBy: { createdAt: "desc" },
      take: 4
    }),
    prisma.testResult.count({
      where: {
        userId,
        completedAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }
    }),
    prisma.test.findFirst({ where: { id: "test-real-20" } })
  ]);

  // Streak (oxirgi 365 kun ichida ketma-ket)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayCounts = await prisma.userAnswer.findMany({
    where: { userId },
    select: { answeredAt: true },
    take: 5000
  });
  const dayMap: Record<string, number> = {};
  for (const a of dayCounts) {
    const d = new Date(a.answeredAt);
    d.setHours(0, 0, 0, 0);
    const k = d.toISOString().slice(0, 10);
    dayMap[k] = (dayMap[k] || 0) + 1;
  }
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = d.toISOString().slice(0, 10);
    if (dayMap[k]) streak++;
    else if (i > 0) break;
  }

  const planExpiresAt = user?.planExpiresAt ?? null;
  const isPro = Boolean(user?.plan && user.plan !== "FREE" && planExpiresAt);
  const totalDays = isPro && payments[0]?.tariff
    ? payments[0].tariff.durationDays
    : 30;
  const daysLeft = planExpiresAt
    ? Math.max(0, Math.ceil((new Date(planExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const overall = await getOverallProgress(userId);

  return (
    <>
      <Header />
      <LandingClient
        user={{
          name: user?.fullName || (user?.phone || "").slice(0, 8),
          plan: user?.plan || "FREE",
          totalXp: user?.totalXp || 0,
          planExpiresAt: user?.planExpiresAt?.toISOString() || null,
          examDate: user?.examDate?.toISOString() || null
        }}
        streak={streak}
        todayResults={todayResults}
        mistakesCount={mistakesCount}
        savedCount={savedCount}
        examTestId={examTest?.id || "test-real-20"}
        overallProgress={overall}
        subscription={
          isPro
            ? { totalDays, daysLeft, planExpiresAt: planExpiresAt!.toISOString() }
            : null
        }
        payments={payments.map((p) => ({
          id: p.id,
          tariffName: p.tariff.nameUz,
          amount: p.amountUzs,
          method: p.method,
          status: p.status,
          createdAt: p.createdAt.toISOString()
        }))}
      />
    </>
  );
}
