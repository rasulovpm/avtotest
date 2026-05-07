"use client";
import Link from "next/link";

export default function AdminTopBar({
  title,
  sub,
  breadcrumbs,
  actions
}: {
  title: string;
  sub?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}) {
  return (
    <header
      style={{
        padding: "20px 32px",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        background: "var(--bg-0)",
        flexWrap: "wrap"
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--fg-3)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
            {breadcrumbs.map((b, i) => (
              <span key={i}>
                {i > 0 && <span style={{ marginRight: 8 }}>/</span>}
                {b.href ? (
                  <Link href={b.href} style={{ color: "inherit" }}>
                    {b.label}
                  </Link>
                ) : (
                  <span style={{ color: i === breadcrumbs.length - 1 ? "var(--fg-1)" : "var(--fg-3)" }}>{b.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <h1 className="h-display" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{title}</h1>
        {sub && <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{sub}</div>}
      </div>
      {actions && <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>{actions}</div>}
    </header>
  );
}
