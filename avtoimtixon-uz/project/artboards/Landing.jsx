/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// Landing / Dashboard — task-first home for logged-in users
// Compact hero banner + 8 quick-action cards + subscription panel
// ───────────────────────────────────────────────────────────────

function Landing({ t, accent, lang = 'uz', forceContact = false }) {
  const L = (uz, cy, ru) => lang === 'ru' ? ru : lang === 'cy' ? cy : uz;
  const theme = (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'dark';
  const [contactOpen, setContactOpen] = React.useState(forceContact);

  // 8 sections (neon-icon cards)
  const cards = [
    { key: 'real20', icon: 'play', title: L('Real imtihon', 'Реал имтиҳон', 'Реальный экзамен'),
      sub: L('20 savol · 25 daqiqa · 18/20 oʻtish', '20 савол · 25 дақиқа · 18/20', '20 вопросов · 25 минут · 18/20'),
      stat: L('Bugun: 234', 'Бугун: 234', 'Сегодня: 234'), accent: true, big: true },
    { key: 'real50', icon: 'target', title: L('Imtihon · 50 talik', 'Имтиҳон · 50 талик', 'Экзамен · 50'),
      sub: L('Chuqurroq tayyorgarlik · 45/50', 'Чуқурроқ тайёргарлик · 45/50', 'Углублённо · 45/50'),
      stat: L("Oʻrtacha: 41/50", 'Ўртача: 41/50', 'Среднее: 41/50'), big: true },
    { key: 'topics', icon: 'layers', title: L('Mavzulashtirilgan testlar', 'Мавзулаштирилган тестлар', 'Тематические тесты'),
      sub: L('18 mavzu · 1–200 savol', '18 мавзу · 1–200 савол', '18 тем · 1–200 вопросов'),
      stat: L('4/18 oʻrganilgan', '4/18 ўрганилган', '4/18 пройдено') },
    { key: 'topic-exam', icon: 'flag', title: L("Mavzular boʻyicha imtihon", 'Мавзулар бўйича имтиҳон', 'Экзамен по теме'),
      sub: L('Bitta mavzudan 20 ta savol', 'Битта мавзудан 20 та савол', '20 вопросов из одной темы'),
      stat: L("Tanlovga oʻting", 'Танловга ўтинг', 'К выбору темы') },
    { key: 'tickets', icon: 'ticket', title: L('Biletlar trenirovka', 'Билетлар тренировка', 'Тренировка по билетам'),
      sub: L('62 bilet · har biri 20 savol', '62 билет · ҳар бири 20 савол', '62 билета · по 20 вопросов'),
      stat: L('12/62 yakunlangan', '12/62 якунланган', '12/62 завершено') },
    { key: 'popular-mistakes', icon: 'flame', title: L('Ommabop xatoliklar', 'Оммабоп хатоликлар', 'Популярные ошибки'),
      sub: L('Eng koʻp xato qilingan savollar', 'Энг кўп хато қилинган саволлар', 'Самые частые ошибки'),
      stat: L('Top 50 savol', 'Топ 50 савол', 'Топ 50 вопросов') },
    { key: 'my-mistakes', icon: 'alert', title: L("Mening xato savollarim", 'Менинг хато саволларим', 'Мои ошибки'),
      sub: L('Avval xato boʻlganlarni qaytarish', 'Аввал хато бўлганларни қайтариш', 'Повторить свои ошибки'),
      stat: '47', tone: 'error' },
    { key: 'saved', icon: 'bookmark', title: L('Saqlangan savollar', 'Сақланган саволлар', 'Сохранённые'),
      sub: L("Belgi qoʻyib qoldirganlar", 'Белги қўйиб қолдирганлар', 'Отмеченные закладкой'),
      stat: '23', tone: 'lime' },
  ];

  return (
    <div style={{ width: 1280, background: 'var(--bg-0)', color: 'var(--fg-0)', fontFamily: 'var(--font-body)' }}>
      {/* ── Header ──────────────────────────────────────── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px', borderBottom: '1px solid var(--line)',
        background: 'color-mix(in oklch, var(--bg-0) 70%, transparent)',
        backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Logo accent={accent} />
          <nav style={{ display: 'flex', gap: 24 }}>
            <a style={{ color: 'var(--fg-0)', fontSize: 14, fontWeight: 600 }}>{L('Bosh sahifa', 'Бош саҳифа', 'Главная')}</a>
            <a style={{ color: 'var(--fg-2)', fontSize: 14 }}>{L('Yoʻl belgilari', 'Йўл белгилари', 'Знаки')}</a>
            <a style={{ color: 'var(--fg-2)', fontSize: 14 }}>{L('Statistika', 'Статистика', 'Статистика')}</a>
            <a style={{ color: 'var(--fg-2)', fontSize: 14 }}>{L('Yordam', 'Ёрдам', 'Помощь')}</a>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <LangSwitch lang={lang} />
          <ThemeToggle />
          <span className="chip chip--lime" style={{ fontSize: 11, padding: '5px 10px' }}>● PRO · 14 {L('kun', 'кун', 'дн')}</span>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1f24', fontWeight: 700, fontSize: 14 }}>AS</div>
        </div>
      </header>

      {/* ── Hero: one big primary CTA ─────────────────────── */}
      <section style={{ padding: '24px 48px 12px' }}>
        <div style={{
          padding: '24px 32px', borderRadius: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
          background: 'linear-gradient(135deg, color-mix(in oklch, var(--accent) 18%, var(--bg-1)) 0%, var(--bg-1) 60%)',
          border: '1px solid color-mix(in oklch, var(--accent) 30%, var(--line))',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.12em' }}>{L('XUSH KELIBSIZ, AZIZ', 'ХУШ КЕЛИБСИЗ, АЗИЗ', 'ПРИВЕТ, AZIZ')}</div>
            <span className="chip" style={{ fontSize: 11, padding: '4px 9px' }}>🔥 12 {L('kun', 'кун', 'дн')}</span>
            <span className="chip" style={{ fontSize: 11, padding: '4px 9px' }}>📊 1 250 XP</span>
          </div>
          <button className="btn btn--primary" style={{ fontSize: 15, padding: '13px 26px' }}>
            ▶ {L('Real imtihonni boshlash', 'Реал имтиҳонни бошлаш', 'Начать реальный экзамен')}
          </button>
        </div>
      </section>

      {/* ── 8 sections — compact grid ─────────────────────── */}
      <section style={{ padding: '12px 48px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 className="h-display" style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
            {L("Boʻlimlar", 'Бўлимлар', 'Разделы')}
          </h2>
          <span className="overline" style={{ color: 'var(--fg-2)' }}>{L('8 BOʻLIM', '8 БЎЛИМ', '8 РАЗДЕЛОВ')}</span>
        </div>

        {/* Row 1: 2 primary (Real 20, Real 50) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          {cards.filter(c => c.big).map((c) => (
            <ActionCard key={c.key} card={c} big lang={lang} L={L} />
          ))}
        </div>

        {/* Row 2-3: 6 compact cards (3-col) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {cards.filter(c => !c.big).map((c) => (
            <ActionCard key={c.key} card={c} lang={lang} L={L} />
          ))}
        </div>
      </section>

      {/* ── Subscription + Payment History ──────────────── */}
      <section style={{ padding: '8px 48px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr', gap: 14 }}>
          {/* Subscription status */}
          <div className="bento bento--accent-2" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="overline">{L('OBUNA HOLATI', 'ОБУНА ҲОЛАТИ', 'ПОДПИСКА')}</div>
              <span className="chip chip--lime" style={{ fontSize: 11 }}>● {L('FAOL', 'ФАОЛ', 'АКТИВНА')}</span>
            </div>
            <div>
              <div className="h-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>PRO · 1 {L('oy', 'ой', 'месяц')}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
                {L('Tugash sanasi:', 'Тугаш санаси:', 'Окончание:')} <span className="mono" style={{ color: 'var(--fg-0)' }}>21 May 2026</span>
              </div>
            </div>

            {/* days remaining bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                <span>{L('QOLDI', 'ҚОЛДИ', 'ОСТАЛОСЬ')}</span>
                <span><span style={{ color: 'var(--fg-0)' }}>14</span> / 30 {L('kun', 'кун', 'дн')}</span>
              </div>
              <div className="progress"><span style={{ width: '47%' }}></span></div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button className="btn btn--primary" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }}>
                {L('Obunani uzaytirish', 'Обунани узайтириш', 'Продлить подписку')}
              </button>
              <button className="btn btn--ghost" style={{ fontSize: 13 }}>{L('Tariflar', 'Тарифлар', 'Тарифы')}</button>
            </div>
          </div>

          {/* Payment history */}
          <div className="bento" style={{ padding: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div className="overline">{L("TOʻLOV TARIXI", 'ТЎЛОВ ТАРИХИ', 'ИСТОРИЯ ОПЛАТ')}</div>
              <a style={{ fontSize: 12, color: 'var(--accent)', cursor: 'pointer' }}>{L("Hammasini koʻrish", 'Ҳаммасини кўриш', 'Все →')}</a>
            </div>
            {[
              { d: '21 Apr 2026', p: 'PRO · 1 oy', amt: '49 000', method: 'Click', st: 'ok' },
              { d: '21 Mar 2026', p: 'PRO · 1 oy', amt: '49 000', method: 'Payme', st: 'ok' },
              { d: '15 Feb 2026', p: 'PRO · 3 oy', amt: '129 000', method: 'Uzcard', st: 'ok' },
              { d: '01 Feb 2026', p: 'PRO · 1 oy', amt: '49 000', method: 'Click', st: 'failed' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: r.st === 'ok' ? 'color-mix(in oklch, var(--success) 18%, var(--bg-2))' : 'color-mix(in oklch, var(--error) 18%, var(--bg-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.st === 'ok' ? 'var(--success)' : 'var(--error)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                  {r.st === 'ok' ? '✓' : '✕'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.p}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)' }}>{r.d} · {r.method}</div>
                </div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: r.st === 'ok' ? 'var(--fg-0)' : 'var(--fg-2)', textDecoration: r.st === 'ok' ? 'none' : 'line-through' }}>
                  {r.amt} {L("soʻm", 'сўм', 'сум')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Telegram bot ─────────────────────────────────── */}
      <section style={{ padding: '8px 48px 32px' }}>
        <div className="bento" style={{
          padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 24,
          background: 'radial-gradient(60% 100% at 100% 50%, color-mix(in oklch, oklch(0.72 0.16 230) 18%, transparent), transparent 65%), var(--bg-1)',
          borderColor: 'color-mix(in oklch, oklch(0.72 0.16 230) 28%, var(--line))',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, flexShrink: 0,
            background: 'linear-gradient(135deg, oklch(0.72 0.16 230), oklch(0.62 0.18 240))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px color-mix(in oklch, oklch(0.72 0.16 230) 50%, transparent)',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
              <path d="M9.78 18.65 10.06 14.42 17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3 3.64 12.01C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3 10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div className="overline" style={{ marginBottom: 6, color: 'oklch(0.78 0.14 230)' }}>{L('TELEGRAM BOT', 'ТЕЛЕГРАМ БОТ', 'ТЕЛЕГРАМ-БОТ')}</div>
            <div className="h-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
              @avtoimtihon_uz_bot
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5 }}>
              {L(
                "Telegram orqali ham mashq qiling — savol-javob, bilet, kunlik test va eslatmalar.",
                'Telegram орқали ҳам машқ қилинг — савол-жавоб, билет, кунлик тест ва эслатмалар.',
                'Тренируйтесь в Telegram — вопросы, билеты, ежедневные тесты и напоминания.'
              )}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span className="chip" style={{ fontSize: 11 }}>{L('Bepul', 'Бепул', 'Бесплатно')}</span>
            <a href="https://t.me/avtoimtihon_uz_bot" target="_blank" rel="noopener noreferrer"
              className="btn"
              style={{
                background: 'linear-gradient(135deg, oklch(0.72 0.16 230), oklch(0.62 0.18 240))',
                color: '#fff', borderColor: 'transparent',
                boxShadow: '0 0 20px color-mix(in oklch, oklch(0.72 0.16 230) 40%, transparent)',
                fontSize: 14, fontWeight: 600,
              }}>
              {L('Botga ulanish', 'Ботга уланиш', 'Подключить бота')} →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--fg-2)', fontSize: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo accent={accent} small />
          <span>© 2026 avtoimtihon.uz</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a onClick={() => setContactOpen(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-1)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-3.5-7.1L21 4l-1 4-4-.5"/><circle cx="12" cy="12" r="3"/></svg>
            {L('Aloqa / Murojaat', 'Алоқа / Мурожаат', 'Контакты')}
          </a>
          <span>{L('Yordam', 'Ёрдам', 'Помощь')}</span>
          <span>{L('Foydalanish shartlari', 'Фойдаланиш шартлари', 'Условия')}</span>
        </div>
      </footer>

      {contactOpen && <ContactModal lang={lang} L={L} onClose={() => setContactOpen(false)} />}
    </div>
  );
}

// ── Quick-action card — compact, action-first, no heavy glow ───
function ActionCard({ card, big, lang, L }) {
  const tintColor = card.tone === 'error' ? 'var(--error)' : card.tone === 'lime' ? 'var(--success)' : 'var(--accent)';
  return (
    <button style={{
      padding: big ? '18px 22px' : '16px 18px',
      borderRadius: 14, border: '1px solid var(--line)',
      background: card.accent
        ? 'linear-gradient(135deg, color-mix(in oklch, var(--accent) 14%, var(--bg-1)) 0%, var(--bg-1) 70%)'
        : 'var(--bg-1)',
      textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit',
      display: 'flex', alignItems: 'center', gap: big ? 16 : 14,
      position: 'relative', overflow: 'hidden',
      transition: 'transform .15s, border-color .15s, background .15s',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'color-mix(in oklch, ' + tintColor + ' 50%, var(--line))'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = ''; }}>
      {/* Icon — small, no glow */}
      <div style={{
        width: big ? 48 : 40, height: big ? 48 : 40, borderRadius: 10,
        background: 'color-mix(in oklch, ' + tintColor + ' 14%, var(--bg-2))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <NeoIcon name={card.icon} size={big ? 22 : 18} tone={card.tone} />
      </div>

      {/* Title + subtitle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <div className="h-display" style={{ fontSize: big ? 18 : 15, fontWeight: 600, lineHeight: 1.2 }}>{card.title}</div>
          {card.accent && (
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', padding: '2px 6px', borderRadius: 4,
              background: 'var(--accent)', color: '#0a1f24',
            }}>{lang === 'ru' ? 'РЕК.' : lang === 'cy' ? 'ТВС.' : 'TVS.'}</span>
          )}
        </div>
        <p style={{ margin: 0, fontSize: big ? 13 : 12, color: 'var(--fg-2)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {card.sub}
        </p>
      </div>

      {/* Stat + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <span className="mono" style={{ fontSize: 11, color: card.tone === 'error' ? 'var(--error)' : card.tone === 'lime' ? 'var(--success)' : 'var(--fg-1)', fontWeight: 600 }}>
          {card.stat}
        </span>
        <span style={{ color: 'var(--fg-2)', fontSize: 16, fontWeight: 500 }}>→</span>
      </div>
    </button>
  );
}

// ── Neon icons (simple, geometric, single-stroke style) ───────
function NeoIcon({ name, size = 22, tone }) {
  const color = tone === 'error' ? 'var(--error)' : tone === 'lime' ? 'var(--success)' : 'var(--accent)';
  const s = size, sw = 1.8;
  const common = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    play: <><polygon points="6,4 20,12 6,20" fill={color} fillOpacity="0.15" /><polygon points="6,4 20,12 6,20" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill={color} /></>,
    layers: <><path d="M12 3 L21 8 L12 13 L3 8 Z" /><path d="M3 13 L12 18 L21 13" /><path d="M3 17 L12 22 L21 17" opacity="0.5" /></>,
    flag: <><path d="M5 21 V4" /><path d="M5 4 H17 L14 8 L17 12 H5" /></>,
    ticket: <><path d="M3 8 V6 H21 V8 A2 2 0 0 0 21 12 V14 A2 2 0 0 0 21 18 V20 H3 V18 A2 2 0 0 0 3 14 V12 A2 2 0 0 0 3 8 Z" /><path d="M14 6 V20" strokeDasharray="2 2" /></>,
    flame: <><path d="M12 22 C7 22 5 18 5 15 C5 12 8 11 9 8 C9 6 8 4 9 3 C11 5 13 6 14 9 C15 7 16 6 17 6 C16 9 19 11 19 15 C19 18 17 22 12 22 Z" /></>,
    alert: <><path d="M12 3 L22 20 H2 Z" /><path d="M12 10 V14" /><circle cx="12" cy="17" r="0.8" fill={color} /></>,
    bookmark: <><path d="M6 3 H18 V21 L12 17 L6 21 Z" /></>,
    rocket: <><path d="M12 2 C16 5 18 9 18 13 V18 L15 21 H9 L6 18 V13 C6 9 8 5 12 2 Z" /><circle cx="12" cy="11" r="2" fill={color} fillOpacity="0.3" /><path d="M9 18 L7 22" /><path d="M15 18 L17 22" /></>,
  };
  return <svg {...common}>{paths[name] || paths.target}</svg>;
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
    </div>
  );
}

window.Landing = Landing;
window.Logo = Logo;

// ── Theme toggle (sun / moon, animated) ────────────────────────
function ThemeToggle() {
  const getTheme = () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'dark';
  const [theme, setThemeState] = React.useState(getTheme());

  React.useEffect(() => {
    // Re-sync if the parent (TweaksPanel) changes the theme.
    const obs = new MutationObserver(() => setThemeState(getTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setThemeState(next);
    // Persist via the tweaks host (so it survives a reload).
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: next } }, '*'); } catch (e) {}
  };

  const isDark = theme === 'dark';
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      style={{
        width: 64, height: 32, borderRadius: 999,
        background: isDark ? 'var(--bg-2)' : 'var(--bg-1)',
        border: '1px solid var(--line-2)',
        position: 'relative', cursor: 'pointer', padding: 0,
        display: 'flex', alignItems: 'center',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
        transition: 'background .25s',
      }}>
      {/* track icons */}
      <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', opacity: isDark ? 0.4 : 0, transition: 'opacity .2s', fontSize: 11 }}>🌙</span>
      <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', opacity: isDark ? 0 : 0.5, transition: 'opacity .2s', fontSize: 11 }}>☀</span>
      {/* thumb */}
      <span style={{
        position: 'absolute', top: 3, left: isDark ? 3 : 35,
        width: 26, height: 26, borderRadius: '50%',
        background: isDark
          ? 'linear-gradient(135deg, var(--accent), var(--accent-2))'
          : 'linear-gradient(135deg, oklch(0.95 0.10 90), oklch(0.85 0.16 65))',
        boxShadow: isDark
          ? '0 0 12px color-mix(in oklch, var(--accent) 50%, transparent)'
          : '0 2px 8px rgba(0,0,0,0.18)',
        transition: 'left .25s cubic-bezier(.4,0,.2,1), background .25s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13,
      }}>
        {isDark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a1f24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8 A9 9 0 1 1 11.2 3 a7 7 0 0 0 9.8 9.8 Z" fill="#0a1f24" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a2a10" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" fill="#3a2a10" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
          </svg>
        )}
      </span>
    </button>
  );
}

window.ThemeToggle = ThemeToggle;

// ── Language switcher (UZ / РУ / ЎЗ) ───────────────────────────
function LangSwitch({ lang }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const langs = [
    { code: 'uz', label: "O'zbek", short: 'UZ', flag: '🇺🇿' },
    { code: 'cy', label: 'Ўзбекча', short: 'ЎЗ', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', short: 'РУ', flag: '🇷🇺' },
  ];
  const current = langs.find((l) => l.code === lang) || langs[0];

  const setLang = (code) => {
    setOpen(false);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { lang: code } }, '*'); } catch (e) {}
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 12px', borderRadius: 999,
          border: '1px solid var(--line-2)', background: 'var(--bg-2)',
          color: 'var(--fg-0)', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
          transition: 'border-color .15s',
        }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12 H21 M12 3 a14 14 0 0 1 0 18 M12 3 a14 14 0 0 0 0 18" />
        </svg>
        {current.short}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
          <path d="M2 4 L6 8 L10 4" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          minWidth: 180, padding: 6,
          background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: 12,
          boxShadow: '0 12px 32px rgba(0,0,0,0.4)', zIndex: 30,
        }}>
          {langs.map((l) => (
            <button key={l.code} onClick={() => setLang(l.code)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '10px 12px', borderRadius: 8,
                background: l.code === lang ? 'color-mix(in oklch, var(--accent) 14%, transparent)' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                color: 'var(--fg-0)', fontFamily: 'var(--font-body)', fontSize: 13,
              }}
              onMouseEnter={(e) => { if (l.code !== lang) e.currentTarget.style.background = 'var(--bg-2)'; }}
              onMouseLeave={(e) => { if (l.code !== lang) e.currentTarget.style.background = 'transparent'; }}>
              <span style={{ fontSize: 16 }}>{l.flag}</span>
              <span style={{ flex: 1, fontWeight: l.code === lang ? 600 : 500 }}>{l.label}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>{l.short}</span>
              {l.code === lang && <span style={{ color: 'var(--accent)', fontSize: 14 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

window.LangSwitch = LangSwitch;

// ── Contact / Murojaat modal ───────────────────────────────────
function ContactModal({ lang, L, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const profiles = [
    {
      name: 'Aziz Saidov',
      role: L('Asoschisi · Bosh murabbiy', 'Асосчиси · Бош мураббий', 'Основатель · гл. инструктор'),
      handle: '@aziz_saidov',
      url: 'https://t.me/aziz_saidov',
      online: true, primary: true,
      initials: 'AS',
    },
    {
      name: L('Yordam xizmati', 'Ёрдам хизмати', 'Поддержка'),
      role: L('Texnik yordam · Toʻlovlar', 'Техник ёрдам · Тўловлар', 'Техподдержка · оплаты'),
      handle: '@avtoimtihon_support',
      url: 'https://t.me/avtoimtihon_support',
      online: true,
      initials: 'SP',
    },
  ];

  return (
    <div onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(8, 12, 18, 0.7)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        padding: 24,
      }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{
          width: 480, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto',
          background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: 20,
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          fontFamily: 'var(--font-body)', color: 'var(--fg-0)',
        }}>
        {/* Header */}
        <div style={{
          padding: '24px 26px', borderBottom: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'radial-gradient(60% 100% at 100% 0%, color-mix(in oklch, oklch(0.72 0.16 230) 14%, transparent), transparent 65%)',
          borderRadius: '20px 20px 0 0',
        }}>
          <div>
            <div className="overline" style={{ marginBottom: 6, color: 'oklch(0.78 0.14 230)' }}>{L('MUROJAAT', 'МУРОЖААТ', 'СВЯЗАТЬСЯ')}</div>
            <div className="h-display" style={{ fontSize: 22, fontWeight: 600 }}>
              {L('Telegram orqali yozing', 'Telegram орқали ёзинг', 'Напишите в Telegram')}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close"
            style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'var(--bg-2)', border: '1px solid var(--line)',
              color: 'var(--fg-1)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontFamily: 'var(--font-mono)',
            }}>✕</button>
        </div>

        {/* Body — Telegram profiles */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {profiles.map((p) => (
            <a key={p.handle} href={p.url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 18px', borderRadius: 14,
                background: p.primary
                  ? 'radial-gradient(80% 100% at 100% 0%, color-mix(in oklch, oklch(0.72 0.16 230) 14%, transparent), transparent 65%), var(--bg-2)'
                  : 'var(--bg-2)',
                border: '1px solid ' + (p.primary ? 'color-mix(in oklch, oklch(0.72 0.16 230) 28%, var(--line))' : 'var(--line)'),
                color: 'var(--fg-0)', textDecoration: 'none',
                transition: 'transform .15s, border-color .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'oklch(0.72 0.16 230)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}>
              {/* avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: p.primary
                    ? 'linear-gradient(135deg, oklch(0.72 0.16 230), oklch(0.78 0.14 195))'
                    : 'linear-gradient(135deg, oklch(0.72 0.10 280), oklch(0.65 0.14 300))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18,
                }}>{p.initials}</div>
                {p.online && (
                  <span style={{
                    position: 'absolute', right: 0, bottom: 0,
                    width: 14, height: 14, borderRadius: '50%',
                    background: 'var(--success)', border: '2.5px solid var(--bg-2)',
                  }}></span>
                )}
              </div>
              {/* info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</span>
                  {p.primary && <span style={{ color: 'oklch(0.72 0.16 230)', fontSize: 14 }} title="Verified">●</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginBottom: 4 }}>{p.role}</div>
                <div className="mono" style={{ fontSize: 12, color: 'oklch(0.72 0.16 230)' }}>{p.handle}</div>
              </div>
              {/* CTA */}
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'linear-gradient(135deg, oklch(0.72 0.16 230), oklch(0.62 0.18 240))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M9.78 18.65 10.06 14.42 17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3 3.64 12.01C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3 10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z"/>
                </svg>
              </div>
            </a>
          ))}

          {/* Other contacts */}
          <div style={{
            marginTop: 6, padding: '14px 16px', borderRadius: 12,
            background: 'var(--bg-0)', border: '1px solid var(--line)',
          }}>
            <div className="overline" style={{ marginBottom: 10 }}>{L("BOSHQA YOʻLLAR", 'БОШҚА ЙЎЛЛАР', 'ДРУГИЕ КАНАЛЫ')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="mailto:hello@avtoimtihon.uz" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-1)', fontSize: 13, textDecoration: 'none' }}>
                <span style={{ width: 24, fontSize: 14 }}>✉</span>
                <span className="mono">hello@avtoimtihon.uz</span>
              </a>
              <a href="tel:+998901234567" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-1)', fontSize: 13, textDecoration: 'none' }}>
                <span style={{ width: 24, fontSize: 14 }}>☎</span>
                <span className="mono">+998 90 123 45 67</span>
              </a>
              <a href="https://t.me/avtoimtihon_uz" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-1)', fontSize: 13, textDecoration: 'none' }}>
                <span style={{ width: 24, fontSize: 14 }}>📢</span>
                <span className="mono">@avtoimtihon_uz · {L('kanal', 'канал', 'канал')}</span>
              </a>
            </div>
          </div>

          <div style={{ fontSize: 11, color: 'var(--fg-3)', textAlign: 'center', paddingTop: 4 }}>
            {L("Odatda 30 daqiqa ichida javob beriladi · 09:00–22:00", 'Одатда 30 дақиқа ичида жавоб берилади · 09:00–22:00', 'Обычно отвечаем в течение 30 минут · 09:00–22:00')}
          </div>
        </div>
      </div>
    </div>
  );
}

window.ContactModal = ContactModal;
