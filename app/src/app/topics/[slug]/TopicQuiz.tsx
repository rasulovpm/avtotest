"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SaveQuestionButton from "@/components/SaveQuestionButton";

type Option = { id: string; textUz: string };
type Question = {
  id: string;
  number: number;
  textUz: string;
  imageUrl: string | null;
  options: Option[];
};

type AnswerState = { selectedOptionId: string | null; isCorrect: boolean };

type Props = {
  category: { id: string; slug: string; nameUz: string; number: number };
  questions: Question[];
  initialAnswers: Record<string, AnswerState>;
  alreadyCompleted: boolean;
  initialSavedIds?: string[];
};

export default function TopicQuiz({ category, questions, initialAnswers, alreadyCompleted, initialSavedIds }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, AnswerState>>(initialAnswers);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(alreadyCompleted);
  const [restarting, setRestarting] = useState(false);

  // Birinchi javobsiz savolga avtomatik tushish (resume)
  const initialIndex = useMemo(() => {
    if (alreadyCompleted) return 0;
    const idx = questions.findIndex((q) => !answers[q.id]);
    return idx === -1 ? 0 : idx;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [current, setCurrent] = useState(initialIndex);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  async function selectOption(question: Question, optionId: string) {
    if (answers[question.id] || submitting) return;
    setSubmitting(question.id);
    try {
      const res = await fetch(`/api/topics/${category.slug}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, optionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Xato: " + (data?.error || res.statusText));
        return;
      }
      const isCorrect = !!data.isCorrect;
      const nextAnswers = {
        ...answers,
        [question.id]: { selectedOptionId: optionId, isCorrect },
      };
      setAnswers(nextAnswers);
      if (data.completed) {
        setCompleted(true);
      } else if (isCorrect) {
        // To'g'ri javob → keyingi javobsiz savolga avtomatik o'tish (qisqa
        // pauza — foydalanuvchi yashil rangni ko'rib ulgursin).
        setTimeout(() => {
          setCurrent((idx) => {
            for (let step = 1; step <= total; step++) {
              const i = (idx + step) % total;
              const qq = questions[i];
              if (qq && !nextAnswers[qq.id]) return i;
            }
            return Math.min(idx + 1, total - 1);
          });
        }, 600);
      }
      // Noto'g'ri javob: foydalanuvchi o'zi "Keyingi" tugmasini bossin
    } catch (e: any) {
      alert("Tarmoq xatosi: " + (e?.message || "noma'lum"));
    } finally {
      setSubmitting(null);
    }
  }

  async function restart() {
    setRestarting(true);
    try {
      const res = await fetch(`/api/topics/${category.slug}/restart`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert("Xato: " + (data?.error || res.statusText));
        return;
      }
      // Sahifani yangilaymiz — endi yangi attempt
      router.refresh();
      setAnswers({});
      setCompleted(false);
      setCurrent(0);
    } catch (e: any) {
      alert("Tarmoq xatosi: " + (e?.message || "noma'lum"));
    } finally {
      setRestarting(false);
    }
  }

  function goTo(i: number) {
    if (i < 0 || i >= total) return;
    setCurrent(i);
  }

  const q = questions[current];
  const cur = q ? answers[q.id] : undefined;

  if (completed) {
    return (
      <main
        style={{
          background: "var(--bg-0)",
          color: "var(--fg-0)",
          minHeight: "calc(100vh - 80px)",
          padding: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="bento" style={{ maxWidth: 520, width: "100%", padding: 40, textAlign: "center" }}>
          <div className="overline" style={{ marginBottom: 12 }}>● TUGATILDI</div>
          <h1 className="h-display" style={{ fontSize: 32, fontWeight: 600, marginTop: 0, marginBottom: 8 }}>
            {category.nameUz}
          </h1>
          <p style={{ color: "var(--fg-2)", marginBottom: 24 }}>
            Mavzu yakunlandi. Natija saqlandi.
          </p>
          {!alreadyCompleted && (
            <div
              style={{
                display: "flex",
                gap: 24,
                justifyContent: "center",
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div className="overline">TO'G'RI</div>
                <div className="h-display" style={{ fontSize: 32, color: "var(--success)" }}>
                  {correctCount}/{total}
                </div>
              </div>
              <div>
                <div className="overline">FOIZ</div>
                <div className="h-display" style={{ fontSize: 32 }}>
                  {percent}%
                </div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={restart}
              disabled={restarting}
              className="btn btn--primary"
            >
              {restarting ? "..." : "↻ Qayta yechish"}
            </button>
            <Link href="/topics" className="btn btn--ghost">
              ← Mavzular ro'yxati
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "var(--bg-0)",
        color: "var(--fg-0)",
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Top bar — kategoriya nomi va progress */}
      <header
        style={{
          padding: "16px 32px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <Link href="/topics" className="btn btn--ghost" style={{ padding: "6px 12px", fontSize: 13 }}>
            ←
          </Link>
          <div style={{ minWidth: 0 }}>
            <div className="overline">MAVZU #{category.number}</div>
            <div
              className="h-display"
              style={{
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 480,
              }}
            >
              {category.nameUz}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="chip chip--success" style={{ fontSize: 12 }}>
            ✓ {correctCount}
          </span>
          <span className="chip" style={{ fontSize: 12 }}>
            {answeredCount}/{total}
          </span>
          <span className="chip mono" style={{ fontSize: 12 }}>
            {percent}%
          </span>
        </div>
      </header>

      {/* Question pill bar — row-major: tepa qator to'liq to'lguncha, keyin past */}
      <div
        style={{
          padding: "12px 32px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "flex-start",
          }}
        >
          {questions.map((qq, i) => {
            const a = answers[qq.id];
            const isCur = i === current;
            let bg = "var(--bg-2)";
            let border = "var(--line)";
            let color = "var(--fg-2)";
            if (a) {
              if (a.isCorrect) {
                bg = "var(--success)";
                color = "#0a1f0e";
                border = "var(--success)";
              } else {
                bg = "var(--error)";
                color = "#fff";
                border = "var(--error)";
              }
            }
            if (isCur) {
              border = "var(--accent)";
            }
            return (
              <button
                key={qq.id}
                onClick={() => goTo(i)}
                title={`Savol ${i + 1}`}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  background: bg,
                  border: `1px solid ${border}`,
                  color,
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question body */}
      {q && (
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: q.imageUrl
              ? "minmax(0, 1fr) minmax(0, 1.3fr)"
              : "minmax(0, 1fr)",
            gap: 24,
            padding: 32,
          }}
        >
          {q.imageUrl && (
            <div
              className="bento"
              style={{
                padding: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(80% 80% at 50% 0%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 70%), var(--bg-1)",
                minHeight: 320,
                alignSelf: "flex-start",
              }}
            >
              <div
                style={{
                  background: "var(--bg-0)",
                  borderRadius: 16,
                  padding: 32,
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={q.imageUrl} alt="" style={{ maxWidth: 280, maxHeight: 280, objectFit: "contain" }} />
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="overline">SAVOL #{(current + 1).toString().padStart(2, "0")}</div>
              <div style={{ marginLeft: "auto" }}>
                <SaveQuestionButton
                  questionId={q.id}
                  initialSaved={(initialSavedIds || []).includes(q.id)}
                  size="sm"
                />
              </div>
            </div>
            <h2 className="h-display" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
              {q.textUz}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((o, idx) => {
                const isSelected = cur?.selectedOptionId === o.id;
                const wasAnswered = !!cur;
                let bg = "var(--bg-1)";
                let border = "var(--line)";
                if (wasAnswered) {
                  if (isSelected && cur.isCorrect) {
                    bg = "color-mix(in oklch, var(--success) 18%, var(--bg-1))";
                    border = "var(--success)";
                  } else if (isSelected && !cur.isCorrect) {
                    bg = "color-mix(in oklch, var(--error) 18%, var(--bg-1))";
                    border = "var(--error)";
                  }
                }
                return (
                  <button
                    key={o.id}
                    onClick={() => selectOption(q, o.id)}
                    disabled={wasAnswered || submitting === q.id}
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderRadius: 12,
                      border: `1px solid ${border}`,
                      background: bg,
                      color: "var(--fg-0)",
                      fontSize: 15,
                      cursor: wasAnswered ? "default" : "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        background: "var(--bg-2)",
                        border: "1px solid var(--line)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        flexShrink: 0,
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{o.textUz}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigatsiya */}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="btn btn--ghost"
                style={{ fontSize: 14 }}
              >
                ← Oldingi
              </button>
              <button
                onClick={() => goTo(current + 1)}
                disabled={current === total - 1}
                className="btn btn--ghost"
                style={{ fontSize: 14 }}
              >
                Keyingi →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
