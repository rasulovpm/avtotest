import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const { action } = await req.json();

    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
      include: { tariff: true, user: true }
    });
    if (!payment) return NextResponse.json({ error: "not_found" }, { status: 404 });
    if (payment.status !== "PENDING") {
      return NextResponse.json({ error: "already_processed" }, { status: 400 });
    }

    if (action === "approve") {
      const now = new Date();
      const expires = new Date(now.getTime() + payment.tariff.durationDays * 24 * 60 * 60 * 1000);

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "ACTIVE",
            activatedAt: now,
            expiresAt: expires
          }
        }),
        prisma.user.update({
          where: { id: payment.userId },
          data: {
            plan: "PREMIUM",
            planExpiresAt: expires
          }
        })
      ]);

      return NextResponse.json({ ok: true });
    }

    if (action === "reject") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "REJECTED" }
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "bad_action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
