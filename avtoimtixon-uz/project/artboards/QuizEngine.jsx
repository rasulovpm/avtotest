/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// QuizEngine — Real imtihon (rulionline.uz inspired layout)
// Top bar: [Tugatish] [Imtihon Topshirish] [⏱ timer] [lang] · pills (1 row)
// Banner: dark-blue full-width question title
// Body: image LEFT, F1..F6 options RIGHT
// ───────────────────────────────────────────────────────────────

const SAMPLE_QUESTIONS = [
  {
    sign: 'priority-main',
    q: { uz: "Haydovchilardan qay biri yo'lovchilarni tushirish uchun to'g'ri to'xtadi?", cy: "Ҳайдовчилардан қай бири йўловчиларни тушириш учун тўғри тўхтади?", ru: 'Кто из водителей правильно остановился для высадки пассажиров?' },
    options: {
      uz: ["Ko'k va qizil avtomobillarning haydovchilari", "Mototsikl va ko'k avtomobil haydovchilari", "Faqat ko'k avtomobil haydovchilari", "Barcha haydovchilar"],
      cy: ['Кўк ва қизил автомобилларнинг ҳайдовчилари', 'Мототцикл ва кўк автомобил ҳайдовчилари', 'Фақат кўк автомобил ҳайдовчилари', 'Барча ҳайдовчилар'],
      ru: ['Водители синего и красного', 'Мотоцикл и синий', 'Только синий', 'Все водители'],
    },
    correct: 2,
    explain: { uz: "Faqat ko'k avtomobil yo'l chetiga to'liq tushirilgan. Qizil — yo'lakka chiqolmaydi.", cy: 'Фақат кўк автомобил йўл четига тўлиқ туширилган.', ru: 'Только синий полностью съехал на обочину.' },
    article: 'YHQ 12-modda',
  },
  {
    sign: 'prohibit-speed',
    q: { uz: 'Belgi ostidagi maksimal tezlik nechchi km/soat?', cy: 'Белги остидаги максимал тезлик неча км/соат?', ru: 'Максимальная скорость под этим знаком?' },
    options: {
      uz: ['40 km/soat', '50 km/soat', '60 km/soat', '70 km/soat'],
      cy: ['40 км/соат', '50 км/соат', '60 км/соат', '70 км/соат'],
      ru: ['40 км/ч', '50 км/ч', '60 км/ч', '70 км/ч'],
    },
    correct: 2,
    explain: { uz: 'Belgi ostida 60 km/soat maksimal tezlik.', cy: 'Белги остида 60 км/соат.', ru: 'Знак устанавливает 60 км/ч.' },
    article: 'YHQ 10-modda',
  },
];

