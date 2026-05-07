import { NextRequest, NextResponse } from "next/server";
import { sendOtp } from "@/lib/telegram";
import { isValidUzPhone, normalizePhone } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "phone_required" }, { status: 400 });

    const norm = normalizePhone(phone);
    if (!isValidUzPhone(norm)) {
      return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
    }

    const result = await sendOtp(norm);
    return NextResponse.json({
      ok: true,
      phone: norm,
      // Faqat dev rejimda kodni qaytaramiz
      ...(result.debugCode ? { debugCode: result.debugCode } : {})
    });
  } catch (e: any) {
    const msg = String(e?.message || e);
    if (msg.startsWith("telegram_not_linked")) {
      return NextResponse.json(
        { error: "telegram_not_linked", botUsername: process.env.TELEGRAM_BOT_USERNAME },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "internal_error", detail: msg }, { status: 500 });
  }
}
