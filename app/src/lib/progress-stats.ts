import { prisma } from "./prisma";

/**
 * Bosh sahifadagi "Umumiy progress" uchun statistika.
 *
 * 3 ta komponent (har biri 0..100 foiz):
 *   A) Biletlar  — yakunlangan biletlardan nechi foizi 90%+ natija bilan
 *   B) Imtihon-50 — passed=true bo'lgan haqiqiy imtihon natijalari, 50 ta gacha
 *   C) Savollar   — to'g'ri javob berilgan unique savollar / jami savollar
 *
 * Savol darajalari — har savolning nechi marta to'g'ri javob berilganiga
 * qarab guruhlanadi. Manba: UserAnswer (real imtihon/mashq) + TopicAnswer
 * (mavzu testi). Faqat to'g'ri javoblar hisoblanadi.
 *   - Yangi          (0 marta)
 *   - Yechilgan      (1 marta)
 *   - Takrorlangan   (2 marta)
 *   - O'zlashtirilgan (3+ marta)
 *
 * "Daraja" badge'i — umumiy progressga qarab.
 */

export type OverallProgress = {
  totalPercent: number; // 3 ta komponentning teng o'rtachasi
  tickets: { successful: number; total: number; percent: number };
  realExams: { passed: number; goal: number; percent: number };
  questions: {
    total: number;
    correct: number;   // hech bo'lmasa 1 marta to'g'ri javob bergan unique savollar
    wrong: number;     // faqat noto'g'ri javob bergan (hech bir to'g'ri yo'q)
    untouched: number;
    percent: number;
  };
  levels: {
    new: number;          // 0 to'g'ri
    solved: number;       // 1 to'g'ri
    repeated: number;     // 2 to'g'ri
    mastered: number;     // 3+ to'g'ri
  };
  rank: {
    key: RankKey;
    label: string;
    nextLabel: string | null;
    nextAt: number | null; // keyingi rank uchun kerakli foiz
  };
};

export type RankKey = "mehmon" | "tolibi_ilm" | "taxsir" | "mavlono" | "piri_komil";

export async function getOverallProgress(userId: string): Promise<OverallProgress> {
  // ── A. Biletlar ─────────────────────────────────────────────
  // Har bilet ichida (TicketAnswer) foydalanuvchining eng oxirgi javoblari
  // bo'yicha 90%+ to'g'ri bo'lgan biletlar soni. Boshqa joylardagi javoblar
  // hisobga olinmaydi.
  const totalTickets = await prisma.ticket.count({ where: { isPublished: true } });
  const ticketRows = await prisma.ticket.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      questions: { select: { questionId: true } },
    },
  });
  const ticketAnswersAll = await prisma.ticketAnswer.findMany({
    where: { userId },
    select: { ticketId: true, questionId: true, isCorrect: true, answeredAt: true },
    orderBy: { answeredAt: "desc" },
  });
  const latestByTicket = new Map<string, Map<string, boolean>>();
  for (const a of ticketAnswersAll) {
    if (!latestByTicket.has(a.ticketId)) latestByTicket.set(a.ticketId, new Map());
    const m = latestByTicket.get(a.ticketId)!;
    if (!m.has(a.questionId)) m.set(a.questionId, a.isCorrect);
  }
  let successfulTickets = 0;
  for (const t of ticketRows) {
    if (t.questions.length === 0) continue;
    const ans = latestByTicket.get(t.id);
    if (!ans) continue;
    let correct = 0;
    for (const q of t.questions) {
      if (ans.get(q.questionId) === true) correct++;
    }
    const pct = (correct / t.questions.length) * 100;
    if (pct >= 90) successfulTickets++;
  }
  const ticketsPercent = totalTickets > 0
    ? Math.round((successfulTickets / totalTickets) * 100)
    : 0;

  // ── B. Real imtihon natijalari ─────────────────────────────
  // (a) Klassik imtihon simulyatsiyalari (test-real-20) — passed bo'lgani.
  // (b) 50-talik chuqurroq imtihon (test-real-50) — 46+ to'g'ri bo'lganlari.
  //     Bu jimgina "Real imtihon" hisoblagichiga qo'shiladi — UI'da alohida
  //     belgilanmaydi (foydalanuvchi spec'iga ko'ra).
  const [passedSim, passed50Strict] = await Promise.all([
    prisma.testResult.count({
      where: {
        userId,
        passed: true,
        testId: { not: null },
        test: { isExamSimulation: true },
      },
    }),
    prisma.testResult.count({
      where: {
        userId,
        testId: "test-real-50",
        correctCount: { gte: 46 },
      },
    }),
  ]);
  const passedReal = passedSim + passed50Strict;
  const realExamGoal = 50;
  const realExamsPercent = Math.min(
    100,
    Math.round((passedReal / realExamGoal) * 100)
  );

  // ── C. Savollar yechilganligi va darajalari ─────────────────
  const totalQuestions = await prisma.question.count({ where: { isPublished: true } });

  // Har savol uchun "to'g'ri marta" — UserAnswer + TopicAnswer + TicketAnswer
  // (savol qaerda yechilganidan qat'iy nazar — biletda yechilgan savol ham
  // umumiy "Yechilgan/Takror/O'zlash" darajasiga hisoblanadi).
  const [ua, ta, tka] = await Promise.all([
    prisma.userAnswer.findMany({
      where: { userId },
      select: { questionId: true, isCorrect: true },
    }),
    prisma.topicAnswer.findMany({
      where: { userId },
      select: { questionId: true, isCorrect: true },
    }),
    prisma.ticketAnswer.findMany({
      where: { userId },
      select: { questionId: true, isCorrect: true },
    }),
  ]);
  const correctCountByQ = new Map<string, number>();
  const everTouched = new Set<string>();
  const accumulate = (rows: { questionId: string; isCorrect: boolean }[]) => {
    for (const a of rows) {
      everTouched.add(a.questionId);
      if (a.isCorrect) correctCountByQ.set(a.questionId, (correctCountByQ.get(a.questionId) ?? 0) + 1);
    }
  };
  accumulate(ua);
  accumulate(ta);
  accumulate(tka);

  const correctUnique = correctCountByQ.size;
  const wrongUnique = everTouched.size - correctUnique; // tegilgan, lekin hech to'g'ri emas
  const untouched = Math.max(0, totalQuestions - everTouched.size);
  const questionsPercent = totalQuestions > 0
    ? Math.round((correctUnique / totalQuestions) * 100)
    : 0;

  // Darajalar (mavjud savollar uchun)
  let lvSolved = 0, lvRepeated = 0, lvMastered = 0;
  for (const n of correctCountByQ.values()) {
    if (n >= 3) lvMastered++;
    else if (n === 2) lvRepeated++;
    else if (n === 1) lvSolved++;
  }
  const lvNew = untouched + wrongUnique; // hali "yechilmagan" (to'g'ri javob yo'q)

  // ── Umumiy foiz va daraja badge ─────────────────────────────
  const totalPercent = Math.round((ticketsPercent + realExamsPercent + questionsPercent) / 3);

  const rank = getRankByPercent(totalPercent);

  return {
    totalPercent,
    tickets: { successful: successfulTickets, total: totalTickets, percent: ticketsPercent },
    realExams: { passed: passedReal, goal: realExamGoal, percent: realExamsPercent },
    questions: {
      total: totalQuestions,
      correct: correctUnique,
      wrong: wrongUnique,
      untouched,
      percent: questionsPercent,
    },
    levels: { new: lvNew, solved: lvSolved, repeated: lvRepeated, mastered: lvMastered },
    rank,
  };
}

