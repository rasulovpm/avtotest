import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

type LangMap = { oz: string; uz: string; ru: string };
type AnswerMap = { oz: string[]; uz: string[]; ru: string[] };

type RawQuestion = {
  id: number;
  bilet_id: number;
  question_id: number;
  name: string | null;
  question: LangMap;
  explanation: LangMap | null;
  photo: string | null;
  answers: {
    status: number;
    answer_id: number;
    answer: AnswerMap;
  };
};

type RawLesson = { lesson: string; data: RawQuestion[] };
type RawJson = Record<string, RawLesson>;

const JSON_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "avtoimtixon-uz",
  "project",
  "exam_full.json"
);

function buildImageUrl(photo: string | null): string | null {
  if (!photo) return null;
  // photos/36/36.9.webp -> /photos/36/36.9.webp
  const trimmed = photo.replace(/^\/+/, "");
  return "/" + trimmed;
}

async function main() {
  console.log("exam_full.json o'qilmoqda...");
  const raw = fs.readFileSync(JSON_PATH, "utf-8");
  const data: RawJson = JSON.parse(raw);

  const lessonKeys = Object.keys(data);
  const allQuestions: RawQuestion[] = [];
  for (const k of lessonKeys) {
    allQuestions.push(...data[k].data);
  }

  console.log(`Jami: ${lessonKeys.length} ta dars, ${allQuestions.length} ta savol`);

  // Bilet bo'yicha guruhlash
  const byBilet = new Map<number, RawQuestion[]>();
  for (const q of allQuestions) {
    if (!byBilet.has(q.bilet_id)) byBilet.set(q.bilet_id, []);
    byBilet.get(q.bilet_id)!.push(q);
  }
  const biletIds = Array.from(byBilet.keys()).sort((a, b) => a - b);
  console.log(`Biletlar: ${biletIds.length} ta (${biletIds[0]} - ${biletIds[biletIds.length - 1]})`);

  // Hozirgi mavjud question.number'larni tekshirish (toza bo'lishi kerak)
  const existing = await prisma.question.count();
  if (existing > 0) {
    console.warn(`⚠  Bazada allaqachon ${existing} ta savol mavjud — to'qnashishlar bo'lishi mumkin.`);
  }

  console.log("\nSavollarni import qilish boshlandi...");

  let inserted = 0;
  let skipped = 0;
  let optionCount = 0;

  // Har savolni alohida transaction'da yaratamiz (option'lar bilan birga)
  // Tezroq qilish uchun batchda
  const BATCH = 50;
  for (let i = 0; i < allQuestions.length; i += BATCH) {
    const chunk = allQuestions.slice(i, i + BATCH);
    await prisma.$transaction(
      chunk.map((q) => {
        const correctIdx = q.answers.status - 1;
        const optionsUz = q.answers.answer.oz || [];
        const optionsCy = q.answers.answer.uz || [];
        const optionsRu = q.answers.answer.ru || [];
        const max = Math.max(optionsUz.length, optionsCy.length, optionsRu.length);

        const optionData = Array.from({ length: max }, (_, idx) => ({
          textUz: optionsUz[idx] ?? "",
          textCy: optionsCy[idx] ?? "",
          textRu: optionsRu[idx] ?? "",
          isCorrect: idx === correctIdx,
          orderIndex: idx
        }));

        return prisma.question.create({
          data: {
            number: q.id,
            categoryId: null,
            textUz: q.question.oz ?? "",
            textCy: q.question.uz ?? "",
            textRu: q.question.ru ?? "",
            imageUrl: buildImageUrl(q.photo),
            explanationUz: q.explanation?.oz ?? null,
            explanationCy: q.explanation?.uz ?? null,
            explanationRu: q.explanation?.ru ?? null,
            difficulty: "MEDIUM",
            isPublished: true,
            options: { create: optionData }
          }
        });
      })
    );
    inserted += chunk.length;
    optionCount += chunk.reduce((s, q) => {
      const max = Math.max(
        q.answers.answer.oz?.length || 0,
        q.answers.answer.uz?.length || 0,
        q.answers.answer.ru?.length || 0
      );
      return s + max;
    }, 0);
    if (inserted % 200 === 0 || i + BATCH >= allQuestions.length) {
      console.log(`  ${inserted}/${allQuestions.length} savol import qilindi`);
    }
  }

  console.log(`\nSavollar tayyor: ${inserted} ta savol, ${optionCount} ta variant`);

  // Biletlarni yaratamiz
  console.log("\nBiletlarni yaratish...");
  for (const biletId of biletIds) {
    const qs = byBilet.get(biletId)!.sort((a, b) => a.question_id - b.question_id);

    const ticket = await prisma.ticket.create({
      data: {
        number: biletId,
        titleUz: `Bilet ${biletId}`,
        titleRu: `Билет ${biletId}`,
        titleCy: `Билет ${biletId}`,
        description: null,
        isPublished: true,
        orderIndex: biletId
      }
    });

    // TicketQuestion'lar — savollarni number bo'yicha topib bog'laymiz
    const numbers = qs.map((q) => q.id);
    const dbQuestions = await prisma.question.findMany({
      where: { number: { in: numbers } },
      select: { id: true, number: true }
    });
    const numberToId = new Map(dbQuestions.map((q) => [q.number, q.id]));

    await prisma.ticketQuestion.createMany({
      data: qs
        .map((q, idx) => {
          const qid = numberToId.get(q.id);
          if (!qid) return null;
          return { ticketId: ticket.id, questionId: qid, orderIndex: idx };
        })
        .filter((x): x is { ticketId: string; questionId: string; orderIndex: number } => x !== null)
    });
  }
  console.log(`  ${biletIds.length} ta bilet yaratildi`);

  // Yakuniy hisobot
  console.log("\n=== Yakuniy holat ===");
  const counts = {
    Question: await prisma.question.count(),
    Option: await prisma.option.count(),
    Ticket: await prisma.ticket.count(),
    TicketQuestion: await prisma.ticketQuestion.count()
  };
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k.padEnd(16)} ${v}`);
  }
  console.log(`\n  Skipped: ${skipped}`);
  console.log("\nImport muvaffaqiyatli yakunlandi.");
}

main()
  .catch((e) => {
    console.error("Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
