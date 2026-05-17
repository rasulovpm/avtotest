import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import Header from "@/components/layout/Header";

export const dynamic = "force-dynamic";

export default async function TicketsListPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/tickets");
  }
  const userId = (session.user as any).id as string;

  // Barcha biletlar + savol soni (har bilet uchun)
  const tickets = await prisma.ticket.findMany({
    where: { isPublished: true },
    orderBy: [{ orderIndex: "asc" }, { number: "asc" }],
    include: {
      questions: { select: { questionId: true } },
    },
  });

  // Foydalanuvchining HAR BILET ICHIDA bergan to'g'ri javoblari.
  // Real imtihon, mavzu testi va boshqa joylardagi javoblar bilet natijasiga
  // umuman ta'sir qilmaydi.
  const ticketAnswers = await prisma.ticketAnswer.findMany({
    where: { userId },
    select: {
      ticketId: true,
      questionId: true,
      isCorrect: true,
      answeredAt: true,
    },
    orderBy: { answeredAt: "desc" },
  });
  // Har bilet uchun: questionId -> eng oxirgi javob (to'g'ri/xato)
  const latestByTicket = new Map<string, Map<string, boolean>>();
  for (const a of ticketAnswers) {
    if (!latestByTicket.has(a.ticketId)) latestByTicket.set(a.ticketId, new Map());
    const m = latestByTicket.get(a.ticketId)!;
    if (!m.has(a.questionId)) m.set(a.questionId, a.isCorrect);
  }

  const items = tickets.map((t) => {
    const total = t.questions.length;
    const answers = latestByTicket.get(t.id);
    let correct = 0;
    if (answers) {
      for (const ok of answers.values()) if (ok) correct++;
    }
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return {
      id: t.id,
      number: t.number,
      titleUz: t.titleUz,
      description: t.description,
      total,
      correct,
      pct,
      successful: pct >= 90,
    };
  });

  const successfulCount = items.filter((i) => i.successful).length;

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg-0)", color: "var(--fg-0)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
        <section style={{ padding: "32px 48px 16px" }}>
          <div style={{ marginBottom: 8 }}>
            <Link href="/" className="overline" style={{ color: "var(--fg-2)", textDecoration: "none" }}>
              ← Bosh sahifa
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <h1 className="h-display" style={{ fontSize: 32, fontWeight: 600, marginTop: 8, marginBottom: 0 }}>
              Biletlar
            </h1>
            <span className="chip mono" style={{ fontSize: 12 }}>
              {items.length} ta bilet
            </span>
            {successfulCount > 0 && (
              <span className="chip chip--success" style={{ fontSize: 12 }}>
                ✓ {successfulCount} muvaffaqiyatli
              </span>
            )}
          </div>
          <p style={{ color: "var(--fg-2)", margin: "6px 0 0", fontSize: 14 }}>
            Har biletni 90%+ natija bilan yechib chiqing. Saqlangan javoblar progressda hisobga olinadi.
          </p>
        </section>

        <section style={{ padding: "16px 48px 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {items.map((t) => (
              <Link
                key={t.id}
                href={`/tickets/${t.id}`}
                className="bento"
                style={{
                  padding: 16,
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  minHeight: 130,
                  borderColor: t.successful
                    ? "color-mix(in oklch, var(--success) 50%, var(--line))"
                    : "var(--line)",
                  background: t.successful
                    ? "radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--success) 10%, transparent), transparent 70%), var(--bg-1)"
                    : undefined,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: t.successful
                        ? "color-mix(in oklch, var(--success) 20%, var(--bg-2))"
                        : "color-mix(in oklch, var(--accent) 14%, var(--bg-2))",
                      border: "1px solid",
                      borderColor: t.successful
                        ? "color-mix(in oklch, var(--success) 50%, transparent)"
                        : "color-mix(in oklch, var(--accent) 35%, transparent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: 13,
                      color: t.successful ? "var(--success)" : "var(--accent)",
                      flexShrink: 0,
                    }}
                  >
                    {String(t.number).padStart(2, "0")}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="overline" style={{ fontSize: 9 }}>
                      BILET #{t.number}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: 1.25,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {t.titleUz}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span className="chip mono" style={{ fontSize: 10, padding: "3px 8px" }}>
                    {t.total} savol
                  </span>
                  {t.correct > 0 && (
                    <span className="chip chip--success" style={{ fontSize: 10, padding: "3px 8px" }}>
                      ✓ {t.correct}/{t.total}
                    </span>
                  )}
                  {t.successful && (
                    <span className="chip chip--lime" style={{ fontSize: 10, padding: "3px 8px" }}>
                      ★ Muvaffaqiyatli
                    </span>
                  )}
                </div>

                <div style={{ marginTop: "auto" }}>
                  <div className="progress" style={{ height: 5 }}>
                    <span style={{ width: `${t.pct}%` }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--fg-2)",
                      marginTop: 4,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span>{t.correct === 0 ? "boshlanmagan" : "joriy natija"}</span>
                    <span style={{ color: t.successful ? "var(--success)" : "var(--fg-1)" }}>
                      {t.pct}%
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
