import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Testlar bazasini tozalash boshlandi...");

  const userAnswers = await prisma.userAnswer.deleteMany({});
  console.log(`  UserAnswer: ${userAnswers.count} ta o'chirildi`);

  const testResults = await prisma.testResult.deleteMany({});
  console.log(`  TestResult: ${testResults.count} ta o'chirildi`);

  const testQuestions = await prisma.testQuestion.deleteMany({});
  console.log(`  TestQuestion: ${testQuestions.count} ta o'chirildi`);

  const ticketQuestions = await prisma.ticketQuestion.deleteMany({});
  console.log(`  TicketQuestion: ${ticketQuestions.count} ta o'chirildi`);

  const tests = await prisma.test.deleteMany({});
  console.log(`  Test: ${tests.count} ta o'chirildi`);

  const tickets = await prisma.ticket.deleteMany({});
  console.log(`  Ticket: ${tickets.count} ta o'chirildi`);

  const options = await prisma.option.deleteMany({});
  console.log(`  Option: ${options.count} ta o'chirildi`);

  const questions = await prisma.question.deleteMany({});
  console.log(`  Question: ${questions.count} ta o'chirildi`);

  console.log("\nSaqlanib qoldi: User, Category, RoadSign, Tariff, Payment, OtpCode, Setting");
  console.log("Tozalash muvaffaqiyatli yakunlandi.");
}

main()
  .catch((e) => {
    console.error("Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
