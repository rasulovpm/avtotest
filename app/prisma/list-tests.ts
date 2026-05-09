import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
(async () => {
  const tests = await prisma.test.findMany({
    select: { id: true, titleUz: true, isExamSimulation: true, generationMode: true, questionCount: true },
    orderBy: { orderIndex: "asc" },
    take: 50
  });
  for (const t of tests) {
    console.log(
      t.id.padEnd(28),
      "|",
      t.isExamSimulation ? "[EXAM]" : "      ",
      "|",
      t.generationMode.padEnd(16),
      "|",
      `${t.questionCount}q`.padEnd(5),
      "|",
      t.titleUz.slice(0, 60)
    );
  }
})().finally(() => prisma.$disconnect());
