"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { pickName } from "@/lib/i18n";
import { RoadSignSvg } from "@/components/RoadSignSvg";

type Sign = {
  id: string;
  code: string;
  nameUz: string;
  nameRu: string;
  nameCy: string;
  category: string;
  imageUrl: string | null;
  descriptionUz: string | null;
  descriptionRu: string | null;
  descriptionCy: string | null;
};

const CATS: { value: string; label: string }[] = [
  { value: "all", label: "Barchasi" },
  { value: "WARNING", label: "Ogohlantiruvchi" },
  { value: "PROHIBITORY", label: "Taqiqlovchi" },
  { value: "MANDATORY", label: "Buyuruvchi" },
  { value: "INFORMATION", label: "Axborot" },
  { value: "PRIORITY", label: "Ustunlik" }
];

const SIGN_KIND_BY_CODE: Record<string, any> = {
  "1.23": "warning-curve",
  "1.11": "warning-curve",
  "2.5": "prohibit-no-entry",
  "3.1": "mandatory-roundabout",
  "5.16": "info-parking",
  "2.1": "priority-main"
};

export default function SignsClient({ signs }: { signs: Sign[] }) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return signs.filter((s) => {
      if (filter !== "all" && s.category !== filter) return false;
      if (!q) return true;
      const name = pickName(s, lang).toLowerCase();
      return name.includes(q.toLowerCase()) || s.code.includes(q);
    });
  }, [signs, filter, q, lang]);

  return (
    <div style={{ padding: "48px", color: "var(--fg-0)" }}>
      <div style={{ marginBottom: 28 }}>
        <div className="overline" style={{ marginBottom: 8 }}>06 · LIBRARY</div>
        <h1 className="h-display h2" style={{ margin: 0, marginBottom: 6 }}>
          {t.signs.title}
        </h1>
        <p style={{ color: "var(--fg-1)", margin: 0 }}>{t.signs.sub}</p>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            placeholder={t.common.search + "..."}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              background: "var(--bg-1)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              color: "var(--fg-0)",
              fontSize: 14,
              fontFamily: "inherit",
              outline: "none"
            }}
          />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--fg-2)" }}>🔍</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CATS.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className="chip"
            style={{
              padding: "8px 16px",
              fontSize: 13,
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              background: filter === c.value ? "var(--accent)" : "var(--bg-1)",
              color: filter === c.value ? "#0a1f24" : "var(--fg-1)",
              borderColor: filter === c.value ? "var(--accent)" : "var(--line)"
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="signs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
        {filtered.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 12) * 0.03 }}
            className="bento"
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            <RoadSignSvg kind={SIGN_KIND_BY_CODE[s.code] || "priority-main"} size={72} />
            <div style={{ fontSize: 12, fontWeight: 600 }}>{pickName(s, lang)}</div>
            <span className="chip mono" style={{ fontSize: 10, padding: "3px 8px" }}>
              {s.code}
            </span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) { .signs-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 640px) { .signs-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  );
}
