"use client";
import { useEffect } from "react";
import { useLang } from "@/components/lang-provider";

const TG_BLUE = "oklch(0.72 0.16 230)";
const TG_BLUE_2 = "oklch(0.62 0.18 240)";

export function ContactModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLang();
  const L = (uz: string, cy: string, ru: string) => (lang === "ru" ? ru : lang === "cy" ? cy : uz);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const profiles = [
    {
      name: "Aziz Saidov",
      role: L(
        "Asoschisi · Bosh murabbiy",
        "Асосчиси · Бош мураббий",
        "Основатель · гл. инструктор"
      ),
      handle: "@aziz_saidov",
      url: "https://t.me/aziz_saidov",
      online: true,
      primary: true,
      initials: "AS"
    },
    {
      name: L("Yordam xizmati", "Ёрдам хизмати", "Поддержка"),
      role: L("Texnik yordam · To'lovlar", "Техник ёрдам · Тўловлар", "Техподдержка · оплаты"),
      handle: "@avtoimtihon_support",
      url: "https://t.me/avtoimtihon_support",
      online: true,
      primary: false,
      initials: "SP"
    }
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8, 12, 18, 0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 24
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "var(--bg-1)",
          border: "1px solid var(--line-2)",
          borderRadius: 20,
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          fontFamily: "var(--font-body)",
          color: "var(--fg-0)"
        }}
      >
        <div
          style={{
            padding: "24px 26px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: `radial-gradient(60% 100% at 100% 0%, color-mix(in oklch, ${TG_BLUE} 14%, transparent), transparent 65%)`,
            borderRadius: "20px 20px 0 0"
          }}
        >
          <div>
            <div className="overline" style={{ marginBottom: 6, color: "oklch(0.78 0.14 230)" }}>
              {L("MUROJAAT", "МУРОЖААТ", "СВЯЗАТЬСЯ")}
            </div>
            <div className="h-display" style={{ fontSize: 22, fontWeight: 600 }}>
              {L("Telegram orqali yozing", "Telegram орқали ёзинг", "Напишите в Telegram")}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              color: "var(--fg-1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontFamily: "var(--font-mono)"
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {profiles.map((p) => (
            <a
              key={p.handle}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 18px",
                borderRadius: 14,
                background: p.primary
                  ? `radial-gradient(80% 100% at 100% 0%, color-mix(in oklch, ${TG_BLUE} 14%, transparent), transparent 65%), var(--bg-2)`
                  : "var(--bg-2)",
                border:
                  "1px solid " +
                  (p.primary ? `color-mix(in oklch, ${TG_BLUE} 28%, var(--line))` : "var(--line)"),
                color: "var(--fg-0)",
                textDecoration: "none",
                transition: "transform .15s, border-color .15s"
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: p.primary
                      ? `linear-gradient(135deg, ${TG_BLUE}, oklch(0.78 0.14 195))`
                      : "linear-gradient(135deg, oklch(0.72 0.10 280), oklch(0.65 0.14 300))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18
                  }}
                >
                  {p.initials}
                </div>
                {p.online && (
                  <span
                    style={{
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "var(--success)",
                      border: "2.5px solid var(--bg-2)"
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</span>
                  {p.primary && <span style={{ color: TG_BLUE, fontSize: 14 }}>●</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-2)", marginBottom: 4 }}>{p.role}</div>
                <div className="mono" style={{ fontSize: 12, color: TG_BLUE }}>{p.handle}</div>
              </div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${TG_BLUE}, ${TG_BLUE_2})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M9.78 18.65 10.06 14.42 17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3 3.64 12.01C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3 10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z" />
                </svg>
              </div>
            </a>
          ))}

          <div
            style={{
              marginTop: 6,
              padding: "14px 16px",
              borderRadius: 12,
              background: "var(--bg-0)",
              border: "1px solid var(--line)"
            }}
          >
            <div className="overline" style={{ marginBottom: 10 }}>
              {L("BOSHQA YO'LLAR", "БОШҚА ЙЎЛЛАР", "ДРУГИЕ КАНАЛЫ")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="mailto:hello@avtoimtihon.uz" style={contactLinkSt}>
                <span style={{ width: 24, fontSize: 14 }}>✉</span>
                <span className="mono">hello@avtoimtihon.uz</span>
              </a>
              <a href="tel:+998901234567" style={contactLinkSt}>
                <span style={{ width: 24, fontSize: 14 }}>☎</span>
                <span className="mono">+998 90 123 45 67</span>
              </a>
              <a href="https://t.me/avtoimtihon_uz" target="_blank" rel="noopener noreferrer" style={contactLinkSt}>
                <span style={{ width: 24, fontSize: 14 }}>📢</span>
                <span className="mono">@avtoimtihon_uz · {L("kanal", "канал", "канал")}</span>
              </a>
            </div>
          </div>

          <div style={{ fontSize: 11, color: "var(--fg-3)", textAlign: "center", paddingTop: 4 }}>
            {L(
              "Odatda 30 daqiqa ichida javob beriladi · 09:00–22:00",
              "Одатда 30 дақиқа ичида жавоб берилади · 09:00–22:00",
              "Обычно отвечаем в течение 30 минут · 09:00–22:00"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const contactLinkSt: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "var(--fg-1)",
  fontSize: 13,
  textDecoration: "none"
};
