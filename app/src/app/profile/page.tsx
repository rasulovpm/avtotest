import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session?.user) redirect("/auth/login");
  const userId = (session.user as any).id;

  const [user, recent, stats, allAnswers, payments] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.testResult.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 5,
      include: { test: true }
    }),
    prisma.testResult.aggregate({
      where: { userId },
      _avg: { score: true },
      _count: true
    }),
    prisma.userAnswer.count({ where: { userId } }),
    prisma.payment.findMany({
      where: { userId },
      include: { tariff: true },
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  const wrongCount = await prisma.userAnswer.count({ where: { userId, isCorrect: false } });

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg-0)", color: "var(--fg-0)", minHeight: "60vh" }}>
        <div style={{ padding: 48, maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <div className="overline" style={{ marginBottom: 8 }}>08 · PROFILE</div>
            <h1 className="h-display h2" style={{ margin: 0 }}>Profil</h1>
          </div>

          <div className="bento" style={{ padding: 28, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  color: "#0a1f24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 700
                }}
              >
                {(user?.fullName || user?.phone || "?").charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h2 className="h-display" style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
                  {user?.fullName || "Foydalanuvchi"}
                </h2>
                <p style={{ color: "var(--fg-2)", fontFamily: "var(--font-mono)", margin: "6px 0 0", fontSize: 13 }}>
                  {user?.phone}
                </p>
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  <span className={"chip " + (user?.plan === "FREE" ? "" : "chip--accent")} style={{ fontSize: 11 }}>
                    {user?.plan === "FREE" ? "FREE" : `★ ${user?.plan}`}
                  </span>
                  {user?.role === "ADMIN" && <span className="chip chip--lime" style={{ fontSize: 11 }}>SUPER · ADMIN</span>}
                  {user?.planExpiresAt && (
                    <span className="chip mono" style={{ fontSize: 11 }}>
                      {new Date(user.planExpiresAt).toLocaleDateString()} gacha
                    </span>
                  )}
                  {user?.telegramId && (
                    <span className="chip chip--accent" style={{ fontSize: 11 }}>✈ Telegram ulangan</span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {user?.role === "ADMIN" && (
                  <Link href="/admin" className="btn btn--primary" style={{ fontSize: 13 }}>
                    ⚙ Admin
                  </Link>
                )}
                <Link href="/pricing" className="btn btn--ghost" style={{ fontSize: 13 }}>
                  ★ Reja
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 16 }}>
            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 8 }}>XP</div>
              <div className="h-display" style={{ fontSize: 32, fontWeight: 700 }}>{user?.totalXp || 0}</div>
            </div>
            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 8 }}>YECHILGAN</div>
              <div className="h-display" style={{ fontSize: 32, fontWeight: 700 }}>{stats._count}</div>
            </div>
            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 8 }}>O'RTACHA</div>
              <div className="h-display" style={{ fontSize: 32, fontWeight: 700 }}>
                {stats._avg.score ? Math.round(stats._avg.score) : 0}%
              </div>
            </div>
            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 8 }}>JAVOBLAR</div>
              <div className="h-display" style={{ fontSize: 32, fontWeight: 700 }}>{allAnswers}</div>
              {wrongCount > 0 && (
                <p style={{ fontSize: 11, color: "var(--error)", margin: "4px 0 0", fontFamily: "var(--font-mono)" }}>
                  {wrongCount} xato
                </p>
              )}
            </div>
          </div>

          {/* Recent results + Payments */}
          <div className="profile-2-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div className="bento" style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div className="overline">OXIRGI NATIJALAR</div>
                <Link href="/progress" style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
                  Hammasi →
                </Link>
              </div>
              {recent.length === 0 && <p style={{ color: "var(--fg-3)", fontSize: 13, margin: 0 }}>Hali test yechilmagan</p>}
              {recent.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/results/${r.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    borderTop: i ? "1px solid var(--line)" : "none",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: r.passed ? "color-mix(in oklch, var(--success) 14%, var(--bg-2))" : "color-mix(in oklch, var(--error) 14%, var(--bg-2))",
                      color: r.passed ? "var(--success)" : "var(--error)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      flexShrink: 0
                    }}
                  >
                    {r.score}%
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {r.test.titleUz}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--fg-3)", margin: 0, fontFamily: "var(--font-mono)" }}>
                      {relativeTime(r.completedAt)}
                    </p>
                  </div>
                  <span style={{ color: "var(--fg-3)" }}>→</span>
                </Link>
              ))}
            </div>

            <div className="bento" style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div className="overline">TO'LOVLAR TARIXI</div>
                <Link href="/pricing" style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
                  Reja →
                </Link>
              </div>
              {payments.length === 0 && (
                <div>
                  <p style={{ color: "var(--fg-3)", fontSize: 13, margin: "0 0 12px" }}>Hali to'lov yo'q</p>
                  <Link href="/pricing" className="btn btn--ghost" style={{ fontSize: 12, padding: "6px 12px" }}>
                    Premium →
                  </Link>
                </div>
              )}
              {payments.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    borderTop: i ? "1px solid var(--line)" : "none"
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{p.tariff.nameUz}</p>
                    <p style={{ fontSize: 11, color: "var(--fg-3)", margin: 0, fontFamily: "var(--font-mono)" }}>
                      {new Intl.NumberFormat("uz-UZ").format(p.amountUzs)} so'm · {relativeTime(p.createdAt)}
                    </p>
                  </div>
                  <span
                    className={
                      "chip " +
                      (p.status === "ACTIVE"
                        ? "chip--success"
                        : p.status === "PENDING"
                          ? "chip--warning"
                          : p.status === "REJECTED"
                            ? "chip--error"
                            : "")
                    }
                    style={{ fontSize: 10 }}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Telegram link banner */}
          {!user?.telegramId && (
            <div className="bento bento--accent" style={{ padding: 24, marginBottom: 16 }}>
              <div className="overline" style={{ marginBottom: 8 }}>● TELEGRAM ULASH</div>
              <h3 className="h-display" style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>
                OTP kodlarni Telegram'da qabul qiling
              </h3>
              <p style={{ color: "var(--fg-1)", fontSize: 13, margin: "0 0 12px" }}>
                Bot bilan ulansangiz, kirish kodlari Telegram'ga yuboriladi. Hozir DEV rejim — kod konsolda chiqadi.
              </p>
              <a
                href={
                  process.env.NEXT_PUBLIC_TG_BOT
                    ? `https://t.me/${process.env.NEXT_PUBLIC_TG_BOT}?start=${(user?.phone || "").replace("+", "")}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                style={{ fontSize: 13 }}
              >
                ✈ Telegram'da ochish →
              </a>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .profile-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .profile-2-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
