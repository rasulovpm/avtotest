import Link from "next/link";

export function Logo({ small = false, href = "/" }: { small?: boolean; href?: string }) {
  const size = small ? 22 : 28;
  const iconSize = small ? 14 : 18;
  const text = small ? 14 : 17;

  return (
    <Link href={href} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 16px color-mix(in oklch, var(--accent) 60%, transparent)"
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="none">
          <path
            d="M3 13 L3 11 Q3 9 5 9 L7 9 L9 5 L13 5 L15 9 L16 9 Q17 9 17 11 L17 13"
            stroke="#0a1f24"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="6" cy="13" r="1.5" fill="#0a1f24" />
          <circle cx="14" cy="13" r="1.5" fill="#0a1f24" />
        </svg>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontSize: text
        }}
      >
        avtoimtihon<span style={{ color: "var(--accent)" }}>.uz</span>
      </div>
    </Link>
  );
}
