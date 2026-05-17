import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const JSON_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "avtoimtixon-uz",
  "project",
  "exam_full.json"
);

// 42 ta dars / mavzu — uch tilda
const TOPICS: Array<{
  number: number;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameCy: string;
}> = [
  { number: 1,  slug: "general-rules",            nameUz: "Umumiy qoidalar",                                              nameRu: "Общие положения",                                              nameCy: "Умумий қоидалар" },
  { number: 2,  slug: "driver-duties",            nameUz: "Haydovchilarning umumiy vazifalari",                           nameRu: "Общие обязанности водителей",                                  nameCy: "Ҳайдовчиларнинг умумий вазифалари" },
  { number: 3,  slug: "pedestrian-duties",        nameUz: "Piyodalarning umumiy vazifalari",                              nameRu: "Общие обязанности пешеходов",                                  nameCy: "Пиёдаларнинг умумий вазифалари" },
  { number: 4,  slug: "special-vehicles",         nameUz: "Maxsus transport vositalarining imtiyozlari",                  nameRu: "Преимущества специальных транспортных средств",                nameCy: "Махсус транспорт воситаларининг имтиёзлари" },
  { number: 5,  slug: "warning-signs",            nameUz: "Ogohlantiruvchi belgilar",                                     nameRu: "Предупреждающие знаки",                                        nameCy: "Огоҳлантирувчи белгилар" },
  { number: 6,  slug: "priority-signs",           nameUz: "Imtiyoz belgilari",                                            nameRu: "Знаки приоритета",                                             nameCy: "Имтиёз белгилари" },
  { number: 7,  slug: "prohibitory-signs",        nameUz: "Taqiqlovchi belgilar",                                         nameRu: "Запрещающие знаки",                                            nameCy: "Тақиқловчи белгилар" },
  { number: 8,  slug: "mandatory-signs",          nameUz: "Buyuruvchi belgilar",                                          nameRu: "Предписывающие знаки",                                         nameCy: "Буюрувчи белгилар" },
  { number: 9,  slug: "information-signs",        nameUz: "Axborot-ko'rsatgich belgilari",                                nameRu: "Информационно-указательные знаки",                             nameCy: "Ахборот-кўрсатгич белгилари" },
  { number: 10, slug: "service-signs",            nameUz: "Servis belgilari",                                             nameRu: "Знаки сервиса",                                                nameCy: "Сервис белгилари" },
  { number: 11, slug: "additional-info-signs",    nameUz: "Qo'shimcha axborot belgilari",                                 nameRu: "Знаки дополнительной информации",                              nameCy: "Қўшимча ахборот белгилари" },
  { number: 12, slug: "horizontal-markings",      nameUz: "Yotiq chiziqlar",                                              nameRu: "Горизонтальная разметка",                                      nameCy: "Ётиқ чизиқлар" },
  { number: 13, slug: "vertical-markings",        nameUz: "Tik chiziqlar",                                                nameRu: "Вертикальная разметка",                                        nameCy: "Тик чизиқлар" },
  { number: 14, slug: "traffic-lights",           nameUz: "Svetofor ishoralari",                                          nameRu: "Сигналы светофора",                                            nameCy: "Светофор ишоралари" },
  { number: 15, slug: "controller-signals",       nameUz: "Tartibga soluvchining ishoralari",                             nameRu: "Сигналы регулировщика",                                        nameCy: "Тартибга солувчининг ишоралари" },
  { number: 16, slug: "warning-hazard-signals",   nameUz: "Ogohlantiruvchi va avariya ishoralari",                        nameRu: "Предупредительные и аварийные сигналы",                        nameCy: "Огоҳлантирувчи ва авария ишоралари" },
  { number: 17, slug: "starting-maneuvering",     nameUz: "Harakatlanishni boshlash, manyovr qilish",                     nameRu: "Начало движения, маневрирование",                              nameCy: "Ҳаракатланишни бошлаш, манёвр қилиш" },
  { number: 18, slug: "vehicle-position",         nameUz: "Yo'lning qatnov qismida transport vositalarining joylashuvi",  nameRu: "Расположение транспортных средств на проезжей части",          nameCy: "Йўлнинг қатнов қисмида транспорт воситаларининг жойлашуви" },
  { number: 19, slug: "movement-speed",           nameUz: "Harakatlanish tezligi",                                        nameRu: "Скорость движения",                                            nameCy: "Ҳаракатланиш тезлиги" },
  { number: 20, slug: "overtaking",               nameUz: "Quvib o'tish",                                                 nameRu: "Обгон",                                                        nameCy: "Қувиб ўтиш" },
  { number: 21, slug: "stopping-parking",         nameUz: "To'xtash va to'xtab turish",                                   nameRu: "Остановка и стоянка",                                          nameCy: "Тўхташ ва тўхтаб туриш" },
  { number: 22, slug: "intersections",            nameUz: "Chorrahalarda harakatlanish",                                  nameRu: "Движение через перекрёстки",                                   nameCy: "Чорраҳаларда ҳаракатланиш" },
  { number: 23, slug: "regulated-intersections",  nameUz: "Tartibga solingan chorrahalar",                                nameRu: "Регулируемые перекрёстки",                                     nameCy: "Тартибга солинган чорраҳалар" },
  { number: 24, slug: "unregulated-main-straight",nameUz: "Tartibga solinmagan chorrahalar — asosiy yo'l to'g'riga",      nameRu: "Нерегулируемые перекрёстки — главная прямо",                   nameCy: "Тартибга солинмаган чорраҳалар — асосий йўл тўғрига" },
  { number: 25, slug: "unregulated-equal",        nameUz: "Tartibga solinmagan chorrahalar — teng ahamiyatli",            nameRu: "Нерегулируемые равнозначные перекрёстки",                      nameCy: "Тартибга солинмаган чорраҳалар — тенг аҳамиятли" },
  { number: 26, slug: "unregulated-main-changes", nameUz: "Tartibga solinmagan chorrahalar — asosiy yo'l yo'nalishi o'zgaradi", nameRu: "Нерегулируемые — главная меняет направление",          nameCy: "Тартибга солинмаган чорраҳалар — асосий йўл йўналиши ўзгариши" },
  { number: 27, slug: "crossings-stops",          nameUz: "Piyodalar o'tish joylari va yo'nalishli TV bekatlari",         nameRu: "Пешеходные переходы и остановки маршрутных ТС",                nameCy: "Пиёдаларнинг ўтиш жойлари ва йўналишли транспорт воситаларининг бекатлари" },
  { number: 28, slug: "railway-crossings",        nameUz: "Temir yo'l kesishmalari orqali harakatlanish",                 nameRu: "Движение через железнодорожные переезды",                      nameCy: "Темир йўл кесишмалари орқали ҳаракатланиш" },
  { number: 29, slug: "highway-driving",          nameUz: "Avtomagistrallarda harakatlanish",                             nameRu: "Движение по автомагистралям",                                  nameCy: "Автомагистралларда ҳаракатланиш" },
  { number: 30, slug: "residential-areas",        nameUz: "Turar joy dahalarida harakatlanish",                           nameRu: "Движение в жилых зонах",                                       nameCy: "Турар жой даҳаларида ҳаракатланиш" },
  { number: 31, slug: "slopes",                   nameUz: "Tik balandlik va nishabliklarda harakatlanish",                nameRu: "Движение на крутых подъёмах и спусках",                        nameCy: "Тик баландлик ва нишабликларда ҳаракатланиш" },
  { number: 32, slug: "route-vehicle-priority",   nameUz: "Yo'nalishli transport vositalarining imtiyozlari",             nameRu: "Приоритет маршрутных транспортных средств",                    nameCy: "Йўналишли транспорт воситаларининг имтиёзлари" },
  { number: 33, slug: "external-lights",          nameUz: "Tashqi yoritish asboblaridan foydalanish",                     nameRu: "Пользование внешними световыми приборами",                     nameCy: "Ташқи ёритиш асбобларидан фойдаланиш" },
  { number: 34, slug: "towing",                   nameUz: "Mexanik transport vositalarini shatakka olish",                nameRu: "Буксировка механических транспортных средств",                 nameCy: "Механик транспорт воситаларини шатакка олиш" },
  { number: 35, slug: "driving-instruction",      nameUz: "Transport vositalarini boshqarishni o'rgatish",                nameRu: "Учебная езда",                                                 nameCy: "Транспорт воситаларини бошқаришни ўргатиш" },
  { number: 36, slug: "passenger-transport",      nameUz: "Odam tashish",                                                 nameRu: "Перевозка людей",                                              nameCy: "Одам ташиш" },
  { number: 37, slug: "cargo-transport",          nameUz: "Yuk tashish",                                                  nameRu: "Перевозка грузов",                                             nameCy: "Юк ташиш" },
  { number: 38, slug: "bicycles-mopeds",          nameUz: "Velosiped, moped va aravalar",                                 nameRu: "Велосипеды, мопеды и повозки",                                 nameCy: "Велосипед, мопед ва аравалар" },
  { number: 39, slug: "officials-duties",         nameUz: "Mansabdor shaxslarning majburiyatlari",                        nameRu: "Обязанности должностных лиц",                                  nameCy: "Мансабдор шахсларнинг мажбуриятлари" },
  { number: 40, slug: "vehicle-prohibition",      nameUz: "Transport vositalaridan foydalanishni taqiqlovchi shartlar",   nameRu: "Условия запрета эксплуатации транспортных средств",            nameCy: "Транспорт воситаларидан фойдаланишни тақиқловчи шартлар" },
  { number: 41, slug: "safety-basics",            nameUz: "Harakat xavfsizligi asoslari",                                 nameRu: "Основы безопасности движения",                                 nameCy: "Ҳаракат хавфсизлиги асослари" },
  { number: 42, slug: "first-aid",                nameUz: "Birinchi tibbiy yordam",                                       nameRu: "Первая медицинская помощь",                                    nameCy: "Биринчи тиббий ёрдам" }
];

