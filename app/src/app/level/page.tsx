import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import Header from "@/components/layout/Header";
import { getOverallProgress, RANK_TIERS } from "@/lib/progress-stats";
import LevelClient from "./LevelClient";

export const dynamic = "force-dynamic";

export default async function LevelPage() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/auth/login?callbackUrl=/level");
  const userId = (session.user as any).id as string;

  const [user, overall] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true, phone: true, examDate: true },
    }),
    getOverallProgress(userId),
  ]);

  const activeIdx = Math.max(
    0,
    RANK_TIERS.findIndex((t) => t.key === overall.rank.key)
  );

  return (
    <>
      <Header />
      <LevelClient
        userName={user?.fullName || user?.phone || ""}
        examDate={user?.examDate?.toISOString() ?? null}
        progress={overall}
        activeIdx={activeIdx}
      />
    </>
  );
}
