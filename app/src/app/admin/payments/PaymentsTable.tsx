"use client";
import { useRouter } from "next/navigation";
import { formatUzs } from "@/lib/utils";

type P = {
  id: string;
  status: string;
  method: string;
  amountUzs: number;
  note: string | null;
  createdAt: string;
  activatedAt: string | null;
  expiresAt: string | null;
  user: { id: string; fullName: string | null; phone: string };
  tariff: { nameUz: string; durationDays: number };
};

const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  PENDING: { bg: "color-mix(in oklch, var(--warning) 16%, transparent)", fg: "var(--warning)", label: "● Kutilmoqda" },
  ACTIVE: { bg: "color-mix(in oklch, var(--success) 16%, transparent)", fg: "var(--success)", label: "✓ Faol" },
  REJECTED: { bg: "color-mix(in oklch, var(--error) 16%, transparent)", fg: "var(--error)", label: "✕ Rad etilgan" },
  EXPIRED: { bg: "var(--bg-2)", fg: "var(--fg-3)", label: "○ Tugagan" }
};

export default function PaymentsTable({ payments }: { payments: P[] }) {
  const router = useRouter();

  const action = async (id: string, type: "approve" | "reject") => {
    const r = await fetch(`/api/admin/payments/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: type })
    });
    if (r.ok) router.refresh();
    else {
      const e = await r.json();
      alert("Xatolik: " + (e.error || ""));
    }
  };

  return (
    <div className="bento" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 1000 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 200px 140px 100px 140px 130px 160px",
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
            <span>Foydalanuvchi</span>
            <span>Tarif</span>
            <span>Summa</span>
            <span>Usul</span>
            <span>Holat</span>
            <span>Sana</span>
            <span>Amallar</span>
          </div>
          {payments.map((p, i) => {
            const st = STATUS_STYLE[p.status] || STATUS_STYLE.PENDING;
            return (
              <div
                key={p.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 200px 140px 100px 140px 130px 160px",
                  padding: "14px 18px",
                  borderBottom: i < payments.length - 1 ? "1px solid var(--line)" : "none",
                  alignItems: "center",
                  gap: 14,
                  fontSize: 13
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.user.fullName || "—"}
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>{p.user.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13 }}>{p.tariff.nameUz}</div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)" }}>{p.tariff.durationDays} kun</div>
                </div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>
                  {new Intl.NumberFormat("uz-UZ").format(p.amountUzs)}
                  <span style={{ color: "var(--fg-3)", fontWeight: 400, fontSize: 11, marginLeft: 4 }}>so'm</span>
                </div>
                <span
                  className="chip"
                  style={{
                    fontSize: 10,
                    padding: "3px 8px",
                    background: p.method === "CLICK" ? "color-mix(in oklch, var(--accent) 16%, transparent)" : "var(--bg-2)",
                    color: p.method === "CLICK" ? "var(--accent)" : "var(--fg-2)",
                    borderColor: p.method === "CLICK" ? "color-mix(in oklch, var(--accent) 40%, transparent)" : "var(--line)",
                    justifySelf: "start"
                  }}
                >
                  {p.method}
                </span>
                <div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "4px 9px",
                      borderRadius: 6,
                      background: st.bg,
                      color: st.fg,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      letterSpacing: "0.04em"
                    }}
                  >
                    {st.label}
                  </span>
                  {p.expiresAt && p.status === "ACTIVE" && (
                    <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", marginTop: 4 }}>
                      → {new Date(p.expiresAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short" })}
                    </div>
                  )}
                </div>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-2)" }}>
                  {new Date(p.createdAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  {p.status === "PENDING" ? (
                    <>
                      <button
                        onClick={() => action(p.id, "approve")}
                        className="btn btn--primary"
                        style={{ fontSize: 11, padding: "6px 10px" }}
                      >
                        ✓ Faol
                      </button>
                      <button
                        onClick={() => action(p.id, "reject")}
                        className="btn btn--ghost"
                        style={{ fontSize: 11, padding: "6px 10px" }}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: 11, color: "var(--fg-3)" }}>—</span>
                  )}
                </div>
              </div>
            );
          })}
          {payments.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: "var(--fg-3)" }}>Bu kategoriyada to'lov yo'q</div>
          )}
        </div>
      </div>
    </div>
  );
}
