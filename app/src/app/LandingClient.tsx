"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { NeoIcon } from "@/components/NeoIcon";
import { ContactModal } from "@/components/ContactModal";
import { Logo } from "@/components/layout/Logo";
import { formatUzs } from "@/lib/utils";

type Subscription = { totalDays: number; daysLeft: number; planExpiresAt: string } | null;

type Payment = {
  id: string;
  tariffName: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
};

type Props = {
  user: { name: string; plan: string; totalXp: number; planExpiresAt: string | null };
  streak: number;
  todayResults: number;
  mistakesCount: number;
  savedCount: number;
  examTestId: string;
  subscription: Subscription;
  payments: Payment[];
};

const TG_BLUE = "oklch(0.72 0.16 230)";
const TG_BLUE_2 = "oklch(0.62 0.18 240)";

export default function LandingClient(p: Props) {
  const { lang } = useLang();
  const [contactOpen, setContactOpen] = useState(false);
  const L = (uz: string, cy: string, ru: string) => (lang === "ru" ? ru : lang === "cy" ? cy : uz);

  type Card = {
    key: string;
    icon: "play" | "target" | "layers" | "flag" | "ticket" | "flame" | "alert" | "bookmark";
    title: string;
    sub: string;
    stat: string;
    href: string;
    accent?: boolean;
    big?: boolean;
    tone?: "error" | "lime";
  };

  const cards: Card[] = [
    {
      key: "real20",
      icon: "play",
      title: L("Real imtihon", "Реал имтиҳон", "Реальный экзамен"),
      sub: L("20 savol · 25 daqiqa · 18/20 o'tish", "20 савол · 25 дақиқа · 18/20", "20 вопросов · 25 минут · 18/20"),
      stat: L("Boshlash", "Бошлаш", "Начать"),
      href: `/tests/${p.examTestId}`,
      accent: true,
      big: true
    },
    {
      key: "real50",
      icon: "target",
      title: L("Imtihon · 50 talik", "Имтиҳон · 50 талик", "Экзамен · 50"),
      sub: L("Chuqurroq tayyorgarlik · 45/50", "Чуқурроқ тайёргарлик · 45/50", "Углублённо · 45/50"),
      stat: L("50 savol", "50 савол", "50 вопросов"),
      href: "/tests/test-real-50",
      big: true
    },
    {
      key: "topics",
      icon: "layers",
      title: L("Mavzulashtirilgan testlar", "Мавзулаштирилган тестлар", "Тематические тесты"),
      sub: L("Kategoriya bo'yicha 4 ta test", "Категория бўйича 4 та тест", "По категориям — 4 теста"),
      stat: L("4 mavzu", "4 мавзу", "4 темы"),
      href: "/tests/test-yhq"
    },
    {
      key: "topic-exam",
      icon: "flag",
      title: L("Mavzular bo'yicha imtihon", "Мавзулар бўйича имтиҳон", "Экзамен по теме"),
      sub: L("Bitta mavzudan 10 ta savol", "Битта мавзудан 10 та савол", "10 вопросов из одной темы"),
      stat: L("Tanlovga o'ting", "Танловга ўтинг", "К выбору темы"),
      href: "/tests/test-yhq"
    },
    {
      key: "tickets",
      icon: "ticket",
      title: L("Biletlar trenirovka", "Билетлар тренировка", "Тренировка по билетам"),
      sub: L("3 ta bilet · har biri 10 savol", "3 та билет · ҳар бири 10 савол", "3 билета · по 10 вопросов"),
      stat: L("Biletlar", "Билетлар", "Билеты"),
      href: "/tickets/ticket-1"
    },
    {
      key: "popular-mistakes",
      icon: "flame",
      title: L("Ommabop xatoliklar", "Оммабоп хатоликлар", "Популярные ошибки"),
      sub: L("Eng ko'p xato qilingan savollar", "Энг кўп хато қилинган саволлар", "Самые частые ошибки"),
      stat: L("Top savollar", "Топ саволлар", "Топ вопросов"),
      href: "/tests/mistakes"
    },
    {
      key: "my-mistakes",
      icon: "alert",
      title: L("Mening xato savollarim", "Менинг хато саволларим", "Мои ошибки"),
      sub: L("Avval xato bo'lganlarni qaytarish", "Аввал хато бўлганларни қайтариш", "Повторить свои ошибки"),
      stat: String(p.mistakesCount),
      href: "/tests/mistakes",
      tone: "error"
    },
    {
      key: "saved",
      icon: "bookmark",
      title: L("Saqlangan savollar", "Сақланган саволлар", "Сохранённые"),
      sub: L("Belgi qo'yib qoldirganlar", "Белги қўйиб қолдирганлар", "Отмеченные закладкой"),
      stat: String(p.savedCount),
      href: "/signs",
      tone: "lime"
    }
  ];

  const subPct = p.subscription ? Math.round((p.subscription.daysLeft / p.subscription.totalDays) * 100) : 0;

  return (
    <main style={{ background: "var(--bg-0)", color: "var(--fg-0)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      {/* ── Compact Hero ─────────────────────────────── */}
      <section style={{ padding: "24px 48px 16px" }}>
        <div
          className="bento welcome-bento"
          style={{
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            background: "radial-gradient(80% 100% at 100% 0%, color-mix(in oklch, var(--accent) 18%, transparent), transparent 65%), var(--bg-1)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "color-mix(in oklch, var(--accent) 22%, var(--bg-2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <NeoIcon name="rocket" size={26} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="overline" style={{ marginBottom: 4 }}>
                ● {L("XUSH KELIBSIZ", "ХУШ КЕЛИБСИЗ", "ДОБРО ПОЖАЛОВАТЬ")}, {p.user.name.toUpperCase()}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "var(--font-display)" }}>
                {p.streak > 0
                  ? L(
                      `Bugun ham mashqni davom ettiring — ${p.streak} kunlik streak.`,
                      `Бугун ҳам машқни давом эттиринг — ${p.streak} кунлик streak.`,
                      `Продолжайте тренировку — серия ${p.streak} дней.`
                    )
                  : L(
                      "Bugun mashqni boshlang — birinchi qadam.",
                      "Бугун машқни бошланг — биринчи қадам.",
                      "Начните тренировку сегодня — первый шаг."
                    )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span className="chip mono" style={{ fontSize: 11, padding: "6px 10px" }}>🔥 {p.streak} {L("kun", "кун", "дн")}</span>
            <span className="chip mono" style={{ fontSize: 11, padding: "6px 10px" }}>📊 {p.user.totalXp} XP</span>
            <Link href={`/tests/${p.examTestId}`} className="btn btn--primary" style={{ fontSize: 14 }}>
              ▶ {L("Imtihonni boshlash", "Имтиҳонни бошлаш", "Начать экзамен")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8 Quick action cards ─────────────────────── */}
      <section style={{ padding: "8px 48px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 className="h-display" style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
            {L("Boshlash uchun rejim tanlang", "Бошлаш учун режим танланг", "Выберите режим")}
          </h2>
          <span className="overline" style={{ color: "var(--fg-2)" }}>
            {L("8 BO'LIM", "8 БЎЛИМ", "8 РАЗДЕЛОВ")}
          </span>
        </div>

        {/* Big — Real 20 + Real 50 */}
        <div className="big-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          {cards.filter((c) => c.big).map((c) => (
            <ActionCard key={c.key} card={c} big lang={lang} />
          ))}
        </div>

        {/* 6 smaller cards */}
        <div className="small-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {cards.filter((c) => !c.big).map((c) => (
            <ActionCard key={c.key} card={c} lang={lang} />
          ))}
        </div>
      </section>

      {/* ── Subscription + Payment History ──────────── */}
      <section style={{ padding: "8px 48px 32px" }}>
        <div className="sub-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr", gap: 14 }}>
          {/* Subscription */}
          <div className="bento bento--accent-2" style={{ padding: 26, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="overline">{L("OBUNA HOLATI", "ОБУНА ҲОЛАТИ", "ПОДПИСКА")}</div>
              {p.subscription ? (
                <span className="chip chip--lime" style={{ fontSize: 11 }}>● {L("FAOL", "ФАОЛ", "АКТИВНА")}</span>
              ) : (
                <span className="chip" style={{ fontSize: 11 }}>{L("FAOL EMAS", "ФАОЛ ЭМАС", "НЕ АКТИВНА")}</span>
              )}
            </div>
            <div>
              <div className="h-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>
                {p.user.plan === "FREE" ? "FREE" : `${p.user.plan} · ${p.subscription?.totalDays || 30} ${L("kun", "кун", "дн")}`}
              </div>
              {p.subscription && (
                <div style={{ fontSize: 13, color: "var(--fg-2)" }}>
                  {L("Tugash sanasi:", "Тугаш санаси:", "Окончание:")}{" "}
                  <span className="mono" style={{ color: "var(--fg-0)" }}>
                    {new Date(p.subscription.planExpiresAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              )}
              {!p.subscription && (
                <div style={{ fontSize: 13, color: "var(--fg-2)" }}>
                  {L("Premium reja faollashtirilmagan", "Premium режа фаоллаштирилмаган", "Premium не активен")}
                </div>
              )}
            </div>

            {p.subscription && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>
                  <span>{L("QOLDI", "ҚОЛДИ", "ОСТАЛОСЬ")}</span>
                  <span>
                    <span style={{ color: "var(--fg-0)" }}>{p.subscription.daysLeft}</span> / {p.subscription.totalDays} {L("kun", "кун", "дн")}
                  </span>
                </div>
                <div className="progress">
                  <span style={{ width: subPct + "%" }} />
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
              <Link href="/pricing" className="btn btn--primary" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
                {p.subscription ? L("Obunani uzaytirish", "Обунани узайтириш", "Продлить подписку") : L("Premium ulanish", "Premium уланиш", "Подключить Premium")}
              </Link>
              <Link href="/pricing" className="btn btn--ghost" style={{ fontSize: 13 }}>
                {L("Tariflar", "Тарифлар", "Тарифы")}
              </Link>
            </div>
          </div>

          {/* Payment history */}
          <div className="bento" style={{ padding: 26 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div className="overline">{L("TO'LOV TARIXI", "ТЎЛОВ ТАРИХИ", "ИСТОРИЯ ОПЛАТ")}</div>
              <Link href="/profile" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>
                {L("Hammasini ko'rish", "Ҳаммасини кўриш", "Все")} →
              </Link>
            </div>
            {p.payments.length === 0 && (
              <p style={{ color: "var(--fg-3)", fontSize: 13, margin: 0 }}>
                {L("Hali to'lov yo'q", "Ҳали тўлов йўқ", "Пока нет оплат")}
              </p>
            )}
            {p.payments.map((r, i) => {
              const ok = r.status === "ACTIVE";
              return (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 0",
                    borderTop: i ? "1px solid var(--line)" : "none"
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: ok
                        ? "color-mix(in oklch, var(--success) 18%, var(--bg-2))"
                        : "color-mix(in oklch, var(--error) 18%, var(--bg-2))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ok ? "var(--success)" : "var(--error)",
                      fontSize: 13,
                      fontFamily: "var(--font-mono)",
                      flexShrink: 0
                    }}
                  >
                    {ok ? "✓" : r.status === "PENDING" ? "○" : "✕"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.tariffName}</div>
                    <div style={{ fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
                      {new Date(r.createdAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short", year: "numeric" })} · {r.method}
                    </div>
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: ok ? "var(--fg-0)" : "var(--fg-2)",
                      textDecoration: ok ? "none" : "line-through"
                    }}
                  >
                    {new Intl.NumberFormat("uz-UZ").format(r.amount)} {L("so'm", "сўм", "сум")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Telegram Bot ─────────────────────────── */}
      <section style={{ padding: "8px 48px 32px" }}>
        <div
          className="bento tg-section"
          style={{
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            background: `radial-gradient(60% 100% at 100% 50%, color-mix(in oklch, ${TG_BLUE} 18%, transparent), transparent 65%), var(--bg-1)`,
            borderColor: `color-mix(in oklch, ${TG_BLUE} 28%, var(--line))`
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              flexShrink: 0,
              background: `linear-gradient(135deg, ${TG_BLUE}, ${TG_BLUE_2})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 24px color-mix(in oklch, ${TG_BLUE} 50%, transparent)`
            }}
          >
            <NeoIcon name="send" size={36} />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="overline" style={{ marginBottom: 6, color: "oklch(0.78 0.14 230)" }}>
              {L("TELEGRAM BOT", "ТЕЛЕГРАМ БОТ", "ТЕЛЕГРАМ-БОТ")}
            </div>
            <div className="h-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
              @avtoimtihon_uz_bot
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--fg-1)", lineHeight: 1.5 }}>
              {L(
                "Telegram orqali ham mashq qiling — savol-javob, bilet, kunlik test va eslatmalar.",
                "Telegram орқали ҳам машқ қилинг — савол-жавоб, билет, кунлик тест ва эслатмалар.",
                "Тренируйтесь в Telegram — вопросы, билеты, ежедневные тесты и напоминания."
              )}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span className="chip" style={{ fontSize: 11 }}>{L("Bepul", "Бепул", "Бесплатно")}</span>
            <a
              href="https://t.me/avtoimtihon_uz_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                background: `linear-gradient(135deg, ${TG_BLUE}, ${TG_BLUE_2})`,
                color: "#fff",
                borderColor: "transparent",
                boxShadow: `0 0 20px color-mix(in oklch, ${TG_BLUE} 40%, transparent)`,
                fontSize: 14,
                fontWeight: 600
              }}
            >
              {L("Botga ulanish", "Ботга уланиш", "Подключить бота")} →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "var(--fg-2)",
          fontSize: 13,
          flexWrap: "wrap",
          gap: 16
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo small />
          <span>© 2026 avtoimtihon.uz</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setContactOpen(true)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--fg-1)",
              background: "transparent",
              border: "none",
              fontSize: 13,
              fontFamily: "inherit"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 12a9 9 0 1 1-3.5-7.1L21 4l-1 4-4-.5" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {L("Aloqa / Murojaat", "Алоқа / Мурожаат", "Контакты")}
          </button>
          <span>{L("Yordam", "Ёрдам", "Помощь")}</span>
          <span>{L("Foydalanish shartlari", "Фойдаланиш шартлари", "Условия")}</span>
        </div>
      </footer>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}

      <style>{`
        @media (max-width: 900px) {
          .big-cards { grid-template-columns: 1fr !important; }
          .small-cards { grid-template-columns: 1fr 1fr !important; }
          .sub-grid { grid-template-columns: 1fr !important; }
          .welcome-bento { flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 540px) {
          .small-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function ActionCard({
  card,
  big,
  lang
}: {
  card: {
    icon: "play" | "target" | "layers" | "flag" | "ticket" | "flame" | "alert" | "bookmark";
    title: string;
    sub: string;
    stat: string;
    href: string;
    accent?: boolean;
    big?: boolean;
    tone?: "error" | "lime";
  };
  big?: boolean;
  lang: string;
}) {
  const accentBg = card.accent
    ? "radial-gradient(80% 100% at 100% 0%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 60%), var(--bg-1)"
    : undefined;
  const toneColor = card.tone === "error" ? "var(--error)" : card.tone === "lime" ? "var(--success)" : "var(--accent)";

  return (
    <Link
      href={card.href}
      className={"bento" + (card.accent ? " bento--accent" : "")}
      style={{
        padding: big ? 26 : 22,
        textAlign: "left",
        cursor: "pointer",
        color: "inherit",
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        gap: big ? 14 : 12,
        background: accentBg,
        position: "relative",
        overflow: "hidden",
        transition: "transform .2s, border-color .2s"
      }}
    >
      {card.accent && (
        <span
          className="chip"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "var(--accent)",
            color: "#0a1f24",
            borderColor: "var(--accent)",
            fontSize: 10,
            fontWeight: 700
          }}
        >
          ● {lang === "ru" ? "РЕКОМЕНДУЕМ" : lang === "cy" ? "ТАВСИЯ" : "TAVSIYA"}
        </span>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: big ? 16 : 12 }}>
        <div
          style={{
            width: big ? 56 : 46,
            height: big ? 56 : 46,
            borderRadius: 14,
            background: `color-mix(in oklch, ${toneColor} 18%, var(--bg-2))`,
            border: `1px solid color-mix(in oklch, ${toneColor} 40%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px color-mix(in oklch, ${toneColor} 22%, transparent)`,
            flexShrink: 0
          }}
        >
          <NeoIcon name={card.icon} size={big ? 26 : 22} tone={card.tone} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="h-display" style={{ fontSize: big ? 20 : 16, fontWeight: 600, lineHeight: 1.25 }}>
            {card.title}
          </div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: big ? 14 : 12.5, color: "var(--fg-1)", lineHeight: 1.5 }}>{card.sub}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
        <span
          className={"chip " + (card.tone === "error" ? "chip--error" : card.tone === "lime" ? "chip--lime" : "")}
          style={{ fontSize: 11, padding: "5px 10px" }}
        >
          {card.stat}
        </span>
        <span style={{ color: "var(--accent)", fontSize: 14, fontWeight: 600 }}>→</span>
      </div>
    </Link>
  );
}
