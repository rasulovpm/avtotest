/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// MyProgressWeb — Daraja tizimi (desktop / web)
// 5 hexagonal ranks · same icons · web layout (1280px)
// ───────────────────────────────────────────────────────────────

function MyProgressWeb({ activeIdx = 1, progressPct = 21 }) {
  const [idx, setIdx] = React.useState(activeIdx);
  const ranks = window.RANKS;
  const rank = ranks[idx];

  const parseRange = (r) => {
    const m = r.match(/(\d+)%\s*[–-]\s*(\d+)/);
    return m ? [parseInt(m[1]), parseInt(m[2])] : [0, 100];
  };
  const [lo, hi] = parseRange(rank.range);
  const inRankPct = idx === activeIdx
    ? Math.max(0, Math.min(100, ((progressPct - lo) / (hi - lo)) * 100))
    : (idx < activeIdx ? 100 : 0);

  // Stats for the right panel
  const stats = [
    { l: 'Joriy oʻzlashtirish', v: progressPct + '%', c: '#22d3ee' },
    { l: "Toʻgʻri javoblar", v: '260', c: '#22c55e' },
    { l: 'Xato javoblar', v: '57', c: '#ef4444' },
    { l: 'Qolgan savollar', v: '903', c: '#94a3b8' },
  ];

  return (
    <div data-screen-label="My Progress · Web" style={{
      width: 1280, minHeight: 820, background: '#0b1220', color: '#fff',
      display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)',
    }}>
      {/* ── Top toolbar (matches Quiz / LandingV3) ─────────── */}
      <header style={{
        padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 14,
        background: '#0b1220', borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <button style={{
          padding: '8px 14px', borderRadius: 10,
          border: '1px solid rgba(80,140,220,0.35)', background: 'rgba(30,70,150,0.18)',
          color: '#a8c8ff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
        }}>← Orqaga</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}></div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>avtoimtihon.uz</div>
        </div>

        <div style={{ marginLeft: 12, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
          / <span style={{ color: '#fff', fontWeight: 600, marginLeft: 6 }}>Mening progressim</span>
        </div>

        {/* Profile right */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            padding: '8px 12px', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-mono)',
            border: '1px solid rgba(34,211,238,0.4)', background: 'rgba(34,211,238,0.10)', color: '#67e8f9',
          }}>📖 TOLIBI ILM · 21%</div>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(34,211,238,0.18)', border: '1.5px solid rgba(34,211,238,0.5)',
            color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 14,
          }}>K</div>
        </div>
      </header>

      {/* ── Banner (matches Quiz question banner) ─────────── */}
      <div style={{
        padding: '24px 32px',
        background: 'linear-gradient(180deg, #0e2447, #0c1d3b)',
        borderBottom: '1px solid rgba(80,140,220,0.18)',
      }}>
        <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: '#a8c8ff', marginBottom: 6 }}>
          ● DARAJA TIZIMI · 5 BOSQICH
        </div>
        <h1 style={{
          margin: 0, fontSize: 28, fontWeight: 600, color: '#fff', lineHeight: 1.25,
          letterSpacing: '-0.01em', fontFamily: 'var(--font-display)',
        }}>
          Mening progressim — bilim yoʻlingizdagi bosqichlar
        </h1>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
          Joriy daraja: <span style={{ color: rank.textColor, fontWeight: 600 }}>{rank.name}</span> · joriy oʻzlashtirish: <span style={{ color: '#fff', fontWeight: 600 }}>{progressPct}%</span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: 24, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>

        {/* LEFT — featured rank + 5-rank ladder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Featured rank card */}
          <div style={{
            padding: '32px 24px', borderRadius: 16,
            background: `radial-gradient(80% 100% at 50% 0%, ${rank.fill} 0%, transparent 70%), #1a2538`,
            border: '1px solid ' + rank.fill.replace('0.20', '0.35'),
            display: 'flex', alignItems: 'center', gap: 36,
            minHeight: 280,
          }}>
            {/* Hexagon badge */}
            <div style={{ flexShrink: 0 }}>
              <HexBadge rank={rank} />
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: rank.textColor, marginBottom: 8 }}>
                {idx === activeIdx ? '● HOZIRGI DARAJA' : (idx < activeIdx ? '✓ OʻTILGAN' : 'KEYINGI DARAJA')}
              </div>
              <h2 style={{ margin: 0, fontSize: 38, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
                {rank.name}
              </h2>
              <div style={{ marginTop: 6, fontSize: 16, color: rank.textColor, fontWeight: 500 }}>{rank.sub}</div>

              {/* Range info row */}
              <div style={{ marginTop: 22, display: 'flex', gap: 12 }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>DIAPAZON</div>
                  <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>{rank.range}</div>
                </div>
                <div style={{
                  padding: '10px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)' }}>BOSQICH</div>
                  <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>{idx + 1} / {ranks.length}</div>
                </div>
              </div>

              {/* In-rank progress bar */}
              <div style={{ marginTop: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
                  <span>Ushbu bosqichdagi oʻrningiz</span>
                  <span style={{ color: rank.textColor, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{Math.round(inRankPct)}%</span>
                </div>
                <div style={{ height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{
                    width: inRankPct + '%', height: '100%',
                    background: `linear-gradient(90deg, ${rank.color}, ${rank.textColor})`,
                    boxShadow: `0 0 16px ${rank.glow}`,
                    borderRadius: 999, transition: 'width .4s',
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-rank ladder — clickable */}
          <div style={{
            padding: 18, borderRadius: 14,
            background: '#1a2538', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
              BARCHA DARAJALAR
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, position: 'relative' }}>
              {/* connector line */}
              <div style={{
                position: 'absolute', top: 36, left: '10%', right: '10%', height: 2,
                background: 'rgba(255,255,255,0.08)', zIndex: 0,
              }}></div>
              <div style={{
                position: 'absolute', top: 36, left: '10%',
                width: `calc(${(activeIdx / (ranks.length - 1)) * 80}%)`, height: 2,
                background: `linear-gradient(90deg, ${ranks[0].color}, ${ranks[activeIdx].color})`,
                boxShadow: `0 0 8px ${ranks[activeIdx].glow}`,
                zIndex: 1, transition: 'width .4s',
              }}></div>

              {ranks.map((r, i) => {
                const isActive = i === activeIdx;
                const isPast = i < activeIdx;
                const isSel = i === idx;
                const stateColor = isPast || isActive ? r.color : 'rgba(255,255,255,0.2)';
                return (
                  <button key={r.key} onClick={() => setIdx(i)} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    padding: '8px 4px', borderRadius: 10,
                    background: isSel ? 'rgba(255,255,255,0.04)' : 'transparent',
                    border: '1px solid ' + (isSel ? 'rgba(255,255,255,0.15)' : 'transparent'),
                    cursor: 'pointer', font: 'inherit', color: 'inherit', position: 'relative', zIndex: 2,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: isPast || isActive ? r.color : '#1a2538',
                      border: '2px solid ' + stateColor,
                      boxShadow: isPast || isActive ? `0 0 12px ${r.glow}` : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#0b1220', fontWeight: 800, fontSize: 12, fontFamily: 'var(--font-mono)',
                    }}>{isPast ? '✓' : i + 1}</div>
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: isPast || isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    }}>{r.name}</div>
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: r.textColor }}>{r.range}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — stats + next steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Stats card */}
          <div style={{
            padding: 18, borderRadius: 14,
            background: '#1a2538', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
              UMUMIY KOʻRSATKICHLAR
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  padding: '12px 14px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: s.c, letterSpacing: '-0.01em' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam countdown */}
          <div style={{
            padding: 18, borderRadius: 14,
            background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.35)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: '#fcd34d' }}>
                IMTIHONGACHA
              </div>
              <button style={{ background: 'none', border: 'none', color: '#fcd34d', fontSize: 12, cursor: 'pointer' }}>✎</button>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#fcd34d', letterSpacing: '-0.02em' }}>9 kun</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>25 may 2026 · seshanba</div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button style={{
              padding: '14px 18px', borderRadius: 12,
              background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)',
              color: '#86efac', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              textAlign: 'left',
            }}>Qachon imtihonga borsam boʻladi? →</button>
            <button style={{
              padding: '14px 18px', borderRadius: 12,
              background: '#3b82f6', border: '1px solid #60a5fa',
              color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
            }}>▶ Real imtihonni boshlash</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.MyProgressWeb = MyProgressWeb;
