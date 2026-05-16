"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { pickLocalized } from "@/lib/i18n";
import { RoadSignSvg } from "@/components/RoadSignSvg";
import SaveQuestionButton from "@/components/SaveQuestionButton";

type Q = {
  id: string;
  textUz: string;
  textRu: string;
  textCy: string;
  explanationUz: string | null;
  explanationRu: string | null;
  explanationCy: string | null;
  imageUrl: string | null;
  categoryName: string;
  options: { id: string; textUz: string; textRu: string; textCy: string }[];
  // "Ommabop xatoliklar" rejimida har savol uchun global statistika
  globalStats?: { wrongCount: number; totalAttempts: number; wrongPercent: number };
};

type CheckResult = {
  isCorrect: boolean;
  correctOptionId?: string;
  explanation: { uz: string | null; ru: string | null; cy: string | null };
};

export default function MistakesClient({
  questions,
  totalWrongCount,
  initialSavedIds,
  mode = "personal",
}: {
  questions: Q[];
  totalWrongCount: number;
  initialSavedIds?: string[];
  mode?: "personal" | "popular";
}) {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { sel: string; check?: CheckResult }>>({});

  const q = questions[current];
  const cur = q ? answers[q.id] : undefined;
  const total = questions.length;

  const choose = async (optId: string) => {
    if (!q || answers[q.id]?.check) return;
    setAnswers((a) => ({ ...a, [q.id]: { sel: optId } }));
    try {
      const res = await fetch("/api/quiz/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ questionId: q.id, optionId: optId })
      });
      if (res.ok) {
        const data: CheckResult = await res.json();
        setAnswers((a) => ({ ...a, [q.id]: { sel: optId, check: data } }));
      }
    } catch {}
  };

  if (questions.length === 0) {
    return (
      <div style={{ padding: 48, textAlign: "center", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="bento" style={{ padding: 40, maxWidth: 480 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
          <h2 className="h-display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
            Xato yo'q!
          </h2>
          <p style={{ color: "var(--fg-2)", marginBottom: 20, fontSize: 14 }}>
            Hali biror testni yechmagansiz yoki barcha javoblaringiz to'g'ri.
          </p>
          <Link href="/" className="btn btn--primary">Bosh sahifa →</Link>
        </div>
      </div>
    );
  }

  const correctCount = Object.values(answers).filter((a) => a.check?.isCorrect).length;

  return (
    <div style={{ padding: 48, color: "var(--fg-0)" }}>
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="overline" style={{ marginBottom: 8 }}>
            ● MASHQ · {mode === "popular" ? "OMMABOP XATOLIKLAR" : "XATOLARIM"}
          </div>
          <h1 className="h-display h2" style={{ margin: 0 }}>
            {mode === "popular" ? "Eng ko'p xato qilingan savollar" : "Xatolarni qaytaring"}
          </h1>
          <p style={{ color: "var(--fg-1)", margin: "6px 0 0", fontSize: 14 }}>
            {mode === "popular"
              ? `Foydalanuvchilar tomonidan ko'p xato qilingan top ${questions.length} ta savol`
              : `Jami ${totalWrongCount} ta xato javob · ${questions.length} ta noyob savol bilan mashq qiling`}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="chip chip--success" style={{ fontSize: 12 }}>
            ✓ {correctCount}
          </span>
          <span className="chip mono" style={{ fontSize: 12 }}>
            {current + 1} / {total}
          </span>
        </div>
      </div>

      <div className="quiz-body" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {q && (
            <motion.div key={q.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <div className="overline">SAVOL #{(current + 1).toString().padStart(2, "0")}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {q.globalStats && (
                    <span
                      className="chip"
                      style={{
                        fontSize: 11,
                        background: "color-mix(in oklch, var(--error) 14%, var(--bg-2))",
                        color: "var(--error)",
                        borderColor: "color-mix(in oklch, var(--error) 40%, transparent)",
                      }}
                      title={`Bu savolga ${q.globalStats.totalAttempts} marta urinishdan ${q.globalStats.wrongCount} tasi xato`}
                    >
                      ✕ {q.globalStats.wrongPercent}% xato · {q.globalStats.wrongCount} marta
                    </span>
                  )}
                  <span className="chip" style={{ fontSize: 11 }}>{q.categoryName}</span>
                  <SaveQuestionButton
                    questionId={q.id}
                    initialSaved={(initialSavedIds || []).includes(q.id)}
                    size="sm"
                  />
                </div>
              </div>
              <h2 className="h-display" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
                {pickLocalized(q, lang)}
              </h2>
            </motion.div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q?.options.map((opt) => {
              const isSel = cur?.sel === opt.id;
              const checked = cur?.check;
              const isCorrectOpt = checked && opt.id === checked.correctOptionId;
              const isWrongSel = checked && isSel && !checked.isCorrect;

              let bg = "var(--bg-1)";
              let border = "var(--line)";
              if (checked) {
                if (isCorrectOpt) {
                  bg = "color-mix(in oklch, var(--success) 18%, var(--bg-1))";
                  border = "var(--success)";
                } else if (isWrongSel) {
                  bg = "color-mix(in oklch, var(--error) 18%, var(--bg-1))";
                  border = "var(--error)";
                }
              } else if (isSel) {
                bg = "color-mix(in oklch, var(--accent) 14%, var(--bg-1))";
                border = "var(--accent)";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => choose(opt.id)}
                  disabled={!!cur?.check}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    borderRadius: 14,
                    border: "1.5px solid " + border,
                    background: bg,
                    color: "var(--fg-0)",
                    fontSize: 15,
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: cur?.check ? "default" : "pointer"
                  }}
                >
                  <span style={{ flex: 1 }}>{pickLocalized(opt, lang)}</span>
                  {isCorrectOpt && <span style={{ color: "var(--success)" }}>✓</span>}
                  {isWrongSel && <span style={{ color: "var(--error)" }}>✕</span>}
                </button>
              );
            })}
          </div>

          {cur?.check && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: 18,
                borderRadius: 14,
                background: cur.check.isCorrect
                  ? "color-mix(in oklch, var(--success) 8%, var(--bg-2))"
                  : "color-mix(in oklch, var(--error) 8%, var(--bg-2))",
                border:
                  "1px solid " +
                  (cur.check.isCorrect
                    ? "color-mix(in oklch, var(--success) 50%, transparent)"
                    : "color-mix(in oklch, var(--error) 50%, transparent)")
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: cur.check.isCorrect ? "var(--success)" : "var(--error)", marginBottom: 6 }}>
                {cur.check.isCorrect ? "✓ To'g'ri javob" : "✕ Yana xato"}
              </div>
              {(cur.check.explanation[lang] || cur.check.explanation.uz) && (
                <p style={{ margin: 0, color: "var(--fg-1)", fontSize: 13, lineHeight: 1.55 }}>
                  {cur.check.explanation[lang] || cur.check.explanation.uz}
                </p>
              )}
            </motion.div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, gap: 8 }}>
            <button
              onClick={() => setCurrent((i) => Math.max(0, i - 1))}
              disabled={current === 0}
              className="btn btn--ghost"
              style={{ opacity: current === 0 ? 0.4 : 1 }}
            >
              ← Oldingi
            </button>
            {current === total - 1 ? (
              <Link href="/" className="btn btn--primary">Tugatish →</Link>
            ) : (
              <button onClick={() => setCurrent((i) => Math.min(total - 1, i + 1))} className="btn btn--primary">
                Keyingi →
              </button>
            )}
          </div>
        </div>

        <div className="bento" style={{ padding: 24, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320, background: "radial-gradient(80% 80% at 50% 0%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 70%), var(--bg-1)" }}>
          <div style={{ background: "var(--bg-0)", borderRadius: 16, padding: 40, border: "1px solid var(--line)" }}>
            {q?.imageUrl ? (
              <img src={q.imageUrl} alt="" style={{ maxWidth: 200, maxHeight: 200, objectFit: "contain" }} />
            ) : (
              <RoadSignSvg
                kind={(["priority-main", "warning-curve", "prohibit-no-entry", "mandatory-roundabout", "prohibit-speed", "info-parking"][current % 6]) as any}
                size={180}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .quiz-body { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
