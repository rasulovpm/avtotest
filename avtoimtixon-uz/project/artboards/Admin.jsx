/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// Admin panel — same dark+neon design language
// Sidebar layout · 1440px artboards
// Screens: Dashboard, Questions, Question editor, Users, Tickets, Topics
// ───────────────────────────────────────────────────────────────

const AdminSidebar = ({ active = 'dashboard' }) => {
  const items = [
    { k: 'dashboard', i: '◫', l: 'Dashboard' },
    { k: 'questions', i: '?', l: 'Savollar', count: 4862 },
    { k: 'tickets', i: '▤', l: 'Biletlar', count: 62 },
    { k: 'topics', i: '#', l: 'Mavzular', count: 18 },
    { k: 'signs', i: '△', l: "Yo'l belgilari", count: 247 },
    { k: 'users', i: '◉', l: 'Foydalanuvchilar', count: '12.4K' },
    { k: 'payments', i: '$', l: "To'lovlar" },
    { k: 'reports', i: '↗', l: 'Hisobotlar' },
  ];
  const bottom = [
    { k: 'settings', i: '⚙', l: 'Sozlamalar' },
    { k: 'logs', i: '≡', l: 'Loglar' },
  ];
  return (
    <aside style={{
      width: 240, flexShrink: 0, background: 'var(--bg-1)', borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column', padding: '20px 14px', gap: 4, height: '100%',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px 18px', borderBottom: '1px solid var(--line)', marginBottom: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--accent)', color: '#0a1f24', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)' }}>avtoimtihon.uz</div>
          <div className="overline" style={{ fontSize: 9, color: 'var(--fg-3)' }}>ADMIN PANEL</div>
        </div>
      </div>

      <div className="overline" style={{ fontSize: 9, padding: '4px 10px', color: 'var(--fg-3)', marginBottom: 4 }}>BOSHQARUV</div>
      {items.map(it => {
        const on = it.k === active;
        return (
          <button key={it.k} style={{
            all: 'unset', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, padding: '9px 10px', borderRadius: 8,
            background: on ? 'color-mix(in oklch, var(--accent) 14%, transparent)' : 'transparent',
            color: on ? 'var(--accent)' : 'var(--fg-1)', fontSize: 13, fontWeight: on ? 600 : 500,
          }}>
            <span style={{ width: 18, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, opacity: on ? 1 : 0.7 }}>{it.i}</span>
            <span style={{ flex: 1 }}>{it.l}</span>
            {it.count != null && (
              <span className="mono" style={{ fontSize: 10, color: on ? 'var(--accent)' : 'var(--fg-3)', background: on ? 'color-mix(in oklch, var(--accent) 16%, transparent)' : 'var(--bg-2)', padding: '2px 6px', borderRadius: 4 }}>{it.count}</span>
            )}
          </button>
        );
      })}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div className="overline" style={{ fontSize: 9, padding: '4px 10px', color: 'var(--fg-3)', marginBottom: 4 }}>TIZIM</div>
        {bottom.map(it => (
          <button key={it.k} style={{
            all: 'unset', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, padding: '9px 10px', borderRadius: 8,
            color: 'var(--fg-1)', fontSize: 13, fontWeight: 500,
          }}>
            <span style={{ width: 18, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, opacity: 0.7 }}>{it.i}</span>
            <span>{it.l}</span>
          </button>
        ))}
        {/* user card */}
        <div style={{ marginTop: 12, padding: 10, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#0a1f24', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>AB</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Akmal Boboyev</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>SUPER · ADMIN</div>
          </div>
          <span style={{ color: 'var(--fg-3)', fontSize: 14 }}>↓</span>
        </div>
      </div>
    </aside>
  );
};

const AdminTopBar = ({ title, sub, breadcrumbs = [], actions = null }) => (
  <header style={{
    padding: '20px 32px', borderBottom: '1px solid var(--line)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'var(--bg-0)',
  }}>
    <div>
      {breadcrumbs.length > 0 && (
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--fg-3)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              <span style={{ color: i === breadcrumbs.length - 1 ? 'var(--fg-1)' : 'var(--fg-3)' }}>{b}</span>
            </React.Fragment>
          ))}
        </div>
      )}
      <h1 className="h-display" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{title}</h1>
      {sub && <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4 }}>{sub}</div>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <input placeholder="Qidirish… (⌘K)" style={{
          background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 10,
          padding: '9px 14px 9px 34px', fontSize: 13, color: 'var(--fg-0)', width: 240,
          fontFamily: 'var(--font-body)',
        }} />
        <span style={{ position: 'absolute', left: 12, top: 9, color: 'var(--fg-3)', fontSize: 14 }}>⌕</span>
      </div>
      <button className="btn btn--ghost" style={{ padding: '9px 12px', fontSize: 13 }}>↻</button>
      <button className="btn btn--ghost" style={{ padding: '9px 12px', fontSize: 13, position: 'relative' }}>
        ⌖ <span style={{ position: 'absolute', top: 4, right: 6, width: 6, height: 6, borderRadius: '50%', background: 'var(--error)' }}></span>
      </button>
      {actions}
    </div>
  </header>
);

