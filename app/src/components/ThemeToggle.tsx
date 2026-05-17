"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    const initial = saved === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", initial);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
  };

  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        width: 64,
        height: 32,
        borderRadius: 999,
        background: isDark ? "var(--bg-2)" : "var(--bg-1)",
        border: "1px solid var(--line-2)",
        position: "relative",
        cursor: "pointer",
        padding: 0,
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
        transition: "background .25s",
        flexShrink: 0
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: isDark ? 0.4 : 0,
          transition: "opacity .2s",
          fontSize: 11
        }}
      >
        🌙
      </span>
      <span
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: isDark ? 0 : 0.5,
          transition: "opacity .2s",
          fontSize: 11
        }}
      >
        ☀
      </span>
      <span
        style={{
          position: "absolute",
          top: 3,
          left: isDark ? 3 : 35,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: isDark
            ? "linear-gradient(135deg, var(--accent), var(--accent-2))"
            : "linear-gradient(135deg, oklch(0.95 0.10 90), oklch(0.85 0.16 65))",
          boxShadow: isDark
            ? "0 0 12px color-mix(in oklch, var(--accent) 50%, transparent)"
            : "0 2px 8px rgba(0,0,0,0.18)",
          transition: "left .25s cubic-bezier(.4,0,.2,1), background .25s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {isDark ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a1f24"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8 A9 9 0 1 1 11.2 3 a7 7 0 0 0 9.8 9.8 Z" fill="#0a1f24" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3a2a10"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" fill="#3a2a10" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
          </svg>
        )}
      </span>
    </button>
  );
}
