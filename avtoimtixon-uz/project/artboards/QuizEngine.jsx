/* eslint-disable */
// ───────────────────────────────────────────────────────────────
// QuizEngine — Real imtihon (20) layout
// Top: 20 question pills (green=correct, red=wrong, accent=current)
// Body: options on LEFT (F1..F6), image on RIGHT
// Keyboard: F1..F6 selects answer
// ───────────────────────────────────────────────────────────────

const SAMPLE_QUESTIONS = [
  {
    sign: 'priority-main',
    q: { uz: "Ushbu yo'l belgisi nimani bildiradi?", cy: 'Ушбу йўл белгиси нимани билдиради?', ru: 'Что означает этот знак?' },
    options: {
      uz: ["Asosiy yo'lning ustunligi", "Qarama-qarshi harakatga yo'l berish", "To'xtash taqiqlangan", "Piyodalar o'tish joyi"],
      cy: ['Асосий йўлнинг устунлиги', 'Қарама-қарши ҳаракатга йўл бериш', 'Тўхташ тақиқланган', 'Пиёдалар ўтиш жойи'],
      ru: ['Главная дорога', 'Уступить встречным', 'Остановка запрещена', 'Пешеходный переход'],
    },
    correct: 0,
    explain: {
      uz: "Bu belgi «Asosiy yo'l» ma'nosini bildiradi. YHQ 16-moddasi bo'yicha asosiy yo'ldagi transport vositalari ustunlikka ega.",
      cy: "Бу белги «Асосий йўл» маъносини билдиради. ЙҲҚ 16-моддаси бўйича.",
      ru: 'Этот знак означает «Главная дорога». ПДД ст. 16.',
    },
    article: 'YHQ 16-modda',
  },
  {
    sign: 'prohibit-speed',
    q: { uz: 'Belgi ostidagi maksimal tezlik nechchi km/soat?', cy: 'Белги остидаги максимал тезлик неча км/соат?', ru: 'Максимальная скорость под этим знаком?' },
    options: {
      uz: ['40 km/soat', '50 km/soat', '60 km/soat', '70 km/soat', '80 km/soat'],
      cy: ['40 км/соат', '50 км/соат', '60 км/соат', '70 км/соат', '80 км/соат'],
      ru: ['40 км/ч', '50 км/ч', '60 км/ч', '70 км/ч', '80 км/ч'],
    },
    correct: 2,
    explain: { uz: 'Belgi ostida 60 km/soat maksimal tezlik.', cy: 'Белги остида 60 км/соат.', ru: 'Знак устанавливает 60 км/ч.' },
    article: 'YHQ 10-modda',
  },
  {
    sign: 'warning-pedestrian',
    q: { uz: 'Bu belgini ko\'rganda haydovchi qanday harakat qilishi kerak?', cy: 'Бу белгини кўрганда ҳайдовчи қандай ҳаракат қилиши керак?', ru: 'Как действовать водителю?' },
    options: {
      uz: ['Tezlikni oshirish', 'Tezlikni kamaytirish va ehtiyot bo\'lish', 'To\'xtash'],
      cy: ['Тезликни ошириш', 'Тезликни камайтириш ва эҳтиёт бўлиш', 'Тўхташ'],
      ru: ['Увеличить скорость', 'Снизить скорость и быть внимательным', 'Остановиться'],
    },
    correct: 1,
    explain: { uz: 'Piyodalar o\'tish joyi yaqinlashmoqda — tezlikni kamaytiring.', cy: 'Пиёдалар ўтиш жойи яқинлашмоқда.', ru: 'Впереди пешеходный переход.' },
    article: 'YHQ 14-modda',
  },
  {
    sign: 'prohibit-no-overtake',
    q: { uz: 'Bu belgi ta\'siri qachon tugaydi?', cy: 'Бу белги таъсири қачон тугайди?', ru: 'Когда заканчивается действие знака?' },
    options: {
      uz: ['Keyingi chorrahada', 'Aholi punkti tugashida', 'Maxsus belgida', "Belgi olib tashlanganda", "5 km dan so'ng", "Hech qachon"],
      cy: ['Кейинги чорраҳада', 'Аҳоли пункти тугашида', 'Махсус белгида', 'Белги олиб ташланганда', '5 км дан сўнг', 'Ҳеч қачон'],
      ru: ['На след. перекрёстке', 'В конце нас. пункта', 'Спец. знаком', 'При снятии знака', 'Через 5 км', 'Никогда'],
    },
    correct: 2,
    explain: { uz: 'Taqiqlovchi belgi maxsus rad etuvchi belgi bilan tugaydi.', cy: 'Тақиқловчи белги махсус рад этувчи белги билан тугайди.', ru: 'Знак отменяется специальным знаком.' },
    article: 'YHQ 12-modda',
  },
];

