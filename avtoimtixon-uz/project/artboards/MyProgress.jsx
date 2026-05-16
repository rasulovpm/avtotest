/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// MyProgress — "Sizning darajangiz" bottom sheet (mobile)
// 5 ranks · neon hexagonal badge · carousel
// ───────────────────────────────────────────────────────────────

const RANKS = [
  {
    key: 'mehmon',
    name: "Mehmon", range: '0% – 10%', sub: "Sayohat endigina boshlandi",
    icon: 'guest',
    color: '#94a3b8', glow: 'rgba(148,163,184,0.55)', fill: 'rgba(148,163,184,0.20)', textColor: '#cbd5e1',
  },
  {
    key: 'tolibi-ilm',
    name: "Tolibi ilm", range: '11% – 40%', sub: "Bilim olishda davom eting",
    icon: 'book-open',
    color: '#22d3ee', glow: 'rgba(34,211,238,0.55)', fill: 'rgba(34,211,238,0.20)', textColor: '#67e8f9',
  },
  {
    key: 'taxsir',
    name: "Taxsir", range: '41% – 70%', sub: "Sezilarli yutuq",
    icon: 'star',
    color: '#f59e0b', glow: 'rgba(245,158,11,0.55)', fill: 'rgba(245,158,11,0.20)', textColor: '#fbbf24',
  },
  {
    key: 'mavlono',
    name: "Mavlono", range: '71% – 90%', sub: "Bilimingiz ufqiga yetib bormoqda",
    icon: 'turban',
    color: '#a855f7', glow: 'rgba(168,85,247,0.55)', fill: 'rgba(168,85,247,0.20)', textColor: '#c084fc',
  },
  {
    key: 'piri-komil',
    name: "Piri komil", range: '91% – 100%', sub: "Komil mukammallik",
    icon: 'crown',
    color: '#facc15', glow: 'rgba(250,204,21,0.65)', fill: 'rgba(250,204,21,0.22)', textColor: '#fde047',
  },
];

