import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  const [tests, exams, questions, categories, tickets, signs, users] = await Promise.all([
    prisma.test.count(),
    prisma.test.count({ where: { isExamSimulation: true } }),
    prisma.question.count(),
    prisma.category.count(),
    prisma.ticket.count(),
    prisma.roadSign.count(),
    prisma.user.count(),
  ]);
  const byMode = await prisma.test.groupBy({
    by: ["generationMode"],
    _count: true,
  });

  console.log("=== BAZA STATISTIKASI ===");
  console.log("Testlar (umumiy)      :", tests);
  console.log("  - Imtihon simulyatsiya:", exams);
  console.log("  - Mashq/boshqa       :", tests - exams);
  console.log("");
  console.log("Generation mode bo'yicha:");
  for (const m of byMode) console.log("  -", m.generationMode.padEnd(20), "→", m._count);
  console.log("");
  console.log("Savollar              :", questions);
  console.log("Mavzular (Category)   :", categories);
  console.log("Biletlar              :", tickets);
  console.log("Yo'l belgilari        :", signs);
  console.log("Foydalanuvchilar      :", users);
})().finally(() => prisma.$disconnect());
