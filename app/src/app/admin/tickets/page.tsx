import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminTopBar from "../AdminTopBar";

export const dynamic = "force-dynamic";

export default async function AdminTicketsPage() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { number: "asc" },
    include: { _count: { select: { questions: true } } }
  });

  return (
    <>
      <AdminTopBar
        title="Biletlar"
        sub={`${tickets.length} ta bilet — har bir biletga savollarni biriktirish mumkin`}
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "Biletlar" }]}
        actions={
          <Link href="/admin/tickets/new" className="btn btn--primary" style={{ fontSize: 13, padding: "9px 14px" }}>
            + Yangi bilet
          </Link>
        }
      />
      <div style={{ padding: 28 }}>
        <div className="bento" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 800 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 200px 100px 100px",
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
                <span>#</span>
                <span>NOMI</span>
                <span>SAVOLLAR</span>
                <span>STATUS</span>
                <span></span>
              </div>
              {tickets.map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 200px 100px 100px",
                    padding: "14px 18px",
                    borderBottom: i < tickets.length - 1 ? "1px solid var(--line)" : "none",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 13
                  }}
                >
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-1)", fontWeight: 600 }}>#{t.number}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                    <span style={{ color: "var(--fg-0)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t.titleUz}
                    </span>
                    <span style={{ color: "var(--fg-3)", fontSize: 11 }}>{t.titleRu} · {t.titleCy}</span>
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: t._count.questions > 0 ? "var(--success)" : "var(--fg-3)" }}>
                    {t._count.questions} ta savol
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "4px 9px",
                      borderRadius: 6,
                      background: t.isPublished
                        ? "color-mix(in oklch, var(--success) 16%, transparent)"
                        : "var(--bg-2)",
                      color: t.isPublished ? "var(--success)" : "var(--fg-3)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      justifySelf: "start"
                    }}
                  >
                    {t.isPublished ? "● Faol" : "○ Yashirin"}
                  </span>
                  <Link
                    href={`/admin/tickets/${t.id}`}
                    className="btn btn--ghost"
                    style={{ fontSize: 12, padding: "6px 10px", justifySelf: "end" }}
                  >
                    Ochish →
                  </Link>
                </div>
              ))}
              {tickets.length === 0 && (
                <div style={{ padding: 40, textAlign: "center", color: "var(--fg-3)" }}>Bilet yo'q</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