// ── Dashboard ──────────────────────────────────────────────────
function AdminDashboard() {
  const stats = [
    { l: 'Faol foydalanuvchilar', v: '12,438', d: '+8.2%', ok: true, i: '◉' },
    { l: 'Bugun yechilgan testlar', v: '3,924', d: '+12%', ok: true, i: '✓' },
    { l: "O'tish darajasi", v: '78.4%', d: '+1.4%', ok: true, i: '↗' },
    { l: 'Premium obunalar', v: '1,842', d: '−3.1%', ok: false, i: '★' },
  ];
  const chartData = [42, 56, 48, 62, 71, 68, 84, 76, 82, 91, 88, 95];

  return (
    <div style={{ width: 1440, minHeight: 1100, display: 'flex', background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <AdminSidebar active="dashboard" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminTopBar title="Dashboard" sub="Bugungi platforma faolligi"
          actions={<button className="btn btn--primary" style={{ fontSize: 13, padding: '9px 14px' }}>+ Yangi savol</button>}
        />

        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {stats.map((s, i) => (
              <div key={i} className="bento" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div className="overline">{s.l}</div>
                  <span style={{ fontSize: 13, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{s.i}</span>
                </div>
                <div className="h-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>{s.v}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <span className="mono" style={{ color: s.ok ? 'var(--success)' : 'var(--error)' }}>{s.ok ? '↑' : '↓'} {s.d}</span>
                  <span style={{ color: 'var(--fg-3)' }}>vs o'tgan hafta</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 14 }}>
            <div className="bento" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <div className="overline" style={{ marginBottom: 4 }}>YECHILGAN TESTLAR · 12 OY</div>
                  <div className="h-display" style={{ fontSize: 22, fontWeight: 600 }}>43,824 <span style={{ fontSize: 13, color: 'var(--fg-2)', fontWeight: 400 }}>jami</span></div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Hafta', 'Oy', 'Yil'].map((p, i) => (
                    <button key={i} className="chip" style={{
                      fontSize: 11, padding: '5px 11px', cursor: 'pointer',
                      background: i === 1 ? 'var(--accent)' : 'var(--bg-2)',
                      color: i === 1 ? '#0a1f24' : 'var(--fg-1)',
                      borderColor: i === 1 ? 'var(--accent)' : 'var(--line)',
                    }}>{p}</button>
                  ))}
                </div>
              </div>
              <svg width="100%" height="240" viewBox="0 0 600 240" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.18 195)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.82 0.18 195)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" x2="600" y1={i * 50 + 20} y2={i * 50 + 20} stroke="var(--line)" strokeDasharray="2 4" />
                ))}
                {(() => {
                  const max = 100;
                  const pts = chartData.map((v, i) => `${(i / (chartData.length - 1)) * 580 + 10},${220 - (v / max) * 200}`).join(' ');
                  const area = `M 10,220 L ${pts} L 590,220 Z`;
                  return (
                    <>
                      <path d={area} fill="url(#ag)" />
                      <polyline points={pts} fill="none" stroke="oklch(0.82 0.18 195)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {chartData.map((v, i) => (
                        <circle key={i} cx={(i / (chartData.length - 1)) * 580 + 10} cy={220 - (v / max) * 200} r="3" fill="oklch(0.82 0.18 195)" />
                      ))}
                    </>
                  );
                })()}
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', marginTop: 8 }}>
                {['Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek', 'Yan', 'Fev', 'Mar', 'Apr', 'May'].map((m, i) => <span key={i}>{m}</span>)}
              </div>
            </div>

            <div className="bento" style={{ padding: 24 }}>
              <div className="overline" style={{ marginBottom: 14 }}>SO'NGGI FAOLIYAT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { who: 'Doniyor R.', what: '20-bilet · 18/20', when: '2 daq oldin', tag: 'pass' },
                  { who: 'Madina A.', what: 'Yangi savol qo\'shildi #4863', when: '8 daq oldin', tag: 'edit' },
                  { who: 'Sardor X.', what: '50-bilet · 11/20', when: '12 daq oldin', tag: 'fail' },
                  { who: 'Aziza B.', what: 'Premium · 1 oy', when: '24 daq oldin', tag: 'pay' },
                  { who: 'Bekzod T.', what: 'Mavzu: Tezlik · 95%', when: '38 daq oldin', tag: 'pass' },
                  { who: 'Komiljon Y.', what: 'Hisob ro\'yxatdan o\'tdi', when: '1 soat oldin', tag: 'new' },
                ].map((r, i) => {
                  const tone = { pass: 'var(--success)', fail: 'var(--error)', edit: 'var(--accent)', pay: 'oklch(0.86 0.16 95)', new: 'var(--accent-2)' }[r.tag];
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: tone, marginTop: 6, flexShrink: 0 }}></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{r.who}</div>
                        <div style={{ fontSize: 11, color: 'var(--fg-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.what}</div>
                      </div>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', flexShrink: 0 }}>{r.when}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 14 }}>TOP MAVZULAR</div>
              {[
                { n: "Yo'l belgilari", v: 92, c: 1842 },
                { n: 'Yo\'l harakati', v: 86, c: 1240 },
                { n: 'Tezlik rejimi', v: 78, c: 980 },
                { n: 'Birinchi yordam', v: 64, c: 412 },
              ].map((r, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                    <span>{r.n}</span>
                    <span className="mono" style={{ color: 'var(--fg-2)' }}>{r.c}</span>
                  </div>
                  <div className="progress" style={{ height: 4 }}><span style={{ width: r.v + '%' }}></span></div>
                </div>
              ))}
            </div>

            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 14 }}>QIYIN SAVOLLAR</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { id: '#1284', t: 'Tormoz masofasi hisoblash', err: 67 },
                  { id: '#0942', t: "Qarama-qarshi yo'l berish", err: 58 },
                  { id: '#2311', t: 'Birinchi yordam tartibi', err: 54 },
                  { id: '#0784', t: 'Qor sharoitida tezlik', err: 49 },
                ].map((q, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>{q.id}</span>
                      <span style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{q.t}</span>
                    </div>
                    <span className="chip chip--error" style={{ fontSize: 10, padding: '3px 7px' }}>{q.err}% xato</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bento bento--accent" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 14 }}>● TIZIM HOLATI</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { n: 'API · Backend', v: 'Online', up: '99.98%', ok: true },
                  { n: "Ma'lumotlar bazasi", v: '124ms avg', up: '99.99%', ok: true },
                  { n: 'CDN · Statik', v: 'Online', up: '100%', ok: true },
                  { n: "To'lov gateway", v: 'Sekin', up: '98.4%', ok: false },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.ok ? 'var(--success)' : 'oklch(0.85 0.18 75)', boxShadow: s.ok ? '0 0 6px var(--success)' : '0 0 6px oklch(0.85 0.18 75)' }}></span>
                    <span style={{ flex: 1, fontSize: 12, fontWeight: 500 }}>{s.n}</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--fg-2)' }}>{s.up}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Questions list ─────────────────────────────────────────────
