"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { NeoIcon } from "@/components/NeoIcon";

export default function GuestLanding() {
  const { lang } = useLang();
  const L = (uz: string, cy: string, ru: string) => (lang === "ru" ? ru : lang === "cy" ? cy : uz);

  return (
    <main style={{ background: "var(--bg-0)", color: "var(--fg-0)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      <section style={{ padding: "48px 48px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bento dotgrid"
          style={{
            padding: "64px 64px 56px",
            borderRadius: 28,
            background: `
              radial-gradient(80% 100% at 100% 0%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 60%),
              radial-gradient(60% 80% at 0% 100%, color-mix(in oklch, var(--accent-2) 16%, transparent), transparent 65%),
              var(--bg-1)`,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div className="overline" style={{ marginBottom: 24 }}>
            ● {L("O'ZBEKISTONDAGI #1 AVTO IMTIHON", "ЎЗБЕКИСТОНДАГИ #1 АВТО ИМТИҲОН", "ПЛАТФОРМА №1 ДЛЯ АВТОЭКЗАМЕНА")}
          </div>
          <h1 className="h-display h1" style={{ margin: 0, marginBottom: 24, maxWidth: 900 }}>
            {L("Haydovchilik", "Ҳайдовчилик", "Экзамен на")}{" "}
            <span style={{ color: "var(--accent)" }}>
              {L("imtihoniga", "имтиҳонига", "права —")}
            </span>{" "}
            {L("bir martada o'ting.", "бир мартада ўтинг.", "сдайте с первого раза.")}
          </h1>
          <p style={{ fontSize: 19, color: "var(--fg-1)", maxWidth: 540, lineHeight: 1.5, marginBottom: 32 }}>
            {L(
              "Real imtihon formati, 1000+ savollar bazasi va batafsil tahlil. Mashq, bilet, mavzular bo'yicha test va xatolarni qaytarish.",
              "Реал имтиҳон формати, 1000+ саволлар базаси ва батафсил таҳлил.",
              "Реальный формат экзамена, база 1000+ вопросов и подробный анализ."
            )}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/auth/login" className="btn btn--primary">
              {L("Bepul boshlash", "Бепул бошлаш", "Начать бесплатно")} →
            </Link>
            <Link href="/auth/register" className="btn btn--ghost">
              {L("Ro'yxatdan o'tish", "Рўйхатдан ўтиш", "Регистрация")}
            </Link>
          </div>
        </motion.div>
      </section>

      <section style={{ padding: "8px 48px 24px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {[
            { icon: "play" as const, t: L("Real imtihon", "Реал имтиҳон", "Реальный экзамен"), s: L("20 savol · 25 daq · 18/20", "20 савол · 25 дақ · 18/20", "20 вопросов · 25 мин · 18/20") },
            { icon: "target" as const, t: L("Mashq rejimi", "Машқ режими", "Тренировка"), s: L("Tushuntirish bilan", "Тушунтириш билан", "С пояснениями") },
            { icon: "layers" as const, t: L("18 mavzu", "18 мавзу", "18 тем"), s: L("Har birida 1-200 savol", "Ҳар бирида 1-200 савол", "По 1-200 вопросов") },
            { icon: "ticket" as const, t: L("62 bilet", "62 билет", "62 билета"), s: L("Har bilet 20 savol", "Ҳар билет 20 савол", "По 20 вопросов") }
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bento"
              style={{ padding: 22 }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "color-mix(in oklch, var(--accent) 18%, var(--bg-2))",
                  border: "1px solid color-mix(in oklch, var(--accent) 40%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  boxShadow: "0 0 20px color-mix(in oklch, var(--accent) 22%, transparent)"
                }}
              >
                <NeoIcon name={c.icon} size={22} />
              </div>
              <div className="h-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
              <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)" }}>{c.s}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ padding: "8px 48px 48px", textAlign: "center" }}>
        <p style={{ color: "var(--fg-2)", fontSize: 14, marginBottom: 12 }}>
          {L("Hisobingiz bormi?", "Ҳисобингиз борми?", "Уже есть аккаунт?")}
        </p>
        <Link href="/auth/login" className="btn btn--primary">
          {L("Kirish", "Кириш", "Войти")} →
        </Link>
      </section>
    </main>
  );
}
