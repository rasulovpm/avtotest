"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Tariff = { id: string; slug: string; nameUz: string; durationDays: number; priceUzs: number; isActive: boolean };

export default function SettingsClient({
  initial,
  tariffs
}: {
  initial: { click_enabled: boolean; manual_payments_enabled: boolean; site_name_uz: string };
  tariffs: Tariff[];
}) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [tariffData, setTariffData] = useState(tariffs);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          settings: {
            click_enabled: String(data.click_enabled),
            manual_payments_enabled: String(data.manual_payments_enabled),
            site_name_uz: data.site_name_uz
          },
          tariffs: tariffData.map((t) => ({ id: t.id, priceUzs: Number(t.priceUzs), isActive: t.isActive }))
        })
      });
      if (r.ok) {
        setSavedAt(new Date());
        router.refresh();
      } else {
        alert("Xatolik");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 800 }}>
      <div className="bento" style={{ padding: 24 }}>
        <div className="overline" style={{ marginBottom: 14 }}>UMUMIY</div>
        <div style={{ marginBottom: 12 }}>
          <label style={labelSt}>SAYT NOMI</label>
          <input
            value={data.site_name_uz}
            onChange={(e) => setData({ ...data, site_name_uz: e.target.value })}
            className="input"
          />
        </div>
      </div>

      <div className="bento" style={{ padding: 24 }}>
        <div className="overline" style={{ marginBottom: 14 }}>TO'LOV TIZIMI</div>
        <Toggle
          label="Click integratsiyasi"
          desc="Avtomatik to'lov (hozircha tayyorlanmoqda)"
          on={data.click_enabled}
          onChange={(v) => setData({ ...data, click_enabled: v })}
        />
        <div style={{ height: 1, background: "var(--line)", margin: "12px 0" }} />
        <Toggle
          label="Manual to'lovlar"
          desc="Karta orqali to'lab admin tasdiqlaydi"
          on={data.manual_payments_enabled}
          onChange={(v) => setData({ ...data, manual_payments_enabled: v })}
        />
      </div>

      <div className="bento" style={{ padding: 24 }}>
        <div className="overline" style={{ marginBottom: 14 }}>TARIFLAR</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tariffData.map((tf, i) => (
            <div
              key={tf.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 12,
                background: "var(--bg-2)",
                border: "1px solid var(--line)",
                flexWrap: "wrap"
              }}
            >
              <div style={{ flex: 1, minWidth: 140 }}>
                <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{tf.nameUz}</p>
                <p style={{ fontSize: 11, color: "var(--fg-3)", margin: 0, fontFamily: "var(--font-mono)" }}>
                  {tf.durationDays} kun
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="number"
                  value={tf.priceUzs}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setTariffData((p) => p.map((x, idx) => (idx === i ? { ...x, priceUzs: v } : x)));
                  }}
                  style={{
                    width: 120,
                    background: "var(--bg-3)",
                    border: "1px solid var(--line)",
                    color: "var(--fg-0)",
                    borderRadius: 8,
                    padding: "8px 10px",
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    outline: "none"
                  }}
                />
                <span style={{ fontSize: 11, color: "var(--fg-3)" }}>so'm</span>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={tf.isActive}
                  onChange={(e) => {
                    const v = e.target.checked;
                    setTariffData((p) => p.map((x, idx) => (idx === i ? { ...x, isActive: v } : x)));
                  }}
                />
                Faol
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={save} disabled={saving} className="btn btn--primary">
          {saving ? "Saqlanmoqda..." : "✓ Saqlash"}
        </button>
        {savedAt && (
          <span className="chip chip--success" style={{ fontSize: 11 }}>
            Saqlandi · {savedAt.toLocaleTimeString()}
          </span>
        )}
      </div>
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

function Toggle({ label, desc, on, onChange }: { label: string; desc?: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        cursor: "pointer"
      }}
    >
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{label}</p>
        {desc && <p style={{ fontSize: 12, color: "var(--fg-2)", margin: "4px 0 0" }}>{desc}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!on)}
        style={{
          width: 44,
          height: 26,
          borderRadius: 999,
          background: on ? "var(--accent)" : "var(--bg-3)",
          border: "1px solid " + (on ? "var(--accent)" : "var(--line)"),
          position: "relative",
          cursor: "pointer",
          transition: "all .2s",
          boxShadow: on ? "0 0 12px color-mix(in oklch, var(--accent) 50%, transparent)" : "none"
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#0a1f24",
            transition: "left .2s"
          }}
        />
      </button>
    </label>
  );
}