function QuizEngine({ t, lang = 'uz', mode = 'real20' }) {
  const total = mode === 'real50' ? 50 : 20;
  const passingScore = mode === 'real50' ? 45 : 18;

  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState({}); // {qIdx: {sel, ok}}
  const [time, setTime] = React.useState((mode === 'real50' ? 50 : 20) * 60);

  React.useEffect(() => {
    const id = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const q = SAMPLE_QUESTIONS[idx % SAMPLE_QUESTIONS.length];
  const opts = q.options[lang] || q.options.uz;
  const cur = answers[idx];

  const choose = React.useCallback((i) => {
    if (i >= opts.length) return;
    if (answers[idx]) return; // already answered
    setAnswers((prev) => ({ ...prev, [idx]: { sel: i, ok: i === q.correct } }));
  }, [idx, opts.length, q.correct, answers]);

  // F1..F6 keyboard
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key.startsWith('F') && e.key.length <= 3) {
        const n = parseInt(e.key.slice(1), 10);
        if (n >= 1 && n <= 6) {
          e.preventDefault();
          choose(n - 1);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIdx((i) => Math.min(total - 1, i + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIdx((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [choose, total]);

  const next = () => setIdx((i) => Math.min(total - 1, i + 1));
  const prev = () => setIdx((i) => Math.max(0, i - 1));

  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');
  const correctCount = Object.values(answers).filter(a => a.ok).length;
  const wrongCount = Object.values(answers).filter(a => !a.ok).length;

  return (
    <div style={{ width: 1280, minHeight: 880, background: 'var(--bg-0)', color: 'var(--fg-0)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ padding: '18px 32px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="btn btn--ghost" style={{ padding: '8px 14px', fontSize: 13 }}>← {t.quiz.back}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="overline">{mode === 'real50' ? 'REAL IMTIHON · 50' : 'REAL IMTIHON · 20'}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="chip chip--lime" style={{ fontSize: 12, padding: '5px 11px' }}>✓ {correctCount}</span>
          <span className="chip chip--error" style={{ fontSize: 12, padding: '5px 11px' }}>✕ {wrongCount}</span>
          <span className={"chip mono " + (time < 120 ? 'chip--error' : '')} style={{ fontSize: 12, padding: '5px 11px' }}>⏱ {mm}:{ss}</span>
          <span className="chip mono" style={{ fontSize: 12, padding: '5px 11px' }}>{lang === 'ru' ? 'проход' : "o'tish"}: {passingScore}/{total}</span>
        </div>
      </header>

      {/* TOP question pills — 20 numbered cells */}
      <div style={{ padding: '16px 32px 12px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${total}, 1fr)`, gap: 6 }}>
          {Array.from({ length: total }).map((_, i) => {
            const a = answers[i];
            const isCur = i === idx;
            let bg = 'var(--bg-2)', border = 'var(--line)', color = 'var(--fg-2)';
            if (a) {
              if (a.ok) { bg = 'var(--success)'; color = '#0a1f0e'; border = 'var(--success)'; }
              else { bg = 'var(--error)'; color = '#fff'; border = 'var(--error)'; }
            }
            if (isCur) {
              border = 'var(--accent)';
              if (!a) { bg = 'color-mix(in oklch, var(--accent) 22%, var(--bg-2))'; color = 'var(--accent)'; }
            }
            return (
              <button key={i} onClick={() => setIdx(i)} title={`Savol ${i + 1}`}
                style={{
                  padding: '10px 0', borderRadius: 8, border: '1.5px solid ' + border, background: bg, color,
                  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  transition: 'all .2s', position: 'relative',
                  boxShadow: isCur ? '0 0 0 2px color-mix(in oklch, var(--accent) 30%, transparent)' : 'none',
                }}>
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body — 2 columns: options LEFT, image RIGHT */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, padding: 32 }}>
        {/* LEFT — question + options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div className="overline" style={{ marginBottom: 8 }}>SAVOL #{(idx + 1).toString().padStart(2, '0')}</div>
            <h2 className="h-display" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
              {q.q[lang] || q.q.uz}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {opts.map((opt, i) => {
              const isSel = cur && cur.sel === i;
              const isCorrect = cur && i === q.correct;
              const isWrongSel = cur && isSel && !cur.ok;
              let bg = 'var(--bg-1)', border = 'var(--line)', tone = 'var(--fg-0)';
              if (cur) {
                if (isCorrect) { bg = 'color-mix(in oklch, var(--success) 18%, var(--bg-1))'; border = 'var(--success)'; }
                else if (isWrongSel) { bg = 'color-mix(in oklch, var(--error) 18%, var(--bg-1))'; border = 'var(--error)'; }
                else { bg = 'var(--bg-1)'; tone = 'var(--fg-2)'; }
              }
              return (
                <button key={i} onClick={() => choose(i)} disabled={!!cur}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px', borderRadius: 14,
                    border: '1.5px solid ' + border, background: bg, color: tone,
                    fontSize: 15, fontFamily: 'var(--font-body)', fontWeight: 500,
                    textAlign: 'left', cursor: cur ? 'default' : 'pointer',
                    transition: 'all .2s',
                  }}>
                  <kbd style={{
                    minWidth: 44, padding: '6px 10px', borderRadius: 8,
                    background: isCorrect ? 'var(--success)' : isWrongSel ? 'var(--error)' : 'var(--bg-3)',
                    color: (isCorrect || isWrongSel) ? '#0a1212' : 'var(--fg-0)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                    border: '1px solid ' + (isCorrect ? 'var(--success)' : isWrongSel ? 'var(--error)' : 'var(--line-2)'),
                    textAlign: 'center', flexShrink: 0,
                  }}>
                    {isCorrect ? '✓' : isWrongSel ? '✕' : `F${i + 1}`}
                  </kbd>
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation (after answer) */}
          {cur && (
            <div style={{
              padding: 18, borderRadius: 14,
              background: cur.ok ? 'color-mix(in oklch, var(--success) 8%, var(--bg-2))' : 'color-mix(in oklch, var(--error) 8%, var(--bg-2))',
              border: '1px solid ' + (cur.ok ? 'color-mix(in oklch, var(--success) 50%, transparent)' : 'color-mix(in oklch, var(--error) 50%, transparent)'),
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, fontWeight: 600, color: cur.ok ? 'var(--success)' : 'var(--error)' }}>
                {cur.ok ? '✓ ' + t.quiz.correct : '✕ ' + t.quiz.wrong}
                <span className="overline" style={{ marginLeft: 'auto', color: 'var(--fg-2)' }}>{q.article}</span>
              </div>
              <p style={{ margin: 0, color: 'var(--fg-1)', fontSize: 13, lineHeight: 1.55 }}>{q.explain[lang] || q.explain.uz}</p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <button className="btn btn--ghost" onClick={prev} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1 }}>← {t.quiz.prev}</button>
            <span className="overline" style={{ color: 'var(--fg-3)' }}>F1…F{Math.min(opts.length, 6)} · ← →</span>
            <button className="btn btn--primary" onClick={next} disabled={idx === total - 1} style={{ opacity: idx === total - 1 ? 0.5 : 1 }}>{t.quiz.next} →</button>
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="bento" style={{
          padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `radial-gradient(80% 80% at 50% 0%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 70%), var(--bg-1)`,
          minHeight: 380,
        }}>
          <div style={{
            background: 'var(--bg-0)', borderRadius: 16, padding: 40, border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <RoadSign kind={q.sign} size={220} />
          </div>
        </div>
      </div>
    </div>
  );
}

window.QuizEngine = QuizEngine;
