/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// Mobile screens — iOS frame versions
// ───────────────────────────────────────────────────────────────

function MobileLanding({ t, lang }) {
  return (
    <IOSDevice>
      <div style={{ background: 'var(--bg-0)', color: 'var(--fg-0)', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo small />
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--fg-1)' }}>≡</div>
        </div>

        <div style={{ padding: '12px 20px 20px', flex: 1, overflow: 'auto' }}>
          <div className="bento dotgrid" style={{
            padding: 24, marginBottom: 14,
            background: 'radial-gradient(80% 100% at 100% 0%, color-mix(in oklch, var(--accent) 25%, transparent), transparent 60%), var(--bg-1)',
          }}>
            <div className="overline" style={{ fontSize: 9, marginBottom: 12 }}>● {lang === 'ru' ? 'УЗБЕКИСТАН' : "O'ZBEKISTON"}</div>
            <h1 className="h-display" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em', marginBottom: 12 }}>
              {t.hero.title[0]}<br />
              <span style={{ color: 'var(--accent)' }}>{t.hero.title[1]}</span>
            </h1>
            <p style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5, margin: '0 0 18px 0' }}>{t.hero.sub}</p>
            <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}>{t.hero.ctaPrimary} →</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {t.stats.slice(0, 2).map((s, i) => (
              <div key={i} className="bento" style={{ padding: 16 }}>
                <div className="h-display" style={{ fontSize: 22, fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--fg-0)' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="bento bento--accent" style={{ padding: 18, marginBottom: 14 }}>
            <div className="overline" style={{ fontSize: 9, marginBottom: 6 }}>{t.features.sim.tag}</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{t.features.sim.name}</div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--fg-1)', lineHeight: 1.5 }}>{t.features.sim.text}</p>
          </div>

          <div className="bento" style={{ padding: 18 }}>
            <div className="overline" style={{ fontSize: 9, marginBottom: 10 }}>{t.features.signs.tag}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {['warning-curve', 'prohibit-no-entry', 'mandatory-roundabout', 'priority-stop'].map(k => (
                <div key={k} style={{ display: 'flex', justifyContent: 'center' }}>
                  <RoadSign kind={k} size={48} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ borderTop: '1px solid var(--line)', padding: '10px 20px 22px', display: 'flex', justifyContent: 'space-around', background: 'var(--bg-1)' }}>
          {[
            { i: '🏠', l: 'Bosh' },
            { i: '📋', l: t.nav.tests },
            { i: '🚧', l: t.nav.signs },
            { i: '📊', l: t.nav.stats },
            { i: '👤', l: 'Profil' },
          ].map((n, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: i === 0 ? 'var(--accent)' : 'var(--fg-2)' }}>
              <span style={{ fontSize: 18 }}>{n.i}</span>
              <span style={{ fontSize: 9, fontWeight: 500 }}>{n.l}</span>
            </div>
          ))}
        </div>
      </div>
    </IOSDevice>
  );
}

function MobileQuiz({ t, lang }) {
  const q = { sign: 'priority-main', text: lang === 'ru' ? 'Что означает этот знак?' : "Bu yo'l belgisi nimani bildiradi?" };
  const opts = lang === 'ru'
    ? ['Главная дорога', 'Уступить встречным', 'Остановка запрещена', 'Пешеходный переход']
    : ["Asosiy yo'lning ustunligi", 'Qarama-qarshi harakat', "To'xtash taqiqlangan", "Piyodalar o'tish joyi"];

  return (
    <IOSDevice>
      <div style={{ background: 'var(--bg-0)', color: 'var(--fg-0)', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontSize: 16 }}>←</span>
          <span className="overline" style={{ fontSize: 10 }}>{lang === 'ru' ? 'ПДД' : 'YHQ'}</span>
          <span className="chip mono" style={{ fontSize: 11, padding: '4px 8px' }}>12/40</span>
        </div>

        {/* Progress + timer */}
        <div style={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>30%</span>
            <span className="chip" style={{ fontSize: 11, padding: '3px 8px' }}>⏱ 24:30</span>
          </div>
          <div className="progress" style={{ height: 4 }}><span style={{ width: '30%' }}></span></div>
        </div>

        {/* Question */}
        <div style={{ padding: '8px 16px', flex: 1, overflow: 'auto' }}>
          <div className="overline" style={{ fontSize: 9, marginBottom: 4 }}>SAVOL #12</div>
          <h2 style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3, margin: '0 0 16px 0', fontFamily: 'var(--font-display)' }}>{q.text}</h2>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0', marginBottom: 16, background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line)' }}>
            <RoadSign kind={q.sign} size={110} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {opts.map((o, i) => {
              const correct = i === 0;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12,
                  border: '1px solid ' + (correct ? 'var(--success)' : 'var(--line)'),
                  background: correct ? 'color-mix(in oklch, var(--success) 14%, var(--bg-1))' : 'var(--bg-1)',
                  fontSize: 13,
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: correct ? 'var(--success)' : 'var(--bg-3)',
                    color: correct ? '#0a1212' : 'var(--fg-1)',
                    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{correct ? '✓' : ['A', 'B', 'C', 'D'][i]}</div>
                  <span>{o}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer button */}
        <div style={{ padding: '12px 16px 22px', borderTop: '1px solid var(--line)' }}>
          <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>{t.quiz.next} →</button>
        </div>
      </div>
    </IOSDevice>
  );
}

window.MobileLanding = MobileLanding;
window.MobileQuiz = MobileQuiz;
