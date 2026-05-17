import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

(async () => {
  const cats = await prisma.category.findMany({
    select: {
      id: true, number: true, slug: true,
      nameUz: true, nameRu: true, nameCy: true,
      icon: true, color: true, description: true, orderIndex: true,
    },
    orderBy: { number: "asc" },
  });

  const qs = await prisma.question.findMany({
    select: { number: true, categoryId: true },
    where: { categoryId: { not: null } },
    orderBy: { number: "asc" },
  });

  // Mapping: questionNumber -> categoryNumber
  const idToNum = new Map(cats.map((c) => [c.id, c.number]));
  const mapping: [number, number][] = [];
  for (const q of qs) {
    if (!q.categoryId) continue;
    const n = idToNum.get(q.categoryId);
    if (typeof n === "number") mapping.push([q.number, n]);
  }

  const out = {
    categories: cats.map(({ id, ...rest }) => rest),
    questionToCategory: mapping,
  };

  const dest = path.resolve(__dirname, "cat-map.generated.json");
  fs.writeFileSync(dest, JSON.stringify(out));
  console.log(`✔ Dumped ${cats.length} categories, ${mapping.length} question→category links`);
  console.log(`  → ${dest}`);
})().finally(() => prisma.$disconnect());