type RawQuestion = { id: number };
type RawLesson = { lesson: string; data: RawQuestion[] };
type RawJson = Record<string, RawLesson>;

async function main() {
  console.log("=== 1. Eski kategoriyalarni o'chirish ===");
  // Eski kategoriyalarni olib tashlaymiz (Question.categoryId allaqachon null, Test.categoryId — ham null bo'ladi)
  const oldDeleted = await prisma.category.deleteMany({});
  console.log(`  ${oldDeleted.count} ta eski kategoriya o'chirildi`);

  console.log("\n=== 2. 42 ta yangi mavzu (kategoriya) yaratish ===");
  for (const t of TOPICS) {
    await prisma.category.create({
      data: {
        number: t.number,
        slug: t.slug,
        nameUz: t.nameUz,
        nameRu: t.nameRu,
        nameCy: t.nameCy,
        icon: null,
        color: null,
        description: null,
        orderIndex: t.number
      }
    });
  }
  console.log(`  ${TOPICS.length} ta mavzu yaratildi`);

  console.log("\n=== 3. Savollarni mavzularga bog'lash ===");
  const raw: RawJson = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

  // lesson -> categoryId
  const cats = await prisma.category.findMany({ select: { id: true, number: true } });
  const numberToCatId = new Map(cats.map((c) => [c.number, c.id]));

  // questionNumber -> lessonNumber
  const qNumberToLesson = new Map<number, number>();
  for (const lessonKey of Object.keys(raw)) {
    const m = lessonKey.match(/^lesson_(\d+)$/);
    if (!m) continue;
    const lessonNum = parseInt(m[1], 10);
    for (const q of raw[lessonKey].data) {
      qNumberToLesson.set(q.id, lessonNum);
    }
  }
  console.log(`  ${qNumberToLesson.size} ta savol uchun mavzu aniqlandi`);

  // Toplovchi: kategoriya bo'yicha guruhlash → batch update
  const dbQuestions = await prisma.question.findMany({ select: { id: true, number: true } });
  const byCategory = new Map<string, string[]>();
  let unmapped = 0;
  for (const q of dbQuestions) {
    const lessonNum = qNumberToLesson.get(q.number);
    if (!lessonNum) {
      unmapped++;
      continue;
    }
    const catId = numberToCatId.get(lessonNum);
    if (!catId) {
      unmapped++;
      continue;
    }
    if (!byCategory.has(catId)) byCategory.set(catId, []);
    byCategory.get(catId)!.push(q.id);
  }

  let updated = 0;
  for (const [catId, qIds] of byCategory) {
    const res = await prisma.question.updateMany({
      where: { id: { in: qIds } },
      data: { categoryId: catId }
    });
    updated += res.count;
  }
  console.log(`  ${updated} ta savol mavzularga bog'landi (mapping topilmagan: ${unmapped})`);

  // Mavzu bo'yicha taqsimot
  const distribution = await prisma.category.findMany({
    select: { number: true, slug: true, nameUz: true, _count: { select: { questions: true } } },
    orderBy: { number: "asc" }
  });
  console.log("\n  Mavzu bo'yicha taqsimot:");
  for (const c of distribution) {
    console.log(`    [${String(c.number).padStart(2)}] ${c.slug.padEnd(30)} ${c._count.questions} ta savol`);
  }

  console.log("\n=== 4. Test (imtihon simulyatsiyasi) yaratish ===");

  // 4a. Asosiy imtihon simulyatsiyasi (RANDOM_BY_TOPIC, 20 ta savol, 25 daqiqa)
  const examTest = await prisma.test.create({
    data: {
      categoryId: null,
      titleUz: "Imtihon simulyatsiyasi",
      titleRu: "Симуляция экзамена",
      titleCy: "Имтиҳон симуляцияси",
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
  console.log(`  Imtihon simulyatsiyasi yaratildi (id: ${examTest.id})`);

  // 4b. Har mavzu uchun MANUAL test — savollar TestQuestion orqali bog'lanadi
  console.log("\n  Har mavzu uchun mashq testlari yaratilmoqda...");
  let testsMade = 0;
  for (const c of distribution) {
    if (c._count.questions === 0) continue;
    const cat = await prisma.category.findFirst({ where: { number: c.number }, select: { id: true } });
    if (!cat) continue;

    const qs = await prisma.question.findMany({
      where: { categoryId: cat.id, isPublished: true },
      select: { id: true },
      orderBy: { number: "asc" }
    });

    const test = await prisma.test.create({
      data: {
        categoryId: cat.id,
        titleUz: `${c.nameUz} (mashq)`,
        titleRu: `${c.nameUz} (практика)`,
        titleCy: `${c.nameUz} (машғулот)`,
        difficulty: "MEDIUM",
        questionCount: qs.length,
        timeLimitMinutes: Math.max(10, Math.ceil(qs.length * 0.75)),
        passingScore: Math.ceil(qs.length * 0.9),
        isExamSimulation: false,
        isPublished: true,
        orderIndex: c.number + 1,
        generationMode: "MANUAL"
      }
    });

    await prisma.testQuestion.createMany({
      data: qs.map((q, idx) => ({ testId: test.id, questionId: q.id, orderIndex: idx }))
    });
    testsMade++;
  }
  console.log(`  ${testsMade} ta mavzu mashq testi yaratildi`);

  // Yakuniy holat
  console.log("\n=== Yakuniy holat ===");
  const finalCounts = {
    Category: await prisma.category.count(),
    Question: await prisma.question.count(),
    "  ↳ categoryId set": await prisma.question.count({ where: { categoryId: { not: null } } }),
    "  ↳ categoryId null": await prisma.question.count({ where: { categoryId: null } }),
    Option: await prisma.option.count(),
    Test: await prisma.test.count(),
    TestQuestion: await prisma.testQuestion.count(),
    Ticket: await prisma.ticket.count(),
    TicketQuestion: await prisma.ticketQuestion.count()
  };
  for (const [k, v] of Object.entries(finalCounts)) {
    console.log(`  ${k.padEnd(22)} ${v}`);
  }
  console.log("\nTayyor.");
}

main()
  .catch((e) => {
    console.error("Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
