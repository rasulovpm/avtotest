import { prisma } from "@/lib/prisma";

// Mavzu nisbatiga qarab tasodifiy savollar tanlash.
// Har mavzudan (categoryId) targetCount * (mavzudagi savollar / jami) ga yaqin son tanlanadi.
// Yetishmayotgan/ortib qolgan o'rinlar fractional remainder bo'yicha taqsimlanadi.
export async function sampleQuestionsByTopic(targetCount: number) {
  const all = await prisma.question.findMany({
    where: { isPublished: true },
    select: { id: true, categoryId: true }
  });
  if (all.length === 0) return [] as string[];

  const byTopic: Record<string, string[]> = {};
  for (const q of all) {
    const k = q.categoryId || "__none";
    (byTopic[k] = byTopic[k] || []).push(q.id);
  }

  const total = all.length;
  const desired = Math.min(targetCount, total);

  // Birinchi qator: floor(ratio * desired)
  const plan: Record<string, number> = {};
  const remainders: { k: string; frac: number; cap: number }[] = [];
  let allocated = 0;
  for (const [k, ids] of Object.entries(byTopic)) {
    const exact = (ids.length / total) * desired;
    const floor = Math.floor(exact);
    plan[k] = Math.min(floor, ids.length);
    allocated += plan[k];
    remainders.push({ k, frac: exact - floor, cap: ids.length });
  }

  // Qoldiqni eng katta fractional remainder bo'yicha taqsimlaymiz
  remainders.sort((a, b) => b.frac - a.frac);
  let i = 0;
  while (allocated < desired && i < remainders.length * 4) {
    const r = remainders[i % remainders.length];
    if (plan[r.k] < r.cap) {
      plan[r.k]++;
      allocated++;
    }
    i++;
  }

  // Tanlash: har mavzudan random shuffle qilib n ta olamiz
  const picked: string[] = [];
  for (const [k, n] of Object.entries(plan)) {
    if (n <= 0) continue;
    const arr = [...byTopic[k]];
    for (let j = arr.length - 1; j > 0; j--) {
      const r = Math.floor(Math.random() * (j + 1));
      [arr[j], arr[r]] = [arr[r], arr[j]];
    }
    picked.push(...arr.slice(0, n));
  }

  // Yakuniy aralashtirish — mavzular ketma-ketligi paydo bo'lmasin
  for (let j = picked.length - 1; j > 0; j--) {
    const r = Math.floor(Math.random() * (j + 1));
    [picked[j], picked[r]] = [picked[r], picked[j]];
  }
  return picked;
}
