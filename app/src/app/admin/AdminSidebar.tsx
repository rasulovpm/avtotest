"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const ITEMS = [
  { href: "/admin", icon: "◫", label: "Dashboard", exact: true },
  { href: "/admin/questions", icon: "?", label: "Savollar" },
  { href: "/admin/tests", icon: "▤", label: "Testlar" },
  { href: "/admin/signs", icon: "△", label: "Yo'l belgilari" },
  { href: "/admin/users", icon: "◉", label: "Foydalanuvchilar" },
  { href: "/admin/payments", icon: "$", label: "To'lovlar" }
];

const BOTTOM = [{ href: "/admin/settings", icon: "⚙", label: "Sozlamalar" }];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
        style={{
          position: "fixed",
          top: 14,
          left: 14,
          zIndex: 50,
          padding: 10,
          borderRadius: 10,
          background: "var(--bg-1)",
          border: "1px solid var(--line)",
          color: "var(--fg-0)",
          cursor: "pointer",
          fontSize: 14
        }}
      >
        ☰
      </button>

      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: "var(--bg-1)",
          borderRight: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          padding: "20px 14px",
          gap: 4,
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto"
        }}
        className={open ? "admin-sidebar-open" : "admin-sidebar"}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 10px 18px",
            borderBottom: "1px solid var(--line)",
            marginBottom: 12,
            justifyContent: "space-between"
          }}
        >
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "var(--accent)",
                color: "#0a1f24",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 14px color-mix(in oklch, var(--accent) 50%, transparent)"
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)" }}>avtoimtihon.uz</div>
              <div className="overline" style={{ fontSize: 9, color: "var(--fg-3)" }}>ADMIN PANEL</div>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
            style={{ background: "transparent", border: "none", color: "var(--fg-2)", cursor: "pointer", fontSize: 18 }}
          >
            ✕
          </button>
        </div>

        <div className="overline" style={{ fontSize: 9, padding: "4px 10px", color: "var(--fg-3)", marginBottom: 4 }}>
          BOSHQARUV
        </div>
        {ITEMS.map((it) => {
          const active = it.exact ? pathname === it.href : pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "9px 10px",
                borderRadius: 8,
                background: active ? "color-mix(in oklch, var(--accent) 14%, transparent)" : "transparent",
                color: active ? "var(--accent)" : "var(--fg-1)",
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                textDecoration: "none"
              }}
            >
              <span style={{ width: 18, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 13, opacity: active ? 1 : 0.7 }}>
                {it.icon}
              </span>
              <span style={{ flex: 1 }}>{it.label}</span>
            </Link>
          );
        })}

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          <div className="overline" style={{ fontSize: 9, padding: "4px 10px", color: "var(--fg-3)", marginBottom: 4 }}>
            TIZIM
          </div>
          {BOTTOM.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "9px 10px",
                  borderRadius: 8,
                  background: active ? "color-mix(in oklch, var(--accent) 14%, transparent)" : "transparent",
                  color: active ? "var(--accent)" : "var(--fg-1)",
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  textDecoration: "none"
                }}
              >
                <span style={{ width: 18, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 13, opacity: 0.7 }}>{it.icon}</span>
                <span>{it.label}</span>
              </Link>
            );
          })}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 8, color: "var(--fg-1)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}
          >
            <span style={{ width: 18, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 13, opacity: 0.7 }}>↗</span>
            <span>Saytga qaytish</span>
          </Link>

          {/* user card */}
          <div
            style={{
              marginTop: 12,
              padding: 10,
              borderRadius: 10,
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              gap: 10
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                color: "#0a1f24",
                fontWeight: 700,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)"
              }}
            >
              {(session?.user?.name || (session?.user as any)?.phone || "A").charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session?.user?.name || (session?.user as any)?.phone || "Admin"}
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)" }}>SUPER · ADMIN</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{ background: "transparent", border: "none", color: "var(--fg-3)", cursor: "pointer", fontSize: 14 }}
              title="Chiqish"
            >
              ↪
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            left: -240px;
            top: 0;
            transition: left .25s;
            z-index: 60;
          }
          .admin-sidebar-open {
            position: fixed;
            left: 0;
            top: 0;
            transition: left .25s;
            z-index: 60;
            box-shadow: 0 0 60px rgba(0,0,0,0.6);
          }
        }
      `}</style>
    </>
  );
}
