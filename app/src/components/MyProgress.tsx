"use client";

import { useState } from "react";
import type { OverallProgress } from "@/lib/progress-stats";
import RankBadge from "./RankBadge";

type Props = {
  userName: string;
  streak: number;
  totalXp: number;
  isPro: boolean;
  examTestId: string;
  examDate: string | null;
  progress: OverallProgress;
};

const months = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"];
function fmtDate(iso: string) { const d = new Date(iso); return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; }
function daysLeft(iso: string | null): number | null {
  if (!iso) return null;
  const target = new Date(iso); const now = new Date();
  target.setHours(0, 0, 0, 0); now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function MyProgress(p: Props) {
  const [examDate, setExamDate] = useState<string | null>(p.examDate);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string>(p.examDate ? p.examDate.slice(0, 10) : "");
  const [saving, setSaving] = useState(false);

  const left = daysLeft(examDate);

  async function saveExamDate(date: string | null) {
    setSaving(true);
    try {
      const res = await fetch("/api/user/exam-date", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) { setExamDate(data.examDate ?? null); setEditing(false); }
    } finally { setSaving(false); }
  }

  const leftChipColor =
    left == null ? "var(--fg-2)"
    : left <= 7 ? "var(--error)"
    : left <= 30 ? "var(--warning)"
    : "var(--accent)";

  return (
    <div
      className="bento"
      style={{
        padding: 18,
        background:
          "radial-gradient(70% 100% at 100% 0%, color-mix(in oklch, var(--accent) 14%, transparent), transparent 65%), var(--bg-1)",
      }}
    >
      {/* Exam date — inline strip */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 12px",
          borderRadius: 10, border: "1px solid var(--line)",
          background: "var(--bg-2)", flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 14 }}>📅</span>
        <span className="overline" style={{ fontSize: 10 }}>IMTIHON KUNI</span>
        {!editing ? (
          <>
            {examDate ? (
              <>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{fmtDate(examDate)}</span>
                {typeof left === "number" && (
                  <span
                    className="mono"
                    style={{
                      fontSize: 11, padding: "2px 8px", borderRadius: 999,
                      border: `1px solid color-mix(in oklch, ${leftChipColor} 40%, transparent)`,
                      color: leftChipColor,
                    }}
                  >
                    {left < 0 ? `${Math.abs(left)} kun oldin` : left === 0 ? "BUGUN" : `${left} kun qoldi`}
                  </span>
                )}
              </>
            ) : (
              <span style={{ fontSize: 12, color: "var(--fg-2)" }}>tanlanmagan</span>
            )}
            <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
              <button
                onClick={() => { setDraft(examDate ? examDate.slice(0, 10) : ""); setEditing(true); }}
                style={miniBtn}
              >
                {examDate ? "Tahrirlash" : "Tanlash"}
              </button>
              {examDate && (
                <button onClick={() => saveExamDate(null)} disabled={saving} style={{ ...miniBtn, color: "var(--error)" }}>
                  ✕
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <input
              type="date" value={draft} onChange={(e) => setDraft(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              style={miniInput}
            />
            <button onClick={() => saveExamDate(draft || null)} disabled={saving} style={{ ...miniBtn, color: "var(--accent)", borderColor: "color-mix(in oklch, var(--accent) 50%, transparent)" }}>
              Saqlash
            </button>
            <button onClick={() => setEditing(false)} style={miniBtn}>Bekor</button>
          </>
        )}
      </div>

      {/* UMUMIY PROGRESS */}
      <div style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="overline">UMUMIY PROGRESS</span>
            <RankBadge
              rank={p.progress.rank.key}
              label={p.progress.rank.label}
              size="sm"
              currentPercent={p.progress.totalPercent}
            />
          </div>
          <span className="mono" style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
            {p.progress.totalPercent}%
          </span>
        </div>
        <div
          style={{
            height: 14, borderRadius: 999, background: "var(--bg-3)",
            overflow: "hidden", border: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              width: `${p.progress.totalPercent}%`, height: "100%",
              background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
              transition: "width .6s cubic-bezier(.2,.8,.2,1)",
              boxShadow: "0 0 24px color-mix(in oklch, var(--accent) 45%, transparent)",
            }}
          />
        </div>
      </div>

      {/* 3 ta raqamli stat */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 10, marginTop: 12,
        }}
      >
        <NumStat label="Biletlar" sub="90%+ yakunlangan"
          value={p.progress.tickets.successful} total={p.progress.tickets.total}
          percent={p.progress.tickets.percent} color="var(--accent)" />
        <NumStat label="Real imtihon" sub="muvaffaqiyatli"
          value={p.progress.realExams.passed} total={p.progress.realExams.goal}
          percent={p.progress.realExams.percent} color="var(--accent-2)" />
        <NumStat label="Savollar" sub="to'g'ri javob"
          value={p.progress.questions.correct} total={p.progress.questions.total}
          percent={p.progress.questions.percent} color="var(--info)" />
      </div>
    </div>
  );
}

const miniBtn: React.CSSProperties = {
  fontSize: 11,
  fontFamily: "var(--font-body)",
  padding: "4px 10px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "var(--bg-1)",
  color: "var(--fg-1)",
  cursor: "pointer",
};

const miniInput: React.CSSProperties = {
  fontSize: 12,
  fontFamily: "var(--font-body)",
  padding: "4px 8px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  background: "var(--bg-1)",
  color: "var(--fg-0)",
  outline: "none",
};

function NumStat(props: {
  label: string; sub: string;
  value: number; total: number; percent: number; color: string;
}) {
  return (
    <div style={{
      padding: "10px 12px", borderRadius: 12,
      border: "1px solid var(--line)", background: "var(--bg-2)",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{props.label}</div>
        <div className="overline" style={{ fontSize: 9, marginTop: 1 }}>{props.sub}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: props.color, lineHeight: 1 }}>
          {props.percent}%
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 2 }}>
          {props.value} / {props.total}
        </div>
      </div>
    </div>
  );
}
