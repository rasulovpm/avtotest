import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const counts = {
    User: await prisma.user.count(),
    Category: await prisma.category.count(),
    Test: await prisma.test.count(),
    Question: await prisma.question.count(),
    Option: await prisma.option.count(),
    TestQuestion: await prisma.testQuestion.count(),
    Ticket: await prisma.ticket.count(),
    TicketQuestion: await prisma.ticketQuestion.count(),
    UserAnswer: await prisma.userAnswer.count(),
    TestResult: await prisma.testResult.count(),
    RoadSign: await prisma.roadSign.count(),
    Tariff: await prisma.tariff.count(),
    Payment: await prisma.payment.count(),
    Setting: await prisma.setting.count(),
  };
  console.log("Bazadagi yozuvlar soni:");
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k.padEnd(16)} ${v}`);
  }
}

main().finally(() => prisma.$disconnect());
