"use client";

import { useState } from "react";

const months = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentabr","oktabr","noyabr","dekabr"];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function daysLeft(iso: string): number {
  const target = new Date(iso);
  const now = new Date();
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ExamDateEditor({ initialDate }: { initialDate: string | null }) {
  const [date, setDate] = useState<string | null>(initialDate);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string>(initialDate ? initialDate.slice(0, 10) : "");
  const [busy, setBusy] = useState(false);

  async function save(value: string | null) {
    setBusy(true);
    try {
      const res = await fetch("/api/user/exam-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setDate(data.examDate ?? null);
        setEditing(false);
      }
    } finally {
      setBusy(false);
    }
  }

  const left = date ? daysLeft(date) : null;

  return (
    <div className="bento" style={{ padding: 22, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: date
              ? "color-mix(in oklch, var(--accent) 20%, var(--bg-2))"
              : "var(--bg-2)",
            border: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          📅
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="overline" style={{ marginBottom: 6 }}>IMTIHON KUNI</div>
          {date ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div className="h-display" style={{ fontSize: 20, fontWeight: 600 }}>
                {formatDate(date)}
              </div>
              {typeof left === "number" && (
                <span
                  className="chip mono"
                  style={{
                    fontSize: 11,
                    padding: "4px 10px",
                    color: left <= 7 ? "var(--error)" : left <= 30 ? "var(--warning)" : "var(--accent)",
                    borderColor:
                      left <= 7
                        ? "color-mix(in oklch, var(--error) 40%, transparent)"
                        : left <= 30
                        ? "color-mix(in oklch, var(--warning) 40%, transparent)"
                        : "color-mix(in oklch, var(--accent) 40%, transparent)",
                  }}
                >
                  {left < 0 ? `${Math.abs(left)} kun oldin` : left === 0 ? "BUGUN" : `${left} kun qoldi`}
                </span>
              )}
            </div>
          ) : (
            <p style={{ margin: 0, color: "var(--fg-2)", fontSize: 14 }}>
              Hali tanlanmagan. Tanlasangiz bosh sahifada countdown ko'rinadi.
            </p>
          )}

          {editing ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
              <input
                type="date"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                className="input"
                style={{ width: 180, padding: "8px 12px", fontSize: 14 }}
              />
              <button
                onClick={() => save(draft || null)}
                disabled={busy}
                className="btn btn--primary"
                style={{ fontSize: 13, padding: "8px 14px" }}
              >
                Saqlash
              </button>
              <button
                onClick={() => setEditing(false)}
                className="btn btn--ghost"
                style={{ fontSize: 13, padding: "8px 12px" }}
              >
                Bekor
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setDraft(date ? date.slice(0, 10) : "");
                  setEditing(true);
                }}
                className="btn btn--ghost"
                style={{ fontSize: 13, padding: "8px 14px" }}
              >
                {date ? "O'zgartirish" : "Tanlash"}
              </button>
              {date && (
                <button
                  onClick={() => save(null)}
                  disabled={busy}
                  className="btn btn--ghost"
                  style={{ fontSize: 13, padding: "8px 12px", color: "var(--error)" }}
                >
                  Olib tashlash
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
