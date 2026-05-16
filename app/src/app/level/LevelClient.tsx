"use client";

import { useState } from "react";
import Link from "next/link";
import { RANK_TIERS, type OverallProgress } from "@/lib/progress-stats";
import HexBadge from "@/components/HexBadge";

type Props = {
  userName: string;
  examDate: string | null;
  progress: OverallProgress;
  activeIdx: number;
};

const months = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"];
const weekdays = ["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"];
function fmtFullDate(iso: string) {
  const d = new Date(iso);
  return { date: `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`, weekday: weekdays[d.getDay()] };
}
function daysLeft(iso: string | null): number | null {
  if (!iso) return null;
  const target = new Date(iso); const now = new Date();
  target.setHours(0, 0, 0, 0); now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function LevelClient({ userName, examDate, progress, activeIdx }: Props) {
  const [idx, setIdx] = useState(activeIdx);
  const rank = RANK_TIERS[idx];
  const inRankPct =
    idx === activeIdx
      ? Math.max(0, Math.min(100, ((progress.totalPercent - rank.min) / (rank.max - rank.min || 1)) * 100))
      : idx < activeIdx ? 100 : 0;

  const stats = [
    { l: "Joriy o'zlashtirish", v: `${progress.totalPercent}%`, c: "#22d3ee" },
    { l: "To'g'ri javoblar", v: String(progress.questions.correct), c: "#22c55e" },
    { l: "Xato javoblar", v: String(progress.questions.wrong), c: "#ef4444" },
    { l: "Qolgan savollar", v: String(progress.questions.untouched), c: "#94a3b8" },
  ];

  const left = daysLeft(examDate);
  const examInfo = examDate ? fmtFullDate(examDate) : null;

  return (
    <main
      style={{
        background: "var(--bg-0)",
        color: "var(--fg-0)",
        minHeight: "100vh",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Banner */}
      <div
        style={{
          padding: "24px 32px",
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--accent) 12%, var(--bg-1)), var(--bg-1))",
          borderBottom: "1px solid color-mix(in oklch, var(--accent) 18%, transparent)",
        }}
      >
        <div className="overline" style={{ marginBottom: 6 }}>
          ● DARAJA TIZIMI · 5 BOSQICH
        </div>
        <h1
          className="h-display"
          style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          Mening progressim — bilim yo'lingizdagi bosqichlar
        </h1>
        <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 8 }}>
          {userName ? <>Salom, <span style={{ color: "var(--fg-0)", fontWeight: 600 }}>{userName}</span>. </> : null}
          Joriy daraja:{" "}
          <span style={{ color: RANK_TIERS[activeIdx].textColor, fontWeight: 600 }}>
            {RANK_TIERS[activeIdx].label}
          </span>{" "}
          · joriy o'zlashtirish:{" "}
          <span style={{ color: "var(--fg-0)", fontWeight: 600 }}>{progress.totalPercent}%</span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: 24,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 360px",
          gap: 24,
        }}
        className="level-grid"
      >
        {/* LEFT — featured + ladder */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Featured rank card */}
          <div
            style={{
              padding: "32px 24px",
              borderRadius: 16,
              background: `radial-gradient(80% 100% at 50% 0%, ${rank.fill} 0%, transparent 70%), var(--bg-1)`,
              border: `1px solid color-mix(in oklch, ${rank.color} 35%, var(--line))`,
              display: "flex",
              alignItems: "center",
              gap: 36,
              minHeight: 280,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <HexBadge rank={rank} />
            </div>

            <div style={{ flex: 1, minWidth: 240 }}>
              <div
                className="overline"
                style={{ color: rank.textColor, marginBottom: 8 }}
              >
                {idx === activeIdx
                  ? "● HOZIRGI DARAJA"
                  : idx < activeIdx
                  ? "✓ O'TILGAN"
                  : "KEYINGI DARAJA"}
              </div>
              <h2
                className="h-display"
                style={{
                  margin: 0,
                  fontSize: 38,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {rank.label}
              </h2>
              <div style={{ marginTop: 6, fontSize: 16, color: rank.textColor, fontWeight: 500 }}>
                {rank.sub}
              </div>

              <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <InfoBox label="DIAPAZON" value={`${rank.min}% – ${rank.max}%`} />
                <InfoBox label="BOSQICH" value={`${idx + 1} / ${RANK_TIERS.length}`} />
              </div>

              <div style={{ marginTop: 22 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "var(--fg-2)",
                    marginBottom: 6,
                  }}
                >
                  <span>Ushbu bosqichdagi o'rningiz</span>
                  <span className="mono" style={{ color: rank.textColor, fontWeight: 600 }}>
                    {Math.round(inRankPct)}%
                  </span>
                </div>
                <div
                  style={{
                    height: 10,
                    background: "color-mix(in oklch, var(--fg-2) 10%, transparent)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${inRankPct}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${rank.color}, ${rank.textColor})`,
                      boxShadow: `0 0 16px ${rank.glow}`,
                      borderRadius: 999,
                      transition: "width .4s",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 5-rank ladder */}
          <div
            className="bento"
            style={{
              padding: 18,
              borderRadius: 14,
            }}
          >
            <div className="overline" style={{ marginBottom: 14 }}>
              BARCHA DARAJALAR
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 12,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 36,
                  left: "10%",
                  right: "10%",
                  height: 2,
                  background: "color-mix(in oklch, var(--fg-2) 14%, transparent)",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 36,
                  left: "10%",
                  width: `calc(${(activeIdx / (RANK_TIERS.length - 1)) * 80}%)`,
                  height: 2,
                  background: `linear-gradient(90deg, ${RANK_TIERS[0].color}, ${RANK_TIERS[activeIdx].color})`,
                  boxShadow: `0 0 8px ${RANK_TIERS[activeIdx].glow}`,
                  zIndex: 1,
                  transition: "width .4s",
                }}
              />

              {RANK_TIERS.map((r, i) => {
                const isActive = i === activeIdx;
                const isPast = i < activeIdx;
                const isSel = i === idx;
                const stateColor = isPast || isActive ? r.color : "color-mix(in oklch, var(--fg-2) 25%, transparent)";
                return (
                  <button
                    key={r.key}
                    onClick={() => setIdx(i)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 4px",
                      borderRadius: 10,
                      background: isSel ? "color-mix(in oklch, var(--fg-2) 6%, transparent)" : "transparent",
                      border: `1px solid ${isSel ? "var(--line-2)" : "transparent"}`,
                      cursor: "pointer",
                      font: "inherit",
                      color: "inherit",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: isPast || isActive ? r.color : "var(--bg-2)",
                        border: `2px solid ${stateColor}`,
                        boxShadow: isPast || isActive ? `0 0 12px ${r.glow}` : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0b1220",
                        fontWeight: 800,
                        fontSize: 12,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {isPast ? "✓" : i + 1}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: isPast || isActive ? "var(--fg-0)" : "var(--fg-3)",
                      }}
                    >
                      {r.label}
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: r.textColor }}>
                      {r.min}% – {r.max}%
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="bento" style={{ padding: 18, borderRadius: 14 }}>
            <div className="overline" style={{ marginBottom: 14 }}>
              UMUMIY KO'RSATKICHLAR
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div
                    className="h-display"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: s.c,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.v}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam countdown */}
          <div
            style={{
              padding: 18,
              borderRadius: 14,
              background: "color-mix(in oklch, var(--warning) 10%, var(--bg-1))",
              border: "1px solid color-mix(in oklch, var(--warning) 35%, transparent)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div className="overline" style={{ color: "var(--warning)" }}>
                IMTIHONGACHA
              </div>
              <Link
                href="/profile"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--warning)",
                  fontSize: 12,
                  textDecoration: "none",
                }}
              >
                ✎
              </Link>
            </div>
            {examInfo && typeof left === "number" ? (
              <>
                <div
                  className="h-display"
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: "var(--warning)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {left < 0 ? `${Math.abs(left)} kun oldin` : left === 0 ? "BUGUN" : `${left} kun`}
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4 }}>
                  {examInfo.date} · {examInfo.weekday}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--fg-2)",
                    marginTop: 4,
                  }}
                >
                  Imtihon kuni tanlanmagan
                </div>
                <Link
                  href="/profile"
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    fontSize: 12,
                    color: "var(--warning)",
                  }}
                >
                  Tanlash →
                </Link>
              </>
            )}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link
              href="/topics"
              className="btn btn--ghost"
              style={{
                padding: "14px 18px",
                borderRadius: 12,
                background: "color-mix(in oklch, var(--success) 12%, var(--bg-1))",
                border: "1px solid color-mix(in oklch, var(--success) 40%, transparent)",
                color: "color-mix(in oklch, var(--success) 80%, white)",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "left",
                justifyContent: "flex-start",
              }}
            >
              Mavzular bo'yicha mashq qilish →
            </Link>
            <Link
              href="/tests/test-real-20"
              className="btn btn--primary"
              style={{
                fontSize: 14,
                fontWeight: 600,
                justifyContent: "center",
              }}
            >
              ▶ Real imtihonni boshlash
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .level-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        background: "var(--bg-2)",
        border: "1px solid var(--line)",
      }}
    >
      <div className="overline" style={{ fontSize: 10 }}>
        {label}
      </div>
      <div
        className="mono"
        style={{ marginTop: 4, fontSize: 16, fontWeight: 700 }}
      >
        {value}
      </div>
    </div>
  );
}
