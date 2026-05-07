import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminTopBar from "../AdminTopBar";

export const dynamic = "force-dynamic";

export default async function AdminTestsPage() {
  const tests = await prisma.test.findMany({
    include: { category: true, _count: { select: { questions: true, results: true } } },
    orderBy: { orderIndex: "asc" }
  });

  return (
    <>
      <AdminTopBar
        title="Testlar"
        sub={`${tests.length} ta test`}
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "Testlar" }]}
        actions={
          <Link href="/admin/tests/new" className="btn btn--primary" style={{ fontSize: 13, padding: "9px 14px" }}>
            + Yangi test
          </Link>
        }
      />
      <div style={{ padding: 28 }}>
        <div className="bento" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 900 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 160px 90px 90px 100px 90px 90px",
                  padding: "12px 18px",
                  borderBottom: "1px solid var(--line)",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  color: "var(--fg-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  background: "var(--bg-2)"
                }}
              >
                <span>Nom</span>
                <span>Kategoriya</span>
                <span>Savollar</span>
                <span>Vaqt</span>
                <span>O'tish</span>
                <span>Yechilgan</span>
                <span>Holat</span>
              </div>
              {tests.map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 160px 90px 90px 100px 90px 90px",
                    padding: "14px 18px",
                    borderBottom: i < tests.length - 1 ? "1px solid var(--line)" : "none",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 13
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Link href={`/tests/${t.id}`} style={{ color: "var(--fg-0)", fontWeight: 600, textDecoration: "none" }}>
                      {t.titleUz}
                    </Link>
                    {t.isExamSimulation && (
                      <span className="chip chip--accent" style={{ fontSize: 10, padding: "3px 8px" }}>
                        EXAM
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 12, color: "var(--fg-2)" }}>{t.category?.nameUz || "—"}</span>
                  <span className="mono" style={{ fontSize: 12 }}>{t._count.questions}</span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-2)" }}>{t.timeLimitMinutes} daq</span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>
                    {t.passingScore}/{t.questionCount}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-2)" }}>{t._count.results}</span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "4px 9px",
                      borderRadius: 6,
                      background: t.isPublished ? "color-mix(in oklch, var(--success) 16%, transparent)" : "var(--bg-2)",
                      color: t.isPublished ? "var(--success)" : "var(--fg-3)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      justifySelf: "start"
                    }}
                  >
                    {t.isPublished ? "● Faol" : "○ Yashirin"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
