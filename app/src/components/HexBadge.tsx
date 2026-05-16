"use client";

import type { RankTier } from "@/lib/progress-stats";
import AnimatedRankIcon from "./AnimatedRankIcon";

/**
 * Hexagonal neon badge (designdan to'g'ridan-to'g'ri ko'chirilgan).
 * Daraja uchun katta vizual element — Featured rank kartochkasida ishlatiladi.
 */

type Pt = [number, number];
function sub(a: Pt, b: Pt): Pt { return [a[0] - b[0], a[1] - b[1]]; }
function add(a: Pt, b: Pt): Pt { return [a[0] + b[0], a[1] + b[1]]; }
function scl(a: Pt, k: number): Pt { return [a[0] * k, a[1] * k]; }
function norm(a: Pt): Pt { const m = Math.hypot(a[0], a[1]) || 1; return [a[0] / m, a[1] / m]; }

function hexPath(w: number, h: number, pad: number, scale = 1): string {
  const cx = w / 2, cy = h / 2;
  const W = (w / 2 - pad) * scale;
  const H = (h / 2 - pad) * scale;
  const r = 22 * scale;
  const pts: Pt[] = [
    [cx, cy - H],
    [cx + W, cy - H * 0.5],
    [cx + W, cy + H * 0.5],
    [cx, cy + H],
    [cx - W, cy + H * 0.5],
    [cx - W, cy - H * 0.5],
  ];
  let d = "";
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const next = pts[(i + 1) % pts.length];
    const prev = pts[(i - 1 + pts.length) % pts.length];
    const vIn = norm(sub(p, prev));
    const vOut = norm(sub(next, p));
    const a = add(p, scl(vIn, -r));
    const b = add(p, scl(vOut, r));
    if (i === 0) d += `M ${a[0]} ${a[1]} `;
    else d += `L ${a[0]} ${a[1]} `;
    d += `Q ${p[0]} ${p[1]} ${b[0]} ${b[1]} `;
  }
  d += "Z";
  return d;
}

function hexPathTopHighlight(w: number, h: number, pad: number): string {
  const cx = w / 2, cy = h / 2;
  const W = w / 2 - pad;
  const H = h / 2 - pad;
  return `M ${cx - W * 0.85} ${cy - H * 0.4} Q ${cx} ${cy - H * 0.95} ${cx + W * 0.85} ${cy - H * 0.4} L ${cx + W * 0.4} ${cy - H * 0.55} Q ${cx} ${cy - H * 0.78} ${cx - W * 0.4} ${cy - H * 0.55} Z`;
}

export default function HexBadge({ rank, size = 190 }: { rank: RankTier; size?: number }) {
  const W = size, H = Math.round(size * 1.1);
  const svgW = W + 60, svgH = H + 60;
  const fillId = `hex-fill-${rank.key}`;
  const strokeId = `hex-stroke-${rank.key}`;

  return (
    <div style={{ width: W, height: H, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{ position: "absolute", inset: -30, filter: `drop-shadow(0 0 30px ${rank.glow})` }}
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={rank.color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={rank.color} stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={rank.color} stopOpacity="1" />
            <stop offset="100%" stopColor={rank.color} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d={hexPath(svgW, svgH, 30)} fill={`url(#${fillId})`} stroke={`url(#${strokeId})`} strokeWidth="2.5" strokeLinejoin="round" />
        <path d={hexPath(svgW, svgH, 30, 0.84)} fill="none" stroke={rank.color} strokeOpacity="0.35" strokeWidth="1" strokeLinejoin="round" />
        <path d={hexPathTopHighlight(svgW, svgH, 30)} fill={rank.color} fillOpacity="0.22" />
      </svg>

      <div style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: `drop-shadow(0 0 8px ${rank.glow})`,
          }}
        >
          <AnimatedRankIcon name={rank.icon} color={rank.color} size={48} />
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em",
          }}
        >
          {rank.label}
        </div>
      </div>
    </div>
  );
}
