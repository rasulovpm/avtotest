import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import Header from "@/components/layout/Header";
import SavedClient from "./SavedClient";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/saved");
  }
  const userId = (session.user as any).id as string;

  const rows = await prisma.savedQuestion.findMany({
    where: { userId },
    orderBy: { savedAt: "desc" },
    take: 500,
    include: {
      question: {
        include: {
          category: true,
          options: { orderBy: { orderIndex: "asc" } },
        },
      },
    },
  });

  const items = rows.map((r) => ({
    id: r.id,
    questionId: r.question.id,
    number: r.question.number,
    textUz: r.question.textUz,
    imageUrl: r.question.imageUrl,
    explanationUz: r.question.explanationUz,
    categoryName: r.question.category?.nameUz ?? null,
    categorySlug: r.question.category?.slug ?? null,
    savedAt: r.savedAt.toISOString(),
    options: r.question.options.map((o) => ({
      id: o.id,
      textUz: o.textUz,
      isCorrect: o.isCorrect,
    })),
  }));

  return (
    <>
      <Header />
      <main style={{ background: "var(--bg-0)", color: "var(--fg-0)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
        <section style={{ padding: "32px 48px 16px" }}>
          <div style={{ marginBottom: 8 }}>
            <Link href="/" className="overline" style={{ color: "var(--fg-2)", textDecoration: "none" }}>
              ← Bosh sahifa
            </Link>
          </div>
          <h1 className="h-display" style={{ fontSize: 32, fontWeight: 600, marginTop: 8, marginBottom: 6 }}>
            Saqlangan savollar
          </h1>
          <p style={{ color: "var(--fg-2)", margin: 0, fontSize: 15 }}>
            {items.length === 0
              ? "Hozircha saqlangan savol yo'q. Test jarayonida ★ tugmasini bosib saqlang."
              : `${items.length} ta savol · javob va izoh bilan birga`}
          </p>
        </section>
        <section style={{ padding: "16px 48px 48px" }}>
          <SavedClient items={items} />
        </section>
      </main>
    </>
  );
}
