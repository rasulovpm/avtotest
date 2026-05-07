"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { pickName } from "@/lib/i18n";
import { formatUzs } from "@/lib/utils";

type Tariff = {
  id: string;
  slug: string;
  nameUz: string;
  nameRu: string;
  nameCy: string;
  durationDays: number;
  priceUzs: number;
  features: string[];
};

const ALL_FEATURES = ["all_tests", "explanations", "exam_simulation", "stats", "weak_topics", "priority_support"];

export default function PricingClient({
  tariffs,
  isLoggedIn,
  currentPlan,
  clickEnabled,
  manualEnabled
}: {
  tariffs: Tariff[];
  isLoggedIn: boolean;
  currentPlan: string;
  clickEnabled: boolean;
  manualEnabled: boolean;
}) {
  const { t, lang } = useLang();
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const requestPayment = async (tariffId: string, method: "CLICK" | "MANUAL") => {
    setSubmitting(tariffId + method);
    try {
      const res = await fetch("/api/payments/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tariffId, method })
      });
      const data = await res.json();
      if (res.ok) {
        if (method === "CLICK" && data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          setSubmitted(true);
        }
      } else {
        alert("Xatolik: " + (data.error || ""));
      }
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div style={{ padding: "48px", color: "var(--fg-0)" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="overline" style={{ marginBottom: 12 }}>07 · PRICING</div>
        <h1 className="h-display h2" style={{ margin: 0, marginBottom: 8 }}>
          {t.pricing.title}
        </h1>
        <p style={{ color: "var(--fg-1)", margin: 0 }}>{t.pricing.sub}</p>
      </div>

      {submitted && (
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 24px",
            padding: 16,
            borderRadius: 14,
            background: "color-mix(in oklch, var(--success) 14%, transparent)",
            border: "1px solid color-mix(in oklch, var(--success) 40%, transparent)",
            color: "var(--success)",
            textAlign: "center"
          }}
        >
          ✓ {t.pricing.manualNote}
        </div>
      )}

      <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
        {/* FREE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bento"
          style={{ padding: 32, display: "flex", flexDirection: "column", gap: 18, position: "relative" }}
        >
          <div>
            <div className="overline">BEPUL</div>
            <div className="h-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 6 }}>{t.pricing.free}</div>
          </div>
          <div>
            <span className="h-display" style={{ fontSize: 48, fontWeight: 700 }}>0</span>
            <span style={{ color: "var(--fg-2)", fontSize: 13, marginLeft: 6 }}>so'm</span>
          </div>
          <div className="divider" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            <FeatureRow ok>100 ta test</FeatureRow>
            <FeatureRow ok>Asosiy statistika</FeatureRow>
            <FeatureRow>Tushuntirishlar</FeatureRow>
            <FeatureRow>Imtihon simulyatsiyasi</FeatureRow>
            <FeatureRow>Zaif tomonlar tahlili</FeatureRow>
          </div>
          <button className="btn btn--ghost" disabled={currentPlan === "FREE"} style={{ width: "100%", justifyContent: "center" }}>
            {currentPlan === "FREE" ? "✓ Joriy reja" : t.common.start} {currentPlan !== "FREE" && "→"}
          </button>
        </motion.div>

        {tariffs.map((tf, i) => {
          const featured = i === tariffs.length - 1;
          return (
            <motion.div
              key={tf.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * (i + 1) }}
              className={"bento " + (featured ? "bento--accent" : "")}
              style={{
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 18,
                borderColor: featured ? "var(--accent)" : "var(--line)",
                transform: featured ? "translateY(-12px)" : "none",
                boxShadow: featured ? "var(--shadow-glow)" : undefined,
                position: "relative"
              }}
            >
              {featured && (
                <span
                  className="chip chip--accent"
                  style={{ position: "absolute", top: -12, left: 32, fontSize: 10, fontWeight: 700 }}
                >
                  ★ TAVSIYA
                </span>
              )}
              <div>
                <div className="overline">
                  {tf.durationDays === 14 ? "TEZKOR" : tf.durationDays === 30 ? "PRO" : "TARIF"} · {tf.durationDays} kun
                </div>
                <div className="h-display" style={{ fontSize: 28, fontWeight: 600, marginTop: 6 }}>{pickName(tf, lang)}</div>
              </div>
              <div>
                <span className="h-display" style={{ fontSize: 48, fontWeight: 700 }}>
                  {new Intl.NumberFormat("uz-UZ").format(tf.priceUzs)}
                </span>
                <span style={{ color: "var(--fg-2)", fontSize: 13, marginLeft: 6 }}>so'm</span>
              </div>
              <div className="divider" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {ALL_FEATURES.map((f) => {
                  const has = tf.features.includes(f);
                  const label = (t.pricing.features as any)[f] || f;
                  return (
                    <FeatureRow key={f} ok={has}>
                      {label}
                    </FeatureRow>
                  );
                })}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {!isLoggedIn ? (
                  <Link href="/auth/login?callbackUrl=/pricing" className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                    Kirish →
                  </Link>
                ) : (
                  <>
                    {clickEnabled && (
                      <button
                        onClick={() => requestPayment(tf.id, "CLICK")}
                        disabled={submitting === tf.id + "CLICK"}
                        className={featured ? "btn btn--primary" : "btn btn--primary"}
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        {submitting === tf.id + "CLICK" ? "..." : `${t.pricing.payClick} →`}
                      </button>
                    )}
                    {manualEnabled && (
                      <button
                        onClick={() => requestPayment(tf.id, "MANUAL")}
                        disabled={submitting === tf.id + "MANUAL"}
                        className="btn btn--ghost"
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        {submitting === tf.id + "MANUAL" ? "..." : `${t.pricing.manualPay} →`}
                      </button>
                    )}
                    {!clickEnabled && !manualEnabled && (
                      <p style={{ fontSize: 12, color: "var(--fg-3)", textAlign: "center", margin: 0 }}>To'lov vaqtincha o'chirilgan</p>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p style={{ textAlign: "center", color: "var(--fg-3)", fontSize: 13, marginTop: 32, fontFamily: "var(--font-mono)" }}>
        {t.pricing.payInfo}
      </p>

      <style>{`
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

function FeatureRow({ ok = false, children }: { ok?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: ok ? "var(--fg-1)" : "var(--fg-3)", textDecoration: ok ? "none" : "line-through" }}>
      <span style={{ color: ok ? "var(--accent-2)" : "var(--fg-3)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>
        {ok ? "✓" : "—"}
      </span>
      <span>{children}</span>
    </div>
  );
}
