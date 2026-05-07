"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoadSignSvg } from "@/components/RoadSignSvg";

type Cat = { id: string; nameUz: string; slug: string };
type Initial = {
  id: string;
  categoryId: string | null;
  textUz: string;
  textRu: string;
  textCy: string;
  explanationUz: string | null;
  explanationRu: string | null;
  explanationCy: string | null;
  imageUrl: string | null;
  difficulty: string;
  isPublished: boolean;
  options: { id?: string; textUz: string; textRu: string; textCy: string; isCorrect: boolean }[];
};

export default function QuestionEditor({ categories, initial }: { categories: Cat[]; initial?: Initial }) {
  const router = useRouter();
  const [tab, setTab] = useState<"uz" | "cy" | "ru">("uz");
  const [data, setData] = useState({
    categoryId: initial?.categoryId || categories[0]?.id || "",
    textUz: initial?.textUz || "",
    textRu: initial?.textRu || "",
    textCy: initial?.textCy || "",
    explanationUz: initial?.explanationUz || "",
    explanationRu: initial?.explanationRu || "",
    explanationCy: initial?.explanationCy || "",
    imageUrl: initial?.imageUrl || "",
    difficulty: initial?.difficulty || "MEDIUM",
    isPublished: initial?.isPublished ?? true,
    options:
      initial?.options ||
      [0, 1, 2, 3].map(() => ({ textUz: "", textRu: "", textCy: "", isCorrect: false }))
  });
  const [saving, setSaving] = useState(false);

  const updateOption = (i: number, patch: Partial<typeof data.options[0]>) => {
    setData((d) => ({ ...d, options: d.options.map((o, idx) => (idx === i ? { ...o, ...patch } : o)) }));
  };
  const setCorrect = (i: number) => {
    setData((d) => ({ ...d, options: d.options.map((o, idx) => ({ ...o, isCorrect: idx === i })) }));
  };
  const addOption = () => {
    setData((d) => ({ ...d, options: [...d.options, { textUz: "", textRu: "", textCy: "", isCorrect: false }] }));
  };
  const removeOption = (i: number) => {
    if (data.options.length <= 2) return;
    setData((d) => ({ ...d, options: d.options.filter((_, idx) => idx !== i) }));
  };

  const save = async () => {
    if (!data.textUz.trim()) {
      alert("O'zbekcha matn kiriting");
      return;
    }
    if (!data.options.some((o) => o.isCorrect)) {
      alert("Kamida bitta to'g'ri javob tanlang");
      return;
    }
    setSaving(true);
    try {
      const url = initial ? `/api/admin/questions/${initial.id}` : "/api/admin/questions";
      const method = initial ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) router.push("/admin/questions");
      else {
        const e = await res.json();
        alert("Xatolik: " + (e.error || ""));
      }
    } finally {
      setSaving(false);
    }
  };

  const tabKey = tab === "uz" ? "textUz" : tab === "cy" ? "textCy" : "textRu";
  const expKey = tab === "uz" ? "explanationUz" : tab === "cy" ? "explanationCy" : "explanationRu";
  const optKey = tab === "uz" ? "textUz" : tab === "cy" ? "textCy" : "textRu";

  return (
    <div className="editor-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "flex-start" }}>
      {/* Editor */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Question text */}
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 14 }}>SAVOL MATNI</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {[
              { k: "uz", l: "🇺🇿 O'zbek (Lotin)" },
              { k: "cy", l: "Ўзбек (Кирилл)" },
              { k: "ru", l: "Русский" }
            ].map((l) => (
              <button
                key={l.k}
                onClick={() => setTab(l.k as any)}
                className="chip"
                style={{
                  fontSize: 11,
                  padding: "6px 11px",
                  cursor: "pointer",
                  background: tab === l.k ? "var(--bg-3)" : "transparent",
                  color: tab === l.k ? "var(--fg-0)" : "var(--fg-2)"
                }}
              >
                {l.l}
              </button>
            ))}
          </div>
          <textarea
            value={(data as any)[tabKey] || ""}
            onChange={(e) => setData({ ...data, [tabKey]: e.target.value } as any)}
            placeholder="Savol matni..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "14px 16px",
              fontSize: 16,
              color: "var(--fg-0)",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              lineHeight: 1.4,
              resize: "vertical",
              minHeight: 70,
              outline: "none"
            }}
          />
        </div>

        {/* Options */}
        <div className="bento" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div className="overline">JAVOB VARIANTLARI ({tab === "uz" ? "O'zbek" : tab === "cy" ? "Кирилл" : "Русский"})</div>
            <button onClick={addOption} className="btn btn--ghost" style={{ fontSize: 11, padding: "6px 12px" }}>
              + Variant qo'shish
            </button>
          </div>
          {data.options.map((o, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 14px",
                borderRadius: 10,
                background: o.isCorrect ? "color-mix(in oklch, var(--success) 12%, var(--bg-2))" : "var(--bg-2)",
                border: "1px solid " + (o.isCorrect ? "var(--success)" : "var(--line)"),
                marginBottom: 8
              }}
            >
              <input
                type="radio"
                name="correct"
                checked={o.isCorrect}
                onChange={() => setCorrect(i)}
                style={{ accentColor: "var(--success)" }}
              />
              <kbd
                style={{
                  minWidth: 32,
                  padding: "4px 8px",
                  borderRadius: 6,
                  background: "var(--bg-3)",
                  color: "var(--fg-1)",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  textAlign: "center"
                }}
              >
                F{i + 1}
              </kbd>
              <input
                value={(o as any)[optKey] || ""}
                onChange={(e) => updateOption(i, { [optKey]: e.target.value } as any)}
                placeholder="Variant matni"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: "var(--fg-0)",
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "var(--font-body)"
                }}
              />
              {o.isCorrect && (
                <span className="chip chip--lime" style={{ fontSize: 10, padding: "3px 8px" }}>
                  ✓ TO'G'RI
                </span>
              )}
              {data.options.length > 2 && (
                <button
                  onClick={() => removeOption(i)}
                  style={{ background: "transparent", border: "none", color: "var(--fg-3)", padding: 4, cursor: "pointer" }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 14 }}>TUSHUNTIRISH (ixtiyoriy)</div>
          <textarea
            value={(data as any)[expKey] || ""}
            onChange={(e) => setData({ ...data, [expKey]: e.target.value } as any)}
            placeholder="Nima uchun bu javob to'g'ri..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 13,
              color: "var(--fg-1)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.55,
              resize: "vertical",
              minHeight: 70,
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Sidebar — meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="bento" style={{ padding: 22 }}>
          <div className="overline" style={{ marginBottom: 14 }}>RASM URL (ixtiyoriy)</div>
          <div
            style={{
              aspectRatio: "1",
              background: "var(--bg-2)",
              borderRadius: 12,
              border: "1.5px dashed var(--line-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            {data.imageUrl ? (
              <img src={data.imageUrl} alt="" style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
            ) : (
              <RoadSignSvg kind="priority-main" size={120} />
            )}
          </div>
          <input
            value={data.imageUrl}
            onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
            placeholder="https://..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 12,
              color: "var(--fg-0)",
              fontFamily: "var(--font-mono)",
              outline: "none"
            }}
          />
        </div>

        <div className="bento" style={{ padding: 22 }}>
          <div className="overline" style={{ marginBottom: 14 }}>METADATA</div>
          <FieldSelect
            label="MAVZU"
            value={data.categoryId}
            onChange={(v) => setData({ ...data, categoryId: v })}
            options={categories.map((c) => ({ value: c.id, label: c.nameUz }))}
          />
          <FieldSelect
            label="QIYINLIK"
            value={data.difficulty}
            onChange={(v) => setData({ ...data, difficulty: v })}
            options={[
              { value: "EASY", label: "Oson" },
              { value: "MEDIUM", label: "O'rta" },
              { value: "HARD", label: "Qiyin" }
            ]}
          />
          <FieldSelect
            label="STATUS"
            value={data.isPublished ? "true" : "false"}
            onChange={(v) => setData({ ...data, isPublished: v === "true" })}
            options={[
              { value: "true", label: "● Faol" },
              { value: "false", label: "○ Yashirin" }
            ]}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={save} disabled={saving} className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
            {saving ? "Saqlanmoqda..." : "✓ Saqlash"}
          </button>
          <button onClick={() => router.push("/admin/questions")} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center" }}>
            Bekor qilish
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .editor-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 4, fontFamily: "var(--font-mono)" }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          background: "var(--bg-2)",
          border: "1px solid var(--line)",
          borderRadius: 8,
          fontSize: 13,
          color: "var(--fg-0)",
          fontFamily: "var(--font-body)",
          outline: "none"
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
