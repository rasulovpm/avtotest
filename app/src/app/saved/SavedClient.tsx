"use client";

import { useState } from "react";
import Link from "next/link";
import SaveQuestionButton from "@/components/SaveQuestionButton";

type Option = { id: string; textUz: string; isCorrect: boolean };
type Item = {
  id: string;
  questionId: string;
  number: number;
  textUz: string;
  imageUrl: string | null;
  explanationUz: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  savedAt: string;
  options: Option[];
};

export default function SavedClient({ items: initial }: { items: Item[] }) {
  // Local state — SaveQuestionButton onChange orqali kartochkalar darrov yo'qoladi
  const [items, setItems] = useState<Item[]>(initial);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (items.length === 0) {
    return (
      <div className="bento" style={{ padding: 40, textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>☆</div>
        <p style={{ color: "var(--fg-2)", margin: 0 }}>
          Sevimli savollaringizni saqlash uchun test ichida ★ tugmasini bosing.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
      {items.map((q) => {
        const isOpen = expanded.has(q.id);
        const correct = q.options.find((o) => o.isCorrect);
        return (
          <div key={q.id} className="bento" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background:
                    "radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 70%), color-mix(in oklch, var(--accent) 10%, var(--bg-2))",
                  border: "1px solid color-mix(in oklch, var(--accent) 45%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: 12,
                  color: "var(--accent)",
                  flexShrink: 0,
                  boxShadow: "0 4px 14px color-mix(in oklch, var(--accent) 20%, transparent)",
                }}
              >
                #{q.number}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                  {q.categoryName && q.categorySlug && (
                    <Link
                      href={`/topics/${q.categorySlug}`}
                      className="chip"
                      style={{ fontSize: 11, textDecoration: "none" }}
                    >
                      {q.categoryName}
                    </Link>
                  )}
                  <span className="overline" style={{ fontSize: 10 }}>
                    {new Date(q.savedAt).toLocaleDateString("uz-UZ")}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>
                  {q.textUz}
                </p>

                {isOpen && (
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    {q.imageUrl && (
                      <div
                        style={{
                          padding: 14,
                          border: "1px solid var(--line)",
                          borderRadius: 12,
                          background: "var(--bg-0)",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img src={q.imageUrl} alt="" style={{ maxWidth: 240, maxHeight: 240, objectFit: "contain" }} />
                      </div>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {q.options.map((o, idx) => (
                        <div
                          key={o.id}
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: "1px solid",
                            borderColor: o.isCorrect
                              ? "var(--success)"
                              : "var(--line)",
                            background: o.isCorrect
                              ? "color-mix(in oklch, var(--success) 14%, var(--bg-1))"
                              : "var(--bg-1)",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 14,
                          }}
                        >
                          <span
                            className="mono"
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 6,
                              background: "var(--bg-2)",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 11,
                              flexShrink: 0,
                            }}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{o.textUz}</span>
                          {o.isCorrect && (
                            <span style={{ marginLeft: "auto", color: "var(--success)", fontWeight: 600 }}>✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {q.explanationUz && (
                      <div
                        style={{
                          padding: 12,
                          borderRadius: 10,
                          background: "var(--bg-2)",
                          border: "1px solid var(--line)",
                          fontSize: 13,
                          color: "var(--fg-1)",
                          lineHeight: 1.5,
                        }}
                      >
                        <div className="overline" style={{ fontSize: 10, marginBottom: 4 }}>
                          IZOH
                        </div>
                        {q.explanationUz}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
                <SaveQuestionButton
                  questionId={q.questionId}
                  initialSaved={true}
                  size="sm"
                  onChange={(saved) => {
                    if (!saved) {
                      setItems((prev) => prev.filter((x) => x.id !== q.id));
                    }
                  }}
                />
                <button
                  onClick={() => toggleExpand(q.id)}
                  className="btn btn--ghost"
                  style={{ padding: "4px 10px", fontSize: 11 }}
                >
                  {isOpen ? "Yopish" : "Ko'rish"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
