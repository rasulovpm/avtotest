import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { settings, tariffs } = await req.json();

    if (settings && typeof settings === "object") {
      for (const [key, value] of Object.entries(settings)) {
        await prisma.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) }
        });
      }
    }

    if (Array.isArray(tariffs)) {
      for (const t of tariffs) {
        if (!t.id) continue;
        await prisma.tariff.update({
          where: { id: t.id },
          data: {
            priceUzs: Number(t.priceUzs),
            isActive: !!t.isActive
          }
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
