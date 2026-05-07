import { prisma } from "@/lib/prisma";
import AdminTopBar from "../AdminTopBar";
import UsersTable from "./UsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({ searchParams }: { searchParams: { q?: string } }) {
  const where: any = {};
  if (searchParams.q) {
    where.OR = [{ phone: { contains: searchParams.q } }, { fullName: { contains: searchParams.q } }];
  }
  const [users, total, premium, today, inactive] = await Promise.all([
    prisma.user.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.user.count(),
    prisma.user.count({ where: { plan: { not: "FREE" } } }),
    prisma.user.count({ where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } }),
    prisma.user.count({ where: { lastActiveAt: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } })
  ]);

  return (
    <>
      <AdminTopBar
        title="Foydalanuvchilar"
        sub={`${total} ta foydalanuvchi · ${premium} Premium`}
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "Foydalanuvchilar" }]}
      />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            { l: "Jami", v: total, d: "barchasi", tone: "var(--accent)" },
            { l: "Premium", v: premium, d: total > 0 ? `${((premium / total) * 100).toFixed(1)}%` : "0%", tone: "oklch(0.85 0.18 75)" },
            { l: "Bugun yangi", v: today, d: "oxirgi 24 soat", tone: "var(--success)" },
            { l: "Faolsiz · 30 kun", v: inactive, d: total > 0 ? `${((inactive / total) * 100).toFixed(1)}%` : "0%", tone: "var(--error)" }
          ].map((k, i) => (
            <div key={i} className="bento" style={{ padding: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: k.tone }} />
              <div className="overline" style={{ marginBottom: 8 }}>{k.l}</div>
              <div className="h-display" style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{k.v.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>{k.d}</div>
            </div>
          ))}
        </div>

        <UsersTable
          users={users.map((u) => ({
            id: u.id,
            phone: u.phone,
            fullName: u.fullName,
            role: u.role,
            plan: u.plan,
            totalXp: u.totalXp,
            planExpiresAt: u.planExpiresAt?.toISOString() || null,
            createdAt: u.createdAt.toISOString(),
            lastActiveAt: u.lastActiveAt.toISOString()
          }))}
          currentQ={searchParams.q || ""}
        />
      </div>

      <style>{`
        @media (max-width: 1024px) { .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </>
  );
}
