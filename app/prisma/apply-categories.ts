/**
 * Production bazasiga 42 ta kategoriyani yozish va har savolni mos
 * kategoriyaga bog'lash. Lokal DB'dan oldindan `dump-cat-map.ts` orqali
 * eksport qilingan `cat-map.generated.json` faylidan o'qiydi.
 *
 * Ishga tushirish (container ichida):
 *   docker compose -f docker-compose.prod.yml exec app \
 *     node node_modules/tsx/dist/cli.mjs prisma/apply-categories.ts
 *
 * Idempotent — qayta ishlatish xavfsiz (upsert va update).
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

type CatRow = {
  number: number;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameCy: string;
  icon: string | null;
  color: string | null;
  description: string | null;
  orderIndex: number;
};

type Dump = {
  categories: CatRow[];
  questionToCategory: [number, number][];
};

(async () => {
  const src = path.resolve(__dirname, "cat-map.generated.json");
  if (!fs.existsSync(src)) {
    console.error(`✕ ${src} topilmadi.`);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(src, "utf8")) as Dump;

  console.log("=== 1. Eski kategoriyalarni tozalash ===");
  // Question.categoryId va Test.categoryId — onDelete: SetNull, demak
  // savol va testlar yo'qolmaydi, faqat categoryId null bo'ladi (keyin
  // qaytadan o'rnatamiz).
  const oldDel = await prisma.category.deleteMany({});
  console.log(`  ✔ ${oldDel.count} ta eski kategoriya o'chirildi`);

  console.log("\n=== 2. Yangi 42 kategoriyani yaratish ===");
  const idBySlug = new Map<string, string>();
  for (const c of data.categories) {
    const created = await prisma.category.create({ data: c });
    idBySlug.set(c.slug, created.id);
  }
  console.log(`  ✔ ${data.categories.length} ta kategoriya yaratildi`);

  // Slug -> id, number -> id, ikkalasini ham tayyorlaymiz
  const idByNumber = new Map<number, string>();
  for (const c of data.categories) {
    const id = idBySlug.get(c.slug);
    if (id) idByNumber.set(c.number, id);
  }

  console.log("\n=== 3. Savollarni kategoriyalarga bog'lash ===");
  let updated = 0, missing = 0;
  for (const [qNumber, catNumber] of data.questionToCategory) {
    const catId = idByNumber.get(catNumber);
    if (!catId) continue;
    const r = await prisma.question.updateMany({
      where: { number: qNumber },
      data: { categoryId: catId },
    });
    if (r.count > 0) updated += r.count;
    else missing++;
  }
  console.log(`  ✔ ${updated} ta savol kategoriyaga bog'landi`);
  if (missing > 0) {
    console.log(`  ⚠  ${missing} ta savol topilmadi (bazada hali yo'q bo'lishi mumkin)`);
  }

  console.log("\n=== 4. Yakuniy holat ===");
  const totalCat = await prisma.category.count();
  const totalQ = await prisma.question.count();
  const withCat = await prisma.question.count({ where: { categoryId: { not: null } } });
  const withoutCat = await prisma.question.count({ where: { categoryId: null } });
  console.log(`  Kategoriyalar     : ${totalCat}`);
  console.log(`  Savollar (jami)   : ${totalQ}`);
  console.log(`  ↳ kategoriyali    : ${withCat}`);
  console.log(`  ↳ kategoriyasiz   : ${withoutCat}`);
})()
  .catch((e) => {
    console.error("Xato:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
