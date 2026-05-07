"use client";
import { useLang } from "@/components/lang-provider";
import { pickTitle } from "@/lib/i18n";
import { relativeTime } from "@/lib/utils";
import Link from "next/link";

type HCell = { date: string; count: number; level: number };

type Props = {
  totalXp: number;
  streakCount: number;
  totalTests: number;
  avgScore: number;
  recentResults: { id: string; score: number; passed: boolean; titleUz: string; titleRu: string; titleCy: string; completedAt: string }[];
  categoryStats: { name: string; correct: number; total: number }[];
  heatmap: HCell[][]; // [col][row]
  weeklyChart: number[];
  today: string;
};

const MONTHS_UZ = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];
const DOW_UZ = ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"];
const HEAT_OPS = [0.06, 0.22, 0.42, 0.65, 1];

export default function ProgressClient(p: Props) {
  const { t, lang } = useLang();
  const level = p.totalXp >= 1000 ? "PLATINA" : p.totalXp >= 500 ? "OLTIN" : p.totalXp >= 100 ? "KUMUSH" : "BRONZA";
  const nextLevel = level === "PLATINA" ? "DIAMOND" : level === "OLTIN" ? "PLATINA" : level === "KUMUSH" ? "OLTIN" : "KUMUSH";
  const levelMax = level === "PLATINA" ? 5000 : level === "OLTIN" ? 1000 : level === "KUMUSH" ? 500 : 100;
  const levelMin = level === "OLTIN" ? 500 : level === "KUMUSH" ? 100 : level === "BRONZA" ? 0 : 1000;
  const progressInLevel = ((p.totalXp - levelMin) / (levelMax - levelMin)) * 100;

  const max = Math.max(1, ...p.weeklyChart);

  // Month labels per col
  const monthLabels: string[] = [];
  let lastMonth = -1;
  for (const col of p.heatmap) {
    const firstD = new Date(col[0].date);
    if (firstD.getMonth() !== lastMonth) {
      monthLabels.push(MONTHS_UZ[firstD.getMonth()]);
      lastMonth = firstD.getMonth();
    } else {
      monthLabels.push("");
    }
  }

  const totalThisWeek = p.heatmap[p.heatmap.length - 1]?.reduce((a, b) => a + (b.level >= 0 ? b.count : 0), 0) || 0;
  const totalAll = p.heatmap.reduce((a, col) => a + col.reduce((b, c) => b + (c.level >= 0 ? c.count : 0), 0), 0);

  return (
    <div style={{ padding: "48px", color: "var(--fg-0)" }}>
      <div style={{ marginBottom: 28 }}>
        <div className="overline" style={{ marginBottom: 8 }}>05 · PROGRESS</div>
        <h1 className="h-display h2" style={{ margin: 0 }}>{t.progress.title}</h1>
      </div>

      <div className="lg-grid-3" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 16, marginBottom: 16 }}>
        {/* Chart */}
        <div className="bento" style={{ padding: 28, height: 280 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div className="overline">HAFTALIK NATIJALAR · 8 HAFTA</div>
            <span className="chip">{p.weeklyChart.reduce((a, b) => a + b, 0)} javob</span>
          </div>
          <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.18 195 / 0.4)" />
                <stop offset="100%" stopColor="oklch(0.82 0.18 195 / 0)" />
              </linearGradient>
            </defs>
            {[40, 80, 120, 160].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="600" y2={y} stroke="var(--line)" strokeDasharray="2 4" />
            ))}
            {(() => {
              const pts = p.weeklyChart.map((v, i) => `${(i / Math.max(1, p.weeklyChart.length - 1)) * 580 + 10},${170 - (v / max) * 150}`).join(" ");
              const area = `M 10,170 L ${pts} L 590,170 Z`;
              return (
                <>
                  <path d={area} fill="url(#ar)" />
                  <polyline points={pts} fill="none" stroke="oklch(0.82 0.18 195)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {p.weeklyChart.map((v, i) => (
                    <circle
                      key={i}
                      cx={(i / Math.max(1, p.weeklyChart.length - 1)) * 580 + 10}
                      cy={170 - (v / max) * 150}
                      r="3.5"
                      fill="oklch(0.88 0.20 130)"
                    />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>

        {/* Streak */}
        <div className="bento bento--accent-2" style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="overline" style={{ marginBottom: 8 }}>🔥 STREAK</div>
            <div className="h-display" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>{p.streakCount}</div>
            <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>ketma-ket kun</div>
          </div>
          <div style={{ fontSize: 12, color: "var(--fg-2)" }}>
            Eng yaxshi: <span className="mono" style={{ color: "var(--fg-0)" }}>{p.streakCount}</span>
          </div>
        </div>

        {/* Level */}
        <div className="bento" style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="overline" style={{ marginBottom: 8 }}>🏆 DARAJA</div>
            <div className="h-display" style={{ fontSize: 28, fontWeight: 600, color: "var(--accent)" }}>{level}</div>
            <div className="mono" style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{p.totalXp} XP</div>
          </div>
          <div>
            <div className="progress" style={{ marginBottom: 6 }}>
              <span style={{ width: Math.min(100, Math.max(0, progressInLevel)) + "%" }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--fg-2)" }}>
              Keyingi: <span className="mono">{nextLevel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)", gap: 16, marginBottom: 16 }}>
        {/* Categories */}
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 16 }}>KATEGORIYALAR</div>
          {p.categoryStats.length === 0 && (
            <p style={{ color: "var(--fg-2)", fontSize: 13, margin: 0 }}>{t.progress.noData}</p>
          )}
          {p.categoryStats.map((c, i) => {
            const v = c.total ? Math.round((c.correct / c.total) * 100) : 0;
            return (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span>{c.name}</span>
                  <span className="mono" style={{ color: "var(--fg-2)" }}>{c.correct}/{c.total} · {v}%</span>
                </div>
                <div className="progress">
                  <span style={{ width: v + "%" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub-style 14-week heatmap */}
        <div className="bento" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <div className="overline">📅 KUNDALIK MASHQ</div>
            <div className="overline" style={{ color: "var(--fg-2)" }}>OXIRGI 14 HAFTA</div>
          </div>

          {/* Month labels */}
          <div style={{ display: "grid", gridTemplateColumns: `28px repeat(14, 1fr)`, gap: 4, marginBottom: 6 }}>
            <div></div>
            {monthLabels.map((m, c) => (
              <div
                key={c}
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: "var(--fg-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  height: 12
                }}
              >
                {m}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: `28px repeat(14, 1fr)`, gap: 4 }}>
            {Array.from({ length: 7 }).map((_, r) => (
              <>
                <div
                  key={`l-${r}`}
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    color: "var(--fg-3)",
                    display: "flex",
                    alignItems: "center",
                    height: 14,
                    opacity: r % 2 === 0 ? 1 : 0
                  }}
                >
                  {DOW_UZ[r]}
                </div>
                {p.heatmap.map((col, c) => {
                  const cell = col[r];
                  const isToday = cell.date === p.today;
                  if (cell.level < 0) {
                    return <div key={`${c}-${r}`} style={{ aspectRatio: "1", borderRadius: 3, background: "transparent" }} />;
                  }
                  return (
                    <div
                      key={`${c}-${r}`}
                      title={`${cell.date} · ${cell.count} ta javob`}
                      style={{
                        aspectRatio: "1",
                        borderRadius: 3,
                        background: `oklch(0.82 0.18 195 / ${HEAT_OPS[cell.level]})`,
                        border: isToday
                          ? "1.5px solid var(--accent)"
                          : "1px solid color-mix(in oklch, var(--fg-0) 4%, transparent)",
                        boxShadow: isToday ? "0 0 0 2px color-mix(in oklch, var(--accent) 30%, transparent)" : "none"
                      }}
                    />
                  );
                })}
              </>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
            <span>Bu hafta: <span style={{ color: "var(--fg-0)" }}>{totalThisWeek}</span></span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>kam</span>
              {HEAT_OPS.map((op, i) => (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: `oklch(0.82 0.18 195 / ${op})`,
                    border: "1px solid color-mix(in oklch, var(--fg-0) 6%, transparent)"
                  }}
                />
              ))}
              <span>ko'p</span>
            </div>
            <span>Jami: <span style={{ color: "var(--fg-0)" }}>{totalAll}</span></span>
          </div>
        </div>
      </div>

      {/* Recent results */}
      <div className="bento" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div className="overline">OXIRGI NATIJALAR</div>
          <Link href="/tests/mistakes" className="chip chip--error" style={{ fontSize: 11, textDecoration: "none", cursor: "pointer" }}>
            ✕ Xatolarni qaytarish
          </Link>
        </div>
        {p.recentResults.length === 0 && (
          <p style={{ color: "var(--fg-2)", fontSize: 13, margin: 0 }}>{t.progress.noData}</p>
        )}
        {p.recentResults.map((r, i) => (
          <Link
            key={r.id}
            href={`/results/${r.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 0",
              borderTop: i ? "1px solid var(--line)" : "none",
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: r.passed ? "color-mix(in oklch, var(--success) 14%, var(--bg-2))" : "color-mix(in oklch, var(--error) 14%, var(--bg-2))",
                color: r.passed ? "var(--success)" : "var(--error)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 13,
                border: "1px solid " + (r.passed ? "color-mix(in oklch, var(--success) 40%, transparent)" : "color-mix(in oklch, var(--error) 40%, transparent)")
              }}
            >
              {r.score}%
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                {pickTitle({ titleUz: r.titleUz, titleRu: r.titleRu, titleCy: r.titleCy }, lang)}
              </p>
              <p style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", margin: 0 }}>
                {relativeTime(r.completedAt, lang)}
              </p>
            </div>
            <span className={"chip " + (r.passed ? "chip--success" : "chip--error")} style={{ fontSize: 11 }}>
              {r.passed ? "✓ o'tildi" : "✕ o'tilmadi"}
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .lg-grid-3 { grid-template-columns: 1fr 1fr !important; }
          .lg-grid-2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .lg-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
