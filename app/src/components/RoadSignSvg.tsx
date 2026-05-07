// Soddalashtirilgan inline SVG yo'l belgilari (artboard'dan moslashtirilgan)
type Kind =
  | "warning-curve"
  | "prohibit-no-entry"
  | "prohibit-speed"
  | "mandatory-roundabout"
  | "priority-stop"
  | "priority-main"
  | "info-parking";

export function RoadSignSvg({ kind, size = 64 }: { kind: Kind; size?: number }) {
  const s = size;
  switch (kind) {
    case "warning-curve":
      return (
        <svg width={s} height={s} viewBox="0 0 64 64">
          <polygon points="32,6 60,58 4,58" fill="#FFD60A" stroke="#1a1208" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22 46 Q22 32 32 32 Q42 32 42 22" stroke="#1a1208" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M38 18 L42 22 L46 18" stroke="#1a1208" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "prohibit-no-entry":
      return (
        <svg width={s} height={s} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#FF453A" stroke="#fff" strokeWidth="2" />
          <rect x="14" y="28" width="36" height="8" fill="#fff" />
        </svg>
      );
    case "prohibit-speed":
      return (
        <svg width={s} height={s} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#fff" stroke="#FF453A" strokeWidth="6" />
          <text x="32" y="42" textAnchor="middle" fontSize="22" fontWeight="800" fill="#1a1208" fontFamily="sans-serif">60</text>
        </svg>
      );
    case "mandatory-roundabout":
      return (
        <svg width={s} height={s} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="#0A84FF" />
          <g stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round">
            <circle cx="32" cy="32" r="10" />
            <path d="M32 18 L34 22 L30 22 Z" fill="#fff" stroke="none" />
            <path d="M46 32 L42 34 L42 30 Z" fill="#fff" stroke="none" />
            <path d="M32 46 L30 42 L34 42 Z" fill="#fff" stroke="none" />
            <path d="M18 32 L22 30 L22 34 Z" fill="#fff" stroke="none" />
          </g>
        </svg>
      );
    case "priority-stop":
      return (
        <svg width={s} height={s} viewBox="0 0 64 64">
          <polygon points="20,4 44,4 60,20 60,44 44,60 20,60 4,44 4,20" fill="#FF453A" stroke="#fff" strokeWidth="2" />
          <text x="32" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="sans-serif">STOP</text>
        </svg>
      );
    case "priority-main":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" fill="#FFD60A" stroke="#1a1208" strokeWidth="3" />
          <rect x="32" y="32" width="36" height="36" transform="rotate(45 50 50)" fill="#fff" stroke="none" />
        </svg>
      );
    case "info-parking":
      return (
        <svg width={s} height={s} viewBox="0 0 64 64">
          <rect x="6" y="6" width="52" height="52" rx="6" fill="#0A84FF" />
          <text x="32" y="44" textAnchor="middle" fontSize="32" fontWeight="800" fill="#fff" fontFamily="sans-serif">P</text>
        </svg>
      );
    default:
      return <svg width={s} height={s} />;
  }
}
