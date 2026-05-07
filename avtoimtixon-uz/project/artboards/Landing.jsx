/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// Landing page artboard — full Bento layout
// ───────────────────────────────────────────────────────────────

function Landing({ t, accent }) {
  const { hero, stats, features, nav } = t;

  return (
    <div style={{ width: 1280, background: 'var(--bg-0)', color: 'var(--fg-0)', fontFamily: 'var(--font-body)' }}>
      {/* ── Header ──────────────────────────────────────── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--line)',
        background: 'color-mix(in oklch, var(--bg-0) 70%, transparent)',
        backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Logo accent={accent} />
          <nav style={{ display: 'flex', gap: 28 }}>
            {[nav.tests, nav.signs, nav.stats, nav.pricing].map((x, i) =>
            <a key={i} style={{ color: 'var(--fg-1)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>{x}</a>
            )}
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn btn--ghost" style={{ fontSize: 14, padding: '10px 18px' }}>Registratsiya</button>
          <button className="btn btn--primary" style={{ fontSize: 14, padding: '10px 20px' }}>Kirish →</button>
        </div>
      </header>

      {/* ── Hero (full-bleed bento) ─────────────────────── */}
      <section style={{ padding: '48px 48px 24px' }}>
        <div className="bento dotgrid" style={{
          padding: '64px 64px 56px',
          borderRadius: 28,
          background: `
            radial-gradient(80% 100% at 100% 0%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 60%),
            radial-gradient(60% 80% at 0% 100%, color-mix(in oklch, var(--accent-2) 16%, transparent), transparent 65%),
            var(--bg-1)`,
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 48 }}>
            <div style={{ flex: 1.2 }}>
              <div className="overline" style={{ marginBottom: 24 }}>● {hero.eyebrow}</div>
              <h1 className="h-display h1" style={{ margin: 0, marginBottom: 24 }}>
                {hero.title[0]}<br />
                <span style={{ color: 'var(--accent)' }}>{hero.title[1]}</span><br />
                {hero.title[2]}
              </h1>
              <p style={{ fontSize: 19, color: 'var(--fg-1)', maxWidth: 540, lineHeight: 1.5, marginBottom: 32 }}>
                {hero.sub}
              </p>
              <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
                <button className="btn btn--primary">{hero.ctaPrimary} →</button>
                <button className="btn btn--ghost">▷ {hero.ctaSecondary}</button>
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {hero.proof.map((p, i) =>
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg-2)', fontSize: 13 }}>
                    <span style={{ color: 'var(--accent-2)', fontFamily: 'var(--font-mono)' }}>✓</span>{p}
                  </div>
                )}
              </div>
            </div>

            {/* Sample question card preview */}
            <div style={{ flex: 1, background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 20, padding: 24, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="chip chip--accent">LIVE PREVIEW</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>9 / 20 · 12:18</span>
              </div>
              <div className="progress" style={{ marginBottom: 20 }}><span style={{ width: '30%' }}></span></div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <RoadSign kind="priority-main" size={92} />
              </div>
              <div className="overline" style={{ marginBottom: 6 }}>SAVOL #12</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, lineHeight: 1.4 }}>
                Ushbu yo'l belgisi nimani bildiradi?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                { l: 'A', t: 'Asosiy yo\'lning ustunligi', state: 'correct' },
                { l: 'B', t: 'Qarama-qarshi harakat', state: 'idle' },
                { l: 'C', t: 'To\'xtash taqiqlangan', state: 'idle' },
                { l: 'D', t: 'Piyodalar o\'tish joyi', state: 'idle' }].
                map((o) =>
                <div key={o.l} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 12,
                  border: '1px solid ' + (o.state === 'correct' ? 'color-mix(in oklch, var(--success) 60%, transparent)' : 'var(--line)'),
                  background: o.state === 'correct' ? 'color-mix(in oklch, var(--success) 12%, transparent)' : 'transparent',
                  fontSize: 13
                }}>
                    <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: o.state === 'correct' ? 'var(--success)' : 'var(--bg-3)',
                    color: o.state === 'correct' ? '#0a1f0e' : 'var(--fg-1)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>{o.state === 'correct' ? '✓' : o.l}</div>
                    {o.t}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bento ─────────────────────────────────── */}
      <section style={{ padding: '24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {stats.map((s, i) =>
          <div key={i} className="bento" style={{ padding: 24 }}>
              <div className="overline" style={{ marginBottom: 12 }}>0{i + 1}</div>
              <div className="h-display" style={{
              fontSize: 44, fontWeight: 700,
              background: i === 0 ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : 'none',
              WebkitBackgroundClip: i === 0 ? 'text' : 'unset',
              WebkitTextFillColor: i === 0 ? 'transparent' : 'unset',
              marginBottom: 4, letterSpacing: '-0.03em'
            }}>{s.n}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-0)', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{s.sub}</div>
            </div>
          )}
        </div>
      </section>

      {/* ── Features Bento Grid ─────────────────────────── */}
      <section style={{ padding: '24px 48px 48px' }}>
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h2 className="h-display h2" style={{ margin: 0, maxWidth: 600 }}>{features.title}</h2>
          <div className="accent-line" style={{ flex: 1, marginLeft: 32, marginBottom: 12 }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: '200px', gap: 16 }}>
          {/* Sim — big */}
          <div className="bento bento--accent" style={{ gridColumn: 'span 4', gridRow: 'span 2', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="overline" style={{ marginBottom: 12 }}>{features.sim.tag}</div>
              <div className="h-display" style={{ fontSize: 40, fontWeight: 600, marginBottom: 12 }}>{features.sim.name}</div>
              <p style={{ color: 'var(--fg-1)', fontSize: 16, maxWidth: 460, lineHeight: 1.5 }}>{features.sim.text}</p>
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="chip chip--accent">⚡ 20 savol</span>
                <span className="chip chip--accent">⏱ 25 daq</span>
                <span className="chip chip--lime">✓ 18/20 o'tish</span>
              </div>
              {/* fake exam grid — 20 cells (real imtihon) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 18px)', gap: 6 }}>
                {Array.from({ length: 20 }).map((_, i) =>
                <div key={i} style={{ width: 18, height: 18, borderRadius: 4,
                  background: i < 8 ? (i === 3 ? 'var(--error)' : 'var(--success)') : i === 8 ? 'var(--accent)' : 'var(--bg-3)',
                  border: i === 8 ? '1.5px solid var(--accent)' : 'none' }} />
                )}
              </div>
            </div>
          </div>

          {/* Signs */}
          <div className="bento" style={{ gridColumn: 'span 2', gridRow: 'span 2', padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="overline" style={{ marginBottom: 12 }}>{features.signs.tag}</div>
              <div className="h-display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>{features.signs.name}</div>
              <p style={{ color: 'var(--fg-1)', fontSize: 14, lineHeight: 1.5 }}>{features.signs.text}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 12 }}>
              <RoadSign kind="warning-curve" size={64} />
              <RoadSign kind="prohibit-no-entry" size={64} />
              <RoadSign kind="mandatory-roundabout" size={64} />
              <RoadSign kind="prohibit-speed" size={64} />
              <RoadSign kind="priority-stop" size={64} />
              <RoadSign kind="info-parking" size={64} />
            </div>
          </div>

          {/* Stats analysis */}
          <div className="bento" style={{ gridColumn: 'span 3', gridRow: 'span 1', padding: 24 }}>
            <div className="overline" style={{ marginBottom: 10 }}>{features.stats.tag}</div>
            <div className="h-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>{features.stats.name}</div>
            <p style={{ color: 'var(--fg-1)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{features.stats.text}</p>
          </div>

          {/* Mobile */}
          <div className="bento bento--accent-2" style={{ gridColumn: 'span 3', gridRow: 'span 1', padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div className="overline" style={{ marginBottom: 10 }}>{features.mobile.tag}</div>
              <div className="h-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>{features.mobile.name}</div>
              <p style={{ color: 'var(--fg-1)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{features.mobile.text}</p>
            </div>
            <div style={{ width: 70, height: 100, borderRadius: 12, border: '2px solid var(--line-2)', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column', padding: 6, gap: 4, flexShrink: 0 }}>
              <div style={{ height: 4, background: 'var(--accent)', borderRadius: 2 }}></div>
              <div style={{ height: 6, background: 'var(--bg-2)', borderRadius: 2 }}></div>
              <div style={{ flex: 1, background: 'var(--bg-2)', borderRadius: 4 }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--fg-2)', fontSize: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo accent={accent} small />
          <span>© 2026 avtoimtihon.uz</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>Aloqa</span><span>Yordam</span><span>Foydalanish shartlari</span>
        </div>
      </footer>
    </div>);

}

function Logo({ accent, small = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: small ? 22 : 28, height: small ? 22 : 28,
        borderRadius: 8, background: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 16px color-mix(in oklch, var(--accent) 60%, transparent)'
      }}>
        <svg width={small ? 14 : 18} height={small ? 14 : 18} viewBox="0 0 20 20" fill="none">
          <path d="M3 13 L3 11 Q3 9 5 9 L7 9 L9 5 L13 5 L15 9 L16 9 Q17 9 17 11 L17 13" stroke="#0a1f24" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="6" cy="13" r="1.5" fill="#0a1f24" />
          <circle cx="14" cy="13" r="1.5" fill="#0a1f24" />
        </svg>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.02em', fontSize: small ? 14 : 17 }}>
        avtoimtihon<span style={{ color: 'var(--accent)' }}>.uz</span>
      </div>
    </div>);

}

window.Landing = Landing;
window.Logo = Logo;