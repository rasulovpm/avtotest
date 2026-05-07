/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// Catalog, Results, Progress, Signs Library, Auth, Pricing
// All in one file for compactness.
// ───────────────────────────────────────────────────────────────

// ── Catalog ────────────────────────────────────────────────────
function Catalog({ t, lang }) {
  const L = (uz, cy, ru) => lang === 'ru' ? ru : lang === 'cy' ? cy : uz;

  // The 6 main sections
  const sections = [
    {
      key: 'real20',
      sign: 'priority-main',
      title: L("Real imtihon", 'Реал имтиҳон', 'Реальный экзамен'),
      sub: L('20 ta savol · 25 daqiqa · 18/20 to\'g\'ri', '20 та савол · 25 дақиқа · 18/20 тўғри', '20 вопросов · 25 минут · 18/20 верных'),
      meta: L("Haqiqiy imtihon sharoitida", 'Ҳақиқий имтиҳон шароитида', 'В реальных условиях экзамена'),
      stat: L('Bugun: 234 yechilgan', 'Бугун: 234 ечилган', 'Сегодня: 234 решено'),
      cta: L('Imtihonni boshlash', 'Имтиҳонни бошлаш', 'Начать экзамен'),
      accent: true, big: true,
    },
    {
      key: 'real50',
      sign: 'mandatory-roundabout',
      title: L('Real imtihon · 50', 'Реал имтиҳон · 50', 'Реальный экзамен · 50'),
      sub: L('50 ta savol · 50 daqiqa · chuqurroq tayyorgarlik', '50 та савол · 50 дақиқа · чуқурроқ тайёргарлик', '50 вопросов · 50 минут · углублённая подготовка'),
      meta: L("Tayyorgarlikning yaxshi varianti", 'Тайёргарликнинг яхши варианти', 'Лучший вариант для подготовки'),
      stat: L("O'rtacha ball: 45/50", 'Ўртача балл: 45/50', 'Средний балл: 45/50'),
      cta: L('Imtihonni boshlash', 'Имтиҳонни бошлаш', 'Начать экзамен'),
      big: true,
    },
    {
      key: 'tickets',
      sign: 'warning-pedestrian',
      title: L('Imtihon biletlari', 'Имтиҳон билетлари', 'Экзаменационные билеты'),
      sub: L('62 bilet · har bilet 20 savol', '62 билет · ҳар билет 20 савол', '62 билета · по 20 вопросов'),
      stat: L('12/62 bilet yakunlangan', '12/62 билет якунланган', '12/62 билетов завершено'),
      cta: L("Biletlarni ko'rish", 'Билетларни кўриш', 'Открыть билеты'),
      progress: 30,
    },
    {
      key: 'topics',
      sign: 'info-hospital',
      title: L('Mavzulashtirilgan testlar', 'Мавзулаштирилган тестлар', 'Тематические тесты'),
      sub: L("18 mavzu · har mavzuda 1–200 ta savol", "18 мавзу · ҳар мавзуда 1–200 та савол", '18 тем · от 1 до 200 вопросов в теме'),
      stat: L("4/18 mavzu o'rganilgan", '4/18 мавзу ўрганилган', '4/18 тем изучено'),
      cta: L("Mavzularni tanlash", 'Мавзуларни танлаш', 'Выбрать тему'),
      progress: 22,
    },
    {
      key: 'mistakes',
      sign: 'prohibit-no-overtake',
      title: L("Xato belgilagan savollarim", 'Хато белгилаган саволларим', 'Мои ошибки'),
      sub: L("Avval xato bo'lgan savollarni qaytadan ishlash", "Аввал хато бўлган саволларни қайтадан ишлаш", "Повторить вопросы, в которых ошиблись"),
      stat: L('47 ta xato savol', '47 та хато савол', '47 вопросов с ошибками'),
      cta: L("Xatolarni qaytarish", 'Хатоларни қайтариш', 'Повторить ошибки'),
      pill: { label: '47', tone: 'error' },
    },
    {
      key: 'saved',
      sign: 'prohibit-speed',
      title: L('Saqlanganlar', 'Сақланганлар', 'Сохранённые'),
      sub: L("Belgi qo'yib qoldirgan savollaringiz", "Белги қўйиб қолдирган саволларингиз", 'Вопросы, отмеченные закладкой'),
      stat: L('23 ta saqlangan savol', '23 та сақланган савол', '23 сохранённых вопроса'),
      cta: L('Saqlanganlarni ochish', 'Сақланганларни очиш', 'Открыть сохранённые'),
      pill: { label: '23', tone: 'lime' },
    },
  ];

  return (
    <div style={{ width: 1280, padding: 48, background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <div style={{ marginBottom: 36 }}>
        <div className="overline" style={{ marginBottom: 12 }}>02 · CATALOG</div>
        <h1 className="h-display h2" style={{ margin: 0, marginBottom: 8 }}>
          {L("O'qish bo'limlari", "Ўқиш бўлимлари", "Разделы обучения")}
        </h1>
        <p style={{ color: 'var(--fg-1)', margin: 0, fontSize: 16, maxWidth: 720 }}>
          {L(
            "Tayyorgarlikning har bir bosqichi uchun alohida rejim. Real imtihon — haqiqiy sharoit; biletlar va mavzular — to‘liq qamrov; xatolar va saqlanganlar — kuchsiz nuqtalarga qaytish.",
            "Тайёргарликнинг ҳар бир босқичи учун алоҳида режим.",
            "Отдельный режим для каждого этапа подготовки. Реальный экзамен, билеты и темы, ошибки и закладки.",
          )}
        </p>
      </div>

      {/* TWO BIG cards on top — Real 20 + Real 50 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {sections.filter(s => s.big).map((s) => (
          <div key={s.key} className={"bento" + (s.accent ? ' bento--accent' : '')} style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', overflow: 'hidden' }}>
            {s.accent && (
              <div style={{ position: 'absolute', top: 24, right: 24 }}>
                <span className="chip" style={{ background: 'var(--accent)', color: '#0a1f24', borderColor: 'var(--accent)', fontSize: 11, fontWeight: 700 }}>
                  ● {L('TAVSIYA', 'ТАВСИЯ', 'РЕКОМЕНДУЕМ')}
                </span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ background: 'var(--bg-0)', borderRadius: 14, padding: 14, border: '1px solid var(--line)' }}>
                <RoadSign kind={s.sign} size={64} />
              </div>
              <div>
                <div className="overline" style={{ marginBottom: 6 }}>{s.meta}</div>
                <div className="h-display" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.15 }}>{s.title}</div>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5 }}>{s.sub}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
              <button className="btn btn--primary" style={{ flex: 1, justifyContent: 'center' }}>{s.cta} →</button>
              <span className="chip mono" style={{ fontSize: 11, padding: '6px 10px' }}>{s.stat}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FOUR cards below — tickets, topics, mistakes, saved */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {sections.filter(s => !s.big).map((s) => (
          <div key={s.key} className="bento" style={{ padding: 26, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--bg-2)', borderRadius: 12, padding: 12, border: '1px solid var(--line)', flexShrink: 0 }}>
              <RoadSign kind={s.sign} size={48} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div className="h-display" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.25 }}>{s.title}</div>
                {s.pill && (
                  <span className={"chip " + (s.pill.tone === 'error' ? 'chip--error' : 'chip--lime')} style={{ fontSize: 11, padding: '5px 10px', flexShrink: 0 }}>
                    {s.pill.label}
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5 }}>{s.sub}</p>
              {s.progress != null && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                    <span>{s.stat}</span>
                    <span>{s.progress}%</span>
                  </div>
                  <div className="progress"><span style={{ width: s.progress + '%' }}></span></div>
                </div>
              )}
              {s.progress == null && (
                <div className="overline" style={{ color: 'var(--fg-2)' }}>{s.stat}</div>
              )}
              <button className="btn btn--ghost" style={{ alignSelf: 'flex-start', fontSize: 13, padding: '8px 14px', marginTop: 4 }}>
                {s.cta} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Results ────────────────────────────────────────────────────
function Results({ t, lang, mode = 'passed' }) {
  // mode: 'passed' (18/20) or 'failed' (12/20)
  const total = 20;
  const score = mode === 'passed' ? 18 : 12;
  const passing = 18;
  const passed = score >= passing;
  const pct = Math.round((score / total) * 100);
  const r = 80, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const ringColor = passed ? 'url(#gr)' : 'oklch(0.68 0.22 25)';
  const wrong = total - score;
  const correctPct = Math.round((score / total) * 100);
  const wrongPct = 100 - correctPct;

  const headline = passed
    ? (lang === 'ru' ? 'Поздравляем — вы сдали!' : lang === 'cy' ? 'Табриклаймиз — ўтдингиз!' : "Tabriklaymiz — siz o'tdingiz!")
    : (lang === 'ru' ? 'К сожалению, не сдали' : lang === 'cy' ? 'Афсус, ўтолмадингиз' : "Afsuski, o'tolmadingiz");
  const sub = passed
    ? (lang === 'ru' ? 'Отличный результат. Вы готовы к экзамену.' : "Ajoyib natija. Imtihon uchun tayyorsiz.")
    : (lang === 'ru' ? `Нужно ${passing}/${total} верных. Вы получили ${score}. Повторите ошибки и попробуйте снова.` : `O'tish uchun ${passing}/${total} kerak edi. Siz ${score} ta to'g'ri javob berdingiz. Xatolarni qaytaring va qayta urinib ko'ring.`);

  return (
    <div style={{ width: 1280, padding: 48, background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="overline" style={{ marginBottom: 8 }}>04 · RESULTS · {passed ? 'PASSED' : 'FAILED'}</div>
          <h1 className="h-display h2" style={{ margin: 0, color: passed ? 'var(--fg-0)' : 'oklch(0.78 0.18 25)' }}>
            {headline} {passed ? '🎉' : ''}
          </h1>
        </div>
        <span className={"chip " + (passed ? 'chip--lime' : 'chip--error')} style={{ fontSize: 13, padding: '7px 14px' }}>
          {passed ? '✓' : '✕'} {score}/{total}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Score circle */}
        <div className={"bento " + (passed ? 'bento--accent' : '')} style={{
          padding: 40, display: 'flex', alignItems: 'center', gap: 32,
          background: passed ? undefined : 'radial-gradient(60% 80% at 100% 0%, color-mix(in oklch, oklch(0.68 0.22 25) 18%, transparent), transparent 60%), var(--bg-1)',
          borderColor: passed ? undefined : 'color-mix(in oklch, oklch(0.68 0.22 25) 30%, var(--line))',
        }}>
          <div style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
            <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r={r} stroke="var(--bg-3)" strokeWidth="14" fill="none" />
              <circle cx="100" cy="100" r={r} stroke={ringColor} strokeWidth="14" fill="none"
                strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
              <defs>
                <linearGradient id="gr" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.18 195)" />
                  <stop offset="100%" stopColor="oklch(0.88 0.20 130)" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="h-display" style={{ fontSize: 56, fontWeight: 700, color: passed ? 'var(--fg-0)' : 'oklch(0.78 0.18 25)' }}>{pct}%</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--fg-2)' }}>{score} / {total}</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <span className={"chip " + (passed ? 'chip--lime' : 'chip--error')} style={{ marginBottom: 14 }}>
              {passed ? '✓ ' + t.results.passed.toUpperCase() : '✕ ' + (lang === 'ru' ? 'НЕ СДАН' : "O'TILMADI")}
            </span>
            <p style={{ color: 'var(--fg-1)', fontSize: 15, lineHeight: 1.5, marginTop: 14 }}>{sub}</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {passed ? (
                <>
                  <button className="btn btn--primary">{t.results.retry}</button>
                  <button className="btn btn--ghost">↗ {t.results.share}</button>
                </>
              ) : (
                <>
                  <button className="btn btn--primary">↻ {lang === 'ru' ? 'Пересдать' : 'Qaytadan urinish'}</button>
                  <button className="btn btn--ghost">{lang === 'ru' ? 'Разобрать ошибки' : "Xatolarni ko'rib chiqish"} →</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="bento" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="overline">{t.results.time.toUpperCase()}</div>
          <div>
            <div className="h-display" style={{ fontSize: 56, fontWeight: 700 }}>{passed ? '14:42' : '24:58'}</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 13 }}>{t.results.perQ}: <span className="mono">{passed ? '44s' : "1m 15s"}</span></div>
          </div>
          {!passed && (
            <div style={{ fontSize: 12, color: 'oklch(0.78 0.18 25)', display: 'flex', alignItems: 'center', gap: 6 }}>
              ⚠ {lang === 'ru' ? 'Время почти истекло' : "Vaqt deyarli tugadi"}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16, marginBottom: 16 }}>
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 8 }}>{lang === 'ru' ? 'ВЕРНО' : "TO'G'RI"}</div>
          <div className="h-display" style={{ fontSize: 44, fontWeight: 700, color: 'var(--success)' }}>{score}</div>
          <div style={{ color: 'var(--fg-2)', fontSize: 13 }}>{correctPct}%</div>
        </div>
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 8 }}>{lang === 'ru' ? 'НЕВЕРНО' : "XATO"}</div>
          <div className="h-display" style={{ fontSize: 44, fontWeight: 700, color: 'var(--error)' }}>{wrong}</div>
          <div style={{ color: 'var(--fg-2)', fontSize: 13 }}>{wrongPct}%</div>
        </div>
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 14 }}>{t.results.byCat}</div>
          {(passed
            ? [{ name: lang === 'ru' ? 'ПДД' : "Yo'l qoidalari", v: 90 }, { name: lang === 'ru' ? 'Знаки' : 'Belgilar', v: 95 }, { name: lang === 'ru' ? 'Техника' : 'Texnika', v: 80 }, { name: lang === 'ru' ? 'Медицина' : 'Tibbiy', v: 85 }]
            : [{ name: lang === 'ru' ? 'ПДД' : "Yo'l qoidalari", v: 70 }, { name: lang === 'ru' ? 'Знаки' : 'Belgilar', v: 55 }, { name: lang === 'ru' ? 'Техника' : 'Texnika', v: 40 }, { name: lang === 'ru' ? 'Медицина' : 'Tibbiy', v: 65 }]
          ).map((cat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ flex: '0 0 110px', fontSize: 13, color: 'var(--fg-1)' }}>{cat.name}</span>
              <div style={{ flex: 1, height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: cat.v + '%', height: '100%', background: cat.v < 60 ? 'var(--error)' : 'linear-gradient(90deg, var(--accent), var(--accent-2))' }}></div>
              </div>
              <span className="mono" style={{ fontSize: 12, color: cat.v < 60 ? 'var(--error)' : 'var(--fg-2)', flex: '0 0 36px', textAlign: 'right' }}>{cat.v}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bento" style={{ padding: 24 }}>
        <div className="overline" style={{ marginBottom: 14 }}>✕ {t.results.mistakes} ({wrong})</div>
        {(passed
          ? [{ n: 5, name: lang === 'ru' ? 'Сигналы светофора' : "Svetofor signallari", sign: 'warning-pedestrian' }, { n: 12, name: lang === 'ru' ? 'Тормозной путь' : 'Tormoz masofasi', sign: 'warning-slippery' }]
          : [{ n: 3, name: lang === 'ru' ? 'Дорожные знаки' : "Yo'l belgilari", sign: 'prohibit-no-entry' }, { n: 7, name: lang === 'ru' ? 'Светофор' : 'Svetofor', sign: 'warning-pedestrian' }, { n: 11, name: lang === 'ru' ? 'Поворот направо' : "Qayta burilish", sign: 'mandatory-roundabout' }, { n: 14, name: lang === 'ru' ? 'Тормозной путь' : 'Tormoz masofasi', sign: 'warning-slippery' }, { n: 18, name: lang === 'ru' ? 'Первая помощь' : 'Tibbiy yordam', sign: 'info-hospital' }]
        ).map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
            <RoadSign kind={m.sign} size={36} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>#{m.n}</span>
            <span style={{ flex: 1, fontSize: 14 }}>{m.name}</span>
            <button className="btn btn--ghost" style={{ fontSize: 12, padding: '6px 12px' }}>{t.results.view} →</button>
          </div>
        ))}
      </div>

      {/* Question grid — 20 cells, green/red overview */}
      <div className="bento" style={{ padding: 24, marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div className="overline">{lang === 'ru' ? '20 ВОПРОСОВ · ОБЗОР' : "20 SAVOL · UMUMIY KO'RINISH"}</div>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--success)', display: 'inline-block' }}></span>
              {lang === 'ru' ? 'ВЕРНО' : "TO'G'RI"}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--error)', display: 'inline-block' }}></span>
              {lang === 'ru' ? 'НЕВЕРНО' : "XATO"}
            </span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 6 }}>
          {Array.from({ length: total }).map((_, i) => {
            const failedIdx = [2, 6, 10, 13, 17, 1, 8, 15];
            const passedIdx = [4, 11];
            const wrongHere = (passed ? passedIdx : failedIdx).includes(i);
            return (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 8,
                background: wrongHere ? 'var(--error)' : 'var(--success)',
                color: wrongHere ? '#fff' : '#0a1f0e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
              }}>
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next steps — only when failed */}
      {!passed && (
        <div className="bento" style={{
          padding: 24, marginTop: 16,
          background: 'radial-gradient(60% 80% at 0% 0%, color-mix(in oklch, oklch(0.68 0.22 25) 12%, transparent), transparent 60%), var(--bg-1)',
          borderColor: 'color-mix(in oklch, oklch(0.68 0.22 25) 28%, var(--line))',
        }}>
          <div className="overline" style={{ marginBottom: 14, color: 'oklch(0.78 0.18 25)' }}>
            {lang === 'ru' ? '⚠ ЧТО ДАЛЬШЕ' : "⚠ KEYINGI QADAMLAR"}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { n: '01', t: lang === 'ru' ? 'Разберите ошибки' : "Xatolarni tahlil qiling", s: lang === 'ru' ? 'Каждый вопрос с пояснением и статьёй ПДД' : "Har bir savol tushuntirish va YHQ moddasi bilan", btn: lang === 'ru' ? 'Открыть' : "Ochish" },
              { n: '02', t: lang === 'ru' ? 'Слабые темы' : "Zaif mavzularni mashq qiling", s: lang === 'ru' ? 'Техника · Знаки · Дорожные ситуации' : "Texnika · Belgilar · Yo'l holatlari", btn: lang === 'ru' ? 'Начать' : "Boshlash" },
              { n: '03', t: lang === 'ru' ? 'Повторите экзамен' : "Imtihonni qaytarish", s: lang === 'ru' ? 'Когда будете готовы — попробуйте снова' : "Tayyor bo'lganda — qayta urinib ko'ring", btn: lang === 'ru' ? '↻ Пересдать' : "↻ Qaytadan" },
            ].map((step, i) => (
              <div key={i} style={{ padding: 18, borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 8 }}>{step.n}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{step.t}</div>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.5, marginBottom: 12 }}>{step.s}</p>
                <button className="btn btn--ghost" style={{ fontSize: 12, padding: '6px 12px' }}>{step.btn} →</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Progress ───────────────────────────────────────────────────
function Progress({ t, lang }) {
  const [range, setRange] = React.useState('week'); // 'week' | 'month'

  // Deterministic data — kunlik aktivlik (savol soni)
  const weekData = [
    { d: lang === 'ru' ? 'Пн' : 'Du', date: '01', q: 28, c: 22 },
    { d: lang === 'ru' ? 'Вт' : 'Se', date: '02', q: 45, c: 38 },
    { d: lang === 'ru' ? 'Ср' : 'Cho', date: '03', q: 12, c: 9 },
    { d: lang === 'ru' ? 'Чт' : 'Pa', date: '04', q: 60, c: 51 },
    { d: lang === 'ru' ? 'Пт' : 'Ju', date: '05', q: 38, c: 32 },
    { d: lang === 'ru' ? 'Сб' : 'Sha', date: '06', q: 80, c: 68 },
    { d: lang === 'ru' ? 'Вс' : 'Ya', date: '07', q: 22, c: 18, today: true },
  ];
  // 30 days — synthetic
  const monthData = Array.from({ length: 30 }).map((_, i) => {
    const seed = (i * 17 + 3) % 13;
    const q = Math.round(((seed / 13) * 70 + (i / 30) * 25 + (i % 7 === 0 ? 25 : 0)));
    return { d: String(i + 1), date: String(i + 1), q, c: Math.round(q * 0.84), today: i === 29 };
  });

  const data = range === 'week' ? weekData : monthData;
  const max = Math.max(...data.map((x) => x.q));
  const total = data.reduce((s, x) => s + x.q, 0);
  const totalCorrect = data.reduce((s, x) => s + x.c, 0);
  const accuracy = Math.round((totalCorrect / total) * 100);
  const avg = Math.round(total / data.length);

  return (
    <div style={{ width: 1280, padding: 48, background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <div style={{ marginBottom: 28 }}>
        <div className="overline" style={{ marginBottom: 8 }}>04 · PROGRESS</div>
        <h1 className="h-display h2" style={{ margin: 0 }}>{t.progress.title}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Chart — bar chart with week/month toggle */}
        <div className="bento" style={{ padding: 28, height: 320, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div className="overline" style={{ marginBottom: 4 }}>{lang === 'ru' ? 'ЕЖЕДНЕВНАЯ АКТИВНОСТЬ' : 'KUNDALIK AKTIVLIK'}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="h-display" style={{ fontSize: 28, fontWeight: 700 }}>{total}</span>
                <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{lang === 'ru' ? 'вопросов · точность' : "savol · aniqlik"} <span className="mono" style={{ color: 'var(--success)' }}>{accuracy}%</span></span>
              </div>
            </div>
            {/* Range toggle */}
            <div style={{ display: 'flex', gap: 0, padding: 3, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
              {[
                { k: 'week', l: lang === 'ru' ? '1 неделя' : '1 hafta' },
                { k: 'month', l: lang === 'ru' ? '1 месяц' : '1 oy' },
              ].map((r) => (
                <button key={r.k} onClick={() => setRange(r.k)}
                  style={{
                    padding: '6px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
                    background: range === r.k ? 'var(--bg-0)' : 'transparent',
                    color: range === r.k ? 'var(--fg-0)' : 'var(--fg-2)',
                    boxShadow: range === r.k ? '0 1px 2px rgba(0,0,0,0.4)' : 'none',
                    transition: 'all .15s',
                  }}>
                  {r.l}
                </button>
              ))}
            </div>
          </div>

          {/* Bars */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: range === 'week' ? 12 : 4, paddingTop: 18, position: 'relative' }}>
            {/* gridlines */}
            <div style={{ position: 'absolute', inset: '18px 0 22px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ borderTop: '1px dashed var(--line)', height: 0 }}></div>
              ))}
            </div>
            {data.map((b, i) => {
              const h = (b.q / max) * 100;
              const correctH = (b.c / b.q) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                  {/* value label only on hover-eligible — show on week always, every 5th on month */}
                  {(range === 'week' || (i + 1) % 5 === 0 || b.today) && (
                    <span className="mono" style={{ fontSize: 10, color: b.today ? 'var(--accent)' : 'var(--fg-2)', position: 'absolute', top: -2, fontWeight: 600 }}>{b.q}</span>
                  )}
                  {/* bar */}
                  <div style={{
                    width: '100%', maxWidth: range === 'week' ? 60 : 28,
                    height: `calc(${h}% - 18px)`, minHeight: 4,
                    borderRadius: '6px 6px 0 0',
                    background: 'var(--bg-2)',
                    border: '1px solid var(--line)',
                    position: 'relative', overflow: 'hidden',
                    boxShadow: b.today ? '0 0 0 1.5px var(--accent), 0 0 16px color-mix(in oklch, var(--accent) 40%, transparent)' : 'none',
                  }}>
                    {/* correct portion */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: correctH + '%',
                      background: b.today
                        ? 'linear-gradient(180deg, var(--accent), color-mix(in oklch, var(--accent) 80%, var(--accent-2)))'
                        : 'linear-gradient(180deg, color-mix(in oklch, var(--accent) 70%, var(--accent-2)), color-mix(in oklch, var(--accent) 60%, transparent))',
                    }} />
                  </div>
                  {/* x-axis label */}
                  <div style={{
                    fontSize: range === 'week' ? 11 : 9,
                    fontFamily: 'var(--font-mono)',
                    color: b.today ? 'var(--accent)' : 'var(--fg-2)',
                    fontWeight: b.today ? 700 : 500,
                    height: 14, lineHeight: '14px',
                  }}>
                    {range === 'week' ? b.d : (i % 5 === 0 || i === data.length - 1 ? b.date : '')}
                  </div>
                </div>
              );
            })}
          </div>

          {/* legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'linear-gradient(180deg, var(--accent), var(--accent-2))', display: 'inline-block' }}></span>
              {lang === 'ru' ? "ВЕРНО" : "TO'G'RI"}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'inline-block' }}></span>
              {lang === 'ru' ? "ВСЕГО" : "JAMI"}
            </span>
            <span style={{ marginLeft: 'auto' }}>
              {lang === 'ru' ? 'среднее' : "o'rtacha"}: <span style={{ color: 'var(--fg-0)' }}>{avg}/{lang === 'ru' ? 'день' : 'kun'}</span>
            </span>
          </div>
        </div>

        {/* Streak */}
        <div className="bento bento--accent-2" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="overline" style={{ marginBottom: 8 }}>🔥 {t.progress.streak.toUpperCase()}</div>
            <div className="h-display" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1 }}>12</div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4 }}>{lang === 'ru' ? 'дней подряд' : "ketma-ket kun"}</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{t.progress.best}: <span className="mono" style={{ color: 'var(--fg-0)' }}>18</span></div>
        </div>

        {/* Level */}
        <div className="bento" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="overline" style={{ marginBottom: 8 }}>🏆 {t.progress.level.toUpperCase()}</div>
            <div className="h-display" style={{ fontSize: 28, fontWeight: 600, color: 'var(--accent)' }}>{lang === 'ru' ? 'ЗОЛОТО' : 'OLTIN'}</div>
            <div className="mono" style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4 }}>1 250 XP</div>
          </div>
          <div>
            <div className="progress" style={{ marginBottom: 6 }}><span style={{ width: '62%' }}></span></div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{t.progress.nextLevel}: <span className="mono">{lang === 'ru' ? 'ПЛАТИНА' : 'PLATINA'}</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16, marginBottom: 16 }}>
        {/* Categories */}
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 16 }}>{lang === 'ru' ? 'КАТЕГОРИИ' : 'KATEGORIYALAR'}</div>
          {[
            { n: lang === 'ru' ? 'ПДД' : "Yo'l qoidalari", v: 80 },
            { n: lang === 'ru' ? 'Знаки' : 'Belgilar', v: 100 },
            { n: lang === 'ru' ? 'Техника' : 'Texnika', v: 60 },
            { n: lang === 'ru' ? 'Медицина' : 'Tibbiy', v: 40 },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span>{c.n}</span><span className="mono" style={{ color: 'var(--fg-2)' }}>{c.v}%</span>
              </div>
              <div className="progress"><span style={{ width: c.v + '%' }}></span></div>
            </div>
          ))}
        </div>

        {/* Heatmap — daily practice with date labels */}
        <div className="bento" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div className="overline">📅 {lang === 'ru' ? 'ЕЖЕДНЕВНАЯ ПРАКТИКА' : 'KUNDALIK MASHQ'}</div>
            <div className="overline" style={{ color: 'var(--fg-2)' }}>{lang === 'ru' ? 'ПОСЛЕДНИЕ 14 НЕДЕЛЬ' : "OXIRGI 14 HAFTA"}</div>
          </div>

          {(() => {
            // Build a deterministic 14-week heatmap ending today.
            const TODAY = new Date(2026, 4, 5); // May 5, 2026 (current date)
            const COLS = 14;
            const ROWS = 7; // Mon..Sun
            // Compute the start: COLS weeks back, snapped to Monday.
            const start = new Date(TODAY);
            const dow = (TODAY.getDay() + 6) % 7; // 0=Mon..6=Sun
            start.setDate(TODAY.getDate() - dow - (COLS - 1) * 7);

            const monthsUz = ['Yan','Fev','Mar','Apr','May','Iyn','Iyl','Avg','Sen','Okt','Noy','Dek'];
            const monthsRu = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
            const monthsCy = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
            const months = lang === 'ru' ? monthsRu : lang === 'cy' ? monthsCy : monthsUz;
            const dowUz = ['Du','Se','Cho','Pa','Ju','Sha','Ya'];
            const dowRu = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
            const dowLabels = lang === 'ru' || lang === 'cy' ? dowRu : dowUz;

            // Build date matrix [col][row]
            const cells = [];
            const monthAtCol = []; // first day-of-month label per col, if month changes
            let lastMonth = -1;
            for (let c = 0; c < COLS; c++) {
              const colDates = [];
              for (let r = 0; r < ROWS; r++) {
                const d = new Date(start);
                d.setDate(start.getDate() + c * 7 + r);
                colDates.push(d);
              }
              cells.push(colDates);
              const firstOfWeek = colDates[0];
              if (firstOfWeek.getMonth() !== lastMonth) {
                monthAtCol[c] = months[firstOfWeek.getMonth()];
                lastMonth = firstOfWeek.getMonth();
              }
            }

            // Deterministic intensity: based on date hash. More activity recent.
            const intensity = (d) => {
              const daysFromToday = Math.floor((TODAY - d) / 86400000);
              if (d > TODAY) return -1; // future
              if (daysFromToday < 0) return -1;
              // hash-ish
              const seed = (d.getDate() * 31 + d.getMonth() * 7 + d.getFullYear()) % 13;
              const recencyBoost = Math.max(0, 1 - daysFromToday / 90);
              const v = (seed / 13) * 0.6 + recencyBoost * 0.5;
              if (v > 0.75) return 4;
              if (v > 0.5) return 3;
              if (v > 0.3) return 2;
              if (v > 0.1) return 1;
              return 0;
            };
            const opacities = [0.06, 0.22, 0.42, 0.65, 1];

            const fmtDate = (d) => `${d.getDate()} ${months[d.getMonth()]}`;

            return (
              <>
                {/* Month labels row */}
                <div style={{ display: 'grid', gridTemplateColumns: `28px repeat(${COLS}, 1fr)`, gap: 4, marginBottom: 6 }}>
                  <div></div>
                  {monthAtCol.map((m, c) => (
                    <div key={c} style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.06em', height: 12 }}>
                      {m || ''}
                    </div>
                  ))}
                </div>

                {/* Grid with day-of-week labels on left */}
                <div style={{ display: 'grid', gridTemplateColumns: `28px repeat(${COLS}, 1fr)`, gap: 4 }}>
                  {Array.from({ length: ROWS }).map((_, r) => (
                    <React.Fragment key={r}>
                      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', display: 'flex', alignItems: 'center', height: 14, opacity: r % 2 === 0 ? 1 : 0 }}>
                        {dowLabels[r]}
                      </div>
                      {cells.map((col, c) => {
                        const d = col[r];
                        const lvl = intensity(d);
                        const isToday = d.toDateString() === TODAY.toDateString();
                        if (lvl < 0) {
                          return <div key={c} style={{ aspectRatio: '1', borderRadius: 3, background: 'transparent' }} />;
                        }
                        return (
                          <div key={c} title={`${fmtDate(d)} · ${lvl === 0 ? (lang === 'ru' ? 'нет занятий' : 'mashq yo\'q') : `${lvl * 4 + 2} ${lang === 'ru' ? 'тестов' : 'savol'}`}`}
                            style={{
                              aspectRatio: '1', borderRadius: 3,
                              background: `oklch(0.82 0.18 195 / ${opacities[lvl]})`,
                              border: isToday ? '1.5px solid var(--accent)' : '1px solid color-mix(in oklch, var(--fg-0) 4%, transparent)',
                              boxShadow: isToday ? '0 0 0 2px color-mix(in oklch, var(--accent) 30%, transparent)' : 'none',
                              position: 'relative',
                            }} />
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, fontSize: 11, color: 'var(--fg-2)', fontFamily: 'var(--font-mono)' }}>
                  <span>{fmtDate(start)} → {fmtDate(TODAY)}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{lang === 'ru' ? 'меньше' : 'kam'}</span>
                    {opacities.map((op, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: `oklch(0.82 0.18 195 / ${op})`, border: '1px solid color-mix(in oklch, var(--fg-0) 6%, transparent)' }} />
                    ))}
                    <span>{lang === 'ru' ? 'больше' : "ko'p"}</span>
                  </div>
                </div>
              </>
            );
          })()}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--fg-2)', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
            <span>{t.progress.thisWeek}: <span className="mono" style={{ color: 'var(--fg-0)' }}>5/7</span></span>
            <span>{t.progress.todayTests}: <span className="mono" style={{ color: 'var(--fg-0)' }}>15</span></span>
            <span>{t.progress.totalTime}: <span className="mono" style={{ color: 'var(--fg-0)' }}>45 {lang === 'ru' ? 'мин' : 'daq'}</span></span>
          </div>
        </div>
      </div>

      {/* Weak topics */}
      <div className="bento" style={{ padding: 24 }}>
        <div className="overline" style={{ marginBottom: 16 }}>🎯 {t.progress.weak}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {[
            { n: lang === 'ru' ? 'Светофор' : 'Svetofor', x: 3, sign: 'warning-pedestrian' },
            { n: lang === 'ru' ? 'Тормоз' : 'Tormoz masofasi', x: 2, sign: 'warning-slippery' },
            { n: lang === 'ru' ? 'Помощь' : 'Birinchi yordam', x: 2, sign: 'info-hospital' },
            { n: lang === 'ru' ? 'Поворот' : "Qayta burilish", x: 2, sign: 'mandatory-roundabout' },
            { n: lang === 'ru' ? 'Знаки' : "Yo'l belgilari", x: 1, sign: 'prohibit-no-entry' },
          ].map((w, i) => (
            <div key={i} style={{ background: 'var(--bg-2)', borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
              <RoadSign kind={w.sign} size={42} />
              <div style={{ fontSize: 13, fontWeight: 600 }}>{w.n}</div>
              <span className="chip chip--error" style={{ fontSize: 11 }}>✕ × {w.x}</span>
              <button className="btn btn--ghost" style={{ fontSize: 11, padding: '5px 10px', marginTop: 'auto' }}>{t.progress.practice} →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Signs Library ──────────────────────────────────────────────
function SignsLibrary({ t, lang }) {
  const allSigns = [
    { k: 'warning-curve', cat: 1, n: { uz: 'Keskin burilish', cy: 'Кескин бурилиш', ru: 'Опасный поворот' } },
    { k: 'warning-pedestrian', cat: 1, n: { uz: "Piyodalar o'tish", cy: 'Пиёдалар ўтиш', ru: 'Пешеходы' } },
    { k: 'warning-roadwork', cat: 1, n: { uz: "Yo'l ishlari", cy: 'Йўл ишлари', ru: 'Дорожные работы' } },
    { k: 'warning-slippery', cat: 1, n: { uz: 'Sirpanchiq yo\'l', cy: 'Сирпанчиқ йўл', ru: 'Скользкая дорога' } },
    { k: 'prohibit-no-entry', cat: 2, n: { uz: 'Kirish taqiqlangan', cy: 'Кириш тақиқланган', ru: 'Въезд запрещён' } },
    { k: 'prohibit-speed', cat: 2, n: { uz: 'Tezlik chegarasi', cy: 'Тезлик чегараси', ru: 'Ограничение скорости' } },
    { k: 'prohibit-no-stop', cat: 2, n: { uz: "To'xtash taqiqlangan", cy: 'Тўхташ тақиқланган', ru: 'Остановка запрещена' } },
    { k: 'prohibit-no-overtake', cat: 2, n: { uz: 'Quvib o\'tish taqiqlangan', cy: 'Қувиб ўтиш тақиқланган', ru: 'Обгон запрещён' } },
    { k: 'mandatory-straight', cat: 3, n: { uz: "To'g'ri yuring", cy: 'Тўғри юринг', ru: 'Только прямо' } },
    { k: 'mandatory-roundabout', cat: 3, n: { uz: 'Aylanma harakat', cy: 'Айланма ҳаракат', ru: 'Круговое движение' } },
    { k: 'priority-main', cat: 4, n: { uz: "Asosiy yo'l", cy: 'Асосий йўл', ru: 'Главная дорога' } },
    { k: 'priority-yield', cat: 4, n: { uz: "Yo'l bering", cy: 'Йўл беринг', ru: 'Уступите дорогу' } },
    { k: 'priority-stop', cat: 4, n: { uz: 'Tashqi to\'xtash', cy: 'STOP белгиси', ru: 'STOP' } },
    { k: 'info-crosswalk', cat: 5, n: { uz: "Piyodalar o'tish joyi", cy: 'Пиёдалар ўтиш жойи', ru: 'Пешеходный переход' } },
    { k: 'info-parking', cat: 5, n: { uz: "To'xtash joyi", cy: 'Тўхташ жойи', ru: 'Парковка' } },
    { k: 'info-hospital', cat: 5, n: { uz: 'Shifoxona', cy: 'Шифохона', ru: 'Больница' } },
  ];

  const [activeCat, setActiveCat] = React.useState(0);
  const filtered = activeCat === 0 ? allSigns : allSigns.filter(s => s.cat === activeCat);

  return (
    <div style={{ width: 1280, padding: 48, background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <div style={{ marginBottom: 28 }}>
        <div className="overline" style={{ marginBottom: 8 }}>05 · LIBRARY</div>
        <h1 className="h-display h2" style={{ margin: 0, marginBottom: 6 }}>{t.signsPage.title}</h1>
        <p style={{ color: 'var(--fg-1)', margin: 0 }}>{t.signsPage.sub}</p>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input placeholder={t.signsPage.search} style={{
            width: '100%', padding: '12px 16px 12px 40px', background: 'var(--bg-1)',
            border: '1px solid var(--line)', borderRadius: 14, color: 'var(--fg-0)', fontSize: 14, fontFamily: 'inherit',
          }} />
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-2)' }}>🔍</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {t.signsPage.cats.map((c, i) => (
          <button key={i} onClick={() => setActiveCat(i)} className="chip" style={{
            padding: '8px 16px', fontSize: 13, fontFamily: 'var(--font-body)', cursor: 'pointer',
            background: activeCat === i ? 'var(--accent)' : 'var(--bg-1)',
            color: activeCat === i ? '#0a1f24' : 'var(--fg-1)',
            borderColor: activeCat === i ? 'var(--accent)' : 'var(--line)',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
        {filtered.map((s, i) => (
          <div key={i} className="bento" style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', cursor: 'pointer' }}>
            <RoadSign kind={s.k} size={72} />
            <div style={{ fontSize: 12, fontWeight: 600 }}>{s.n[lang] || s.n.uz}</div>
            <span className="chip" style={{ fontSize: 10, padding: '3px 8px' }}>{t.signsPage.cats[s.cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Auth & Pricing ─────────────────────────────────────────────
function Auth({ t, lang }) {
  return (
    <div style={{ width: 1280, minHeight: 880, padding: 48, background: 'var(--bg-0)', color: 'var(--fg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="bento dotgrid" style={{
        width: 460, padding: 40, borderRadius: 24,
        background: `radial-gradient(80% 60% at 50% 0%, color-mix(in oklch, var(--accent) 16%, transparent), transparent 60%), var(--bg-1)`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <Logo />
        </div>
        <h1 className="h-display" style={{ fontSize: 28, fontWeight: 600, textAlign: 'center', marginBottom: 6 }}>{t.auth.title}</h1>
        <p style={{ textAlign: 'center', color: 'var(--fg-2)', fontSize: 14, marginBottom: 28 }}>{t.auth.sub}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <input placeholder={t.auth.email} style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--fg-0)', fontSize: 14, fontFamily: 'inherit' }} />
          <input type="password" placeholder={t.auth.pass} style={{ padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--fg-0)', fontSize: 14, fontFamily: 'inherit' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, fontSize: 13 }}>
          <label style={{ color: 'var(--fg-1)', display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" /> {t.auth.remember}</label>
          <a style={{ color: 'var(--accent)' }}>{t.auth.forgot}</a>
        </div>
        <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }}>{t.auth.enter} →</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--fg-2)', fontSize: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }}></div>
          <span>{t.auth.or}</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center' }}>G {t.auth.google}</button>
          <button className="btn btn--ghost" style={{ width: '100%', justifyContent: 'center' }}>✈ {t.auth.tg}</button>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--fg-2)', fontSize: 13, marginTop: 24 }}>
          {t.auth.noAccount} <a style={{ color: 'var(--accent)' }}>{t.auth.register}</a>
        </p>
      </div>
    </div>
  );
}

function Pricing({ t, lang }) {
  const plans = [t.pricing.free, t.pricing.std, t.pricing.pro];
  return (
    <div style={{ width: 1280, padding: 48, background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="overline" style={{ marginBottom: 12 }}>06 · PRICING</div>
        <h1 className="h-display h2" style={{ margin: 0, marginBottom: 8 }}>{t.pricing.title}</h1>
        <p style={{ color: 'var(--fg-1)', margin: 0 }}>{t.pricing.sub}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'stretch' }}>
        {plans.map((p, i) => {
          const featured = i === 1;
          return (
            <div key={i} className={"bento" + (featured ? ' bento--accent' : '')} style={{
              padding: 32, display: 'flex', flexDirection: 'column', gap: 18,
              borderColor: featured ? 'var(--accent)' : 'var(--line)',
              transform: featured ? 'translateY(-12px)' : 'none',
              boxShadow: featured ? 'var(--shadow-glow)' : 'none',
              position: 'relative',
            }}>
              {featured && <span className="chip chip--accent" style={{ position: 'absolute', top: -12, left: 32, fontSize: 10 }}>★ {p.badge}</span>}
              <div>
                <div className="overline">{['BEPUL', 'TANLOV', 'PRO'][i]}</div>
                <div className="h-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 6 }}>{p.name}</div>
              </div>
              <div>
                <span className="h-display" style={{ fontSize: 48, fontWeight: 700 }}>{p.price}</span>
                <span style={{ color: 'var(--fg-2)', fontSize: 13, marginLeft: 6 }}>so'm / {t.pricing.monthly}</span>
              </div>
              <div className="divider"></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--fg-1)' }}>
                    <span style={{ color: 'var(--accent-2)', fontFamily: 'var(--font-mono)' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button className={"btn " + (featured ? 'btn--primary' : 'btn--ghost')} style={{ width: '100%', justifyContent: 'center' }}>
                {i === 0 ? t.pricing.ctaFree : t.pricing.cta} →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.Catalog = Catalog;
window.Results = Results;
window.Progress = Progress;
window.SignsLibrary = SignsLibrary;
window.Auth = Auth;
window.Pricing = Pricing;
