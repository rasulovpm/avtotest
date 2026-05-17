import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Stabil ID'li testlar/biletlar yaratish ===\n");

  // 1. Eski avtomatik ID bilan yaratilgan exam simulation'ni o'chiramiz (oldingi setup-topics-and-tests.ts dan)
  const oldExam = await prisma.test.deleteMany({
    where: {
      isExamSimulation: true,
      id: { not: { in: ["test-real-20", "test-real-50", "test-yhq"] } }
    }
  });
  if (oldExam.count > 0) console.log(`  Eski exam simulation o'chirildi: ${oldExam.count}`);

  // Mavjud bo'lsa stabil ID'lilarni ham qayta yaratish uchun o'chiramiz
  await prisma.test.deleteMany({ where: { id: { in: ["test-real-20", "test-real-50", "test-yhq"] } } });

  // 2. test-real-20 — Real imtihon (20 ta savol, 25 daq)
  await prisma.test.create({
    data: {
      id: "test-real-20",
      categoryId: null,
      titleUz: "Real imtihon",
      titleRu: "Реальный экзамен",
      titleCy: "Реал имтиҳон",
      difficulty: "MEDIUM",
      questionCount: 20,
      timeLimitMinutes: 25,
      passingScore: 18,
      isExamSimulation: true,
      isPublished: true,
      orderIndex: 1,
      generationMode: "RANDOM_BY_TOPIC"
    }
  });
  console.log(`  ✓ test-real-20 yaratildi (20 savol, 25 daq, exam sim)`);

  // 3. test-real-50 — Chuqurroq tayyorgarlik (50 ta savol)
  await prisma.test.create({
    data: {
      id: "test-real-50",
      categoryId: null,
      titleUz: "Imtihon · 50 talik",
      titleRu: "Экзамен · 50",
      titleCy: "Имтиҳон · 50 талик",
      difficulty: "MEDIUM",
      questionCount: 50,
      timeLimitMinutes: 60,
      passingScore: 45,
      isExamSimulation: false,
      isPublished: true,
      orderIndex: 2,
      generationMode: "RANDOM_BY_TOPIC"
    }
  });
  console.log(`  ✓ test-real-50 yaratildi (50 savol, 60 daq)`);

  // 4. test-yhq — Mavzular bo'yicha (30 ta savol)
  await prisma.test.create({
    data: {
      id: "test-yhq",
      categoryId: null,
      titleUz: "Mavzular bo'yicha imtihon",
      titleRu: "Экзамен по темам",
      titleCy: "Мавзулар бўйича имтиҳон",
      difficulty: "MEDIUM",
      questionCount: 30,
      timeLimitMinutes: 35,
      passingScore: 27,
      isExamSimulation: false,
      isPublished: true,
      orderIndex: 3,
      generationMode: "RANDOM_BY_TOPIC"
    }
  });
  console.log(`  ✓ test-yhq yaratildi (30 savol, 35 daq)`);

  // 5. ticket-1 — birinchi biletni stabil ID bilan qayta yaratish
  const oldTicket1 = await prisma.ticket.findFirst({ where: { number: 1 } });
  if (oldTicket1 && oldTicket1.id !== "ticket-1") {
    // Avval eski bilet savollarini olib qolaylik
    const oldQs = await prisma.ticketQuestion.findMany({
      where: { ticketId: oldTicket1.id },
      orderBy: { orderIndex: "asc" }
    });

    // Eski biletni o'chiramiz (TicketQuestion'lar cascade bilan o'chadi)
    await prisma.ticket.delete({ where: { id: oldTicket1.id } });

    // Stabil ID bilan qayta yaratamiz
    await prisma.ticket.create({
      data: {
        id: "ticket-1",
        number: 1,
        titleUz: oldTicket1.titleUz,
        titleRu: oldTicket1.titleRu,
        titleCy: oldTicket1.titleCy,
        description: oldTicket1.description,
        isPublished: oldTicket1.isPublished,
        orderIndex: oldTicket1.orderIndex
      }
    });

    if (oldQs.length > 0) {
      await prisma.ticketQuestion.createMany({
        data: oldQs.map((tq) => ({ ticketId: "ticket-1", questionId: tq.questionId, orderIndex: tq.orderIndex }))
      });
    }
    console.log(`  ✓ ticket-1 yaratildi (${oldQs.length} ta savol)`);
  } else if (oldTicket1?.id === "ticket-1") {
    console.log(`  ✓ ticket-1 allaqachon mavjud`);
  }

  // Yakuniy holat
  const total = {
    Test: await prisma.test.count(),
    Ticket: await prisma.ticket.count(),
    TicketQuestion: await prisma.ticketQuestion.count(),
    "test-real-20": await prisma.test.count({ where: { id: "test-real-20" } }),
    "test-real-50": await prisma.test.count({ where: { id: "test-real-50" } }),
    "test-yhq": await prisma.test.count({ where: { id: "test-yhq" } }),
    "ticket-1": await prisma.ticket.count({ where: { id: "ticket-1" } })
  };
  console.log("\n=== Yakuniy holat ===");
  for (const [k, v] of Object.entries(total)) console.log(`  ${k.padEnd(18)} ${v}`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
