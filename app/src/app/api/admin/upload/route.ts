import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "no_file" }, { status: 400 });
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "bad_type", type: file.type }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "too_large", maxBytes: MAX_BYTES }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = (file.name.match(/\.[a-zA-Z0-9]+$/)?.[0] || "").toLowerCase() || mimeToExt(file.type);
    const hash = crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 16);
    const fname = `${Date.now()}-${hash}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, fname), buffer);

    const url = `/uploads/${fname}`;
    return NextResponse.json({ url, size: buffer.length });
  } catch (e: any) {
    if (String(e?.message).includes("FORBIDDEN")) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    if (String(e?.message).includes("UNAUTH")) return NextResponse.json({ error: "unauth" }, { status: 401 });
    return NextResponse.json({ error: "internal_error", detail: String(e?.message) }, { status: 500 });
  }
}

function mimeToExt(mime: string) {
  switch (mime) {
    case "image/png": return ".png";
    case "image/jpeg": return ".jpg";
    case "image/webp": return ".webp";
    case "image/gif": return ".gif";
    case "image/svg+xml": return ".svg";
    default: return "";
  }
}
