"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { pickName, pickTitle } from "@/lib/i18n";
import { RoadSignSvg } from "@/components/RoadSignSvg";

type Test = {
  id: string;
  titleUz: string;
  titleRu: string;
  titleCy: string;
  isExamSimulation: boolean;
  timeLimitMinutes: number;
  questionCount: number;
  difficulty: string;
  category: {
    slug: string;
    nameUz: string;
    nameRu: string;
    nameCy: string;
    color: string;
    icon: string;
  } | null;
};

type Category = {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameCy: string;
  color: string | null;
};

const SIGN_BY_SLUG: Record<string, any> = {
  yhq: "priority-main",
  signs: "warning-curve",
  tech: "prohibit-speed",
  medical: "info-parking",
  default: "mandatory-roundabout"
};

export default function TestsCatalogClient({
  tests,
  categories,
  hasMistakes
}: {
  tests: Test[];
  categories: Category[];
  hasMistakes: boolean;
}) {
  const { t, lang } = useLang();
  const examTests = tests.filter((x) => x.isExamSimulation);
  const otherTests = tests.filter((x) => !x.isExamSimulation);
  const bigCards = examTests.slice(0, 2);

  return (
    <div style={{ padding: "48px 48px", color: "var(--fg-0)" }}>
      <div style={{ marginBottom: 36 }}>
        <div className="overline" style={{ marginBottom: 12 }}>02 · CATALOG</div>
        <h1 className="h-display h2" style={{ margin: 0, marginBottom: 8 }}>
          O'qish bo'limlari
        </h1>
        <p style={{ color: "var(--fg-1)", margin: 0, fontSize: 16, maxWidth: 720 }}>
          Tayyorgarlikning har bir bosqichi uchun alohida rejim. Real imtihon — haqiqiy sharoit; mashq — har savoldan keyin to'g'ri javob va tushuntirish.
        </p>
      </div>

      {/* TWO BIG cards on top */}
      {bigCards.length > 0 && (
        <div className="big-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {bigCards.map((tst, i) => {
            const isAccent = i === 0;
            return (
              <motion.div
                key={tst.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={"bento " + (isAccent ? "bento--accent" : "")}
                style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18, position: "relative", overflow: "hidden" }}
              >
                {isAccent && (
                  <div style={{ position: "absolute", top: 24, right: 24 }}>
                    <span
                      className="chip"
                      style={{
                        background: "var(--accent)",
                        color: "#0a1f24",
                        borderColor: "var(--accent)",
                        fontSize: 11,
                        fontWeight: 700
                      }}
                    >
                      ● TAVSIYA
                    </span>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ background: "var(--bg-0)", borderRadius: 14, padding: 14, border: "1px solid var(--line)" }}>
                    <RoadSignSvg kind={i === 0 ? "priority-main" : "mandatory-roundabout"} size={64} />
                  </div>
                  <div>
                    <div className="overline" style={{ marginBottom: 6 }}>Haqiqiy imtihon sharoiti</div>
                    <div className="h-display" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.15 }}>
                      {pickTitle(tst, lang)}
                    </div>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "var(--fg-1)", lineHeight: 1.5 }}>
                  {tst.questionCount} ta savol · {tst.timeLimitMinutes} daqiqa · o'tish: {Math.ceil(tst.questionCount * 0.9)}/{tst.questionCount}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                  <Link href={`/tests/${tst.id}`} className="btn btn--primary" style={{ flex: 1, justifyContent: "center", minWidth: 160 }}>
                    Imtihon →
                  </Link>
                  <Link href={`/tests/${tst.id}?mode=training`} className="btn btn--ghost" style={{ minWidth: 140, justifyContent: "center" }}>
                    Mashq qilish
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick access: mistakes + bookmarks */}
      <div className="quick-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Link href="/tests/mistakes" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="bento" style={{ padding: 26, display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ background: "var(--bg-2)", borderRadius: 12, padding: 12, border: "1px solid var(--line)", flexShrink: 0 }}>
              <RoadSignSvg kind="prohibit-no-entry" size={48} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div className="h-display" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.25 }}>
                  Xato belgilagan savollarim
                </div>
                {hasMistakes && (
                  <span className="chip chip--error" style={{ fontSize: 10, padding: "3px 8px", flexShrink: 0 }}>● BOR</span>
                )}
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--fg-1)", lineHeight: 1.5 }}>
                Avval xato bo'lgan savollarni qaytadan ishlash. Mashq rejimida tushuntirish bilan.
              </p>
              <div className="overline" style={{ color: "var(--fg-2)", marginTop: 10 }}>
                {hasMistakes ? "Xatolarni qaytarish →" : "Hozircha xato yo'q"}
              </div>
            </div>
          </div>
        </Link>

        <Link href="/signs" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="bento" style={{ padding: 26, display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ background: "var(--bg-2)", borderRadius: 12, padding: 12, border: "1px solid var(--line)", flexShrink: 0 }}>
              <RoadSignSvg kind="warning-curve" size={48} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="h-display" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.25 }}>
                Yo'l belgilari kutubxonasi
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--fg-1)", lineHeight: 1.5 }}>
                Barcha kategoriyalar bo'yicha belgilar — qidiruv va kategoriya filteri bilan.
              </p>
              <div className="overline" style={{ color: "var(--fg-2)", marginTop: 10 }}>Kutubxonani ochish →</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Category tests */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 className="h-display h3" style={{ margin: 0, fontSize: 22 }}>Mavzulashtirilgan testlar</h2>
          <div className="accent-line" style={{ flex: 1, marginLeft: 24, marginBottom: 8 }} />
        </div>
        <div className="other-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {otherTests.map((tst, i) => {
            const sign = (tst.category && SIGN_BY_SLUG[tst.category.slug]) || SIGN_BY_SLUG.default;
            return (
              <motion.div
                key={tst.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bento"
                style={{ padding: 26, display: "flex", gap: 20, alignItems: "flex-start" }}
              >
                <div style={{ background: "var(--bg-2)", borderRadius: 12, padding: 12, border: "1px solid var(--line)", flexShrink: 0 }}>
                  <RoadSignSvg kind={sign} size={48} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                  <div className="h-display" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.25 }}>
                    {pickTitle(tst, lang)}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--fg-1)", lineHeight: 1.5 }}>
                    {tst.category ? pickName(tst.category, lang) : "Aralash"} · {tst.questionCount} savol · {tst.timeLimitMinutes} daq
                  </p>
                  <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                    <Link href={`/tests/${tst.id}?mode=training`} className="btn btn--ghost" style={{ fontSize: 12, padding: "6px 12px" }}>
                      Mashq
                    </Link>
                    <Link href={`/tests/${tst.id}`} className="btn btn--primary" style={{ fontSize: 12, padding: "6px 12px" }}>
                      Test →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Categories chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <span key={c.id} className="chip" style={{ fontSize: 12, padding: "7px 12px" }}>
            {pickName(c, lang)}
          </span>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .big-grid { grid-template-columns: 1fr !important; }
          .quick-grid { grid-template-columns: 1fr !important; }
          .other-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
