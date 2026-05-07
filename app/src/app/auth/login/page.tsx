"use client";
import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { useLang } from "@/components/lang-provider";
import { isValidUzPhone, normalizePhone } from "@/lib/utils";

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg-0)" }} />}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const { t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";

  const [phone, setPhone] = useState("");
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
      router.push(callbackUrl);
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
        transition={{ duration: 0.5 }}
        className="bento dotgrid"
        style={{
          width: 460,
          padding: 40,
          borderRadius: 24,
          background:
            "radial-gradient(80% 60% at 50% 0%, color-mix(in oklch, var(--accent) 16%, transparent), transparent 60%), var(--bg-1)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <Logo />
        </div>

        {step === "phone" && (
          <form onSubmit={sendCode}>
            <h1 className="h-display" style={{ fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 6, marginTop: 0 }}>
              {t.auth.loginTitle}
            </h1>
            <p style={{ textAlign: "center", color: "var(--fg-2)", fontSize: 14, marginBottom: 28 }}>
              {t.auth.loginSub}
            </p>

            <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              {t.auth.phone}
            </label>
            <input
              className="input"
              placeholder={t.auth.phonePlaceholder}
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
              required
            />

            {error && (
              <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "color-mix(in oklch, var(--error) 14%, transparent)", border: "1px solid color-mix(in oklch, var(--error) 40%, transparent)", color: "var(--error)", fontSize: 13 }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
              disabled={loading}
            >
              {loading ? "..." : `${t.auth.sendCode} →`}
            </button>

            <p style={{ textAlign: "center", color: "var(--fg-3)", fontSize: 11, marginTop: 16, fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
              {t.auth.otpHint.replace("{bot}", process.env.NEXT_PUBLIC_TG_BOT || "avtotest_bot")}
            </p>
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

            <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
              KOD
            </label>
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

            {error && (
              <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "color-mix(in oklch, var(--error) 14%, transparent)", border: "1px solid color-mix(in oklch, var(--error) 40%, transparent)", color: "var(--error)", fontSize: 13 }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
              disabled={loading}
            >
              {loading ? "..." : `${t.auth.verify} →`}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setCode("");
                setError(null);
              }}
              className="btn btn--ghost"
              style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
            >
              ← {t.common.back}
            </button>
          </form>
        )}

        <p style={{ textAlign: "center", color: "var(--fg-2)", fontSize: 13, marginTop: 24, marginBottom: 0 }}>
          {t.auth.noAccount}{" "}
          <Link href="/auth/register" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            {t.auth.register}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
