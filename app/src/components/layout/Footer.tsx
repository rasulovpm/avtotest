"use client";
import { Logo } from "@/components/layout/Logo";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "32px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "var(--fg-2)",
        fontSize: 13,
        flexWrap: "wrap",
        gap: 16,
        background: "var(--bg-0)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Logo small />
        <span>© 2026 avtoimtihon.uz</span>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <a style={{ color: "inherit", textDecoration: "none" }}>Aloqa</a>
        <a style={{ color: "inherit", textDecoration: "none" }}>Yordam</a>
        <a style={{ color: "inherit", textDecoration: "none" }}>Foydalanish shartlari</a>
      </div>
    </footer>
  );
}
