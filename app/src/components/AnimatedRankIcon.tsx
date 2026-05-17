"use client";

import { useEffect } from "react";

type IconName = "guest" | "book-open" | "star" | "turban" | "crown";

const STYLE_ID = "rk-anim-styles";
const CSS = `
@keyframes rk-walk { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
@keyframes rk-head-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.4px); } }
.rk-anim-walk { transform-origin: 24px 22px; animation: rk-walk 1.4s ease-in-out infinite; }
.rk-anim-head { transform-origin: 24px 11px; animation: rk-head-bob 1.4s ease-in-out infinite; }

@keyframes rk-page-l1 { 0%, 70%, 100% { opacity: 0.3; } 35% { opacity: 1; } }
@keyframes rk-page-l2 { 0%, 80%, 100% { opacity: 0.3; } 45% { opacity: 1; } }
.rk-anim-pages line:nth-child(1) { animation: rk-page-l1 2.4s ease-in-out infinite; }
.rk-anim-pages line:nth-child(2) { animation: rk-page-l2 2.4s ease-in-out infinite 0.2s; }
.rk-anim-pages line:nth-child(3) { animation: rk-page-l1 2.4s ease-in-out infinite 0.4s; }
.rk-anim-pages line:nth-child(4) { animation: rk-page-l2 2.4s ease-in-out infinite 0.6s; }

@keyframes rk-spin { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(12deg) scale(1.06); } }
.rk-anim-spin { transform-origin: 24px 24px; animation: rk-spin 3.2s ease-in-out infinite; }

@keyframes rk-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
.rk-anim-float { transform-origin: 24px 24px; animation: rk-float 2.4s ease-in-out infinite; }
@keyframes rk-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.7; } }
.rk-anim-pulse { transform-origin: 24px 20px; animation: rk-pulse 1.6s ease-in-out infinite; }

@keyframes rk-jewel { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
.rk-anim-jewel-1 { animation: rk-jewel 1.8s ease-in-out infinite; }
.rk-anim-jewel-2 { animation: rk-jewel 1.8s ease-in-out infinite 0.4s; }
.rk-anim-jewel-3 { animation: rk-jewel 1.8s ease-in-out infinite 0.8s; }
@keyframes rk-sparkle { 0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; } 50% { transform: scale(1.3) rotate(45deg); opacity: 1; } }
.rk-anim-sparkle { transform-origin: 24px 22px; animation: rk-sparkle 2s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .rk-anim-walk, .rk-anim-head, .rk-anim-pages line, .rk-anim-spin,
  .rk-anim-float, .rk-anim-pulse, .rk-anim-jewel-1, .rk-anim-jewel-2,
  .rk-anim-jewel-3, .rk-anim-sparkle { animation: none !important; }
}
`;

function useInjectStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
}

export default function AnimatedRankIcon({
  name,
  color,
  size = 48,
}: {
  name: IconName;
  color: string;
  size?: number;
}) {
  useInjectStyles();
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: color,
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "guest":
      return (
        <svg {...common}>
          <circle className="rk-anim-head" cx="24" cy="11" r="4" fill={color} fillOpacity="0.3" />
          <circle className="rk-anim-head" cx="24" cy="11" r="4" />
          <g className="rk-anim-walk">
            <path d="M24 16 V28 M24 28 L17 38 M24 28 L31 38" />
            <path d="M24 22 L15 24 M24 22 L33 20" />
          </g>
        </svg>
      );
    case "book-open":
      return (
        <svg {...common}>
          <path d="M8 14 H22 Q24 14 24 16 V40 Q24 38 22 38 H8 Z" fill={color} fillOpacity="0.18" />
          <path d="M40 14 H26 Q24 14 24 16 V40 Q24 38 26 38 H40 Z" fill={color} fillOpacity="0.18" />
          <path d="M8 14 H22 Q24 14 24 16 V40 Q24 38 22 38 H8 Z" />
          <path d="M40 14 H26 Q24 14 24 16 V40 Q24 38 26 38 H40 Z" />
          <g className="rk-anim-pages">
            <line x1="12" y1="20" x2="20" y2="20" strokeOpacity="0.7" strokeWidth="2" />
            <line x1="12" y1="26" x2="20" y2="26" strokeOpacity="0.7" strokeWidth="2" />
            <line x1="28" y1="20" x2="36" y2="20" strokeOpacity="0.7" strokeWidth="2" />
            <line x1="28" y1="26" x2="36" y2="26" strokeOpacity="0.7" strokeWidth="2" />
          </g>
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <g className="rk-anim-spin">
            <path d="M24 6 L29.5 18.5 L43 20 L33 29 L36 42 L24 35 L12 42 L15 29 L5 20 L18.5 18.5 Z" fill={color} fillOpacity="0.35" />
            <path d="M24 6 L29.5 18.5 L43 20 L33 29 L36 42 L24 35 L12 42 L15 29 L5 20 L18.5 18.5 Z" />
          </g>
        </svg>
      );
    case "turban":
      return (
        <svg {...common}>
          <g className="rk-anim-float">
            <path d="M10 30 Q10 14 24 14 Q38 14 38 30 Z" fill={color} fillOpacity="0.25" />
            <path d="M10 30 Q10 14 24 14 Q38 14 38 30 Z" />
            <path d="M10 30 Q10 24 24 22 Q38 24 38 30" />
            <rect x="8" y="30" width="32" height="6" rx="2" fill={color} fillOpacity="0.4" />
            <rect x="8" y="30" width="32" height="6" rx="2" />
            <circle cx="24" cy="20" r="2" fill={color} className="rk-anim-pulse" />
            <path d="M16 36 Q16 42 24 42 Q32 42 32 36" strokeOpacity="0.5" />
          </g>
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path d="M6 32 L10 14 L18 24 L24 10 L30 24 L38 14 L42 32 Z" fill={color} fillOpacity="0.3" />
          <path d="M6 32 L10 14 L18 24 L24 10 L30 24 L38 14 L42 32 Z" />
          <rect x="6" y="32" width="36" height="6" rx="2" fill={color} fillOpacity="0.5" />
          <rect x="6" y="32" width="36" height="6" rx="2" />
          <circle cx="10" cy="14" r="2.2" fill={color} className="rk-anim-jewel-1" />
          <circle cx="24" cy="10" r="2.4" fill={color} className="rk-anim-jewel-2" />
          <circle cx="38" cy="14" r="2.2" fill={color} className="rk-anim-jewel-3" />
          <path d="M24 18 L25 20 L27 21 L25 22 L24 24 L23 22 L21 21 L23 20 Z" fill={color} fillOpacity="0.8" stroke="none" className="rk-anim-sparkle" />
        </svg>
      );
  }
}
