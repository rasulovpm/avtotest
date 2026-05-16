"use client";
import { Logo } from "@/components/layout/Logo";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        color: "var(--fg-2)",
        fontSize: 13,
        background: "var(--bg-0)"
      }}
    >
      <div
        className="shell"
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16
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
      </div>
    </footer>
  );
}
