import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Click webhook stub.
// Click sxemasi: PREPARE -> COMPLETE
// Sign hash: md5(click_trans_id + service_id + SECRET_KEY + merchant_trans_id + amount + action + sign_time)
// Hujjat: https://docs.click.uz/click-api/
//
// Bu yerda asosiy strukturani tayyorlab qo'ydik. Real integratsiyada
// CLICK_SECRET_KEY .env'ga qo'shilib, sign tekshirish to'g'rilanadi.

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    const action = data.action; // "0" = PREPARE, "1" = COMPLETE
    const merchantTransId = data.merchant_trans_id; // bizning Payment.id
    const clickTransId = data.click_trans_id;
    const amount = data.amount;
    const sign = data.sign_string;
    const signTime = data.sign_time;
    const serviceId = data.service_id;

    // 1. Sign tekshirish
    const secret = process.env.CLICK_SECRET_KEY || "";
    const expected = crypto
      .createHash("md5")
      .update(`${clickTransId}${serviceId}${secret}${merchantTransId}${amount}${action}${signTime}`)
      .digest("hex");

    if (secret && sign && sign !== expected) {
      return NextResponse.json({
        click_trans_id: clickTransId,
        merchant_trans_id: merchantTransId,
        error: -1,
        error_note: "SIGN CHECK FAILED"
      });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: merchantTransId },
      include: { tariff: true }
    });
    if (!payment) {
      return NextResponse.json({
        click_trans_id: clickTransId,
        merchant_trans_id: merchantTransId,
        error: -5,
        error_note: "Order not found"
      });
    }

    if (Math.abs(payment.amountUzs - Number(amount)) > 1) {
      return NextResponse.json({
        click_trans_id: clickTransId,
        merchant_trans_id: merchantTransId,
        error: -2,
        error_note: "Incorrect amount"
      });
    }

    if (action === "0") {
      // PREPARE
      return NextResponse.json({
        click_trans_id: clickTransId,
        merchant_trans_id: merchantTransId,
        merchant_prepare_id: payment.id,
        error: 0,
        error_note: "Success"
      });
    }

    if (action === "1") {
      // COMPLETE — to'lov muvaffaqiyatli
      if (payment.status === "ACTIVE") {
        return NextResponse.json({
          click_trans_id: clickTransId,
          merchant_trans_id: merchantTransId,
          merchant_confirm_id: payment.id,
          error: -4,
          error_note: "Already paid"
        });
      }

      const now = new Date();
      const expires = new Date(now.getTime() + payment.tariff.durationDays * 24 * 60 * 60 * 1000);

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { status: "ACTIVE", activatedAt: now, expiresAt: expires, externalId: clickTransId }
        }),
        prisma.user.update({
          where: { id: payment.userId },
          data: { plan: "PREMIUM", planExpiresAt: expires }
        })
      ]);

      return NextResponse.json({
        click_trans_id: clickTransId,
        merchant_trans_id: merchantTransId,
        merchant_confirm_id: payment.id,
        error: 0,
        error_note: "Success"
      });
    }

    return NextResponse.json({ error: -3, error_note: "Invalid action" });
  } catch (e: any) {
    return NextResponse.json({ error: -9, error_note: String(e?.message) });
  }
}
