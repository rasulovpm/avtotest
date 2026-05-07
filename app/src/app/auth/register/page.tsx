"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { useLang } from "@/components/lang-provider";
import { isValidUzPhone, normalizePhone } from "@/lib/utils";

export default function RegisterPage() {
  const { t } = useLang();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [debugCode, setDebugCode] = useState<string | null>(null);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const norm = normalizePhone(phone);
    if (!isValidUzPhone(norm)) {
      setError(t.auth.invalidPhone);
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: norm, fullName })
      });
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone: norm })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Xatolik");
        return;
      }
      setDebugCode(data.debugCode || null);
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        phone: normalizePhone(phone),
        code,
        redirect: false
      });
      if (res?.error || !res?.ok) {
        setError(t.auth.invalidOtp);
        return;
      }
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 48,
        background: "var(--bg-0)",
        color: "var(--fg-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bento dotgrid"
        style={{
          width: 460,
          padding: 40,
          borderRadius: 24,
          background:
            "radial-gradient(80% 60% at 50% 0%, color-mix(in oklch, var(--accent-2) 16%, transparent), transparent 60%), var(--bg-1)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <Logo />
        </div>

        {step === "phone" && (
          <form onSubmit={sendCode}>
            <h1 className="h-display" style={{ fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 6, marginTop: 0 }}>
              {t.auth.registerTitle}
            </h1>
            <p style={{ textAlign: "center", color: "var(--fg-2)", fontSize: 14, marginBottom: 24 }}>
              {t.auth.registerSub}
            </p>

            <div style={{ marginBottom: 14 }}>
              <label style={labelSt}>{t.auth.fullName}</label>
              <input
                className="input"
                placeholder="Aziz Karimov"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={labelSt}>{t.auth.phone}</label>
              <input
                className="input"
                placeholder={t.auth.phonePlaceholder}
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={errSt}>⚠ {error}</div>
            )}

            <button type="submit" className="btn btn--primary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} disabled={loading}>
              {loading ? "..." : `${t.auth.sendCode} →`}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={verify}>
            <h1 className="h-display" style={{ fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 6, marginTop: 0 }}>
              {t.auth.otpTitle}
            </h1>
            <p style={{ textAlign: "center", color: "var(--fg-2)", fontSize: 14, marginBottom: 6 }}>
              {t.auth.otpSub}
            </p>
            <p style={{ textAlign: "center", color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 13, marginBottom: 24 }}>
              {normalizePhone(phone)}
            </p>

            {debugCode && (
              <div
                style={{
                  marginBottom: 16,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "color-mix(in oklch, var(--warning) 14%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--warning) 40%, transparent)",
                  color: "var(--warning)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)"
                }}
              >
                DEV · kod: <strong style={{ fontSize: 14 }}>{debugCode}</strong>
              </div>
            )}

            <label style={labelSt}>KOD</label>
            <input
              className="input"
              placeholder="••••••"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              autoFocus
              required
              style={{ textAlign: "center", letterSpacing: "0.5em", fontFamily: "var(--font-mono)", fontSize: 18 }}
            />

            {error && <div style={errSt}>⚠ {error}</div>}

            <button type="submit" className="btn btn--primary" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} disabled={loading}>
              {loading ? "..." : `${t.auth.verify} →`}
            </button>
          </form>
        )}

        <p style={{ textAlign: "center", color: "var(--fg-2)", fontSize: 13, marginTop: 24, marginBottom: 0 }}>
          <Link href="/auth/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            ← {t.nav.login}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

const labelSt: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontFamily: "var(--font-mono)",
  color: "var(--fg-2)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 8
};

const errSt: React.CSSProperties = {
  marginTop: 12,
  padding: "10px 14px",
  borderRadius: 10,
  background: "color-mix(in oklch, var(--error) 14%, transparent)",
  border: "1px solid color-mix(in oklch, var(--error) 40%, transparent)",
  color: "var(--error)",
  fontSize: 13
};
