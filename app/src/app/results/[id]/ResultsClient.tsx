"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { formatTime } from "@/lib/utils";
import { pickLocalized, pickTitle } from "@/lib/i18n";
import { RoadSignSvg } from "@/components/RoadSignSvg";

type Props = {
  result: {
    id: string;
    score: number;
    correctCount: number;
    totalQuestions: number;
    timeSpentSeconds: number;
    passed: boolean;
    testTitle: { uz: string; ru: string; cy: string };
    testId: string;
  };
  wrongAnswers: { id: string; questionUz: string; questionRu: string; questionCy: string }[];
  categoryStats: { correct: number; total: number; nameUz: string; nameRu: string; nameCy: string }[];
  grid: { qid: string; correct: boolean | null }[];
};

export default function ResultsClient({ result, wrongAnswers, categoryStats, grid }: Props) {
  const { t, lang } = useLang();
  const wrongCount = result.totalQuestions - result.correctCount;
  const correctPct = result.totalQuestions ? Math.round((result.correctCount / result.totalQuestions) * 100) : 0;
  const wrongPct = 100 - correctPct;

  const r = 80;
  const c = 2 * Math.PI * r;
  const offset = c - (correctPct / 100) * c;
  const passed = result.passed;
  const ringColor = passed ? "url(#gr)" : "oklch(0.68 0.22 25)";
  const titleStr = pickTitle({ titleUz: result.testTitle.uz, titleRu: result.testTitle.ru, titleCy: result.testTitle.cy }, lang);

  const headline = passed
    ? lang === "ru"
      ? "Поздравляем — вы сдали!"
      : lang === "cy"
        ? "Табриклаймиз — ўтдингиз!"
        : "Tabriklaymiz — siz o'tdingiz!"
    : lang === "ru"
      ? "К сожалению, не сдали"
      : lang === "cy"
        ? "Афсус, ўтолмадингиз"
        : "Afsuski, o'tolmadingiz";

  const sub = passed
    ? lang === "ru"
      ? "Отличный результат. Вы готовы к экзамену."
      : "Ajoyib natija. Imtihon uchun tayyorsiz."
    : lang === "ru"
      ? `Нужно больше верных ответов. Повторите ошибки и попробуйте снова.`
      : `O'tish uchun ko'proq to'g'ri javob kerak edi. Xatolarni qaytaring.`;

  return (
    <div style={{ padding: "48px", color: "var(--fg-0)" }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="overline" style={{ marginBottom: 8 }}>
            04 · RESULTS · {passed ? "PASSED" : "FAILED"} · {titleStr}
          </div>
          <h1 className="h-display h2" style={{ margin: 0, color: passed ? "var(--fg-0)" : "oklch(0.78 0.18 25)" }}>
            {headline} {passed ? "🎉" : ""}
          </h1>
        </div>
        <span className={"chip " + (passed ? "chip--lime" : "chip--error")} style={{ fontSize: 13, padding: "7px 14px" }}>
          {passed ? "✓" : "✕"} {result.correctCount}/{result.totalQuestions}
        </span>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 16, marginBottom: 16 }}
        className="lg-grid"
      >
        {/* Score circle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={"bento " + (passed ? "bento--accent" : "")}
          style={{
            padding: 40,
            display: "flex",
            alignItems: "center",
            gap: 32,
            background: passed
              ? undefined
              : "radial-gradient(60% 80% at 100% 0%, color-mix(in oklch, oklch(0.68 0.22 25) 18%, transparent), transparent 60%), var(--bg-1)",
            borderColor: passed ? undefined : "color-mix(in oklch, oklch(0.68 0.22 25) 30%, var(--line))",
            flexWrap: "wrap"
          }}
        >
          <div style={{ position: "relative", width: 200, height: 200, flexShrink: 0 }}>
            <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="100" cy="100" r={r} stroke="var(--bg-3)" strokeWidth="14" fill="none" />
              <circle
                cx="100"
                cy="100"
                r={r}
                stroke={ringColor}
                strokeWidth="14"
                fill="none"
                strokeDasharray={c}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gr" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.18 195)" />
                  <stop offset="100%" stopColor="oklch(0.88 0.20 130)" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="h-display" style={{ fontSize: 56, fontWeight: 700, color: passed ? "var(--fg-0)" : "oklch(0.78 0.18 25)" }}>
                {result.score}%
              </div>
              <div className="mono" style={{ fontSize: 13, color: "var(--fg-2)" }}>
                {result.correctCount} / {result.totalQuestions}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <span className={"chip " + (passed ? "chip--lime" : "chip--error")} style={{ marginBottom: 14 }}>
              {passed ? `✓ ${t.results.passed.toUpperCase()}` : `✕ ${(t.results.failed || "O'TILMADI").toUpperCase()}`}
            </span>
            <p style={{ color: "var(--fg-1)", fontSize: 15, lineHeight: 1.5, marginTop: 14 }}>{sub}</p>
            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={`/tests/${result.testId}`} className="btn btn--primary">
                ↻ {t.results.retry}
              </Link>
              <Link href="/" className="btn btn--ghost">
                {t.results.goHome} →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Time */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bento" style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="overline">{t.results.timeSpent.toUpperCase()}</div>
          <div>
            <div className="h-display" style={{ fontSize: 56, fontWeight: 700 }}>
              {formatTime(result.timeSpentSeconds)}
            </div>
            <div style={{ color: "var(--fg-2)", fontSize: 13, marginTop: 6 }}>
              {t.results.avgPerQuestion}: <span className="mono">{result.totalQuestions ? Math.round(result.timeSpentSeconds / result.totalQuestions) : 0}s</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 2fr)", gap: 16, marginBottom: 16 }} className="lg-grid">
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 8 }}>TO'G'RI</div>
          <div className="h-display" style={{ fontSize: 44, fontWeight: 700, color: "var(--success)" }}>{result.correctCount}</div>
          <div style={{ color: "var(--fg-2)", fontSize: 13 }}>{correctPct}%</div>
        </div>
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 8 }}>XATO</div>
          <div className="h-display" style={{ fontSize: 44, fontWeight: 700, color: "var(--error)" }}>{wrongCount}</div>
          <div style={{ color: "var(--fg-2)", fontSize: 13 }}>{wrongPct}%</div>
        </div>
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 14 }}>{t.results.categoryStats}</div>
          {categoryStats.length === 0 && (
            <p style={{ color: "var(--fg-2)", fontSize: 13, margin: 0 }}>Kategoriya statistikasi yo'q</p>
          )}
          {categoryStats.map((cat, i) => {
            const v = cat.total ? Math.round((cat.correct / cat.total) * 100) : 0;
            const name = lang === "ru" ? cat.nameRu : lang === "cy" ? cat.nameCy : cat.nameUz;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ flex: "0 0 110px", fontSize: 13, color: "var(--fg-1)" }}>{name}</span>
                <div style={{ flex: 1, height: 6, background: "var(--bg-3)", borderRadius: 3, overflow: "hidden" }}>
                  <div
                    style={{
                      width: v + "%",
                      height: "100%",
                      background: v < 60 ? "var(--error)" : "linear-gradient(90deg, var(--accent), var(--accent-2))"
                    }}
                  />
                </div>
                <span className="mono" style={{ fontSize: 12, color: v < 60 ? "var(--error)" : "var(--fg-2)", flex: "0 0 36px", textAlign: "right" }}>
                  {v}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {wrongAnswers.length > 0 && (
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 14 }}>
            ✕ {t.results.mistakes} ({wrongAnswers.length})
          </div>
          {wrongAnswers.map((m, i) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: i ? "1px solid var(--line)" : "none" }}>
              <div style={{ background: "var(--bg-2)", borderRadius: 8, padding: 6, border: "1px solid var(--line)", flexShrink: 0 }}>
                <RoadSignSvg kind={(["warning-curve", "prohibit-no-entry", "prohibit-speed", "info-parking", "priority-stop"][i % 5]) as any} size={28} />
              </div>
              <span className="mono" style={{ fontSize: 12, color: "var(--fg-2)" }}>#{i + 1}</span>
              <span style={{ flex: 1, fontSize: 14 }}>
                {pickLocalized({ textUz: m.questionUz, textRu: m.questionRu, textCy: m.questionCy }, lang)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 20-savol overview grid */}
      <div className="bento" style={{ padding: 24, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
          <div className="overline">{grid.length} {lang === "ru" ? "ВОПРОСОВ · ОБЗОР" : "SAVOL · UMUMIY KO'RINISH"}</div>
          <div style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--success)", display: "inline-block" }} />
              {lang === "ru" ? "ВЕРНО" : "TO'G'RI"}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--error)", display: "inline-block" }} />
              {lang === "ru" ? "НЕВЕРНО" : "XATO"}
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(20, grid.length)}, 1fr)`, gap: 6 }}>
          {grid.map((g, i) => {
            const wrong = g.correct === false;
            const skip = g.correct === null;
            return (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  borderRadius: 8,
                  background: skip ? "var(--bg-3)" : wrong ? "var(--error)" : "var(--success)",
                  color: skip ? "var(--fg-3)" : wrong ? "#fff" : "#0a1f0e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 700
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next steps — only when failed */}
      {!result.passed && (
        <div
          className="bento"
          style={{
            padding: 24,
            marginTop: 16,
            background: "radial-gradient(60% 80% at 0% 0%, color-mix(in oklch, oklch(0.68 0.22 25) 12%, transparent), transparent 60%), var(--bg-1)",
            borderColor: "color-mix(in oklch, oklch(0.68 0.22 25) 28%, var(--line))"
          }}
        >
          <div className="overline" style={{ marginBottom: 14, color: "oklch(0.78 0.18 25)" }}>
            ⚠ {lang === "ru" ? "ЧТО ДАЛЬШЕ" : "KEYINGI QADAMLAR"}
          </div>
          <div className="next-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              {
                n: "01",
                t: lang === "ru" ? "Разберите ошибки" : "Xatolarni tahlil qiling",
                s: lang === "ru" ? "Каждый вопрос с пояснением" : "Har bir savol tushuntirish bilan",
                btn: lang === "ru" ? "Открыть" : "Ochish",
                href: "/tests/mistakes"
              },
              {
                n: "02",
                t: lang === "ru" ? "Слабые темы" : "Zaif mavzularni mashq qiling",
                s: lang === "ru" ? "Категория · Знаки · Дорожные ситуации" : "Kategoriya bo'yicha mashq",
                btn: lang === "ru" ? "Начать" : "Boshlash",
                href: "/tests/test-yhq"
              },
              {
                n: "03",
                t: lang === "ru" ? "Повторите экзамен" : "Imtihonni qaytarish",
                s: lang === "ru" ? "Когда будете готовы — попробуйте снова" : "Tayyor bo'lganda qayta urinib ko'ring",
                btn: lang === "ru" ? "↻ Пересдать" : "↻ Qaytadan",
                href: `/tests/${result.testId}`
              }
            ].map((step, i) => (
              <div key={i} style={{ padding: 18, borderRadius: 14, background: "var(--bg-2)", border: "1px solid var(--line)" }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 8 }}>{step.n}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{step.t}</div>
                <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.5, marginBottom: 12 }}>{step.s}</p>
                <Link href={step.href} className="btn btn--ghost" style={{ fontSize: 12, padding: "6px 12px" }}>
                  {step.btn} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .lg-grid { grid-template-columns: 1fr !important; }
          .next-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
