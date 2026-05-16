"use client";
import { useState } from "react";

type Props = {
  questionId: string;
  initialSaved: boolean;
  size?: "sm" | "md";
  onChange?: (saved: boolean) => void;
};

/**
 * Savolni saqlash/saqlanganni olib tashlash tugmasi.
 *
 * Neo dizayn: rounded square, single-stroke bookmark SVG. Saqlangan vaqtda
 * to'ldirilgan + accent glow; saqlanmagan vaqtda outline + neutral.
 * Optimistic UI: bosilganda darrov holatni o'zgartiradi, server xato qaytarsa
 * eski holatga qaytaradi. `onChange` callback bilan parentni xabardor qiladi.
 */
export default function SaveQuestionButton({
  questionId,
  initialSaved,
  size = "md",
  onChange,
}: Props) {
  const [saved, setSaved] = useState<boolean>(initialSaved);
  const [busy, setBusy] = useState(false);
  const [pop, setPop] = useState(false); // qisqa "pop" animatsiya saqlanganda

  async function toggle() {
    if (busy) return;
    const next = !saved;
    setSaved(next);
    onChange?.(next);
    if (next) {
      setPop(true);
      setTimeout(() => setPop(false), 320);
    }
    setBusy(true);
    try {
      const res = await fetch("/api/saved/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, save: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaved(!next);
        onChange?.(!next);
        return;
      }
      if (typeof data.saved === "boolean") {
        setSaved(data.saved);
        onChange?.(data.saved);
      }
    } catch {
      setSaved(!next);
      onChange?.(!next);
    } finally {
      setBusy(false);
    }
  }

  const dim = size === "sm" ? 34 : 40;
  const iconSize = size === "sm" ? 16 : 19;

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-label={saved ? "Saqlangandan olib tashlash" : "Savolni saqlash"}
      title={saved ? "Saqlangan — bosib olib tashlash" : "Savolni saqlash"}
      className={"save-btn" + (saved ? " save-btn--on" : "") + (pop ? " save-btn--pop" : "")}
      style={{
        width: dim,
        height: dim,
      }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: "transform .25s cubic-bezier(.2,.8,.2,1), fill .2s",
          transform: saved ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        <path d="M6 3 H18 V21 L12 17 L6 21 Z" />
      </svg>

      <style>{`
        .save-btn {
          position: relative;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: var(--bg-2);
          color: var(--fg-1);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition:
            background .25s cubic-bezier(.2,.8,.2,1),
            border-color .25s cubic-bezier(.2,.8,.2,1),
            color .25s cubic-bezier(.2,.8,.2,1),
            box-shadow .3s cubic-bezier(.2,.8,.2,1),
            transform .15s;
          padding: 0;
        }
        .save-btn:hover {
          border-color: var(--line-2);
          color: var(--fg-0);
        }
        .save-btn:active { transform: scale(0.94); }
        .save-btn:disabled { cursor: default; }

        .save-btn--on {
          color: var(--accent);
          border-color: color-mix(in oklch, var(--accent) 55%, transparent);
          background:
            radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 70%),
            color-mix(in oklch, var(--accent) 10%, var(--bg-2));
          box-shadow:
            0 0 0 1px color-mix(in oklch, var(--accent) 35%, transparent),
            0 6px 20px color-mix(in oklch, var(--accent) 28%, transparent);
        }
        .save-btn--on:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        @keyframes save-pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .save-btn--pop { animation: save-pop .32s cubic-bezier(.2,.8,.2,1); }

        @keyframes save-ring {
          0%   { box-shadow:
                   0 0 0 0   color-mix(in oklch, var(--accent) 55%, transparent),
                   0 0 0 1px color-mix(in oklch, var(--accent) 35%, transparent),
                   0 6px 20px color-mix(in oklch, var(--accent) 28%, transparent); }
          100% { box-shadow:
                   0 0 0 10px color-mix(in oklch, var(--accent) 0%, transparent),
                   0 0 0 1px  color-mix(in oklch, var(--accent) 35%, transparent),
                   0 6px 20px color-mix(in oklch, var(--accent) 28%, transparent); }
        }
        .save-btn--on.save-btn--pop { animation: save-pop .32s cubic-bezier(.2,.8,.2,1), save-ring .55s ease-out; }
      `}</style>
    </button>
  );
}
