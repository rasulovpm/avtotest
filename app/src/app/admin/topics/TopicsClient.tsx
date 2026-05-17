"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Topic = {
  id: string;
  number: number;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameCy: string;
  icon: string | null;
  color: string | null;
  description: string | null;
  orderIndex: number;
  questionCount: number;
};

const EMPTY: Partial<Topic> = { slug: "", nameUz: "", nameRu: "", nameCy: "", icon: "", color: "", description: "", orderIndex: 0 };

export default function TopicsClient({ topics }: { topics: Topic[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<Topic> | null>(null);
  const [saving, setSaving] = useState(false);

  const startNew = () => setEditing({ ...EMPTY });
  const startEdit = (t: Topic) => setEditing({ ...t });
  const close = () => setEditing(null);

  const save = async () => {
    if (!editing) return;
    if (!editing.slug?.trim() || !editing.nameUz?.trim()) {
      alert("Slug va o'zbekcha nomi shart");
      return;
    }
    setSaving(true);
    try {
      const isNew = !editing.id;
      const url = isNew ? "/api/admin/topics" : `/api/admin/topics/${editing.id}`;
      const method = isNew ? "POST" : "PATCH";
      const r = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editing)
      });
      if (r.ok) {
        setEditing(null);
        router.refresh();
      } else {
        const e = await r.json();
        alert("Xatolik: " + (e.error || ""));
      }
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string, count: number) => {
    if (count > 0) {
      if (!confirm(`Bu mavzuda ${count} ta savol bor. Mavzuni o'chirsangiz, savollar mavzusiz qoladi. Davom etilsinmi?`)) return;
    } else {
      if (!confirm("O'chirilsinmi?")) return;
    }
    const r = await fetch(`/api/admin/topics/${id}`, { method: "DELETE" });
    if (r.ok) router.refresh();
    else alert("Xatolik");
  };

  return (
    <>
      <div style={{ marginBottom: 14, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={startNew} className="btn btn--primary" style={{ fontSize: 13, padding: "9px 14px" }}>
          + Yangi mavzu
        </button>
      </div>

      <div className="bento" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 880 }}>
            <Header />
            {topics.map((t, i) => (
              <Row key={t.id} t={t} last={i === topics.length - 1} onEdit={() => startEdit(t)} onDelete={() => del(t.id, t.questionCount)} />
            ))}
            {topics.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: "var(--fg-3)" }}>Mavzu yo'q</div>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <Modal onClose={close}>
          <h3 className="h-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>
            {editing.id ? `Mavzu #${editing.number} ni tahrirlash` : "Yangi mavzu"}
          </h3>
          <Field label="SLUG (URL kalit)" value={editing.slug || ""} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="masalan: yhq" mono />
          <Field label="NOMI (O'zbek)" value={editing.nameUz || ""} onChange={(v) => setEditing({ ...editing, nameUz: v })} />
          <Field label="NOMI (Ўзбек кирилл)" value={editing.nameCy || ""} onChange={(v) => setEditing({ ...editing, nameCy: v })} />
          <Field label="NOMI (Русский)" value={editing.nameRu || ""} onChange={(v) => setEditing({ ...editing, nameRu: v })} />
          <Field label="ICON (lucide nomi, ixtiyoriy)" value={editing.icon || ""} onChange={(v) => setEditing({ ...editing, icon: v })} mono />
          <Field label="COLOR (HEX, ixtiyoriy)" value={editing.color || ""} onChange={(v) => setEditing({ ...editing, color: v })} mono />
          <Field label="ORDER" value={String(editing.orderIndex ?? 0)} onChange={(v) => setEditing({ ...editing, orderIndex: Number(v) || 0 })} mono />
          <Field label="TAVSIF (ixtiyoriy)" value={editing.description || ""} onChange={(v) => setEditing({ ...editing, description: v })} multiline />
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={save} disabled={saving} className="btn btn--primary" style={{ flex: 1, justifyContent: "center" }}>
              {saving ? "Saqlanmoqda..." : "✓ Saqlash"}
            </button>
            <button onClick={close} className="btn btn--ghost" style={{ flex: 1, justifyContent: "center" }}>
              Bekor qilish
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Header() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px 100px 1fr 200px 80px 90px",
        padding: "12px 18px",
        borderBottom: "1px solid var(--line)",
        alignItems: "center",
        gap: 14,
        fontSize: 10,
        fontFamily: "var(--font-mono)",
        color: "var(--fg-3)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        background: "var(--bg-2)"
      }}
    >
      <span>#</span>
      <span>SLUG</span>
      <span>NOMI</span>
      <span>SAVOLLAR</span>
      <span>ORDER</span>
      <span></span>
    </div>
  );
}

function Row({ t, last, onEdit, onDelete }: { t: Topic; last: boolean; onEdit: () => void; onDelete: () => void }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px 100px 1fr 200px 80px 90px",
        padding: "14px 18px",
        borderBottom: last ? "none" : "1px solid var(--line)",
        alignItems: "center",
        gap: 14,
        fontSize: 13
      }}
    >
      <span className="mono" style={{ fontSize: 11, color: "var(--fg-2)", fontWeight: 600 }}>#{t.number}</span>
      <span className="mono" style={{ fontSize: 11, color: "var(--fg-1)" }}>{t.slug}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span style={{ color: "var(--fg-0)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {t.nameUz}
        </span>
        <span style={{ color: "var(--fg-3)", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {t.nameRu} · {t.nameCy}
        </span>
      </div>
      <span className="mono" style={{ fontSize: 12, color: t.questionCount > 0 ? "var(--success)" : "var(--fg-3)" }}>
        {t.questionCount} ta savol
      </span>
      <span className="mono" style={{ fontSize: 11, color: "var(--fg-2)" }}>{t.orderIndex}</span>
      <div style={{ display: "flex", gap: 4, justifySelf: "end" }}>
        <button onClick={onEdit} title="Tahrirlash" style={{ background: "transparent", border: "none", color: "var(--fg-2)", padding: 6, borderRadius: 4, cursor: "pointer", fontSize: 14 }}>✎</button>
        <button onClick={onDelete} title="O'chirish" style={{ background: "transparent", border: "none", color: "var(--error)", padding: 6, borderRadius: 4, cursor: "pointer", fontSize: 14 }}>✕</button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  mono
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
        placeholder={placeholder}
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

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "color-mix(in oklch, var(--bg-0) 60%, transparent)",
        backdropFilter: "blur(8px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bento"
        style={{ padding: 24, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}
      >
        {children}
      </div>
    </div>
  );
}