function MyProgress({ activeIdx = 1, progressPct = 15 }) {
  const [idx, setIdx] = React.useState(activeIdx);
  const rank = RANKS[idx];

  // For the in-rank fill: where progressPct falls inside this rank's range
  const parseRange = (r) => {
    const m = r.match(/(\d+)%\s*[–-]\s*(\d+)/);
    return m ? [parseInt(m[1]), parseInt(m[2])] : [0, 100];
  };
  const [lo, hi] = parseRange(rank.range);
  const inRank = idx === activeIdx;
  const inRankPct = inRank
    ? Math.max(0, Math.min(100, ((progressPct - lo) / (hi - lo)) * 100))
    : (idx < activeIdx ? 100 : 0);

  return (
    <div style={{
      width: 390, height: 844, position: 'relative',
      background: '#0b1220', color: '#fff', fontFamily: 'var(--font-body)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }} data-screen-label="My Progress · Level sheet">

      {/* ── Phone status bar ─────────────────────────────── */}
      <div style={{
        padding: '14px 28px 8px', display: 'flex', justifyContent: 'space-between',
        fontSize: 15, fontWeight: 600, color: '#fff',
      }}>
        <span>17:33</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
          <span style={{ fontFamily: 'var(--font-mono)' }}>📶 5G ▮▮▮</span>
        </span>
      </div>

      {/* ── Underlying screen (blurred preview) ─────────── */}
      <div style={{ padding: '8px 16px', opacity: 0.55 }}>
        {/* Profile row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 4px 14px' }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(34,211,238,0.18)', border: '1.5px solid rgba(34,211,238,0.5)',
            color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 17, position: 'relative',
          }}>K
            <span style={{
              position: 'absolute', right: -2, bottom: -2,
              width: 12, height: 12, borderRadius: '50%',
              background: '#22c55e', border: '2px solid #0b1220',
            }}></span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Khurshid</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: '#67e8f9', display: 'flex', alignItems: 'center', gap: 4 }}>
              📖 TOLIBI ILM <span style={{ fontSize: 9 }}>›</span>
            </div>
          </div>
          <span style={{ color: '#94a3b8', fontSize: 18 }}>⌕</span>
          <span style={{ color: '#94a3b8', fontSize: 18 }}>⚙</span>
        </div>

        {/* Progress card */}
        <div style={{
          padding: 16, borderRadius: 14,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Progres</span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Imtihonga 9 kun qoldi ✎</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 700 }}>15%</span>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: '#22c55e' }}>✓ 260</span> <span style={{ color: '#ef4444' }}>✕ 57</span> <span style={{ color: '#64748b' }}>— 903</span>
            </span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '15%', height: '100%', background: '#22c55e', borderRadius: 999 }}></div>
          </div>
        </div>

        {/* Two faded cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', height: 80 }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>≡</span>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>Barcha testlar</div>
          </div>
          <div style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', height: 80, position: 'relative' }}>
            <span style={{ fontSize: 12, color: '#ef4444' }}>♡</span>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>Xatolarni tuzatish</div>
            <span style={{
              position: 'absolute', top: 8, right: 8,
              minWidth: 22, height: 22, padding: '0 6px',
              borderRadius: '50%', background: '#ef4444', color: '#fff',
              fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>57</span>
          </div>
        </div>
      </div>

      {/* ── Bottom sheet ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#0f1a2e', borderRadius: '24px 24px 0 0',
        padding: '12px 0 28px',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: 16,
        minHeight: 540,
      }}>
        {/* Drag handle */}
        <div style={{ alignSelf: 'center', width: 44, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.2)', marginBottom: 4 }}></div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>
            Sizning darajangiz
          </h2>
          <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
            Joriy oʻzlashtirishingiz: <span style={{ color: '#fff', fontWeight: 600 }}>{progressPct}%</span>
          </div>
        </div>

        {/* ── Hexagon carousel ────────────────────────── */}
        <div style={{ position: 'relative', height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {RANKS.map((r, i) => {
            const offset = i - idx;
            const isCenter = offset === 0;
            const visible = Math.abs(offset) <= 1;
            if (!visible) return null;
            const x = offset * 260;
            const scale = isCenter ? 1 : 0.72;
            const opacity = isCenter ? 1 : 0.4;
            return (
              <div key={r.key} onClick={() => setIdx(i)}
                style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: `translate(calc(-50% + ${x}px), -50%) scale(${scale})`,
                  transition: 'transform .35s cubic-bezier(.2,.8,.2,1), opacity .35s',
                  opacity, cursor: 'pointer',
                }}>
                <HexBadge rank={r} />
              </div>
            );
          })}
        </div>

        {/* ── Range + in-rank progress ─────────────────── */}
        <div style={{ padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>
            <span style={{ color: idx === 0 ? '#94a3b8' : 'rgba(255,255,255,0.35)' }}>0%</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{rank.range}</span>
            <span style={{ color: idx === RANKS.length - 1 ? '#94a3b8' : 'rgba(255,255,255,0.35)' }}>100%</span>
          </div>
          <div style={{ position: 'relative', height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: inRankPct + '%', height: '100%',
              background: `linear-gradient(90deg, ${rank.color}, ${rank.textColor})`,
              borderRadius: 999, boxShadow: `0 0 12px ${rank.glow}`,
              transition: 'width .4s',
            }}></div>
          </div>
          <div style={{ marginTop: 6, textAlign: 'right', fontSize: 12, fontFamily: 'var(--font-mono)', color: rank.textColor, fontWeight: 600 }}>
            {Math.round(inRankPct)}%
          </div>
        </div>

        {/* ── Dots indicator ───────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {RANKS.map((r, i) => (
            <span key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 22 : 8, height: 8, borderRadius: 999,
              background: i === idx ? r.color : 'rgba(255,255,255,0.18)',
              boxShadow: i === idx ? `0 0 8px ${r.glow}` : 'none',
              cursor: 'pointer', transition: 'all .25s',
            }}></span>
          ))}
        </div>

        {/* ── CTAs ─────────────────────────────────────── */}
        <div style={{ padding: '4px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button style={{
            padding: '14px 18px', borderRadius: 14,
            background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)',
            color: '#86efac', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}>Qachon imtihonga borsam boʻladi?</button>
          <button style={{
            padding: '14px 18px', borderRadius: 14,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
            color: '#cbd5e1', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'var(--font-body)', letterSpacing: '0.08em',
          }}>YOPISH</button>
        </div>
      </div>
    </div>
  );
}

// ── Hexagonal neon badge ──────────────────────────────────────
function HexBadge({ rank }) {
  // Hexagon shape — slightly squashed, like the reference (pointed top/bottom rounded)
  const W = 190, H = 210;
  return (
    <div style={{ width: W, height: H, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer glow */}
      <svg width={W + 60} height={H + 60} viewBox={`0 0 ${W + 60} ${H + 60}`}
        style={{ position: 'absolute', inset: -30, filter: `drop-shadow(0 0 30px ${rank.glow})` }}>
        <defs>
          <linearGradient id={`hex-fill-${rank.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={rank.color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={rank.color} stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id={`hex-stroke-${rank.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={rank.color} stopOpacity="1" />
            <stop offset="100%" stopColor={rank.color} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* hexagon path — soft rounded corners */}
        <path
          d={hexPath(W + 60, H + 60, 30)}
          fill={`url(#hex-fill-${rank.key})`}
          stroke={`url(#hex-stroke-${rank.key})`}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Inner highlight */}
        <path
          d={hexPath(W + 60, H + 60, 30, 0.84)}
          fill="none"
          stroke={rank.color}
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Top reflection */}
        <path
          d={hexPathTopHighlight(W + 60, H + 60, 30)}
          fill={rank.color}
          fillOpacity="0.22"
        />
      </svg>

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          filter: `drop-shadow(0 0 8px ${rank.glow})`,
        }}>
          <RankIcon name={rank.icon} color={rank.color} size={48} />
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
          {rank.name}
        </div>
      </div>
    </div>
  );
}

