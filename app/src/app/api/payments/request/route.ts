import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const { tariffId, method } = await req.json();

    const tariff = await prisma.tariff.findUnique({ where: { id: tariffId } });
    if (!tariff || !tariff.isActive) {
      return NextResponse.json({ error: "tariff_not_found" }, { status: 404 });
    }

    const settings = await prisma.setting.findMany({
      where: { key: { in: ["click_enabled", "manual_payments_enabled"] } }
    });
    const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

    if (method === "CLICK" && map.click_enabled !== "true") {
      return NextResponse.json({ error: "click_disabled" }, { status: 400 });
    }
    if (method === "MANUAL" && map.manual_payments_enabled !== "true") {
      return NextResponse.json({ error: "manual_disabled" }, { status: 400 });
    }

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        tariffId,
        amountUzs: tariff.priceUzs,
        status: "PENDING",
        method: method === "CLICK" ? "CLICK" : "MANUAL"
      }
    });

    if (method === "CLICK") {
      // Click integratsiyasi keyinroq qo'shiladi.
      // Hozircha mock checkout URL qaytaramiz.
      const checkoutUrl = `/pricing?pending=${payment.id}`;
      return NextResponse.json({ ok: true, paymentId: payment.id, checkoutUrl });
    }

    return NextResponse.json({ ok: true, paymentId: payment.id });
  } catch (e: any) {
    if (String(e?.message).includes("UNAUTH")) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
