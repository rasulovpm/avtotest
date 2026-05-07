"use client";
import { useState } from "react";
import { useLang } from "@/components/lang-provider";
import { pickTitle } from "@/lib/i18n";
import { relativeTime } from "@/lib/utils";
import Link from "next/link";

type HCell = { date: string; count: number; level: number };
type Bar = { d: string; date: string; q: number; c: number; today?: boolean };

type Props = {
  totalXp: number;
  streakCount: number;
  totalTests: number;
  avgScore: number;
  recentResults: { id: string; score: number; passed: boolean; titleUz: string; titleRu: string; titleCy: string; completedAt: string }[];
  categoryStats: { name: string; correct: number; total: number }[];
  heatmap: HCell[][];
  weekDays: Bar[];
  monthDays: Bar[];
  today: string;
};

const MONTHS_UZ = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];
const DOW_UZ = ["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Ya"];
const HEAT_OPS = [0.06, 0.22, 0.42, 0.65, 1];

export default function ProgressClient(p: Props) {
  const { t, lang } = useLang();
  const [range, setRange] = useState<"week" | "month">("week");

  const level = p.totalXp >= 1000 ? "PLATINA" : p.totalXp >= 500 ? "OLTIN" : p.totalXp >= 100 ? "KUMUSH" : "BRONZA";
  const nextLevel = level === "PLATINA" ? "DIAMOND" : level === "OLTIN" ? "PLATINA" : level === "KUMUSH" ? "OLTIN" : "KUMUSH";
  const levelMax = level === "PLATINA" ? 5000 : level === "OLTIN" ? 1000 : level === "KUMUSH" ? 500 : 100;
  const levelMin = level === "OLTIN" ? 500 : level === "KUMUSH" ? 100 : level === "BRONZA" ? 0 : 1000;
  const progressInLevel = ((p.totalXp - levelMin) / (levelMax - levelMin)) * 100;

  const data = range === "week" ? p.weekDays : p.monthDays;
  const max = Math.max(1, ...data.map((x) => x.q));
  const total = data.reduce((s, x) => s + x.q, 0);
  const totalCorrect = data.reduce((s, x) => s + x.c, 0);
  const accuracy = total > 0 ? Math.round((totalCorrect / total) * 100) : 0;
  const avg = Math.round(total / data.length);

  // Month labels per col for heatmap
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

  return (
    <div style={{ padding: "48px", color: "var(--fg-0)" }}>
      <div style={{ marginBottom: 28 }}>
        <div className="overline" style={{ marginBottom: 8 }}>05 · PROGRESS</div>
        <h1 className="h-display h2" style={{ margin: 0 }}>{t.progress.title}</h1>
      </div>

      <div className="lg-grid-3" style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 16, marginBottom: 16 }}>
        {/* Bar chart */}
        <div className="bento" style={{ padding: 28, height: 320, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div className="overline" style={{ marginBottom: 4 }}>
                {lang === "ru" ? "ЕЖЕДНЕВНАЯ АКТИВНОСТЬ" : "KUNDALIK AKTIVLIK"}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span className="h-display" style={{ fontSize: 28, fontWeight: 700 }}>{total}</span>
                <span style={{ fontSize: 12, color: "var(--fg-2)" }}>
                  {lang === "ru" ? "вопросов · точность" : "savol · aniqlik"}{" "}
                  <span className="mono" style={{ color: "var(--success)" }}>{accuracy}%</span>
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 0, padding: 3, borderRadius: 10, background: "var(--bg-2)", border: "1px solid var(--line)" }}>
              {[
                { k: "week" as const, l: lang === "ru" ? "1 неделя" : "1 hafta" },
                { k: "month" as const, l: lang === "ru" ? "1 месяц" : "1 oy" }
              ].map((r) => (
                <button
                  key={r.k}
                  onClick={() => setRange(r.k)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 7,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    background: range === r.k ? "var(--bg-0)" : "transparent",
                    color: range === r.k ? "var(--fg-0)" : "var(--fg-2)",
                    boxShadow: range === r.k ? "0 1px 2px rgba(0,0,0,0.4)" : "none",
                    transition: "all .15s"
                  }}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: range === "week" ? 12 : 4, paddingTop: 18, position: "relative" }}>
            <div style={{ position: "absolute", inset: "18px 0 22px 0", display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none" }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ borderTop: "1px dashed var(--line)", height: 0 }} />
              ))}
            </div>
            {data.map((b, i) => {
              const h = max > 0 ? (b.q / max) * 100 : 0;
              const correctH = b.q > 0 ? (b.c / b.q) * 100 : 0;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end", position: "relative" }}>
                  {(range === "week" || (i + 1) % 5 === 0 || b.today) && b.q > 0 && (
                    <span className="mono" style={{ fontSize: 10, color: b.today ? "var(--accent)" : "var(--fg-2)", position: "absolute", top: -2, fontWeight: 600 }}>{b.q}</span>
                  )}
                  <div
                    style={{
                      width: "100%",
                      maxWidth: range === "week" ? 60 : 28,
                      height: `calc(${h}% - 18px)`,
                      minHeight: b.q > 0 ? 4 : 2,
                      borderRadius: "6px 6px 0 0",
                      background: "var(--bg-2)",
                      border: "1px solid var(--line)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: b.today ? "0 0 0 1.5px var(--accent), 0 0 16px color-mix(in oklch, var(--accent) 40%, transparent)" : "none"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: correctH + "%",
                        background: b.today
                          ? "linear-gradient(180deg, var(--accent), color-mix(in oklch, var(--accent) 80%, var(--accent-2)))"
                          : "linear-gradient(180deg, color-mix(in oklch, var(--accent) 70%, var(--accent-2)), color-mix(in oklch, var(--accent) 60%, transparent))"
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: range === "week" ? 11 : 9,
                      fontFamily: "var(--font-mono)",
                      color: b.today ? "var(--accent)" : "var(--fg-2)",
                      fontWeight: b.today ? 700 : 500,
                      height: 14,
                      lineHeight: "14px"
                    }}
                  >
                    {range === "week" ? b.d : (i % 5 === 0 || i === data.length - 1 ? b.date : "")}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "linear-gradient(180deg, var(--accent), var(--accent-2))", display: "inline-block" }} />
              {lang === "ru" ? "ВЕРНО" : "TO'G'RI"}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--bg-2)", border: "1px solid var(--line)", display: "inline-block" }} />
              {lang === "ru" ? "ВСЕГО" : "JAMI"}
            </span>
            <span style={{ marginLeft: "auto" }}>
              {lang === "ru" ? "среднее" : "o'rtacha"}: <span style={{ color: "var(--fg-0)" }}>{avg}/{lang === "ru" ? "день" : "kun"}</span>
            </span>
          </div>
        </div>

        {/* Streak */}
        <div className="bento bento--accent-2" style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="overline" style={{ marginBottom: 8 }}>🔥 STREAK</div>
            <div className="h-display" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>{p.streakCount}</div>
            <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{lang === "ru" ? "дней подряд" : "ketma-ket kun"}</div>
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

        {/* Heatmap */}
        <div className="bento" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <div className="overline">📅 KUNDALIK MASHQ</div>
            <div className="overline" style={{ color: "var(--fg-2)" }}>OXIRGI 14 HAFTA</div>
          </div>

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

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
            <span>kam</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
            </div>
            <span>ko'p</span>
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
