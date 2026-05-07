import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminTopBar from "../AdminTopBar";
import PaymentsTable from "./PaymentsTable";

export const dynamic = "force-dynamic";

const TABS = [
  { value: "PENDING", label: "● Kutilmoqda" },
  { value: "ACTIVE", label: "✓ Faol" },
  { value: "REJECTED", label: "✕ Rad etilgan" },
  { value: "EXPIRED", label: "○ Tugagan" },
  { value: "all", label: "Barchasi" }
];

export default async function AdminPaymentsPage({ searchParams }: { searchParams: { status?: string } }) {
  const status = searchParams.status || "PENDING";
  const where: any = status !== "all" ? { status } : {};

  const [payments, counts] = await Promise.all([
    prisma.payment.findMany({
      where,
      include: { user: true, tariff: true },
      orderBy: { createdAt: "desc" },
      take: 200
    }),
    Promise.all([
      prisma.payment.count({ where: { status: "PENDING" } }),
      prisma.payment.count({ where: { status: "ACTIVE" } }),
      prisma.payment.count({ where: { status: "REJECTED" } }),
      prisma.payment.count({ where: { status: "EXPIRED" } }),
      prisma.payment.count()
    ])
  ]);

  const [pending, active, rejected, expired, total] = counts;
  const tabCounts: Record<string, number> = {
    PENDING: pending,
    ACTIVE: active,
    REJECTED: rejected,
    EXPIRED: expired,
    all: total
  };

  return (
    <>
      <AdminTopBar
        title="To'lovlar"
        sub={`${total} ta to'lov · ${pending} ta kutilmoqda`}
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "To'lovlar" }]}
      />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TABS.map((tab) => (
            <Link
              key={tab.value}
              href={`/admin/payments?status=${tab.value}`}
              className="chip"
              style={{
                padding: "8px 14px",
                fontSize: 12,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                background: status === tab.value ? "var(--accent)" : "var(--bg-1)",
                color: status === tab.value ? "#0a1f24" : "var(--fg-1)",
                borderColor: status === tab.value ? "var(--accent)" : "var(--line)",
                textDecoration: "none"
              }}
            >
              {tab.label} · {tabCounts[tab.value]}
            </Link>
          ))}
        </div>

        <PaymentsTable
          payments={payments.map((p) => ({
            id: p.id,
            status: p.status,
            method: p.method,
            amountUzs: p.amountUzs,
            note: p.note,
            createdAt: p.createdAt.toISOString(),
            activatedAt: p.activatedAt?.toISOString() || null,
            expiresAt: p.expiresAt?.toISOString() || null,
            user: { id: p.user.id, fullName: p.user.fullName, phone: p.user.phone },
            tariff: { nameUz: p.tariff.nameUz, durationDays: p.tariff.durationDays }
          }))}
        />
      </div>
    </>
  );
}
