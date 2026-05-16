/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// LandingV2 — Clean / Minimalist style (Untitled-UI inspired)
// 4-column grid · centered colored icons · works in dark + light
// ───────────────────────────────────────────────────────────────

function LandingV2({ t, lang = 'uz' }) {
  const L = (uz, cy, ru) => lang === 'ru' ? ru : lang === 'cy' ? cy : uz;

  const sections = [
    { key: 'real20', icon: 'play', color: '#3b82f6', title: L('Real imtihon · 20', 'Реал имтиҳон · 20', 'Реальный · 20'), count: '234' },
    { key: 'real50', icon: 'target', color: '#8b5cf6', title: L('Real imtihon · 50', 'Реал имтиҳон · 50', 'Реальный · 50'), count: '127' },
    { key: 'tickets', icon: 'ticket', color: '#f97316', title: L('Imtihon biletlari', 'Имтиҳон билетлари', 'Билеты'), count: '62' },
    { key: 'topics', icon: 'layers', color: '#10b981', title: L('Mavzulashtirilgan', 'Мавзулаштирилган', 'Тематические'), count: '18' },
    { key: 'topic-exam', icon: 'flag', color: '#ec4899', title: L('Mavzu boʻyicha', 'Мавзу бўйича', 'Экзамен по теме'), count: '18' },
    { key: 'popular-mistakes', icon: 'flame', color: '#ef4444', title: L('Ommabop xatoliklar', 'Оммабоп хатоликлар', 'Частые ошибки'), count: '50' },
    { key: 'my-mistakes', icon: 'alert', color: '#f59e0b', title: L("Mening xatolarim", 'Менинг хатоларим', 'Мои ошибки'), count: '47' },
    { key: 'saved', icon: 'bookmark', color: '#06b6d4', title: L('Saqlangan savollar', 'Сақланган саволлар', 'Сохранённые'), count: '23' },
  ];

  return (
    <div data-screen-label="Landing v2 — Clean" style={{ width: 1280, minHeight: 900, fontFamily: 'var(--font-body)' }}>
      <style>{`
        [data-theme="light"] .v2-root { --v2-bg: #ffffff; --v2-fg: #0f172a; --v2-fg-2: #475569; --v2-fg-3: #94a3b8; --v2-card: #ffffff; --v2-card-hover: #f8fafc; --v2-line: #e2e8f0; --v2-line-2: #cbd5e1; --v2-input: #ffffff; --v2-grid-dot: rgba(15,23,42,.06); --v2-pill: #f1f5f9; --v2-pill-fg: #475569; }
        [data-theme="dark"] .v2-root,
        .v2-root { --v2-bg: #0f172a; --v2-fg: #f1f5f9; --v2-fg-2: #94a3b8; --v2-fg-3: #64748b; --v2-card: #1e293b; --v2-card-hover: #263449; --v2-line: #334155; --v2-line-2: #475569; --v2-input: #1e293b; --v2-grid-dot: rgba(241,245,249,.06); --v2-pill: #334155; --v2-pill-fg: #cbd5e1; }
        [data-theme="light"] .v2-root { --v2-bg: #ffffff; --v2-fg: #0f172a; --v2-fg-2: #475569; --v2-fg-3: #94a3b8; --v2-card: #ffffff; --v2-card-hover: #f8fafc; --v2-line: #e2e8f0; --v2-line-2: #cbd5e1; --v2-input: #ffffff; --v2-grid-dot: rgba(15,23,42,.06); --v2-pill: #f1f5f9; --v2-pill-fg: #475569; }
        .v2-card { background: var(--v2-card); border: 1px solid var(--v2-line); border-radius: 14px; padding: 28px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; cursor: pointer; transition: all .15s ease; text-align: center; }
        .v2-card:hover { transform: translateY(-2px); border-color: var(--v2-line-2); box-shadow: 0 8px 24px rgba(15,23,42,.08); background: var(--v2-card-hover); }
        .v2-icon-tile { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .v2-pill { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 999px; background: var(--v2-pill); color: var(--v2-pill-fg); font-size: 11px; font-weight: 600; font-family: var(--font-mono); }
      `}</style>

      <div className="v2-root" style={{ minHeight: 900, display: 'flex', flexDirection: 'column', background: 'var(--v2-bg)', color: 'var(--v2-fg)' }}>

        {/* ── Top Nav ────────────────────────────────────────── */}
        <header style={{
          padding: '18px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--v2-line)', background: 'var(--v2-bg)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 13 L3 11 Q3 9 5 9 L7 9 L9 5 L13 5 L15 9 L16 9 Q17 9 17 11 L17 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="6" cy="13" r="1.5" fill="#fff" />
                <circle cx="14" cy="13" r="1.5" fill="#fff" />
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--v2-fg)', letterSpacing: '-0.01em' }}>
              avtoimtihon<span style={{ color: '#3b82f6' }}>.uz</span>
            </span>
          </div>

          <nav style={{ display: 'flex', gap: 28 }}>
            {[
              L('Bosh sahifa', 'Бош саҳифа', 'Главная'),
              L('Biz haqimizda', 'Биз ҳақимизда', 'О нас'),
              L('Aloqa', 'Алоқа', 'Контакты'),
              L('Bilish foydali', 'Билиш фойдали', 'Полезно знать'),
              L("Video qoʻllanma", 'Видео қўлланма', 'Видеоуроки'),
            ].map((item, i) => (
              <a key={i} style={{ color: i === 0 ? 'var(--v2-fg)' : 'var(--v2-fg-2)', fontSize: 14, fontWeight: i === 0 ? 600 : 500, textDecoration: 'none', cursor: 'pointer' }}>
                {item}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Lang dropdown */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', borderRadius: 8,
              background: 'var(--v2-input)', border: '1px solid var(--v2-line)',
              color: 'var(--v2-fg)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>
              <span style={{ fontSize: 14 }}>🇺🇿</span>
              {L("O'zbek", 'Ўзбек', 'Русский')}
              <span style={{ fontSize: 9, color: 'var(--v2-fg-3)' }}>▾</span>
            </button>

            <ThemeToggleV2 />

            <button style={{
              padding: '9px 18px', borderRadius: 8,
              background: '#3b82f6', color: '#fff',
              border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(59,130,246,.3)',
            }}>{L('Kirish', 'Кириш', 'Войти')}</button>
          </div>
        </header>

        {/* ── Body with subtle grid background ────────────── */}
        <div style={{
          flex: 1, padding: '32px 64px 64px',
          backgroundImage: 'radial-gradient(var(--v2-grid-dot) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--v2-fg-2)', marginBottom: 14 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26, borderRadius: 6, border: '1px solid var(--v2-line)',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12 L12 4 L21 12 V20 H14 V14 H10 V20 H3 Z" />
              </svg>
            </span>
            <span style={{ color: 'var(--v2-fg-3)' }}>/</span>
            <span>{L("Boʻlimlar", 'Бўлимлар', 'Разделы')}</span>
          </div>

          {/* Title row */}
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)',
            fontSize: 36, fontWeight: 600, letterSpacing: '-0.025em',
            color: 'var(--v2-fg)', lineHeight: 1.1,
          }}>
            {L("Boʻlimlar", 'Бўлимлар', 'Разделы')}
          </h1>

          {/* Sub + search */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 28 }}>
            <div style={{ fontSize: 14, color: 'var(--v2-fg-2)' }}>
              {L('Jami:', 'Жами:', 'Всего:')} <span style={{ color: 'var(--v2-fg)', fontWeight: 600 }}>1 245</span> {L("savol", 'савол', 'вопросов')}
              <span style={{ color: 'var(--v2-fg-3)', margin: '0 8px' }}>·</span>
              <span>{L('Bugun yechildi:', 'Бугун ечилди:', 'Сегодня решено:')} <span style={{ color: '#3b82f6', fontWeight: 600 }}>234</span></span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', minWidth: 280,
              background: 'var(--v2-input)', border: '1px solid var(--v2-line)', borderRadius: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--v2-fg-3)" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" />
              </svg>
              <input placeholder={L('Qidirish', 'Қидириш', 'Поиск')} style={{
                background: 'transparent', border: 'none', outline: 'none', flex: 1,
                color: 'var(--v2-fg)', fontSize: 13, fontFamily: 'var(--font-body)',
              }} />
              <kbd style={{
                padding: '2px 6px', fontSize: 10, fontFamily: 'var(--font-mono)',
                color: 'var(--v2-fg-3)', background: 'var(--v2-pill)',
                borderRadius: 4, border: '1px solid var(--v2-line)',
              }}>⌘K</kbd>
            </div>
          </div>

          {/* ── 4-column grid ─────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {sections.map((s) => (
              <div key={s.key} className="v2-card">
                <div className="v2-icon-tile" style={{
                  background: s.color + '1a',  /* 10% tint */
                }}>
                  <V2Icon name={s.icon} color={s.color} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--v2-fg)' }}>{s.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--v2-fg-2)' }}>
                  {L("Savollar soni:", 'Саволлар сони:', 'Кол-во:')}
                  <span className="v2-pill">{s.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Footer-style stat row ────────────────────── */}
          <div style={{
            marginTop: 36, padding: '20px 24px', borderRadius: 12,
            background: 'var(--v2-card)', border: '1px solid var(--v2-line)',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          }}>
            {[
              { v: '12', u: L('kunlik streak', 'кунлик streak', 'дней streak'), c: '#f97316' },
              { v: '1 250', u: 'XP', c: '#3b82f6' },
              { v: '47', u: L('xato', 'хато', 'ошибок'), c: '#ef4444' },
              { v: 'PRO', u: L('· 14 kun qoldi', '· 14 кун қолди', '· 14 дн осталось'), c: '#10b981' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 4,
                borderLeft: i ? '1px solid var(--v2-line)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: s.c, letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 12, color: 'var(--v2-fg-2)' }}>{s.u}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Filled colored icons ─────────────────────────────────────
function V2Icon({ name, color }) {
  const c = color, w = 24, sw = 2;
  const common = { width: w, height: w, viewBox: '0 0 24 24', fill: 'none', stroke: c, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    play: <><polygon points="6,4 20,12 6,20" fill={c} fillOpacity="0.18" /><polygon points="6,4 20,12 6,20" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.8" fill={c} /></>,
    layers: <><path d="M12 3 L21 8 L12 13 L3 8 Z" fill={c} fillOpacity="0.15" /><path d="M12 3 L21 8 L12 13 L3 8 Z" /><path d="M3 13 L12 18 L21 13" /><path d="M3 17 L12 22 L21 17" opacity="0.6" /></>,
    flag: <><path d="M5 21 V4" /><path d="M5 4 H17 L14 8 L17 12 H5" fill={c} fillOpacity="0.15" /><path d="M5 4 H17 L14 8 L17 12 H5" /></>,
    ticket: <><path d="M3 8 V6 H21 V8 A2 2 0 0 0 21 12 V14 A2 2 0 0 0 21 18 V20 H3 V18 A2 2 0 0 0 3 14 V12 A2 2 0 0 0 3 8 Z" fill={c} fillOpacity="0.12" /><path d="M3 8 V6 H21 V8 A2 2 0 0 0 21 12 V14 A2 2 0 0 0 21 18 V20 H3 V18 A2 2 0 0 0 3 14 V12 A2 2 0 0 0 3 8 Z" /><path d="M14 6 V20" strokeDasharray="2 2" /></>,
    flame: <><path d="M12 22 C7 22 5 18 5 15 C5 12 8 11 9 8 C9 6 8 4 9 3 C11 5 13 6 14 9 C15 7 16 6 17 6 C16 9 19 11 19 15 C19 18 17 22 12 22 Z" fill={c} fillOpacity="0.18" /><path d="M12 22 C7 22 5 18 5 15 C5 12 8 11 9 8 C9 6 8 4 9 3 C11 5 13 6 14 9 C15 7 16 6 17 6 C16 9 19 11 19 15 C19 18 17 22 12 22 Z" /></>,
    alert: <><path d="M12 3 L22 20 H2 Z" fill={c} fillOpacity="0.15" /><path d="M12 3 L22 20 H2 Z" /><path d="M12 10 V14" /><circle cx="12" cy="17" r="0.8" fill={c} /></>,
    bookmark: <><path d="M6 3 H18 V21 L12 17 L6 21 Z" fill={c} fillOpacity="0.18" /><path d="M6 3 H18 V21 L12 17 L6 21 Z" /></>,
  };
  return <svg {...common}>{paths[name] || paths.target}</svg>;
}

// Theme toggle for v2 (sun/moon)
function ThemeToggleV2() {
  const getTheme = () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'dark';
  const [theme, setT] = React.useState(getTheme());
  React.useEffect(() => {
    const obs = new MutationObserver(() => setT(getTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setT(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: next } }, '*'); } catch (e) {}
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{
      width: 36, height: 36, borderRadius: 8,
      background: 'var(--v2-input)', border: '1px solid var(--v2-line)',
      color: 'var(--v2-fg)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}

window.LandingV2 = LandingV2;