// Hexagon SVG path generator — squashed hex (taller than wide)
function hexPath(w, h, pad, scale = 1) {
  const cx = w / 2, cy = h / 2;
  const W = (w / 2 - pad) * scale;
  const H = (h / 2 - pad) * scale;
  const r = 22 * scale; // corner radius
  // Points: top, upper-right, lower-right, bottom, lower-left, upper-left
  const pts = [
    [cx, cy - H],            // top point
    [cx + W, cy - H * 0.5],  // upper right
    [cx + W, cy + H * 0.5],  // lower right
    [cx, cy + H],            // bottom point
    [cx - W, cy + H * 0.5],  // lower left
    [cx - W, cy - H * 0.5],  // upper left
  ];
  // Build rounded-corner hex
  let d = '';
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
  d += 'Z';
  return d;
}
function hexPathTopHighlight(w, h, pad) {
  const cx = w / 2, cy = h / 2;
  const W = w / 2 - pad;
  const H = h / 2 - pad;
  return `M ${cx - W * 0.85} ${cy - H * 0.4} Q ${cx} ${cy - H * 0.95} ${cx + W * 0.85} ${cy - H * 0.4} L ${cx + W * 0.4} ${cy - H * 0.55} Q ${cx} ${cy - H * 0.78} ${cx - W * 0.4} ${cy - H * 0.55} Z`;
}
function sub(a, b) { return [a[0] - b[0], a[1] - b[1]]; }
function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
function scl(a, k) { return [a[0] * k, a[1] * k]; }
function norm(a) { const m = Math.hypot(a[0], a[1]) || 1; return [a[0] / m, a[1] / m]; }

