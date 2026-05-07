"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Q = { id: string; textUz: string; categoryName: string; difficulty: string };
type Cat = { id: string; nameUz: string };

export default function TestEditor({ categories, questions }: { categories: Cat[]; questions: Q[] }) {
  const router = useRouter();
  const [data, setData] = useState({
    titleUz: "",
    titleRu: "",
    titleCy: "",
    categoryId: "",
    timeLimitMinutes: 25,
    passingScore: 18,
    isExamSimulation: false,
    isPublished: true
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterCat, setFilterCat] = useState("");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (filterCat && q.categoryName !== categories.find((c) => c.id === filterCat)?.nameUz) return false;
      if (search && !q.textUz.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [questions, filterCat, search, categories]);

  const toggle = (id: string) => {
    setSelectedIds((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const save = async () => {
    if (!data.titleUz.trim()) {
      alert("Test nomini kiriting");
      return;
    }
    if (selectedIds.size === 0) {
      alert("Kamida bitta savol tanlang");
      return;
    }
    setSaving(true);
    try {
      const r = await fetch("/api/admin/tests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          titleRu: data.titleRu || data.titleUz,
          titleCy: data.titleCy || data.titleUz,
          categoryId: data.categoryId || null,
          questionIds: Array.from(selectedIds)
        })
      });
      if (r.ok) router.push("/admin/tests");
      else {
        const e = await r.json();
        alert("Xatolik: " + (e.error || ""));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ed-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 14 }}>TEST NOMI</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <input className="input" placeholder="O'zbek (Lotin)" value={data.titleUz} onChange={(e) => setData({ ...data, titleUz: e.target.value })} />
            <input className="input" placeholder="Кирилл" value={data.titleCy} onChange={(e) => setData({ ...data, titleCy: e.target.value })} />
            <input className="input" placeholder="Русский" value={data.titleRu} onChange={(e) => setData({ ...data, titleRu: e.target.value })} />
          </div>
        </div>

        <div className="bento" style={{ padding: 24 }}>
          <div className="overline" style={{ marginBottom: 14 }}>SAVOLLAR ({selectedIds.size} tanlangan)</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <input className="input" style={{ flex: 1, minWidth: 200 }} placeholder="Savol qidirish..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="input"
              style={{ width: "auto" }}
            >
              <option value="">Barcha kategoriyalar</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nameUz}</option>
              ))}
            </select>
          </div>
          <div style={{ maxHeight: 480, overflowY: "auto", border: "1px solid var(--line)", borderRadius: 12 }}>
            {filtered.map((q, i) => {
              const selected = selectedIds.has(q.id);
              return (
                <div
                  key={q.id}
                  onClick={() => toggle(q.id)}
                  style={{
                    padding: "12px 16px",
                    borderBottom: i < filtered.length - 1 ? "1px solid var(--line)" : "none",
                    background: selected ? "color-mix(in oklch, var(--accent) 10%, transparent)" : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                  }}
                >
                  <input type="checkbox" checked={selected} onChange={() => {}} style={{ accentColor: "var(--accent)" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.textUz}</p>
                    <p className="mono" style={{ fontSize: 11, color: "var(--fg-3)", margin: "2px 0 0" }}>
                      {q.categoryName} · {q.difficulty}
                    </p>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--fg-3)" }}>Savollar topilmadi</div>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="bento" style={{ padding: 22 }}>
          <div className="overline" style={{ marginBottom: 14 }}>SOZLAMALAR</div>
          <div style={{ marginBottom: 10 }}>
            <label style={labelSt}>KATEGORIYA</label>
            <select value={data.categoryId} onChange={(e) => setData({ ...data, categoryId: e.target.value })} className="input">
              <option value="">— Aralash —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.nameUz}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={labelSt}>VAQT (DAQIQA)</label>
            <input
              type="number"
              value={data.timeLimitMinutes}
              onChange={(e) => setData({ ...data, timeLimitMinutes: Number(e.target.value) })}
              className="input"
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={labelSt}>O'TISH BALI</label>
            <input
              type="number"
              value={data.passingScore}
              onChange={(e) => setData({ ...data, passingScore: Number(e.target.value) })}
              className="input"
            />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={data.isExamSimulation}
              onChange={(e) => setData({ ...data, isExamSimulation: e.target.checked })}
            />
            Imtihon simulyatsiyasi
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 13, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={data.isPublished}
              onChange={(e) => setData({ ...data, isPublished: e.target.checked })}
            />
            Saytda ko'rinadigan
          </label>
        </div>

        <button onClick={save} disabled={saving} className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
          {saving ? "Saqlanmoqda..." : "✓ Test yaratish"}
        </button>
        <button onClick={() => router.push("/admin/tests")} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center" }}>
          Bekor qilish
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) { .ed-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

const labelSt: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontFamily: "var(--font-mono)",
  color: "var(--fg-3)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 6
};
