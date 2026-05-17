"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { NeoIcon } from "@/components/NeoIcon";
import { ContactModal } from "@/components/ContactModal";
import { Logo } from "@/components/layout/Logo";
import { formatUzs } from "@/lib/utils";
import MyProgress from "@/components/MyProgress";
import type { OverallProgress } from "@/lib/progress-stats";
import RoadSignsBg from "@/components/RoadSignsBg";

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
  user: { name: string; plan: string; totalXp: number; planExpiresAt: string | null; examDate: string | null };
  streak: number;
  todayResults: number;
  mistakesCount: number;
  savedCount: number;
  examTestId: string;
  overallProgress: OverallProgress;
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
    // ── Yuqori qator — 3 ta katta card ───────────────────────
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
      key: "my-mistakes",
      icon: "alert",
      title: L("Mening xato savollarim", "Менинг хато саволларим", "Мои ошибки"),
      sub: L("Avval xato bo'lganlarni qaytarish", "Аввал хато бўлганларни қайтариш", "Повторить свои ошибки"),
      stat: String(p.mistakesCount),
      href: "/tests/mistakes",
      tone: "error",
      big: true
    },
    {
      key: "topics",
      icon: "layers",
      title: L("Mavzulashtirilgan testlar", "Мавзулаштирилган тестлар", "Тематические тесты"),
      sub: L("Har mavzu — alohida test, progress saqlanadi", "Ҳар мавзу — алоҳида тест, прогресс сақланади", "Каждая тема — отдельный тест с прогрессом"),
      stat: L("42 mavzu", "42 мавзу", "42 темы"),
      href: "/topics",
      big: true
    },
    // ── Pastki qator — 4 ta kichik card ──────────────────────
    {
      key: "real50",
      icon: "target",
      title: L("Imtihon · 50 talik", "Имтиҳон · 50 талик", "Экзамен · 50"),
      sub: L("Chuqurroq tayyorgarlik · 45/50", "Чуқурроқ тайёргарлик · 45/50", "Углублённо · 45/50"),
      stat: L("50 savol", "50 савол", "50 вопросов"),
      href: "/tests/test-real-50"
    },
    {
      key: "tickets",
      icon: "ticket",
      title: L("Biletlar trenirovka", "Билетлар тренировка", "Тренировка по билетам"),
      sub: L("Bilet ro'yxati va natijangiz", "Билетлар рўйхати ва натижалар", "Список билетов и результаты"),
      stat: L("61 bilet", "61 билет", "61 билет"),
      href: "/tickets"
    },
    {
      key: "popular-mistakes",
      icon: "flame",
      title: L("Ommabop xatoliklar", "Оммабоп хатоликлар", "Популярные ошибки"),
      sub: L("Eng ko'p xato qilingan savollar", "Энг кўп хато қилинган саволлар", "Самые частые ошибки"),
      stat: L("Top 50", "Топ 50", "Топ 50"),
      href: "/tests/popular-mistakes"
    },
    {
      key: "saved",
      icon: "bookmark",
      title: L("Saqlangan savollar", "Сақланган саволлар", "Сохранённые"),
      sub: L("Belgi qo'yib qoldirganlar", "Белги қўйиб қолдирганлар", "Отмеченные закладкой"),
      stat: String(p.savedCount),
      href: "/saved",
      tone: "lime"
    }
  ];

  return (
    <main style={{ background: "var(--bg-0)", color: "var(--fg-0)", minHeight: "100vh", fontFamily: "var(--font-body)", position: "relative", isolation: "isolate" }}>
      <RoadSignsBg />
      {/* ── My Progress (replaces former welcome bento) ─────── */}
      <section style={{ padding: "24px 48px 16px" }}>
        <MyProgress
          userName={p.user.name}
          streak={p.streak}
          totalXp={p.user.totalXp}
          isPro={p.user.plan !== "FREE"}
          examTestId={p.examTestId}
          examDate={p.user.examDate}
          progress={p.overallProgress}
        />
      </section>

      {/* ── 8 Quick action cards ─────────────────────── */}
      <section style={{ padding: "8px 48px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 className="h-display" style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
            {L("Boshlash uchun rejim tanlang", "Бошлаш учун режим танланг", "Выберите режим")}
          </h2>
          <span className="overline" style={{ color: "var(--fg-2)" }}>
            {L("7 BO'LIM", "7 БЎЛИМ", "7 РАЗДЕЛОВ")}
          </span>
        </div>

        {/* Yuqori qator — 3 ta katta card */}
        <div className="big-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
          {cards.filter((c) => c.big).map((c) => (
            <ActionCard key={c.key} card={c} big lang={lang} />
          ))}
        </div>

        {/* Pastki qator — 4 ta kichik card */}
        <div className="small-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {cards.filter((c) => !c.big).map((c) => (
            <ActionCard key={c.key} card={c} lang={lang} />
          ))}
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