/**
 * Foydalanuvchi darajalari — foiz oraliqlari va vizual metadata.
 *   0–10  → Mehmon         (guest)
 *   11–40 → Tolibi ilm     (book-open)
 *   41–70 → Taxsir         (star)
 *   71–90 → Mavlono        (turban)
 *   91–100 → Piri komil    (crown)
 */
export type RankTier = {
  key: RankKey;
  min: number;
  max: number;            // ushbu daraja oxirgi foizi (inklyuziv)
  label: string;
  sub: string;            // subtitle (mototivatsion qisqacha)
  icon: "guest" | "book-open" | "star" | "turban" | "crown";
  color: string;          // asosiy rang (gradient va glow)
  textColor: string;      // ochroq variant (matn uchun)
  glow: string;           // rgba glow
  fill: string;           // background fill (radial gradient uchun)
};

export const RANK_TIERS: RankTier[] = [
  {
    key: "mehmon",
    min: 0, max: 10,
    label: "Mehmon",
    sub: "Sayohat endigina boshlandi",
    icon: "guest",
    color: "#94a3b8", textColor: "#cbd5e1",
    glow: "rgba(148,163,184,0.55)", fill: "rgba(148,163,184,0.20)",
  },
  {
    key: "tolibi_ilm",
    min: 11, max: 40,
    label: "Tolibi ilm",
    sub: "Bilim olishda davom eting",
    icon: "book-open",
    color: "#22d3ee", textColor: "#67e8f9",
    glow: "rgba(34,211,238,0.55)", fill: "rgba(34,211,238,0.20)",
  },
  {
    key: "taxsir",
    min: 41, max: 70,
    label: "Taxsir",
    sub: "Sezilarli yutuq",
    icon: "star",
    color: "#f59e0b", textColor: "#fbbf24",
    glow: "rgba(245,158,11,0.55)", fill: "rgba(245,158,11,0.20)",
  },
  {
    key: "mavlono",
    min: 71, max: 90,
    label: "Mavlono",
    sub: "Bilimingiz ufqiga yetib bormoqda",
    icon: "turban",
    color: "#a855f7", textColor: "#c084fc",
    glow: "rgba(168,85,247,0.55)", fill: "rgba(168,85,247,0.20)",
  },
  {
    key: "piri_komil",
    min: 91, max: 100,
    label: "Piri komil",
    sub: "Komil mukammallik",
    icon: "crown",
    color: "#facc15", textColor: "#fde047",
    glow: "rgba(250,204,21,0.65)", fill: "rgba(250,204,21,0.22)",
  },
];

function getRankByPercent(p: number) {
  let current = RANK_TIERS[0];
  for (const t of RANK_TIERS) if (p >= t.min) current = t;
  const next = RANK_TIERS[RANK_TIERS.indexOf(current) + 1] ?? null;
  return {
    key: current.key,
    label: current.label,
    nextLabel: next?.label ?? null,
    nextAt: next?.min ?? null,
  };
}
