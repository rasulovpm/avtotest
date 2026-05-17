"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/lang-provider";
import { type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; short: string; flag: string }[] = [
  { code: "uz", label: "O'zbek", short: "UZ", flag: "🇺🇿" },
  { code: "cy", label: "Ўзбекча", short: "ЎЗ", flag: "🇺🇿" },
  { code: "ru", label: "Русский", short: "РУ", flag: "🇷🇺" }
];

export function LangSwitch() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderRadius: 999,
          border: "1px solid var(--line-2)",
          background: "var(--bg-2)",
          color: "var(--fg-0)",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.04em",
          transition: "border-color .15s"
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12 H21 M12 3 a14 14 0 0 1 0 18 M12 3 a14 14 0 0 0 0 18" />
        </svg>
        {current.short}
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}
        >
          <path d="M2 4 L6 8 L10 4" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 180,
            padding: 6,
            background: "var(--bg-1)",
            border: "1px solid var(--line-2)",
            borderRadius: 12,
            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
            zIndex: 50
          }}
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                background:
                  l.code === lang ? "color-mix(in oklch, var(--accent) 14%, transparent)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "var(--fg-0)",
                fontFamily: "var(--font-body)",
                fontSize: 13
              }}
            >
              <span style={{ fontSize: 16 }}>{l.flag}</span>
              <span style={{ flex: 1, fontWeight: l.code === lang ? 600 : 500 }}>{l.label}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--fg-2)" }}>{l.short}</span>
              {l.code === lang && <span style={{ color: "var(--accent)", fontSize: 14 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
