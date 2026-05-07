import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminTopBar from "./AdminTopBar";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalQuestions,
    totalTests,
    totalSigns,
    pendingPayments,
    activePayments,
    recentResults,
    recentUsers,
    weekResults
  ] = await Promise.all([
    prisma.user.count(),
    prisma.question.count(),
    prisma.test.count(),
    prisma.roadSign.count(),
    prisma.payment.count({ where: { status: "PENDING" } }),
    prisma.payment.count({ where: { status: "ACTIVE" } }),
    prisma.testResult.findMany({ take: 6, orderBy: { completedAt: "desc" }, include: { user: true, test: true } }),
    prisma.user.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
    prisma.testResult.findMany({
      where: { completedAt: { gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) } },
      orderBy: { completedAt: "asc" }
    })
  ]);

  // Build 12-month chart from weekResults
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (11 - i));
    return { y: d.getFullYear(), m: d.getMonth(), count: 0 };
  });
  for (const r of weekResults) {
    const idx = months.findIndex((mm) => mm.y === r.completedAt.getFullYear() && mm.m === r.completedAt.getMonth());
    if (idx >= 0) months[idx].count++;
  }
  const max = Math.max(1, ...months.map((m) => m.count));
  const monthLabels = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];

  const stats = [
    { l: "Foydalanuvchilar", v: totalUsers, sub: "jami", i: "◉", href: "/admin/users" },
    { l: "Savollar", v: totalQuestions, sub: "bazada", i: "?", href: "/admin/questions" },
    { l: "Yechilgan testlar", v: weekResults.length, sub: "12 oy", i: "✓", href: "/admin/tests" },
    { l: "Premium obuna", v: activePayments, sub: "faol", i: "★", href: "/admin/payments" }
  ];

  return (
    <>
      <AdminTopBar
        title="Dashboard"
        sub="Bugungi platforma faolligi"
        actions={
          <Link href="/admin/questions/new" className="btn btn--primary" style={{ fontSize: 13, padding: "9px 14px" }}>
            + Yangi savol
          </Link>
        }
      />

      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* KPI cards */}
        <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {stats.map((s, i) => (
            <Link key={i} href={s.href} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="bento" style={{ padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div className="overline">{s.l}</div>
                  <span style={{ fontSize: 13, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>{s.i}</span>
                </div>
                <div className="h-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>{s.v.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: "var(--fg-3)" }}>{s.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Chart + Activity */}
        <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 14 }}>
          <div className="bento" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div className="overline" style={{ marginBottom: 4 }}>YECHILGAN TESTLAR · 12 OY</div>
                <div className="h-display" style={{ fontSize: 22, fontWeight: 600 }}>
                  {weekResults.length}{" "}
                  <span style={{ fontSize: 13, color: "var(--fg-2)", fontWeight: 400 }}>jami</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["Hafta", "Oy", "Yil"].map((p, i) => (
                  <span
                    key={p}
                    className="chip"
                    style={{
                      fontSize: 11,
                      padding: "5px 11px",
                      background: i === 1 ? "var(--accent)" : "var(--bg-2)",
                      color: i === 1 ? "#0a1f24" : "var(--fg-1)",
                      borderColor: i === 1 ? "var(--accent)" : "var(--line)"
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <svg width="100%" height="240" viewBox="0 0 600 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.18 195)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.82 0.18 195)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1="0" x2="600" y1={i * 50 + 20} y2={i * 50 + 20} stroke="var(--line)" strokeDasharray="2 4" />
              ))}
              {(() => {
                const pts = months.map((m, i) => `${(i / 11) * 580 + 10},${220 - (m.count / max) * 200}`).join(" ");
                const area = `M 10,220 L ${pts} L 590,220 Z`;
                return (
                  <>
                    <path d={area} fill="url(#ag)" />
                    <polyline points={pts} fill="none" stroke="oklch(0.82 0.18 195)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {months.map((m, i) => (
                      <circle key={i} cx={(i / 11) * 580 + 10} cy={220 - (m.count / max) * 200} r="3" fill="oklch(0.82 0.18 195)" />
                    ))}
                  </>
                );
              })()}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--fg-3)", marginTop: 8 }}>
              {months.map((m, i) => (
                <span key={i}>{monthLabels[m.m]}</span>
              ))}
            </div>
          </div>

          <div className="bento" style={{ padding: 24 }}>
            <div className="overline" style={{ marginBottom: 14 }}>SO'NGGI FAOLIYAT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[...recentResults.slice(0, 3).map((r) => ({
                who: r.user.fullName || r.user.phone,
                what: `${r.test.titleUz} · ${r.correctCount}/${r.totalQuestions}`,
                when: relTime(r.completedAt),
                tag: r.passed ? "pass" : "fail"
              })),
              ...recentUsers.slice(0, 3).map((u) => ({
                who: u.fullName || u.phone,
                what: "Hisob ro'yxatdan o'tdi",
                when: relTime(u.createdAt),
                tag: "new"
              }))].slice(0, 6).map((r, i) => {
                const tone =
                  r.tag === "pass"
                    ? "var(--success)"
                    : r.tag === "fail"
                      ? "var(--error)"
                      : r.tag === "edit"
                        ? "var(--accent)"
                        : "var(--accent-2)";
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: tone, marginTop: 6, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{r.who}</div>
                      <div style={{ fontSize: 11, color: "var(--fg-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {r.what}
                      </div>
                    </div>
                    <span className="mono" style={{ fontSize: 10, color: "var(--fg-3)", flexShrink: 0 }}>{r.when}</span>
                  </div>
                );
              })}
              {recentResults.length === 0 && recentUsers.length === 0 && (
                <p style={{ color: "var(--fg-3)", fontSize: 13 }}>Hali faollik yo'q</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="dash-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <Link href="/admin/payments?status=PENDING" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={"bento" + (pendingPayments > 0 ? " bento--accent-2" : "")} style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 14 }}>● KUTILAYOTGAN TO'LOVLAR</div>
              <div className="h-display" style={{ fontSize: 32, fontWeight: 700, color: pendingPayments > 0 ? "var(--accent-2)" : "var(--fg-0)" }}>
                {pendingPayments}
              </div>
              <p style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 6 }}>
                Manual tasdiqlash kutilmoqda
              </p>
            </div>
          </Link>

          <div className="bento" style={{ padding: 22 }}>
            <div className="overline" style={{ marginBottom: 14 }}>YANGI FOYDALANUVCHILAR</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recentUsers.slice(0, 4).map((u, i) => (
                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: i ? 6 : 0, borderTop: i ? "1px solid var(--line)" : "none" }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, oklch(0.7 0.15 ${i * 47}), oklch(0.82 0.18 ${i * 47 + 60}))`,
                      color: "#0a1f24",
                      fontWeight: 700,
                      fontSize: 10,
                      fontFamily: "var(--font-mono)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {(u.fullName || u.phone).charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: 12, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {u.fullName || u.phone}
                  </span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--fg-3)" }}>{relTime(u.createdAt)}</span>
                </div>
              ))}
              {recentUsers.length === 0 && <p style={{ color: "var(--fg-3)", fontSize: 13 }}>Yo'q</p>}
            </div>
          </div>

          <div className="bento bento--accent" style={{ padding: 22 }}>
            <div className="overline" style={{ marginBottom: 14 }}>● TIZIM HOLATI</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "API · Backend", up: "99.98%", ok: true },
                { n: "Ma'lumotlar bazasi (SQLite)", up: "100%", ok: true },
                { n: "Auth (NextAuth)", up: "100%", ok: true },
                { n: "Click gateway", up: "DEV", ok: false }
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: s.ok ? "var(--success)" : "oklch(0.85 0.18 75)",
                      boxShadow: s.ok ? "0 0 6px var(--success)" : "0 0 6px oklch(0.85 0.18 75)"
                    }}
                  />
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 500 }}>{s.n}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--fg-2)" }}>{s.up}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-grid { grid-template-columns: 1fr !important; }
          .dash-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function relTime(d: Date) {
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (m < 1) return "hozir";
  if (m < 60) return `${m} daq`;
  if (h < 24) return `${h} soat`;
  return `${days} kun`;
}
