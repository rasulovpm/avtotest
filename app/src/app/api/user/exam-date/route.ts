import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/**
 * Foydalanuvchi imtihon kunini saqlash/yangilash/o'chirish.
 *
 * Body: { date: string | null }
 *  - date "YYYY-MM-DD" (yoki to'liq ISO) — saqlanadi
 *  - date null      — o'chiriladi (foydalanuvchi rejani olib tashlamoqchi)
 */
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const raw: string | null | undefined = body?.date;

    let value: Date | null = null;
    if (raw && typeof raw === "string") {
      const d = new Date(raw);
      if (isNaN(d.getTime())) {
        return NextResponse.json({ error: "invalid_date" }, { status: 400 });
      }
      value = d;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { examDate: value },
    });

    return NextResponse.json({ examDate: value?.toISOString() ?? null });
  } catch (e: any) {
    if (String(e?.message).includes("UNAUTHENTICATED")) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "internal_error", detail: String(e?.message) },
      { status: 500 }
    );
  }
}