function QuizEngine({ t, lang = 'uz', mode = 'real20' }) {
  const total = mode === 'real50' ? 50 : 20;
  const passingScore = mode === 'real50' ? 45 : 18;

  const [idx, setIdx] = React.useState(2); // open question 3 like screenshot
  // Pre-seeded answers to demo: 1 correct (green), 2 wrong (red), 3 current
  const [answers, setAnswers] = React.useState({ 0: { sel: 0, ok: true }, 1: { sel: 1, ok: false } });
  const [time, setTime] = React.useState(24 * 60 + 8);

  React.useEffect(() => {
    const id = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const q = SAMPLE_QUESTIONS[idx % SAMPLE_QUESTIONS.length];
  const opts = q.options[lang] || q.options.uz;
  const cur = answers[idx];

  const choose = React.useCallback((i) => {
    if (i >= opts.length) return;
    if (answers[idx]) return;
    setAnswers((prev) => ({ ...prev, [idx]: { sel: i, ok: i === q.correct } }));
  }, [idx, opts.length, q.correct, answers]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key.startsWith('F') && e.key.length <= 3) {
        const n = parseInt(e.key.slice(1), 10);
        if (n >= 1 && n <= 6) { e.preventDefault(); choose(n - 1); }
      } else if (e.key === 'ArrowRight') { e.preventDefault(); setIdx((i) => Math.min(total - 1, i + 1)); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [choose, total]);

  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');

  // Pill colors per state
  const pillStyle = (i) => {
    const a = answers[i];
    const isCur = i === idx;
    let bg = 'var(--bg-2)', color = 'var(--fg-2)', border = 'var(--line)';
    if (a) {
      if (a.ok) { bg = 'var(--success)'; color = '#0a1f0e'; border = 'var(--success)'; }
      else { bg = 'var(--error)'; color = '#fff'; border = 'var(--error)'; }
    }
    if (isCur) {
      bg = 'oklch(0.55 0.20 255)'; color = '#fff'; border = 'oklch(0.55 0.20 255)';
    }
    return { bg, color, border };
  };

  const langLabel = lang === 'cy' ? 'Узб кирил' : lang === 'ru' ? 'Русский' : "O'zbek";

  return (
    <div style={{ width: 1280, minHeight: 720, background: '#0b1220', color: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
      {/* ── Top toolbar ───────────────────────────────────── */}
      <header style={{
        padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
        background: '#0b1220', borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <button style={{
          padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(255,80,80,0.4)',
          background: 'rgba(220,40,40,0.18)', color: '#ff8a8a', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>{lang === 'ru' ? 'Завершить тест' : lang === 'cy' ? 'Тестни Якунлаш' : 'Testni Yakunlash'}</button>

        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginLeft: 4 }}>
          {lang === 'ru' ? 'Сдать экзамен' : lang === 'cy' ? 'Имтиҳон Топшириш' : 'Imtihon Topshirish'}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12,
          padding: '8px 14px', borderRadius: 10,
          border: '1px solid rgba(80,160,255,0.4)', background: 'rgba(30,80,180,0.15)',
          color: '#a8c8ff', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M10 3h4M5 5l-2 2" />
          </svg>
          {mm} : {ss}
        </div>

        <button style={{
          padding: '8px 14px', borderRadius: 10,
          border: '1px solid rgba(80,140,220,0.35)', background: 'rgba(30,70,150,0.18)',
          color: '#a8c8ff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {langLabel}
          <span style={{ fontSize: 9 }}>▾</span>
        </button>

        {/* Pills — single row, right aligned */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'nowrap' }}>
          {Array.from({ length: total }).map((_, i) => {
            const s = pillStyle(i);
            return (
              <button key={i} onClick={() => setIdx(i)}
                style={{
                  width: 30, height: 30, padding: 0,
                  borderRadius: 6, border: '1.5px solid ' + s.border, background: s.bg, color: s.color,
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .15s',
                }}>{i + 1}</button>
            );
          })}
        </div>
      </header>

      {/* ── Question banner (dark blue, full width) ───────── */}
      <div style={{
        padding: '22px 28px',
        background: 'linear-gradient(180deg, #0e2447, #0c1d3b)',
        borderBottom: '1px solid rgba(80,140,220,0.18)',
        textAlign: 'center',
      }}>
        <h2 style={{
          margin: 0, fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.35,
          letterSpacing: '-0.005em',
        }}>{q.q[lang] || q.q.uz}</h2>
      </div>

      {/* ── Body: image LEFT, options RIGHT ─────────────────── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 24 }}>
        {/* Image card */}
        <div style={{
          background: '#0f1a2e', borderRadius: 14, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: 460, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          {/* Placeholder representing real road-scene photo */}
          <div style={{
            width: '100%', aspectRatio: '4/3', borderRadius: 10,
            background: `
              linear-gradient(180deg, #8fc4d8 0%, #8fc4d8 35%, #5a7d4a 35%, #5a7d4a 50%, #4a4a4a 50%, #4a4a4a 100%)
            `,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Trees row */}
            <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: '20%', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ width: 32, height: 56, background: 'radial-gradient(circle at 50% 30%, #2d5a3d, #1a3a25)', borderRadius: '50% 50% 30% 30%' }}></div>
              ))}
            </div>
            {/* Road markings */}
            <div style={{ position: 'absolute', top: '52%', left: 0, right: 0, height: 2, background: 'repeating-linear-gradient(90deg, #fff 0 30px, transparent 30px 60px)' }}></div>
            <div style={{ position: 'absolute', top: '70%', left: 0, right: 0, height: 2, background: 'repeating-linear-gradient(90deg, #fff 0 30px, transparent 30px 60px)' }}></div>
            <div style={{ position: 'absolute', top: '85%', left: 0, right: 0, height: 2, background: '#fff' }}></div>

            {/* Red car (top) */}
            <div style={{ position: 'absolute', top: '54%', left: '8%', width: 90, height: 36, background: 'linear-gradient(180deg, #c83030, #8a1818)', borderRadius: '8px 12px 6px 6px', boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
              <div style={{ position: 'absolute', top: 4, left: 12, right: 12, height: 14, background: '#222', borderRadius: 4 }}></div>
            </div>
            {/* Motorcycle (right top) */}
            <div style={{ position: 'absolute', top: '55%', right: '20%', width: 36, height: 24, background: '#b22020', borderRadius: 6 }}>
              <div style={{ position: 'absolute', top: 2, left: 8, width: 20, height: 8, background: '#1a1a1a', borderRadius: 3 }}></div>
            </div>
            {/* Blue truck (bottom, on shoulder) */}
            <div style={{ position: 'absolute', top: '78%', left: '20%', width: 130, height: 50, background: 'linear-gradient(180deg, #2a78b8, #195488)', borderRadius: '6px 8px 4px 4px', boxShadow: '0 3px 8px rgba(0,0,0,0.5)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 30, background: '#1a3a5a', borderRadius: '6px 0 0 4px' }}></div>
              <div style={{ position: 'absolute', bottom: -4, left: 12, width: 14, height: 14, background: '#1a1a1a', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', bottom: -4, right: 12, width: 14, height: 14, background: '#1a1a1a', borderRadius: '50%' }}></div>
            </div>
            {/* Small steering wheel icon (rulionline marker) */}
            <div style={{ position: 'absolute', bottom: 10, right: 10, width: 32, height: 32, background: '#2a78b8', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" fill="#fff" /><path d="M12 5v5M5 14l4-2M19 14l-4-2" /></svg>
            </div>
          </div>
        </div>

        {/* Options column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {opts.map((opt, i) => {
            const isSel = cur && cur.sel === i;
            const isCorrect = cur && i === q.correct;
            const isWrongSel = cur && isSel && !cur.ok;
            let bg = '#1a2538', border = 'rgba(255,255,255,0.08)';
            let kbdBg = 'oklch(0.55 0.20 255)', kbdColor = '#fff';
            if (cur) {
              if (isCorrect) { bg = 'rgba(40,160,80,0.22)'; border = 'rgba(40,200,100,0.5)'; kbdBg = '#28a050'; }
              else if (isWrongSel) { bg = 'rgba(200,40,40,0.22)'; border = 'rgba(220,60,60,0.5)'; kbdBg = '#c82828'; }
              else { bg = '#1a2538'; }
            }
            return (
              <button key={i} onClick={() => choose(i)} disabled={!!cur}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '0', borderRadius: 8,
                  border: '1px solid ' + border, background: bg, color: '#fff',
                  fontSize: 15, fontFamily: 'var(--font-body)', textAlign: 'left',
                  cursor: cur ? 'default' : 'pointer', transition: 'all .15s',
                  overflow: 'hidden',
                }}>
                <span style={{
                  width: 60, height: 56,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: kbdBg, color: kbdColor,
                  fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700,
                  flexShrink: 0,
                }}>F{i + 1}</span>
                <span style={{ flex: 1, padding: '14px 18px 14px 0' }}>{opt}</span>
              </button>
            );
          })}

          {/* Explanation appears after answer */}
          {cur && (
            <div style={{
              marginTop: 4, padding: 14, borderRadius: 10,
              background: cur.ok ? 'rgba(40,160,80,0.12)' : 'rgba(200,40,40,0.12)',
              border: '1px solid ' + (cur.ok ? 'rgba(40,200,100,0.35)' : 'rgba(220,60,60,0.35)'),
              fontSize: 13, lineHeight: 1.55,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontWeight: 600, color: cur.ok ? '#7adf9a' : '#ff8a8a' }}>
                {cur.ok ? '✓ ' + (t.quiz.correct || "To'g'ri") : '✕ ' + (t.quiz.wrong || 'Xato')}
                <span className="overline" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)' }}>{q.article}</span>
              </div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)' }}>{q.explain[lang] || q.explain.uz}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.QuizEngine = QuizEngine;
