"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { formatTime } from "@/lib/utils";
import { pickLocalized, pickTitle, type Lang } from "@/lib/i18n";
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
  options: { id: string; textUz: string; textRu: string; textCy: string }[];
};

type CheckResult = {
  isCorrect: boolean;
  correctOptionId?: string;
  explanation: { uz: string | null; ru: string | null; cy: string | null };
  relatedLawArticle: string | null;
};

type Props = {
  testId: string;
  titleUz: string;
  titleRu: string;
  titleCy: string;
  timeLimitSec: number;
  passingScore: number;
  questions: Q[];
  mode: "exam" | "training";
  initialSavedIds?: string[];
};

export default function QuizEngine(p: Props) {
  const router = useRouter();
  const { t, lang } = useLang();
  const isTraining = p.mode === "training";

  const [current, setCurrent] = useState(0);
  // answers[questionId] = { sel, check (training mode'da) }
  const [answers, setAnswers] = useState<Record<string, { sel: string; check?: CheckResult }>>({});
  const [timeLeft, setTimeLeft] = useState(p.timeLimitSec);
  const [submitting, setSubmitting] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  // Exam rejimda oldingi savolning natijasi (faqat to'g'ri/xato — explanationsiz)
  const [lastFeedback, setLastFeedback] = useState<{ ok: boolean; qIdx: number } | null>(null);
  const startedAt = useRef(Date.now());

  const q = p.questions[current];
  const total = p.questions.length;
  const cur = q ? answers[q.id] : undefined;
  const correctCount = Object.values(answers).filter((a) => a.check?.isCorrect).length;
  const wrongCount = Object.values(answers).filter((a) => a.check && !a.check.isCorrect).length;

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const timeSpent = Math.floor((Date.now() - startedAt.current) / 1000);
      const flat: Record<string, string> = {};
      Object.entries(answers).forEach(([k, v]) => (flat[k] = v.sel));
      const questionIds = p.questions.map((qq) => qq.id);
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ testId: p.testId, answers: flat, questionIds, timeSpentSeconds: timeSpent })
      });
      const data = await res.json();
      if (res.ok && data.resultId) {
        router.push(`/results/${data.resultId}`);
      } else if (res.ok && data.ticket) {
        const total = data.total || 0;
        const correct = data.correct || 0;
        alert(`Bilet yakunlandi: ${correct} / ${total} to'g'ri (${data.score}%)`);
        router.push("/");
      } else {
        alert("Xatolik: " + (data.error || ""));
        setSubmitting(false);
      }
    } catch {
      alert("Tarmoq xatosi");
      setSubmitting(false);
    }
  }, [answers, p.testId, p.questions, router, submitting]);

  useEffect(() => {
    if (timeLeft <= 0) {
      submit();
      return;
    }
    const id = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [timeLeft, submit]);

  const choose = useCallback(
    async (optIdx: number) => {
      if (!q) return;
      const opt = q.options[optIdx];
      if (!opt) return;
      // Training rejimda: agar javob berilgan bo'lsa, qaytadan tanlamaydi
      if (isTraining && answers[q.id]?.check) return;

      // Avval selectni saqlaymiz
      setAnswers((a) => ({ ...a, [q.id]: { sel: opt.id, check: a[q.id]?.check } }));

      if (isTraining) {
        // Training rejimda darhol tekshiramiz
        try {
          const res = await fetch("/api/quiz/check", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ questionId: q.id, optionId: opt.id })
          });
          if (res.ok) {
            const data: CheckResult = await res.json();
            setAnswers((a) => ({ ...a, [q.id]: { sel: opt.id, check: data } }));
          }
        } catch {}
      }
    },
    [q, isTraining, answers]
  );

  // Exam rejimda joriy savolni darhol tekshirib, oldingi savol natijasini ko'rsatamiz.
  const checkCurrentIfExam = useCallback(async () => {
    if (isTraining) return;
    if (!q) return;
    const a = answers[q.id];
    if (!a || a.check) return;
    try {
      const res = await fetch("/api/quiz/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ questionId: q.id, optionId: a.sel })
      });
      if (!res.ok) return;
      const data: CheckResult = await res.json();
      setAnswers((map) => ({ ...map, [q.id]: { sel: a.sel, check: data } }));
      setLastFeedback({ ok: data.isCorrect, qIdx: current });
      // 2.5s'dan so'ng feedback chip'ni avtomatik yopamiz
      setTimeout(() => setLastFeedback((f) => (f && f.qIdx === current ? null : f)), 2500);
    } catch {}
  }, [isTraining, q, answers, current]);

  const goTo = useCallback(
    async (target: number) => {
      if (target === current) return;
      const clamped = Math.max(0, Math.min(total - 1, target));
      if (clamped === current) return;
      await checkCurrentIfExam();
      setCurrent(clamped);
    },
    [current, total, checkCurrentIfExam]
  );

  // F1..F6 + arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.startsWith("F") && e.key.length <= 3) {
        const n = parseInt(e.key.slice(1), 10);
        if (n >= 1 && n <= 6) {
          e.preventDefault();
          choose(n - 1);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, total, goTo, current]);

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);
  const danger = timeLeft < 120;
  const explanationText = cur?.check?.explanation
    ? cur.check.explanation[lang] || cur.check.explanation.uz || null
    : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-0)", color: "var(--fg-0)", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", width: "100%", maxWidth: "var(--shell-max)", marginInline: "auto" }}>
      {/* Header */}
      <header
        style={{
          padding: "18px 32px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12
        }}
      >
        <button onClick={() => setShowExitConfirm(true)} className="btn btn--ghost" style={{ padding: "8px 14px", fontSize: 13 }}>
          ← {t.common.back}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className={"chip " + (isTraining ? "chip--lime" : "chip--accent")} style={{ fontSize: 11 }}>
            {isTraining ? "● MASHQ REJIMI" : "● REAL IMTIHON"}
          </span>
          <span className="overline">{total} SAVOL</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {isTraining && (
            <>
              <span className="chip chip--success" style={{ fontSize: 12, padding: "5px 11px" }}>
                ✓ {correctCount}
              </span>
              <span className="chip chip--error" style={{ fontSize: 12, padding: "5px 11px" }}>
                ✕ {wrongCount}
              </span>
            </>
          )}
          {!isTraining && (
            <span className="chip mono" style={{ fontSize: 12, padding: "5px 11px" }}>
              {Object.keys(answers).length} / {total}
            </span>
          )}
          <span className={"chip mono " + (danger ? "chip--error" : "")} style={{ fontSize: 12, padding: "5px 11px" }}>
            ⏱ {formatTime(timeLeft)}
          </span>
          <span className="chip mono" style={{ fontSize: 12, padding: "5px 11px" }}>
            o'tish: {p.passingScore}/{total}
          </span>
        </div>
      </header>

      {/* Top question pills — small, 2 rows, left-aligned */}
      <div style={{ padding: "14px 32px 12px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "flex-start", overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.ceil(total / 2)}, 26px)`, gridAutoRows: "26px", gap: 5 }}>
          {Array.from({ length: total }).map((_, i) => {
            const qq = p.questions[i];
            const a = qq ? answers[qq.id] : undefined;
            const isCur = i === current;
            let bg = "var(--bg-2)";
            let border = "var(--line)";
            let color = "var(--fg-2)";
            if (a?.check) {
              if (a.check.isCorrect) {
                bg = "var(--success)";
                color = "#0a1f0e";
                border = "var(--success)";
              } else {
                bg = "var(--error)";
                color = "#fff";
                border = "var(--error)";
              }
            } else if (a) {
              bg = "color-mix(in oklch, var(--accent) 18%, var(--bg-2))";
              color = "var(--accent)";
              border = "color-mix(in oklch, var(--accent) 60%, var(--line))";
            }
            if (isCur) {
              border = "var(--accent)";
              if (!a) {
                bg = "color-mix(in oklch, var(--accent) 22%, var(--bg-2))";
                color = "var(--accent)";
              }
            }
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                title={`Savol ${i + 1}`}
                style={{
                  width: 26,
                  height: 26,
                  padding: 0,
                  borderRadius: 6,
                  border: "1.5px solid " + border,
                  background: bg,
                  color,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all .15s",
                  boxShadow: isCur ? "0 0 0 2px color-mix(in oklch, var(--accent) 30%, transparent)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body — 2 columns: image LEFT, options RIGHT */}
      <div className="quiz-body" style={{ flex: 1, gap: 24, padding: 32, display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)" }}>
        {/* LEFT — image / sign */}
        <div
          className="bento"
          style={{
            padding: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(80% 80% at 50% 0%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 70%), var(--bg-1)",
            minHeight: 380,
            alignSelf: "flex-start",
            position: "sticky",
            top: 16
          }}
        >
          <div
            style={{
              background: "var(--bg-0)",
              borderRadius: 16,
              padding: 40,
              border: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {q?.imageUrl ? (
              <img src={q.imageUrl} alt="" style={{ maxWidth: 240, maxHeight: 240, objectFit: "contain" }} />
            ) : (
              <RoadSignSvg
                kind={(["priority-main", "warning-curve", "prohibit-no-entry", "mandatory-roundabout", "prohibit-speed", "info-parking"][current % 6]) as any}
                size={220}
              />
            )}
          </div>
        </div>

        {/* RIGHT — savol + variantlar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <AnimatePresence mode="wait">
            {q && (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                  <div className="overline">
                    SAVOL #{(current + 1).toString().padStart(2, "0")}
                  </div>
                  {!isTraining && lastFeedback && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={"chip " + (lastFeedback.ok ? "chip--lime" : "chip--error")}
                      style={{ fontSize: 11, padding: "4px 10px" }}
                    >
                      {lastFeedback.ok
                        ? `✓ Oldingi savol — to'g'ri`
                        : `✕ Oldingi savol — xato`}
                    </motion.span>
                  )}
                  <div style={{ marginLeft: "auto" }}>
                    <SaveQuestionButton
                      questionId={q.id}
                      initialSaved={(p.initialSavedIds || []).includes(q.id)}
                      size="sm"
                    />
                  </div>
                </div>
                <h2 className="h-display" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
                  {pickLocalized(q, lang)}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            {q?.options.map((opt, i) => {
              const isSel = cur && cur.sel === opt.id;
              const checked = cur?.check;
              const isCorrectOpt = checked && opt.id === checked.correctOptionId;
              const isWrongSel = checked && isSel && !checked.isCorrect;

              let bg = "var(--bg-1)";
              let border = "var(--line)";
              let tone = "var(--fg-0)";
              let kbdBg = "var(--bg-3)";
              let kbdColor = "var(--fg-0)";
              let kbdLabel: string = `F${i + 1}`;

              if (checked) {
                if (isCorrectOpt) {
                  bg = "color-mix(in oklch, var(--success) 18%, var(--bg-1))";
                  border = "var(--success)";
                  kbdBg = "var(--success)";
                  kbdColor = "#0a1212";
                  kbdLabel = "✓";
                } else if (isWrongSel) {
                  bg = "color-mix(in oklch, var(--error) 18%, var(--bg-1))";
                  border = "var(--error)";
                  kbdBg = "var(--error)";
                  kbdColor = "#0a1212";
                  kbdLabel = "✕";
                } else {
                  tone = "var(--fg-2)";
                }
              } else if (isSel) {
                bg = "color-mix(in oklch, var(--accent) 14%, var(--bg-1))";
                border = "var(--accent)";
                kbdBg = "var(--accent)";
                kbdColor = "#0a1212";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => choose(i)}
                  disabled={isTraining && !!checked}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    borderRadius: 14,
                    border: "1.5px solid " + border,
                    background: bg,
                    color: tone,
                    fontSize: 15,
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: isTraining && checked ? "default" : "pointer",
                    transition: "all .2s"
                  }}
                >
                  <kbd
                    style={{
                      minWidth: 44,
                      padding: "6px 10px",
                      borderRadius: 8,
                      background: kbdBg,
                      color: kbdColor,
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 700,
                      border: "1px solid " + border,
                      textAlign: "center",
                      flexShrink: 0
                    }}
                  >
                    {kbdLabel}
                  </kbd>
                  <span style={{ flex: 1 }}>{pickLocalized(opt, lang)}</span>
                </button>
              );
            })}
          </div>

          {/* Training mode: explanation */}
          {isTraining && cur?.check && (
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: cur.check.isCorrect ? "var(--success)" : "var(--error)"
                }}
              >
                {cur.check.isCorrect ? "✓ To'g'ri javob" : "✕ Noto'g'ri"}
                {cur.check.relatedLawArticle && (
                  <span className="overline" style={{ marginLeft: "auto", color: "var(--fg-2)" }}>
                    {cur.check.relatedLawArticle}
                  </span>
                )}
              </div>
              {explanationText && (
                <p style={{ margin: 0, color: "var(--fg-1)", fontSize: 13, lineHeight: 1.55 }}>{explanationText}</p>
              )}
            </motion.div>
          )}

          {/* Bottom nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: "auto", paddingTop: 12, flexWrap: "wrap" }}>
            <button className="btn btn--ghost" onClick={prev} disabled={current === 0} style={{ opacity: current === 0 ? 0.4 : 1 }}>
              ← {t.common.previous}
            </button>
            <span className="overline" style={{ color: "var(--fg-3)" }}>
              F1…F{Math.min(q?.options.length || 4, 6)} · ← →
            </span>
            {current === total - 1 ? (
              <button
                className="btn btn--primary"
                onClick={async () => {
                  await checkCurrentIfExam();
                  submit();
                }}
                disabled={submitting}
              >
                {submitting ? "..." : `✓ ${t.quiz.submit}`}
              </button>
            ) : (
              <button className="btn btn--primary" onClick={next}>
                {t.common.next} →
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Exit modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "color-mix(in oklch, var(--bg-0) 60%, transparent)",
              backdropFilter: "blur(8px)",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16
            }}
            onClick={() => setShowExitConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bento"
              style={{ padding: 28, maxWidth: 420, width: "100%" }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                {t.quiz.confirmExit}
              </p>
              <p style={{ color: "var(--fg-2)", fontSize: 13, marginBottom: 20 }}>
                Javoblaringiz saqlanmasdan yo'qoladi.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <Link href="/" className="btn btn--ghost" style={{ flex: 1, justifyContent: "center" }}>
                  {t.common.yes}
                </Link>
                <button onClick={() => setShowExitConfirm(false)} className="btn btn--primary" style={{ flex: 1, justifyContent: "center" }}>
                  {t.common.no}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .quiz-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
