"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Topic = { id: string; number: number; nameUz: string };
type Q = { id: string; number: number; textUz: string; categoryId: string | null };

type Initial = {
  id: string;
  number: number;
  titleUz: string;
  titleRu: string;
  titleCy: string;
  description: string | null;
  isPublished: boolean;
  orderIndex: number;
  questionIds: string[];
};

export default function TicketEditor({
  topics,
  questions,
  initial
}: {
  topics: Topic[];
  questions: Q[];
  initial: Initial | null;
}) {
  const router = useRouter();
  const [data, setData] = useState({
    titleUz: initial?.titleUz || "",
    titleRu: initial?.titleRu || "",
    titleCy: initial?.titleCy || "",
    description: initial?.description || "",
    isPublished: initial?.isPublished ?? true,
    orderIndex: initial?.orderIndex ?? 0
  });
  const [picked, setPicked] = useState<Set<string>>(new Set(initial?.questionIds || []));
  const [filterTopic, setFilterTopic] = useState<string>("");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (filterTopic && q.categoryId !== filterTopic) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!q.textUz.toLowerCase().includes(s) && !String(q.number).includes(s)) return false;
      }
      return true;
    });
  }, [questions, filterTopic, search]);

  const toggle = (id: string) => {
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const pickedList = useMemo(() => {
    const order = initial?.questionIds || [];
    const ordered = order.filter((id) => picked.has(id));
    const extras = [...picked].filter((id) => !order.includes(id));
    const ids = [...ordered, ...extras];
    return ids
      .map((id) => questions.find((q) => q.id === id))
      .filter((q): q is Q => !!q);
  }, [picked, questions, initial]);

  const save = async () => {
    if (!data.titleUz.trim()) {
      alert("O'zbekcha nomi shart");
      return;
    }
    setSaving(true);
    try {
      const ids = pickedList.map((q) => q.id);
      if (!initial) {
        const r = await fetch("/api/admin/tickets", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!r.ok) {
          alert("Yaratishda xatolik");
          setSaving(false);
          return;
        }
        const { id } = await r.json();
        if (ids.length > 0) {
          await fetch(`/api/admin/tickets/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ questionIds: ids })
          });
        }
        router.push("/admin/tickets");
      } else {
        const r = await fetch(`/api/admin/tickets/${initial.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...data, questionIds: ids })
        });
        if (r.ok) router.push("/admin/tickets");
        else alert("Saqlashda xatolik");
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!initial) return;
    if (!confirm("Bilet o'chirilsinmi?")) return;
    const r = await fetch(`/api/admin/tickets/${initial.id}`, { method: "DELETE" });
    if (r.ok) router.push("/admin/tickets");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: 16, alignItems: "flex-start" }} className="ticket-grid">
      {/* Left — pick questions */}
      <div className="bento" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="overline">SAVOLLARNI BIRIKTIRISH ({picked.size} ta tanlangan)</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              color: "var(--fg-0)",
              borderRadius: 8,
              padding: "7px 10px",
              fontSize: 12
            }}
          >
            <option value="">Mavzu: barchasi</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                #{t.number} · {t.nameUz}
              </option>
            ))}
          </select>
          <input
            placeholder="Savol ID yoki matn bo'yicha qidirish…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: 220,
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 12,
              color: "var(--fg-0)",
              outline: "none"
            }}
          />
          <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)", alignSelf: "center" }}>
            Topildi: {filtered.length}
          </span>
        </div>

        <div style={{ maxHeight: 540, overflowY: "auto", border: "1px solid var(--line)", borderRadius: 10 }}>
          {filtered.map((q, i) => {
            const sel = picked.has(q.id);
            return (
              <label
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--line)" : "none",
                  cursor: "pointer",
                  background: sel ? "color-mix(in oklch, var(--accent) 8%, transparent)" : "transparent"
                }}
              >
                <input type="checkbox" checked={sel} onChange={() => toggle(q.id)} style={{ accentColor: "var(--accent)" }} />
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-2)", minWidth: 38 }}>
                  #{q.number}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: "var(--fg-0)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {q.textUz}
                </span>
              </label>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: "var(--fg-3)", fontSize: 13 }}>Savol topilmadi</div>
          )}
        </div>
      </div>

      {/* Right — meta + picked summary */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="bento" style={{ padding: 22 }}>
          <div className="overline" style={{ marginBottom: 14 }}>BILET MA'LUMOTI</div>
          <Field label="NOMI (O'zbek)" value={data.titleUz} onChange={(v) => setData({ ...data, titleUz: v })} />
          <Field label="NOMI (Ўзбек кирилл)" value={data.titleCy} onChange={(v) => setData({ ...data, titleCy: v })} />
          <Field label="NOMI (Русский)" value={data.titleRu} onChange={(v) => setData({ ...data, titleRu: v })} />
          <Field label="ORDER" value={String(data.orderIndex)} onChange={(v) => setData({ ...data, orderIndex: Number(v) || 0 })} mono />
          <Field label="TAVSIF (ixtiyoriy)" value={data.description} onChange={(v) => setData({ ...data, description: v })} multiline />
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

        <div className="bento" style={{ padding: 22 }}>
          <div className="overline" style={{ marginBottom: 12 }}>TANLANGAN ({picked.size})</div>
          {pickedList.length === 0 && <div style={{ color: "var(--fg-3)", fontSize: 12 }}>Hali savollar tanlanmagan</div>}
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {pickedList.map((q) => (
              <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 12, color: "var(--fg-1)", borderBottom: "1px solid var(--line)" }}>
                <span className="mono" style={{ color: "var(--fg-3)", minWidth: 36 }}>#{q.number}</span>
                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.textUz}</span>
                <button onClick={() => toggle(q.id)} style={{ background: "transparent", border: "none", color: "var(--error)", cursor: "pointer" }}>✕</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={save} disabled={saving} className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
            {saving ? "Saqlanmoqda..." : "✓ Saqlash"}
          </button>
          <button onClick={() => router.push("/admin/tickets")} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center" }}>
            Bekor qilish
          </button>
          {initial && (
            <button onClick={remove} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center", color: "var(--error)" }}>
              ✕ Biletni o'chirish
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .ticket-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  mono
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  mono?: boolean;
}) {
  const Comp: any = multiline ? "textarea" : "input";
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 4, fontFamily: "var(--font-mono)" }}>{label}</div>
      <Comp
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        rows={multiline ? 3 : undefined}
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: "var(--bg-2)",
          border: "1px solid var(--line)",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 13,
          color: "var(--fg-0)",
          fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
          outline: "none",
          resize: multiline ? "vertical" : "none"
        }}
      />
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
