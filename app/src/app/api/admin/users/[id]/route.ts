import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await req.json();
    const data: any = {};
    if (body.role && ["USER", "ADMIN"].includes(body.role)) data.role = body.role;
    if (body.plan && ["FREE", "STANDARD", "PREMIUM"].includes(body.plan)) {
      data.plan = body.plan;
      // Plan FREE bo'lsa, expiry'ni tozalaymiz
      if (body.plan === "FREE") data.planExpiresAt = null;
    }
    if (typeof body.fullName === "string") data.fullName = body.fullName;
    await prisma.user.update({ where: { id: params.id }, data });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
