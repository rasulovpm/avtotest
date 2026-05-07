/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// RoadSign — generates real Uzbek-style road sign SVGs.
// Categories: warning (yellow triangle), prohibitive (red circle),
// mandatory (blue circle), info (blue square), priority (special).
// ───────────────────────────────────────────────────────────────

function RoadSign({ kind = 'warning-curve', size = 96 }) {
  const s = size;
  const Wrap = ({ children }) =>
  <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>{children}</svg>;


  // ── shapes ────────────────────────────────────────────────
  const Triangle = ({ children, fill = '#FFD60A', stroke = '#1d1d1f' }) =>
  <Wrap>
      <polygon points="50,8 92,86 8,86" fill={fill} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="50,16 86,82 14,82" fill={fill} stroke="#fff" strokeWidth="2" style={{ fill: "rgb(255, 212, 0)" }} />
      {children}
    </Wrap>;

  const Circle = ({ children, fill = '#FF453A', inner = '#fff' }) =>
  <Wrap>
      <circle cx="50" cy="50" r="44" fill={fill} stroke="#1d1d1f" strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill={inner} />
      {children}
    </Wrap>;

  const SquareInfo = ({ children, fill = '#0A66D6' }) =>
  <Wrap>
      <rect x="6" y="6" width="88" height="88" rx="6" fill={fill} stroke="#1d1d1f" strokeWidth="3" />
      <rect x="12" y="12" width="76" height="76" rx="3" fill={fill} stroke="#fff" strokeWidth="2" />
      {children}
    </Wrap>;

  const Diamond = ({ children, fill = '#FFD60A' }) =>
  <Wrap>
      <polygon points="50,6 94,50 50,94 6,50" fill={fill} stroke="#1d1d1f" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="50,14 86,50 50,86 14,50" fill={fill} stroke="#fff" strokeWidth="2" />
      {children}
    </Wrap>;

  const Octagon = ({ children, fill = '#E63946' }) =>
  <Wrap>
      <polygon points="32,6 68,6 94,32 94,68 68,94 32,94 6,68 6,32" fill={fill} stroke="#1d1d1f" strokeWidth="3" />
      {children}
    </Wrap>;


  switch (kind) {
    case 'warning-curve':
      return (
        <Triangle>
          <path d="M30 70 Q40 40 55 50 Q70 60 70 30" stroke="#1d1d1f" strokeWidth="5" fill="none" strokeLinecap="round" />
          <polygon points="65,28 75,28 70,20" fill="#1d1d1f" />
        </Triangle>);

    case 'warning-pedestrian':
      return (
        <Triangle>
          <circle cx="44" cy="40" r="5" fill="#1d1d1f" />
          <path d="M44 46 L44 62 M44 52 L36 60 M44 52 L52 60 M44 62 L40 78 M44 62 L48 78" stroke="#1d1d1f" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M58 56 L58 74 L66 74 L66 64" stroke="#1d1d1f" strokeWidth="3" fill="none" />
        </Triangle>);

    case 'warning-roadwork':
      return (
        <Triangle>
          <rect x="46" y="40" width="8" height="20" fill="#1d1d1f" />
          <circle cx="50" cy="36" r="5" fill="#1d1d1f" />
          <path d="M40 60 L60 60 L65 70 L35 70 Z" fill="#1d1d1f" />
        </Triangle>);

    case 'warning-slippery':
      return (
        <Triangle>
          <path d="M30 40 Q50 50 70 40 Q60 60 70 70 Q50 60 30 70 Q40 55 30 40 Z" fill="#1d1d1f" />
        </Triangle>);

    case 'prohibit-no-entry':
      return (
        <Circle>
          <rect x="22" y="44" width="56" height="12" fill="#fff" />
        </Circle>);

    case 'prohibit-no-stop':
      return (
        <Wrap>
          <circle cx="50" cy="50" r="44" fill="#0A66D6" stroke="#1d1d1f" strokeWidth="3" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#FF453A" strokeWidth="6" strokeLinecap="round" />
          <line x1="78" y1="22" x2="22" y2="78" stroke="#FF453A" strokeWidth="6" strokeLinecap="round" />
        </Wrap>);

    case 'prohibit-speed':
      return (
        <Circle>
          <text x="50" y="64" textAnchor="middle" fontFamily="Helvetica, Arial" fontWeight="800" fontSize="34" fill="#1d1d1f">60</text>
        </Circle>);

    case 'prohibit-no-overtake':
      return (
        <Wrap>
          <circle cx="50" cy="50" r="44" fill="#fff" stroke="#FF453A" strokeWidth="6" />
          <rect x="32" y="32" width="14" height="36" rx="2" fill="#FF453A" />
          <rect x="54" y="32" width="14" height="36" rx="2" fill="#1d1d1f" />
        </Wrap>);

    case 'mandatory-straight':
      return (
        <Wrap>
          <circle cx="50" cy="50" r="44" fill="#0A66D6" stroke="#1d1d1f" strokeWidth="3" />
          <path d="M50 78 L50 28 M50 28 L40 38 M50 28 L60 38" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
        </Wrap>);

    case 'mandatory-roundabout':
      return (
        <Wrap>
          <circle cx="50" cy="50" r="44" fill="#0A66D6" stroke="#1d1d1f" strokeWidth="3" />
          <path d="M50 24 A26 26 0 1 1 24 50" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M24 50 L18 44 M24 50 L18 56" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
        </Wrap>);

    case 'priority-main':
      return (
        <Diamond>
          <polygon points="50,30 70,50 50,70 30,50" fill="#fff" stroke="#1d1d1f" strokeWidth="2" />
          <polygon points="50,36 64,50 50,64 36,50" fill="#FFD60A" />
        </Diamond>);

    case 'priority-yield':
      return (
        <Wrap>
          <polygon points="50,8 92,86 8,86" fill="#fff" stroke="#FF453A" strokeWidth="6" strokeLinejoin="round" />
        </Wrap>);

    case 'priority-stop':
      return (
        <Octagon>
          <text x="50" y="60" textAnchor="middle" fontFamily="Helvetica, Arial" fontWeight="900" fontSize="22" fill="#fff" letterSpacing="1">STOP</text>
        </Octagon>);

    case 'info-crosswalk':
      return (
        <SquareInfo>
          <polygon points="50,22 78,76 22,76" fill="#fff" />
          <g stroke="#1d1d1f" strokeWidth="2">
            <line x1="40" y1="58" x2="36" y2="68" />
            <line x1="46" y1="58" x2="44" y2="68" />
            <line x1="52" y1="58" x2="52" y2="68" />
            <line x1="58" y1="58" x2="60" y2="68" />
          </g>
          <circle cx="50" cy="40" r="4" fill="#1d1d1f" />
          <path d="M50 44 L50 56 M50 50 L44 56 M50 50 L56 56" stroke="#1d1d1f" strokeWidth="2.5" fill="none" />
        </SquareInfo>);

    case 'info-parking':
      return (
        <SquareInfo>
          <text x="50" y="68" textAnchor="middle" fontFamily="Helvetica, Arial" fontWeight="900" fontSize="48" fill="#fff">P</text>
        </SquareInfo>);

    case 'info-hospital':
      return (
        <SquareInfo>
          <rect x="30" y="30" width="40" height="40" rx="4" fill="#fff" />
          <rect x="44" y="36" width="12" height="28" fill="#FF453A" />
          <rect x="36" y="44" width="28" height="12" fill="#FF453A" />
        </SquareInfo>);

    default:
      return <Triangle><text x="50" y="58" textAnchor="middle" fill="#1d1d1f" fontSize="14">?</text></Triangle>;
  }
}

window.RoadSign = RoadSign;