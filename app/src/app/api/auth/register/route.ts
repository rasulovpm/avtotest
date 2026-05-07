import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidUzPhone, normalizePhone } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { phone, fullName } = await req.json();
    const norm = normalizePhone(phone || "");
    if (!isValidUzPhone(norm)) {
      return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    }
    await prisma.user.upsert({
      where: { phone: norm },
      update: { fullName: fullName || undefined },
      create: { phone: norm, fullName: fullName || null }
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message || e) }, { status: 500 });
  }
}
