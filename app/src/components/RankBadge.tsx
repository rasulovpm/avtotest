"use client";
import Link from "next/link";
import type { RankKey } from "@/lib/progress-stats";

/**
 * Daraja chip — kichik vizual indikator. Bosilganda /level sahifasini ochadi
 * (u yerda barcha 5 daraja, animatsiyali iconlar va statistika ko'rinadi).
 */

type Size = "sm" | "md" | "lg";

const RANK_THEMES: Record<
  RankKey,
  { fg: string; glow: string; bg: string; ring: string }
> = {
  mehmon: {
    fg: "#cbd5e1",
    glow: "rgba(148,163,184,0.50)",
    bg: "rgba(148,163,184,0.10)",
    ring: "rgba(148,163,184,0.45)",
  },
  tolibi_ilm: {
    fg: "#67e8f9",
    glow: "rgba(34,211,238,0.55)",
    bg: "rgba(34,211,238,0.10)",
    ring: "rgba(34,211,238,0.50)",
  },
  taxsir: {
    fg: "#fbbf24",
    glow: "rgba(245,158,11,0.55)",
    bg: "rgba(245,158,11,0.10)",
    ring: "rgba(245,158,11,0.50)",
  },
  mavlono: {
    fg: "#c084fc",
    glow: "rgba(168,85,247,0.55)",
    bg: "rgba(168,85,247,0.10)",
    ring: "rgba(168,85,247,0.50)",
  },
  piri_komil: {
    fg: "#fde047",
    glow: "rgba(250,204,21,0.65)",
    bg: "rgba(250,204,21,0.12)",
    ring: "rgba(250,204,21,0.55)",
  },
};

function RankIcon({ rank, size }: { rank: RankKey; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    stroke: "currentColor",
  };

  switch (rank) {
    case "mehmon":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 21 c0-4 3.5-7 7-7 s7 3 7 7" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      );
    case "tolibi_ilm":
      return (
        <svg {...common}>
          <path d="M3 6 c3-1 6-1 9 1 c3-2 6-2 9-1 v12 c-3-1-6-1-9 1 c-3-2-6-2-9-1 z" />
          <path d="M12 7 V19" />
          <path d="M6 9 h3 M6 12 h3 M15 9 h3 M15 12 h3" opacity="0.6" />
        </svg>
      );
    case "taxsir":
      return (
        <svg {...common}>
          <path d="M12 3 L14.6 9 L21 9.6 L16 14 L17.4 20.4 L12 17.2 L6.6 20.4 L8 14 L3 9.6 L9.4 9 Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M12 3 L14.6 9 L21 9.6 L16 14 L17.4 20.4 L12 17.2 L6.6 20.4 L8 14 L3 9.6 L9.4 9 Z" />
        </svg>
      );
    case "mavlono":
      return (
        <svg {...common}>
          <path d="M5 21 V11 a7 7 0 0 1 14 0 V21" />
          <path d="M5 21 H19" />
          <path d="M9 21 V14 a3 3 0 0 1 6 0 V21" />
          <circle cx="12" cy="7" r="1.6" fill="currentColor" />
          <path d="M12 3 v2 M9.5 4 l1 1.5 M14.5 4 l-1 1.5" opacity="0.7" />
        </svg>
      );
    case "piri_komil":
      return (
        <svg {...common}>
          <path d="M3 17 L5 8 L9 12 L12 5 L15 12 L19 8 L21 17 Z" fill="currentColor" fillOpacity="0.22" />
          <path d="M3 17 L5 8 L9 12 L12 5 L15 12 L19 8 L21 17 Z" />
          <path d="M3 21 H21" />
          <circle cx="5" cy="8" r="1" fill="currentColor" />
          <circle cx="12" cy="5" r="1.2" fill="currentColor" />
          <circle cx="19" cy="8" r="1" fill="currentColor" />
        </svg>
      );
  }
}

export default function RankBadge({
  rank,
  label,
  size = "md",
  showLabel = true,
  currentPercent: _ignored,
}: {
  rank: RankKey;
  label: string;
  size?: Size;
  showLabel?: boolean;
  /** Ko'rinishi uchun saqlanadi, hozir ishlatilmaydi (eski API bilan moslik) */
  currentPercent?: number;
}) {
  const dim = size === "lg" ? 48 : size === "md" ? 32 : 24;
  const iconSize = size === "lg" ? 26 : size === "md" ? 17 : 13;
  const pad = size === "lg" ? "8px 14px" : size === "md" ? "4px 10px" : "3px 8px";
  const fontSize = size === "lg" ? 14 : size === "md" ? 11 : 10;
  const theme = RANK_THEMES[rank];

  return (
    <Link
      href="/level"
      title="Daraja tafsilotlari"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: showLabel ? 8 : 0,
        padding: showLabel ? pad : 0,
        borderRadius: 999,
        background: showLabel ? theme.bg : "transparent",
        border: showLabel ? `1px solid ${theme.ring}` : "none",
        color: theme.fg,
        boxShadow: showLabel ? `0 0 14px ${theme.glow}` : "none",
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform .15s, box-shadow .25s",
      }}
    >
      <span
        style={{
          width: dim,
          height: dim,
          borderRadius: showLabel ? "50%" : 0,
          background: showLabel
            ? `radial-gradient(120% 100% at 50% 0%, ${theme.glow}, transparent 70%), ${theme.bg}`
            : "transparent",
          border: showLabel ? `1px solid ${theme.ring}` : "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: showLabel ? `inset 0 0 10px ${theme.glow}` : "none",
        }}
      >
        <RankIcon rank={rank} size={iconSize} />
      </span>
      {showLabel && (
        <span
          style={{
            fontSize,
            fontWeight: 600,
            letterSpacing: "0.02em",
            textTransform: size === "lg" ? "none" : "uppercase",
          }}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
