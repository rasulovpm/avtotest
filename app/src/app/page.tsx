"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Logo } from "@/components/layout/Logo";
import { RoadSignSvg } from "@/components/RoadSignSvg";
import { useLang } from "@/components/lang-provider";
import { LANGS, type Lang } from "@/lib/i18n";
import { useState } from "react";

export default function HomePage() {
  const { t, lang, setLang } = useLang();
  const { data: session } = useSession();
  const [langOpen, setLangOpen] = useState(false);

  return (
    <div style={{ background: "var(--bg-0)", color: "var(--fg-0)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
      {/* ── Header ─────────────────────────────────────────── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          borderBottom: "1px solid var(--line)",
          background: "color-mix(in oklch, var(--bg-0) 70%, transparent)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Logo />
          <nav className="hidden md:flex" style={{ gap: 28 }}>
            {[
              { href: "/tests", label: t.nav.tests },
              { href: "/signs", label: t.nav.signs },
              { href: "/progress", label: t.nav.progress },
              { href: "/pricing", label: t.nav.pricing }
            ].map((x) => (
              <Link
                key={x.href}
                href={x.href}
                style={{ color: "var(--fg-1)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}
                className="hover:text-fg-0 transition-colors"
              >
                {x.label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* Lang switcher */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="chip"
              style={{ cursor: "pointer", textTransform: "uppercase" }}
            >
              ◐ {lang}
            </button>
            {langOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 6px)",
                  background: "var(--bg-1)",
                  border: "1px solid var(--line-2)",
                  borderRadius: 12,
                  padding: 4,
                  minWidth: 160,
                  zIndex: 50,
                  boxShadow: "var(--shadow-card)"
                }}
              >
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as Lang);
                      setLangOpen(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 12px",
                      background: lang === l.code ? "var(--bg-2)" : "transparent",
                      color: lang === l.code ? "var(--accent)" : "var(--fg-0)",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500
                    }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {session ? (
            <Link href="/profile" className="btn btn--ghost" style={{ fontSize: 14, padding: "10px 18px" }}>
              {(session.user?.name || (session.user as any)?.phone || "Profil").slice(0, 18)} →
            </Link>
          ) : (
            <>
              <Link href="/auth/register" className="btn btn--ghost" style={{ fontSize: 14, padding: "10px 18px" }}>
                {t.nav.register}
              </Link>
              <Link href="/auth/login" className="btn btn--primary" style={{ fontSize: 14, padding: "10px 20px" }}>
                {t.nav.login} →
              </Link>
            </>
          )}
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ padding: "48px 48px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]" style={{ gap: 48, alignItems: "flex-start" }}>
            <div>
              <div className="overline" style={{ marginBottom: 24 }}>
                ● O'ZBEKISTONDAGI #1 AVTO IMTIHON
              </div>
              <h1 className="h-display h1" style={{ margin: 0, marginBottom: 24 }}>
                Haydovchilik
                <br />
                <span style={{ color: "var(--accent)" }}>imtihoniga</span>
                <br />
                bir martada o'ting.
              </h1>
              <p style={{ fontSize: 19, color: "var(--fg-1)", maxWidth: 540, lineHeight: 1.5, marginBottom: 32 }}>
                {t.landing.heroSub}. Real imtihon formati, 1000+ savollar bazasi va batafsil tahlil.
              </p>
              <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
                <Link href="/auth/login" className="btn btn--primary">
                  {t.landing.heroCta} →
                </Link>
                <Link href="/tests" className="btn btn--ghost">
                  ▷ {t.landing.heroCta2}
                </Link>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[t.landing.check1, t.landing.check2, t.landing.check3].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--fg-2)", fontSize: 13 }}>
                    <span style={{ color: "var(--accent-2)", fontFamily: "var(--font-mono)" }}>✓</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Live preview kartochka */}
            <div
              style={{
                background: "var(--bg-2)",
                border: "1px solid var(--line-2)",
                borderRadius: 20,
                padding: 24,
                position: "relative"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="chip chip--accent">LIVE PREVIEW</span>
                <span className="mono" style={{ fontSize: 12, color: "var(--fg-2)" }}>9 / 20 · 12:18</span>
              </div>
              <div className="progress" style={{ marginBottom: 20 }}>
                <span style={{ width: "30%" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <RoadSignSvg kind="priority-main" size={92} />
              </div>
              <div className="overline" style={{ marginBottom: 6 }}>SAVOL #12</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, lineHeight: 1.4 }}>
                Ushbu yo'l belgisi nimani bildiradi?
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { l: "A", t: "Asosiy yo'lning ustunligi", state: "correct" },
                  { l: "B", t: "Qarama-qarshi harakat", state: "idle" },
                  { l: "C", t: "To'xtash taqiqlangan", state: "idle" },
                  { l: "D", t: "Piyodalar o'tish joyi", state: "idle" }
                ].map((o) => (
                  <div
                    key={o.l}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 12,
                      border:
                        "1px solid " +
                        (o.state === "correct"
                          ? "color-mix(in oklch, var(--success) 60%, transparent)"
                          : "var(--line)"),
                      background:
                        o.state === "correct" ? "color-mix(in oklch, var(--success) 12%, transparent)" : "transparent",
                      fontSize: 13
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: o.state === "correct" ? "var(--success)" : "var(--bg-3)",
                        color: o.state === "correct" ? "#0a1f0e" : "var(--fg-1)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {o.state === "correct" ? "✓" : o.l}
                    </div>
                    {o.t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Bento ──────────────────────────────────── */}
      <section style={{ padding: "24px 48px" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 16 }}>
          {[
            { n: "1000+", label: t.landing.stat1Label, sub: "uz · cy · ru" },
            { n: "50K+", label: t.landing.stat2Label, sub: "har oy" },
            { n: "95%", label: t.landing.stat3Label, sub: "imtihon" },
            { n: "24/7", label: t.landing.stat4Label, sub: "online" }
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bento"
              style={{ padding: 24 }}
            >
              <div className="overline" style={{ marginBottom: 12 }}>
                0{i + 1}
              </div>
              <div
                className="h-display"
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  background: i === 0 ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "none",
                  WebkitBackgroundClip: i === 0 ? "text" : "unset",
                  WebkitTextFillColor: i === 0 ? "transparent" : "unset",
                  marginBottom: 4,
                  letterSpacing: "-0.03em"
                }}
              >
                {s.n}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-0)", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "var(--fg-2)" }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features Bento Grid ──────────────────────────── */}
      <section style={{ padding: "24px 48px 48px" }}>
        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <h2 className="h-display h2" style={{ margin: 0, maxWidth: 600 }}>
            {t.landing.featuresTitle}
          </h2>
          <div className="accent-line" style={{ flex: 1, marginLeft: 32, marginBottom: 12 }} />
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "200px",
            gap: 16
          }}
        >
          {/* Sim — big */}
          <Link
            href="/tests/test-real-20"
            className="bento bento--accent"
            style={{
              gridColumn: "span 4",
              gridRow: "span 2",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <div>
              <div className="overline" style={{ marginBottom: 12 }}>● REAL IMTIHON</div>
              <div className="h-display" style={{ fontSize: 40, fontWeight: 600, marginBottom: 12 }}>
                Imtihon simulyatsiyasi
              </div>
              <p style={{ color: "var(--fg-1)", fontSize: 16, maxWidth: 460, lineHeight: 1.5 }}>
                Haqiqiy DAN imtihon formati: 20 ta savol, 25 daqiqa, 18/20 — o'tish bali. Vaqt belgisi, navigator, klaviatura yorliqlari.
              </p>
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="chip chip--accent">⚡ 20 savol</span>
                <span className="chip chip--accent">⏱ 25 daq</span>
                <span className="chip chip--lime">✓ 18/20 o'tish</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 18px)", gap: 6 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background:
                        i < 8
                          ? i === 3
                            ? "var(--error)"
                            : "var(--success)"
                          : i === 8
                            ? "var(--accent)"
                            : "var(--bg-3)",
                      border: i === 8 ? "1.5px solid var(--accent)" : "none"
                    }}
                  />
                ))}
              </div>
            </div>
          </Link>

          {/* Signs */}
          <Link
            href="/signs"
            className="bento"
            style={{
              gridColumn: "span 2",
              gridRow: "span 2",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <div>
              <div className="overline" style={{ marginBottom: 12 }}>● 200+ BELGI</div>
              <div className="h-display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>
                Yo'l belgilari kutubxonasi
              </div>
              <p style={{ color: "var(--fg-1)", fontSize: 14, lineHeight: 1.5 }}>
                Barcha kategoriyalar — qidiruv, filtr, tushuntirishlar bilan.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 12 }}>
              <RoadSignSvg kind="warning-curve" size={64} />
              <RoadSignSvg kind="prohibit-no-entry" size={64} />
              <RoadSignSvg kind="mandatory-roundabout" size={64} />
              <RoadSignSvg kind="prohibit-speed" size={64} />
              <RoadSignSvg kind="priority-stop" size={64} />
              <RoadSignSvg kind="info-parking" size={64} />
            </div>
          </Link>

          {/* Stats */}
          <Link
            href="/progress"
            className="bento"
            style={{
              gridColumn: "span 3",
              gridRow: "span 1",
              padding: 24,
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <div className="overline" style={{ marginBottom: 10 }}>● TAHLIL</div>
            <div className="h-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
              Statistika va zaif mavzular
            </div>
            <p style={{ color: "var(--fg-1)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              Streak, XP, daraja va kategoriya bo'yicha aniq tahlil. Qaysi mavzuda zaifligingizni biling.
            </p>
          </Link>

          {/* Mobile */}
          <div
            className="bento bento--accent-2"
            style={{
              gridColumn: "span 3",
              gridRow: "span 1",
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 20
            }}
          >
            <div style={{ flex: 1 }}>
              <div className="overline" style={{ marginBottom: 10 }}>● MOBIL</div>
              <div className="h-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
                Istalgan joyda mashq
              </div>
              <p style={{ color: "var(--fg-1)", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                Telefon, planshet, kompyuter — barcha qurilmalarda bir xil tajriba.
              </p>
            </div>
            <div
              style={{
                width: 70,
                height: 100,
                borderRadius: 12,
                border: "2px solid var(--line-2)",
                background: "var(--bg-0)",
                display: "flex",
                flexDirection: "column",
                padding: 6,
                gap: 4,
                flexShrink: 0
              }}
            >
              <div style={{ height: 4, background: "var(--accent)", borderRadius: 2 }} />
              <div style={{ height: 6, background: "var(--bg-2)", borderRadius: 2 }} />
              <div style={{ flex: 1, background: "var(--bg-2)", borderRadius: 4 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "32px 48px",
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
        <div style={{ display: "flex", gap: 24 }}>
          <a style={{ color: "inherit", textDecoration: "none" }}>Aloqa</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>Yordam</a>
          <a style={{ color: "inherit", textDecoration: "none" }}>Foydalanish shartlari</a>
        </div>
      </footer>
    </div>
  );
}
