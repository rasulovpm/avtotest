import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    if (!body.textUz || !Array.isArray(body.options) || body.options.length < 2) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    if (!body.options.some((o: any) => o.isCorrect)) {
      return NextResponse.json({ error: "no_correct_option" }, { status: 400 });
    }
    const q = await prisma.question.create({
      data: {
        categoryId: body.categoryId || null,
        textUz: body.textUz,
        textRu: body.textRu || body.textUz,
        textCy: body.textCy || body.textUz,
        explanationUz: body.explanationUz || null,
        explanationRu: body.explanationRu || null,
        explanationCy: body.explanationCy || null,
        imageUrl: body.imageUrl || null,
        difficulty: body.difficulty || "MEDIUM",
        isPublished: !!body.isPublished,
        options: {
          create: body.options.map((o: any, i: number) => ({
            textUz: o.textUz,
            textRu: o.textRu || o.textUz,
            textCy: o.textCy || o.textUz,
            isCorrect: !!o.isCorrect,
            orderIndex: i
          }))
        }
      }
    });
    return NextResponse.json({ id: q.id });
  } catch (e: any) {
    if (String(e?.message).includes("FORBIDDEN")) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    if (String(e?.message).includes("UNAUTH")) return NextResponse.json({ error: "unauth" }, { status: 401 });
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}
