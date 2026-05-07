"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type U = {
  id: string;
  phone: string;
  fullName: string | null;
  role: string;
  plan: string;
  totalXp: number;
  planExpiresAt: string | null;
  createdAt: string;
  lastActiveAt: string;
};

export default function UsersTable({ users, currentQ }: { users: U[]; currentQ: string }) {
  const router = useRouter();
  const [q, setQ] = useState(currentQ);

  const apply = () => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    router.push(`/admin/users${sp.toString() ? "?" + sp.toString() : ""}`);
  };

  const update = async (id: string, patch: any) => {
    const r = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch)
    });
    if (r.ok) router.refresh();
    else alert("Xatolik");
  };

  return (
    <>
      <div className="bento" style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            placeholder="Telefon yoki ism..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && apply()}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "8px 14px 8px 32px",
              fontSize: 13,
              color: "var(--fg-0)",
              fontFamily: "var(--font-body)",
              outline: "none"
            }}
          />
          <span style={{ position: "absolute", left: 11, top: 8, color: "var(--fg-3)", fontSize: 13 }}>⌕</span>
        </div>
        <button onClick={apply} className="btn btn--primary" style={{ fontSize: 13, padding: "9px 14px" }}>
          Qidirish
        </button>
      </div>

      <div className="bento" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 1000 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 160px 130px 130px 80px 90px 110px 60px",
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
              <span>Telefon</span>
              <span>Tarif</span>
              <span>Rol</span>
              <span>XP</span>
              <span>Holat</span>
              <span>Qo'shildi</span>
              <span></span>
            </div>
            {users.map((u, i) => {
              const initials = (u.fullName || u.phone)
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              const isActive = new Date(u.lastActiveAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000;
              return (
                <div
                  key={u.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 160px 130px 130px 80px 90px 110px 60px",
                    padding: "14px 18px",
                    borderBottom: i < users.length - 1 ? "1px solid var(--line)" : "none",
                    alignItems: "center",
                    gap: 14,
                    fontSize: 13
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, oklch(0.7 0.15 ${(i * 47) % 360}), oklch(0.82 0.18 ${(i * 47 + 60) % 360}))`,
                        color: "#0a1f24",
                        fontWeight: 700,
                        fontSize: 12,
                        fontFamily: "var(--font-mono)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {initials}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {u.fullName || "—"}
                      </div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>id: {u.id.slice(-6)}</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-2)" }}>{u.phone}</span>
                  <select
                    value={u.plan}
                    onChange={(e) => update(u.id, { plan: e.target.value })}
                    style={selectSt}
                  >
                    <option value="FREE">FREE</option>
                    <option value="STANDARD">STANDARD</option>
                    <option value="PREMIUM">★ PREMIUM</option>
                  </select>
                  <select
                    value={u.role}
                    onChange={(e) => update(u.id, { role: e.target.value })}
                    style={selectSt}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                  <span className="mono" style={{ fontSize: 12, color: "var(--fg-1)" }}>{u.totalXp}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: isActive ? "var(--success)" : "var(--fg-3)"
                      }}
                    />
                    {isActive ? "Faol" : "Faolsiz"}
                  </span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--fg-2)" }}>
                    {new Date(u.createdAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short" })}
                  </span>
                  <span style={{ color: "var(--fg-3)", fontSize: 16, justifySelf: "end" }}>⋯</span>
                </div>
              );
            })}
            {users.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: "var(--fg-3)" }}>Foydalanuvchi topilmadi</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const selectSt: React.CSSProperties = {
  background: "var(--bg-2)",
  border: "1px solid var(--line)",
  color: "var(--fg-0)",
  borderRadius: 6,
  padding: "5px 8px",
  fontSize: 11,
  fontFamily: "var(--font-mono)",
  cursor: "pointer",
  outline: "none"
};