function AdminQuestions() {
  const rows = [
    { id: '#4862', sign: 'priority-main', q: "Asosiy yo'lning ustunligi nimani bildiradi?", topic: "Yo'l belgilari", diff: 'Oson', err: 12, status: 'published', updated: '2 soat oldin' },
    { id: '#4861', sign: 'prohibit-speed', q: 'Aholi punktida maksimal tezlik nechchi km/soat?', topic: 'Tezlik', diff: "O'rta", err: 28, status: 'published', updated: '5 soat oldin' },
    { id: '#4860', sign: 'warning-pedestrian', q: 'Piyodalar o\'tish joyi yaqinida haydovchining harakati', topic: 'Piyodalar', diff: 'Oson', err: 18, status: 'draft', updated: 'kecha' },
    { id: '#4859', sign: 'mandatory-roundabout', q: 'Aylanma harakatda kim ustunlikka ega?', topic: "Yo'l harakati", diff: 'Qiyin', err: 54, status: 'review', updated: 'kecha' },
    { id: '#4858', sign: 'warning-slippery', q: 'Sirpanchiq yo\'lda tormoz masofasi qancha oshadi?', topic: "Yo'l sharoiti", diff: 'Qiyin', err: 67, status: 'published', updated: '2 kun oldin' },
    { id: '#4857', sign: 'info-hospital', q: 'Yo\'l-transport hodisasida birinchi yordam tartibi', topic: 'Birinchi yordam', diff: "O'rta", err: 41, status: 'published', updated: '3 kun oldin' },
    { id: '#4856', sign: 'prohibit-no-overtake', q: 'Quvib o\'tish taqiqlangan belgi qachon tugaydi?', topic: "Yo'l belgilari", diff: "O'rta", err: 32, status: 'published', updated: '3 kun oldin' },
    { id: '#4855', sign: 'prohibit-no-entry', q: 'Bu belgi ostida qaysi transport o\'tishi mumkin?', topic: "Yo'l belgilari", diff: 'Oson', err: 9, status: 'archived', updated: '1 hafta oldin' },
  ];

  const statusStyle = {
    published: { bg: 'color-mix(in oklch, var(--success) 16%, transparent)', fg: 'var(--success)', l: '● Faol' },
    draft: { bg: 'color-mix(in oklch, var(--accent-2) 16%, transparent)', fg: 'var(--accent-2)', l: '◷ Qoralama' },
    review: { bg: 'color-mix(in oklch, oklch(0.85 0.18 75) 16%, transparent)', fg: 'oklch(0.85 0.18 75)', l: '◐ Tekshirilmoqda' },
    archived: { bg: 'var(--bg-2)', fg: 'var(--fg-3)', l: '○ Arxiv' },
  };
  const diffStyle = {
    'Oson': 'var(--success)',
    "O'rta": 'oklch(0.85 0.18 75)',
    'Qiyin': 'var(--error)',
  };

  return (
    <div style={{ width: 1440, minHeight: 1100, display: 'flex', background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <AdminSidebar active="questions" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminTopBar
          title="Savollar bazasi" sub="4,862 ta savol · 18 mavzu · 8 til"
          breadcrumbs={['Boshqaruv', 'Savollar']}
          actions={
            <>
              <button className="btn btn--ghost" style={{ fontSize: 13, padding: '9px 14px' }}>↓ CSV eksport</button>
              <button className="btn btn--ghost" style={{ fontSize: 13, padding: '9px 14px' }}>↑ Import</button>
              <button className="btn btn--primary" style={{ fontSize: 13, padding: '9px 14px' }}>+ Yangi savol</button>
            </>
          }
        />

        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Filters bar */}
          <div className="bento" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Barchasi · 4,862', 'Faol · 4,610', 'Qoralama · 138', 'Tekshirilmoqda · 47', 'Arxiv · 67'].map((f, i) => (
                <button key={i} className="chip" style={{
                  fontSize: 12, padding: '7px 12px', cursor: 'pointer',
                  background: i === 0 ? 'var(--accent)' : 'var(--bg-2)',
                  color: i === 0 ? '#0a1f24' : 'var(--fg-1)',
                  borderColor: i === 0 ? 'var(--accent)' : 'var(--line)',
                }}>{f}</button>
              ))}
            </div>
            <div style={{ width: 1, height: 24, background: 'var(--line)' }}></div>
            <select style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg-0)', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontFamily: 'var(--font-body)' }}>
              <option>Mavzu: barchasi</option>
            </select>
            <select style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg-0)', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontFamily: 'var(--font-body)' }}>
              <option>Qiyinlik: barchasi</option>
            </select>
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <input placeholder="Savol ID yoki matn bo'yicha qidirish…" style={{
                background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8,
                padding: '8px 14px 8px 32px', fontSize: 12, color: 'var(--fg-0)', width: 280,
                fontFamily: 'var(--font-body)',
              }} />
              <span style={{ position: 'absolute', left: 11, top: 8, color: 'var(--fg-3)', fontSize: 13 }}>⌕</span>
            </div>
          </div>

          {/* Table */}
          <div className="bento" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '40px 60px 80px 1fr 140px 100px 100px 130px 100px 60px',
              padding: '12px 18px', borderBottom: '1px solid var(--line)', alignItems: 'center', gap: 14,
              fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em',
              background: 'var(--bg-2)',
            }}>
              <input type="checkbox" />
              <span>ID</span>
              <span>Belgi</span>
              <span>Savol</span>
              <span>Mavzu</span>
              <span>Qiyinlik</span>
              <span>Xato %</span>
              <span>Status</span>
              <span>Yangilangan</span>
              <span></span>
            </div>
            {rows.map((r, i) => {
              const st = statusStyle[r.status];
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '40px 60px 80px 1fr 140px 100px 100px 130px 100px 60px',
                  padding: '14px 18px', borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none',
                  alignItems: 'center', gap: 14, fontSize: 13,
                }}>
                  <input type="checkbox" />
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{r.id}</span>
                  <RoadSign kind={r.sign} size={36} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--fg-0)' }}>{r.q}</span>
                  <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{r.topic}</span>
                  <span className="mono" style={{ fontSize: 11, color: diffStyle[r.diff] }}>● {r.diff}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="mono" style={{ fontSize: 11, color: r.err > 50 ? 'var(--error)' : r.err > 25 ? 'oklch(0.85 0.18 75)' : 'var(--fg-2)' }}>{r.err}%</span>
                  </span>
                  <span style={{ fontSize: 10, padding: '4px 9px', borderRadius: 6, background: st.bg, color: st.fg, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.04em', justifySelf: 'start' }}>{st.l}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>{r.updated}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button style={{ all: 'unset', cursor: 'pointer', color: 'var(--fg-2)', padding: 4, borderRadius: 4 }} title="Tahrirlash">✎</button>
                    <button style={{ all: 'unset', cursor: 'pointer', color: 'var(--fg-2)', padding: 4, borderRadius: 4 }} title="Ko'proq">⋯</button>
                  </div>
                </div>
              );
            })}
            {/* footer / pagination */}
            <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
              <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>1–8 / 4,862 ko'rsatilmoqda</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {['‹', '1', '2', '3', '…', '608', '›'].map((p, i) => (
                  <button key={i} className="chip" style={{
                    fontSize: 11, padding: '5px 10px', minWidth: 28, justifyContent: 'center',
                    background: p === '1' ? 'var(--accent)' : 'var(--bg-1)',
                    color: p === '1' ? '#0a1f24' : 'var(--fg-1)',
                    borderColor: p === '1' ? 'var(--accent)' : 'var(--line)',
                  }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Question editor ────────────────────────────────────────────
function AdminQuestionEditor() {
  return (
    <div style={{ width: 1440, minHeight: 1080, display: 'flex', background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <AdminSidebar active="questions" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminTopBar title="Savol #4863 — yangi" sub="Hali saqlanmagan"
          breadcrumbs={['Savollar', 'Yangi savol']}
          actions={
            <>
              <button className="btn btn--ghost" style={{ fontSize: 13, padding: '9px 14px' }}>Bekor qilish</button>
              <button className="btn btn--ghost" style={{ fontSize: 13, padding: '9px 14px' }}>↗ Oldindan ko'rish</button>
              <button className="btn btn--primary" style={{ fontSize: 13, padding: '9px 14px' }}>✓ Saqlash va nashr qilish</button>
            </>
          }
        />

        <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, alignItems: 'flex-start' }}>
          {/* Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="bento" style={{ padding: 24 }}>
              <div className="overline" style={{ marginBottom: 14 }}>SAVOL MATNI</div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {['🇺🇿 O\'zbek (Lotin)', 'Ўзбек (Кирилл)', 'Русский'].map((l, i) => (
                  <button key={i} className="chip" style={{
                    fontSize: 11, padding: '6px 11px', cursor: 'pointer',
                    background: i === 0 ? 'var(--bg-3)' : 'transparent',
                    color: i === 0 ? 'var(--fg-0)' : 'var(--fg-2)',
                  }}>{l}</button>
                ))}
              </div>
              <textarea defaultValue="Quvib o'tish taqiqlangan belgisining ta'siri qachon tugaydi?"
                style={{
                  width: '100%', boxSizing: 'border-box', background: 'var(--bg-2)',
                  border: '1px solid var(--line)', borderRadius: 10, padding: '14px 16px',
                  fontSize: 16, color: 'var(--fg-0)', fontFamily: 'var(--font-display)',
                  fontWeight: 500, lineHeight: 1.4, resize: 'vertical', minHeight: 70, outline: 'none',
                }} />
            </div>

            <div className="bento" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div className="overline">JAVOB VARIANTLARI</div>
                <button className="btn btn--ghost" style={{ fontSize: 11, padding: '6px 12px' }}>+ Variant qo'shish</button>
              </div>
              {[
                { l: 'Keyingi chorrahada', ok: false },
                { l: 'Aholi punkti tugashida', ok: false },
                { l: 'Maxsus rad etuvchi belgida', ok: true },
                { l: 'Belgi olib tashlanganda', ok: false },
              ].map((o, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10,
                  background: o.ok ? 'color-mix(in oklch, var(--success) 12%, var(--bg-2))' : 'var(--bg-2)',
                  border: '1px solid ' + (o.ok ? 'var(--success)' : 'var(--line)'),
                  marginBottom: 8,
                }}>
                  <input type="radio" checked={o.ok} readOnly style={{ accentColor: 'var(--success)' }} />
                  <kbd style={{ minWidth: 32, padding: '4px 8px', borderRadius: 6, background: 'var(--bg-3)', color: 'var(--fg-1)', fontSize: 11, fontFamily: 'var(--font-mono)', textAlign: 'center' }}>F{i + 1}</kbd>
                  <input value={o.l} readOnly style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--fg-0)', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)' }} />
                  {o.ok && <span className="chip chip--lime" style={{ fontSize: 10, padding: '3px 8px' }}>✓ TO'G'RI</span>}
                  <button style={{ all: 'unset', cursor: 'pointer', color: 'var(--fg-3)', padding: 4 }}>✕</button>
                </div>
              ))}
            </div>

            <div className="bento" style={{ padding: 24 }}>
              <div className="overline" style={{ marginBottom: 14 }}>TUSHUNTIRISH</div>
              <textarea defaultValue="Taqiqlovchi belgilarning ta'siri faqat maxsus rad etuvchi belgi bilan tugaydi (3.31 — «Barcha cheklovlar tugadi»)."
                style={{
                  width: '100%', boxSizing: 'border-box', background: 'var(--bg-2)',
                  border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px',
                  fontSize: 13, color: 'var(--fg-1)', fontFamily: 'var(--font-body)', lineHeight: 1.55,
                  resize: 'vertical', minHeight: 70, outline: 'none',
                }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <span className="overline">YHQ MODDA</span>
                <input defaultValue="12-modda" style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8, padding: '7px 12px', fontSize: 12, color: 'var(--fg-0)', fontFamily: 'var(--font-mono)' }} />
              </div>
            </div>
          </div>

          {/* Sidebar — meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 14 }}>YO'L BELGISI / RASM</div>
              <div style={{
                aspectRatio: '1', background: 'var(--bg-2)', borderRadius: 12,
                border: '1.5px dashed var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 10, position: 'relative',
              }}>
                <RoadSign kind="prohibit-no-overtake" size={140} />
                <button className="chip" style={{ position: 'absolute', top: 8, right: 8, fontSize: 10, padding: '4px 8px', cursor: 'pointer' }}>O'zgartirish</button>
              </div>
              <button className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}>↑ Belgi tanlash · Rasm yuklash</button>
            </div>

            <div className="bento" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 14 }}>METADATA</div>
              {[
                { l: 'Mavzu', v: "Yo'l belgilari", select: true },
                { l: 'Bilet', v: '#23 · 12-savol', select: true },
                { l: 'Qiyinlik', v: "O'rta", select: true },
                { l: 'Status', v: 'Qoralama', select: true },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>{f.l.toUpperCase()}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                    <span>{f.v}</span>
                    <span style={{ color: 'var(--fg-3)', fontSize: 10 }}>▼</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>TEGLAR</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['quvib o\'tish', 'taqiq', 'belgi'].map((t, i) => (
                    <span key={i} className="chip" style={{ fontSize: 10, padding: '4px 8px' }}>{t} ✕</span>
                  ))}
                  <button className="chip" style={{ fontSize: 10, padding: '4px 8px', borderStyle: 'dashed', cursor: 'pointer' }}>+ tag</button>
                </div>
              </div>
            </div>

            <div className="bento bento--accent" style={{ padding: 22 }}>
              <div className="overline" style={{ marginBottom: 10 }}>● O'XSHASH SAVOLLAR</div>
              <p style={{ fontSize: 11, color: 'var(--fg-2)', margin: '0 0 10px 0', lineHeight: 1.5 }}>AI 3 ta o'xshash savol topdi. Takrordan saqlaning.</p>
              {[{ id: '#3287', t: 'Belgi ta\'siri qaerda tugaydi?', s: 87 }, { id: '#1842', t: 'Taqiqlovchi belgi tugashi', s: 71 }].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--fg-2)' }}>{s.id}</span>
                  <span style={{ fontSize: 11, flex: 1, padding: '0 10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.t}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--accent)' }}>{s.s}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Users list ─────────────────────────────────────────────────
function AdminUsers() {
  const users = [
    { name: 'Doniyor Rashidov', phone: '+998 90 123 45 67', plan: 'Premium', tests: 87, score: 91, joined: '12 Apr 2026', status: 'active' },
    { name: 'Madina Aliyeva', phone: '+998 91 234 56 78', plan: 'Free', tests: 24, score: 76, joined: '23 Mar 2026', status: 'active' },
    { name: 'Sardor Xolmatov', phone: '+998 93 345 67 89', plan: 'Premium', tests: 142, score: 88, joined: '8 Feb 2026', status: 'active' },
    { name: 'Aziza Bek', phone: '+998 94 456 78 90', plan: 'Premium', tests: 56, score: 94, joined: '15 Jan 2026', status: 'active' },
    { name: 'Bekzod Tursunov', phone: '+998 95 567 89 01', plan: 'Free', tests: 12, score: 64, joined: '3 May 2026', status: 'inactive' },
    { name: 'Komiljon Yusupov', phone: '+998 97 678 90 12', plan: 'Free', tests: 3, score: 50, joined: 'bugun', status: 'new' },
    { name: 'Nodira Karimova', phone: '+998 98 789 01 23', plan: 'Premium', tests: 211, score: 96, joined: '24 Dek 2025', status: 'active' },
    { name: 'Javlon Saidov', phone: '+998 99 890 12 34', plan: 'Free', tests: 0, score: 0, joined: '1 May 2026', status: 'banned' },
  ];

  const planStyle = {
    Premium: { bg: 'color-mix(in oklch, oklch(0.85 0.18 75) 16%, transparent)', fg: 'oklch(0.85 0.18 75)' },
    Free: { bg: 'var(--bg-2)', fg: 'var(--fg-2)' },
  };
  const statusStyle = {
    active: { dot: 'var(--success)', l: 'Faol' },
    inactive: { dot: 'var(--fg-3)', l: 'Faolsiz' },
    new: { dot: 'var(--accent)', l: 'Yangi' },
    banned: { dot: 'var(--error)', l: 'Bloklangan' },
  };

  return (
    <div style={{ width: 1440, minHeight: 1080, display: 'flex', background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <AdminSidebar active="users" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminTopBar title="Foydalanuvchilar" sub="12,438 ta foydalanuvchi · 1,842 Premium"
          breadcrumbs={['Boshqaruv', 'Foydalanuvchilar']}
          actions={<><button className="btn btn--ghost" style={{ fontSize: 13, padding: '9px 14px' }}>↓ Eksport</button><button className="btn btn--primary" style={{ fontSize: 13, padding: '9px 14px' }}>+ Foydalanuvchi</button></>}
        />

        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { l: 'Jami', v: '12,438', d: '+184 hafta', tone: 'var(--accent)' },
              { l: 'Premium', v: '1,842', d: '14.8%', tone: 'oklch(0.85 0.18 75)' },
              { l: 'Bugun yangi', v: '47', d: '+8 vs kecha', tone: 'var(--success)' },
              { l: 'Faolsiz · 30 kun', v: '2,104', d: '16.9%', tone: 'var(--error)' },
            ].map((k, i) => (
              <div key={i} className="bento" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: k.tone }}></div>
                <div className="overline" style={{ marginBottom: 8 }}>{k.l}</div>
                <div className="h-display" style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{k.v}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)' }}>{k.d}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bento" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '40px 1fr 160px 100px 80px 80px 110px 100px 60px',
              padding: '12px 18px', borderBottom: '1px solid var(--line)', alignItems: 'center', gap: 14,
              fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em',
              background: 'var(--bg-2)',
            }}>
              <input type="checkbox" />
              <span>Foydalanuvchi</span>
              <span>Telefon</span>
              <span>Tarif</span>
              <span>Testlar</span>
              <span>O'rt. ball</span>
              <span>Qo'shildi</span>
              <span>Status</span>
              <span></span>
            </div>
            {users.map((u, i) => {
              const ps = planStyle[u.plan];
              const ss = statusStyle[u.status];
              const initials = u.name.split(' ').map(w => w[0]).slice(0, 2).join('');
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '40px 1fr 160px 100px 80px 80px 110px 100px 60px',
                  padding: '14px 18px', borderBottom: i < users.length - 1 ? '1px solid var(--line)' : 'none',
                  alignItems: 'center', gap: 14, fontSize: 13,
                }}>
                  <input type="checkbox" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, oklch(0.7 0.15 ${i * 47}), oklch(0.82 0.18 ${i * 47 + 60}))`, color: '#0a1f24', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{initials}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>id: {1000 + i}</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>{u.phone}</span>
                  <span style={{ fontSize: 11, padding: '4px 9px', borderRadius: 6, background: ps.bg, color: ps.fg, fontFamily: 'var(--font-mono)', fontWeight: 600, justifySelf: 'start' }}>{u.plan === 'Premium' ? '★ ' : ''}{u.plan}</span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--fg-1)' }}>{u.tests}</span>
                  <span className="mono" style={{ fontSize: 12, color: u.score >= 80 ? 'var(--success)' : u.score >= 60 ? 'var(--fg-1)' : u.score > 0 ? 'oklch(0.85 0.18 75)' : 'var(--fg-3)' }}>{u.score > 0 ? u.score + '%' : '—'}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{u.joined}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: ss.dot }}></span>
                    {ss.l}
                  </span>
                  <button style={{ all: 'unset', cursor: 'pointer', color: 'var(--fg-2)', padding: 4 }}>⋯</button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

window.AdminDashboard = AdminDashboard;
window.AdminQuestions = AdminQuestions;
window.AdminQuestionEditor = AdminQuestionEditor;
window.AdminUsers = AdminUsers;