// ── Rank icons (filled neon, animated) ────────────────────────
function RankIcon({ name, color, size = 48 }) {
  const c = color;
  const common = { width: size, height: size, viewBox: '0 0 48 48', fill: 'none', stroke: c, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' };

  const paths = {
    // Guest: silhouette of a person walking with a staff
    guest: <>
      <circle className="rk-anim-head" cx="24" cy="11" r="4" fill={c} fillOpacity="0.3" />
      <circle className="rk-anim-head" cx="24" cy="11" r="4" />
      <g className="rk-anim-walk">
        <path d="M24 16 V28 M24 28 L17 38 M24 28 L31 38" />
        <path d="M24 22 L15 24 M24 22 L33 20" />
      </g>
    </>,
    // Book open: student of knowledge — pages flip
    'book-open': <>
      <path d="M8 14 H22 Q24 14 24 16 V40 Q24 38 22 38 H8 Z" fill={c} fillOpacity="0.18" />
      <path d="M40 14 H26 Q24 14 24 16 V40 Q24 38 26 38 H40 Z" fill={c} fillOpacity="0.18" />
      <path d="M8 14 H22 Q24 14 24 16 V40 Q24 38 22 38 H8 Z" />
      <path d="M40 14 H26 Q24 14 24 16 V40 Q24 38 26 38 H40 Z" />
      <g className="rk-anim-pages">
        <line x1="12" y1="20" x2="20" y2="20" strokeOpacity="0.7" strokeWidth="2" />
        <line x1="12" y1="26" x2="20" y2="26" strokeOpacity="0.7" strokeWidth="2" />
        <line x1="28" y1="20" x2="36" y2="20" strokeOpacity="0.7" strokeWidth="2" />
        <line x1="28" y1="26" x2="36" y2="26" strokeOpacity="0.7" strokeWidth="2" />
      </g>
    </>,
    // Star: twinkle + spin
    star: <g className="rk-anim-spin">
      <path d="M24 6 L29.5 18.5 L43 20 L33 29 L36 42 L24 35 L12 42 L15 29 L5 20 L18.5 18.5 Z" fill={c} fillOpacity="0.35" />
      <path d="M24 6 L29.5 18.5 L43 20 L33 29 L36 42 L24 35 L12 42 L15 29 L5 20 L18.5 18.5 Z" />
    </g>,
    // Turban: gentle breathe/hover
    turban: <g className="rk-anim-float">
      <path d="M10 30 Q10 14 24 14 Q38 14 38 30 Z" fill={c} fillOpacity="0.25" />
      <path d="M10 30 Q10 14 24 14 Q38 14 38 30 Z" />
      <path d="M10 30 Q10 24 24 22 Q38 24 38 30" />
      <rect x="8" y="30" width="32" height="6" rx="2" fill={c} fillOpacity="0.4" />
      <rect x="8" y="30" width="32" height="6" rx="2" />
      <circle cx="24" cy="20" r="2" fill={c} className="rk-anim-pulse" />
      <path d="M16 36 Q16 42 24 42 Q32 42 32 36" strokeOpacity="0.5" />
    </g>,
    // Crown: ultimate — sparkles dance + jewels pulse
    crown: <>
      <path d="M6 32 L10 14 L18 24 L24 10 L30 24 L38 14 L42 32 Z" fill={c} fillOpacity="0.3" />
      <path d="M6 32 L10 14 L18 24 L24 10 L30 24 L38 14 L42 32 Z" />
      <rect x="6" y="32" width="36" height="6" rx="2" fill={c} fillOpacity="0.5" />
      <rect x="6" y="32" width="36" height="6" rx="2" />
      <circle cx="10" cy="14" r="2.2" fill={c} className="rk-anim-jewel-1" />
      <circle cx="24" cy="10" r="2.4" fill={c} className="rk-anim-jewel-2" />
      <circle cx="38" cy="14" r="2.2" fill={c} className="rk-anim-jewel-3" />
      <path d="M24 18 L25 20 L27 21 L25 22 L24 24 L23 22 L21 21 L23 20 Z"
        fill={c} fillOpacity="0.8" stroke="none" className="rk-anim-sparkle" />
    </>,
  };
  return (
    <>
      <RankIconStyles />
      <svg {...common}>{paths[name] || paths.star}</svg>
    </>
  );
}

// Inject keyframes once
let _rankStylesInjected = false;
function RankIconStyles() {
  if (typeof document !== 'undefined' && !_rankStylesInjected && !document.getElementById('rk-anim-styles')) {
    const s = document.createElement('style');
    s.id = 'rk-anim-styles';
    s.textContent = `
      /* Guest: walking sway */
      @keyframes rk-walk {
        0%, 100% { transform: rotate(-4deg); }
        50%      { transform: rotate(4deg); }
      }
      @keyframes rk-head-bob {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-1.4px); }
      }
      .rk-anim-walk { transform-origin: 24px 22px; animation: rk-walk 1.4s ease-in-out infinite; }
      .rk-anim-head { transform-origin: 24px 11px; animation: rk-head-bob 1.4s ease-in-out infinite; }

      /* Book: page lines fading sequentially */
      @keyframes rk-page-l1 { 0%, 70%, 100% { opacity: 0.3; } 35% { opacity: 1; } }
      @keyframes rk-page-l2 { 0%, 80%, 100% { opacity: 0.3; } 45% { opacity: 1; } }
      .rk-anim-pages line:nth-child(1) { animation: rk-page-l1 2.4s ease-in-out infinite; }
      .rk-anim-pages line:nth-child(2) { animation: rk-page-l2 2.4s ease-in-out infinite 0.2s; }
      .rk-anim-pages line:nth-child(3) { animation: rk-page-l1 2.4s ease-in-out infinite 0.4s; }
      .rk-anim-pages line:nth-child(4) { animation: rk-page-l2 2.4s ease-in-out infinite 0.6s; }

      /* Star: gentle rotation */
      @keyframes rk-spin {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50%      { transform: rotate(12deg) scale(1.06); }
      }
      .rk-anim-spin { transform-origin: 24px 24px; animation: rk-spin 3.2s ease-in-out infinite; }

      /* Turban: breathing float */
      @keyframes rk-float {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-1.5px); }
      }
      .rk-anim-float { transform-origin: 24px 24px; animation: rk-float 2.4s ease-in-out infinite; }
      @keyframes rk-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%      { transform: scale(1.4); opacity: 0.7; }
      }
      .rk-anim-pulse { transform-origin: 24px 20px; animation: rk-pulse 1.6s ease-in-out infinite; }

      /* Crown: jewels twinkle + sparkle rotate */
      @keyframes rk-jewel { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
      .rk-anim-jewel-1 { animation: rk-jewel 1.8s ease-in-out infinite; }
      .rk-anim-jewel-2 { animation: rk-jewel 1.8s ease-in-out infinite 0.4s; }
      .rk-anim-jewel-3 { animation: rk-jewel 1.8s ease-in-out infinite 0.8s; }
      @keyframes rk-sparkle {
        0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
        50%      { transform: scale(1.3) rotate(45deg); opacity: 1; }
      }
      .rk-anim-sparkle { transform-origin: 24px 22px; animation: rk-sparkle 2s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .rk-anim-walk, .rk-anim-head, .rk-anim-pages line, .rk-anim-spin,
        .rk-anim-float, .rk-anim-pulse, .rk-anim-jewel-1, .rk-anim-jewel-2,
        .rk-anim-jewel-3, .rk-anim-sparkle { animation: none !important; }
      }
    `;
    document.head.appendChild(s);
    _rankStylesInjected = true;
  }
  return null;
}

window.MyProgress = MyProgress;
window.RANKS = RANKS;
window.HexBadge = HexBadge;
window.RankIcon = RankIcon;
