import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { getTopicProgressMap } from "@/lib/topic-progress";
import Header from "@/components/layout/Header";

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/topics");
  }
  const userId = (session.user as any).id as string;

  const categories = await prisma.category.findMany({
    orderBy: { orderIndex: "asc" },
    select: {
      id: true,
      number: true,
      slug: true,
      nameUz: true,
      nameRu: true,
      nameCy: true,
      icon: true,
      color: true,
      description: true,
    },
  });

  const progressMap = await getTopicProgressMap(
    userId,
    categories.map((c) => c.id)
  );

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
            Mavzulashtirilgan testlar
          </h1>
          <p style={{ color: "var(--fg-2)", margin: 0, fontSize: 15 }}>
            {categories.length} ta mavzu · har birida o'zining barcha savollari · progress saqlanib turadi
          </p>
        </section>

        <section style={{ padding: "16px 48px 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {categories.map((c) => {
              const pr = progressMap.get(c.id);
              const total = pr?.totalQuestions ?? 0;
              const answered = pr?.answeredCount ?? 0;
              const correct = pr?.correctCount ?? 0;
              const percent = pr?.percent ?? 0;
              const status = pr?.status ?? "NOT_STARTED";

              const statusLabel =
                status === "COMPLETED"
                  ? "Tugatildi"
                  : status === "IN_PROGRESS"
                  ? `${answered}/${total} javob berildi`
                  : "Boshlanmagan";
              const chipClass =
                status === "COMPLETED"
                  ? "chip chip--success"
                  : status === "IN_PROGRESS"
                  ? "chip chip--accent"
                  : "chip";

              return (
                <Link
                  key={c.id}
                  href={`/topics/${c.slug}`}
                  className="bento"
                  style={{
                    padding: 20,
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    minHeight: 170,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background:
                          c.color ||
                          "color-mix(in oklch, var(--accent) 18%, var(--bg-2))",
                        border: "1px solid color-mix(in oklch, var(--accent) 30%, transparent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontFamily: "var(--font-mono)",
                        fontSize: 14,
                        color: "var(--fg-0)",
                        flexShrink: 0,
                      }}
                    >
                      {String(c.number).padStart(2, "0")}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="overline" style={{ marginBottom: 2 }}>
                        MAVZU #{c.number}
                      </div>
                      <div
                        className="h-display"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          lineHeight: 1.25,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {c.nameUz}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span className={chipClass} style={{ fontSize: 11, padding: "4px 10px" }}>
                      {statusLabel}
                    </span>
                    <span className="chip" style={{ fontSize: 11, padding: "4px 10px" }}>
                      {total} savol
                    </span>
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    <div className="progress" style={{ height: 6 }}>
                      <span style={{ width: `${percent}%` }} />
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        color: "var(--fg-2)",
                      }}
                    >
                      <span>
                        {correct}/{total} to'g'ri
                      </span>
                      <span className="mono">{percent}%</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
