/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// LandingV3 — Quiz-page matching style
// Dark blue (#0b1220) bg, blue accents, clean tabular cards
// Same toolbar pattern as Quiz: red exit / title / blue timer-pill / lang
// ───────────────────────────────────────────────────────────────

function LandingV3({ t, lang = 'uz' }) {
  const L = (uz, cy, ru) => lang === 'ru' ? ru : lang === 'cy' ? cy : uz;

  const sections = [
    { key: 'real20', label: L('Real imtihon · 20', 'Реал имтиҳон · 20', 'Реальный · 20'),
      sub: L('20 savol · 25 daqiqa · 18/20 oʻtish bali', '20 савол · 25 дақиқа · 18/20', '20 вопросов · 25 минут · 18/20'),
      icon: 'play', count: '234', countLbl: L('bugun', 'бугун', 'сегодня'), tone: 'blue', primary: true },
    { key: 'real50', label: L('Real imtihon · 50', 'Реал имтиҳон · 50', 'Реальный · 50'),
      sub: L('50 savol · 50 daqiqa · 45/50 oʻtish bali', '50 савол · 50 дақиқа · 45/50', '50 вопросов · 50 минут · 45/50'),
      icon: 'target', count: '127', countLbl: L('bugun', 'бугун', 'сегодня'), tone: 'blue' },
    { key: 'tickets', label: L('Imtihon biletlari', 'Имтиҳон билетлари', 'Билеты'),
      sub: L('62 bilet · har biri 20 savol', '62 билет · ҳар бири 20 савол', '62 билета · по 20 вопросов'),
      icon: 'ticket', count: '12/62', countLbl: L('yakunlangan', 'якунланган', 'завершено'), tone: 'amber' },
    { key: 'topics', label: L('Mavzulashtirilgan testlar', 'Мавзулаштирилган тестлар', 'Тематические тесты'),
      sub: L('18 mavzu · 1–200 savolgacha', '18 мавзу · 1–200 саволгача', '18 тем · 1–200 вопросов'),
      icon: 'layers', count: '4/18', countLbl: L('oʻrganildi', 'ўрганилди', 'пройдено'), tone: 'green' },
    { key: 'topic-exam', label: L("Mavzular boʻyicha imtihon", 'Мавзулар бўйича имтиҳон', 'Экзамен по теме'),
      sub: L('Bitta mavzudan 20 ta savol', 'Битта мавзудан 20 та савол', '20 вопросов из одной темы'),
      icon: 'flag', count: '18', countLbl: L('mavzu', 'мавзу', 'тем'), tone: 'green' },
    { key: 'popular-mistakes', label: L('Ommabop xatoliklar', 'Оммабоп хатоликлар', 'Частые ошибки'),
      sub: L('Eng koʻp xato qilingan top 50 savol', 'Энг кўп хато қилинган топ 50 савол', 'Топ 50 ошибочных вопросов'),
      icon: 'flame', count: '50', countLbl: L('savol', 'савол', 'вопросов'), tone: 'red' },
    { key: 'my-mistakes', label: L('Mening xato savollarim', 'Менинг хато саволларим', 'Мои ошибки'),
      sub: L('Avval xato qilganlarni qaytarish', 'Аввал хато қилганларни қайтариш', 'Повторить свои ошибки'),
      icon: 'alert', count: '47', countLbl: L('xato', 'хато', 'ошибок'), tone: 'red' },
    { key: 'saved', label: L('Saqlangan savollar', 'Сақланган саволлар', 'Сохранённые'),
      sub: L("Belgi qoʻyib qoldirilgan savollar", 'Белги қўйиб қолдирилган саволлар', 'Закладки'),
      icon: 'bookmark', count: '23', countLbl: L('savol', 'савол', 'вопросов'), tone: 'cyan' },
  ];

  const TONES = {
    blue:  { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(80,140,220,0.35)', fg: '#60a5fa', solid: '#3b82f6' },
    green: { bg: 'rgba(40,160,80,0.15)',   border: 'rgba(40,200,100,0.35)', fg: '#7adf9a', solid: '#28a050' },
    red:   { bg: 'rgba(220,40,40,0.15)',   border: 'rgba(220,60,60,0.35)',  fg: '#ff8a8a', solid: '#dc2828' },
    amber: { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.35)', fg: '#fcd34d', solid: '#f59e0b' },
    cyan:  { bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.35)',  fg: '#67e8f9', solid: '#06b6d4' },
  };

  return (
    <div data-screen-label="Landing v3 — Quiz-style" style={{ width: 1280, minHeight: 900, background: '#0b1220', color: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>

      {/* ── Top toolbar (matches Quiz exactly) ────────────── */}
      <header style={{
        padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
        background: '#0b1220', borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <button style={{
          padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,80,80,0.4)',
          background: 'rgba(220,40,40,0.18)', color: '#ff8a8a', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>{L('Chiqish', 'Чиқиш', 'Выход')}</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 4 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M3 13 L3 11 Q3 9 5 9 L7 9 L9 5 L13 5 L15 9 L16 9 Q17 9 17 11 L17 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="6" cy="13" r="1.5" fill="#fff" /><circle cx="14" cy="13" r="1.5" fill="#fff" />
            </svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>avtoimtihon.uz</div>
        </div>

        {/* Streak pill — same shape as quiz timer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12,
          padding: '8px 14px', borderRadius: 10,
          border: '1px solid rgba(80,160,255,0.4)', background: 'rgba(30,80,180,0.15)',
          color: '#a8c8ff', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
        }}>
          <span style={{ fontSize: 14 }}>🔥</span> 12 {L('kun streak', 'кун streak', 'дн streak')}
        </div>

        {/* XP pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 10,
          border: '1px solid rgba(40,200,100,0.35)', background: 'rgba(40,160,80,0.12)',
          color: '#7adf9a', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
        }}>
          ★ 1 250 XP
        </div>

        {/* Lang dropdown */}
        <button style={{
          padding: '8px 14px', borderRadius: 10,
          border: '1px solid rgba(80,140,220,0.35)', background: 'rgba(30,70,150,0.18)',
          color: '#a8c8ff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto',
        }}>
          {lang === 'ru' ? 'Русский' : lang === 'cy' ? 'Узб кирил' : "O'zbek"}
          <span style={{ fontSize: 9 }}>▾</span>
        </button>

        {/* PRO badge */}
        <div style={{
          padding: '8px 14px', borderRadius: 10,
          border: '1px solid rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.12)',
          color: '#fcd34d', fontSize: 13, fontWeight: 600,
        }}>● PRO · 14 {L('kun', 'кун', 'дн')}</div>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 13,
        }}>AS</div>
      </header>

      {/* ── Welcome banner (matches Quiz question banner) ─── */}
      <div style={{
        padding: '22px 28px',
        background: 'linear-gradient(180deg, #0e2447, #0c1d3b)',
        borderBottom: '1px solid rgba(80,140,220,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: '#a8c8ff', marginBottom: 6 }}>
            ● {L('XUSH KELIBSIZ, AZIZ', 'ХУШ КЕЛИБСИЗ, АЗИЗ', 'ПРИВЕТ, AZIZ')}
          </div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.35, letterSpacing: '-0.005em' }}>
            {L("Bugun ham mashqni davom ettiring — keyingi imtihongizgacha 6 kun.", 'Бугун ҳам машқни давом эттиринг — кейинги имтиҳонгизгача 6 кун.', 'Продолжайте тренировку — до следующего экзамена 6 дней.')}
          </h2>
        </div>
        <button style={{
          padding: '14px 24px', borderRadius: 10,
          background: '#3b82f6', color: '#fff',
          border: '1px solid #60a5fa', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
          boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
        }}>
          ▶ {L('Real imtihonni boshlash', 'Реал имтиҳонни бошлаш', 'Начать экзамен')}
        </button>
      </div>

      {/* ── Body (matches quiz body padding & gap) ────────── */}
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Section title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)' }}>
              {L("BOʻLIMLAR", 'БЎЛИМЛАР', 'РАЗДЕЛЫ')}
            </div>
            <h3 style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 600, color: '#fff' }}>
              {L('Test rejimini tanlang', 'Тест режимини танланг', 'Выберите режим теста')}
            </h3>
          </div>
          {/* Filter pills (echo quiz's question pills) */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[L('Hammasi','Ҳаммаси','Все'), L('Real','Реал','Реальные'), L('Mavzu','Мавзу','Темы'), L('Bilet','Билет','Билеты')].map((p, i) => (
              <button key={i} style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                fontFamily: 'var(--font-mono)', cursor: 'pointer',
                border: '1.5px solid ' + (i === 0 ? '#3b82f6' : 'rgba(255,255,255,0.1)'),
                background: i === 0 ? '#3b82f6' : '#1a2538',
                color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)',
              }}>{p}</button>
            ))}
          </div>
        </div>

        {/* ── 2-col grid of section cards (matches quiz body grid) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {sections.map((s) => {
            const tone = TONES[s.tone];
            return (
              <button key={s.key} style={{
                padding: 0, borderRadius: 14, overflow: 'hidden',
                background: '#1a2538', border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer', textAlign: 'left', font: 'inherit', color: '#fff',
                display: 'flex', alignItems: 'stretch',
                transition: 'all .15s',
                ...(s.primary ? {
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.18), #1a2538 60%)',
                  border: '1px solid rgba(80,140,220,0.45)',
                } : {}),
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = tone.border; e.currentTarget.style.background = s.primary ? 'linear-gradient(135deg, rgba(59,130,246,0.25), #1f2c44 60%)' : '#1f2c44'; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = s.primary ? 'rgba(80,140,220,0.45)' : 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = s.primary ? 'linear-gradient(135deg, rgba(59,130,246,0.18), #1a2538 60%)' : '#1a2538';
              }}>

                {/* LEFT: colored icon block (echoes quiz F1 keys) */}
                <div style={{
                  width: 72, flexShrink: 0,
                  background: tone.bg,
                  borderRight: '1px solid ' + tone.border,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <V3Icon name={s.icon} color={tone.fg} size={28} />
                </div>

                {/* CENTER: title + subtitle */}
                <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h4 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#fff', letterSpacing: '-0.005em' }}>
                      {s.label}
                    </h4>
                    {s.primary && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 4,
                        background: '#3b82f6', color: '#fff', fontFamily: 'var(--font-mono)',
                      }}>{L('TAVSIYA', 'ТАВСИЯ', 'РЕК.')}</span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>{s.sub}</p>
                </div>

                {/* RIGHT: count pill + arrow */}
                <div style={{
                  flexShrink: 0, padding: '18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                  minWidth: 110,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700,
                    color: tone.fg, letterSpacing: '-0.01em',
                  }}>{s.count}</div>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                    {s.countLbl}
                  </div>
                  <div style={{ marginTop: 'auto', color: tone.fg, fontSize: 16 }}>→</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Bottom row: progress + tg-bot (matches quiz explanation block) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginTop: 8 }}>

          {/* Progress card */}
          <div style={{
            padding: 20, borderRadius: 14,
            background: 'rgba(40,160,80,0.08)',
            border: '1px solid rgba(40,200,100,0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontWeight: 600, color: '#7adf9a', fontSize: 13 }}>
              ✓ {L('Sizning natijangiz', 'Сизнинг натижангиз', 'Ваш прогресс')}
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
                {L("OXIRGI 7 KUN", 'ОХИРГИ 7 КУН', 'ПОСЛЕДНИЕ 7 ДНЕЙ')}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { v: '142', l: L('savol yechildi', 'савол ечилди', 'решено') },
                { v: '87%', l: L("oʻrtacha aniqlik", 'ўртача аниқлик', 'средняя точность') },
                { v: '8', l: L('imtihon bajarildi', 'имтиҳон бажарилди', 'экзаменов') },
                { v: '+18', l: L('reyting oʻsdi', 'рейтинг ўсди', 'рост рейтинга') },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Telegram bot CTA */}
          <div style={{
            padding: 20, borderRadius: 14,
            background: 'rgba(59,130,246,0.10)',
            border: '1px solid rgba(80,140,220,0.35)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path d="M9.78 18.65 10.06 14.42 17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3 3.64 12.01C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3 10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: '#a8c8ff', marginBottom: 3 }}>TELEGRAM BOT</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>@avtoimtihon_uz_bot</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{L('Telegramda ham mashq qiling', 'Telegramда ҳам машқ қилинг', 'Тренируйтесь в Telegram')}</div>
            </div>
            <a href="https://t.me/avtoimtihon_uz_bot" target="_blank" rel="noopener noreferrer" style={{
              padding: '8px 14px', borderRadius: 8,
              background: '#3b82f6', color: '#fff',
              fontSize: 13, fontWeight: 600, textDecoration: 'none', flexShrink: 0,
            }}>{L("Ulanish", 'Уланиш', 'Подкл.')} →</a>
          </div>
        </div>

        {/* Footer hint (echoes quiz F1...F6 hint) */}
        <div style={{
          marginTop: 4, fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', textAlign: 'center',
        }}>
          1…8 · {L("ENTER tanlash · ESC chiqish", 'ENTER танлаш · ESC чиқиш', 'ENTER выбор · ESC выход')}
        </div>
      </div>
    </div>
  );
}

function V3Icon({ name, color, size = 24 }) {
  const c = color, sw = 2;
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: c, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    play: <><polygon points="6,4 20,12 6,20" fill={c} fillOpacity="0.2" /><polygon points="6,4 20,12 6,20" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.8" fill={c} /></>,
    layers: <><path d="M12 3 L21 8 L12 13 L3 8 Z" fill={c} fillOpacity="0.2" /><path d="M12 3 L21 8 L12 13 L3 8 Z" /><path d="M3 13 L12 18 L21 13" /><path d="M3 17 L12 22 L21 17" opacity="0.6" /></>,
    flag: <><path d="M5 21 V4" /><path d="M5 4 H17 L14 8 L17 12 H5" fill={c} fillOpacity="0.2" /><path d="M5 4 H17 L14 8 L17 12 H5" /></>,
    ticket: <><path d="M3 8 V6 H21 V8 A2 2 0 0 0 21 12 V14 A2 2 0 0 0 21 18 V20 H3 V18 A2 2 0 0 0 3 14 V12 A2 2 0 0 0 3 8 Z" fill={c} fillOpacity="0.15" /><path d="M3 8 V6 H21 V8 A2 2 0 0 0 21 12 V14 A2 2 0 0 0 21 18 V20 H3 V18 A2 2 0 0 0 3 14 V12 A2 2 0 0 0 3 8 Z" /><path d="M14 6 V20" strokeDasharray="2 2" /></>,
    flame: <><path d="M12 22 C7 22 5 18 5 15 C5 12 8 11 9 8 C9 6 8 4 9 3 C11 5 13 6 14 9 C15 7 16 6 17 6 C16 9 19 11 19 15 C19 18 17 22 12 22 Z" fill={c} fillOpacity="0.2" /><path d="M12 22 C7 22 5 18 5 15 C5 12 8 11 9 8 C9 6 8 4 9 3 C11 5 13 6 14 9 C15 7 16 6 17 6 C16 9 19 11 19 15 C19 18 17 22 12 22 Z" /></>,
    alert: <><path d="M12 3 L22 20 H2 Z" fill={c} fillOpacity="0.18" /><path d="M12 3 L22 20 H2 Z" /><path d="M12 10 V14" /><circle cx="12" cy="17" r="0.8" fill={c} /></>,
    bookmark: <><path d="M6 3 H18 V21 L12 17 L6 21 Z" fill={c} fillOpacity="0.22" /><path d="M6 3 H18 V21 L12 17 L6 21 Z" /></>,
  };
  return <svg {...common}>{paths[name] || paths.target}</svg>;
}

window.LandingV3 = LandingV3;
