"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useLang } from "@/components/lang-provider";
import { LANGS, type Lang } from "@/lib/i18n";
import { Logo } from "@/components/layout/Logo";

export default function Header() {
  const { data: session } = useSession();
  const { t, lang, setLang } = useLang();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const links: { href: string; label: string }[] = [
    { href: "/tests", label: t.nav.tests },
    { href: "/signs", label: t.nav.signs },
    { href: "/progress", label: t.nav.progress },
    { href: "/pricing", label: t.nav.pricing }
  ];

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid var(--line)",
          background: "color-mix(in oklch, var(--bg-0) 70%, transparent)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 30,
          gap: 12
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Logo />
          <nav className="hide-on-mobile" style={{ display: "flex", gap: 24 }}>
            {links.map((x) => (
              <Link
                key={x.href}
                href={x.href}
                style={{ color: "var(--fg-1)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}
              >
                {x.label}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Lang switcher (always visible on desktop, hidden on mobile when drawer is closed) */}
          <div style={{ position: "relative" }} className="hide-on-mobile-sm">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="chip"
              style={{ cursor: "pointer", textTransform: "uppercase" }}
            >
              ◐ {lang}
            </button>
            {langOpen && (
              <div style={dropMenuSt}>
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as Lang);
                      setLangOpen(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 12px",
                      background: lang === l.code ? "var(--bg-2)" : "transparent",
                      color: lang === l.code ? "var(--accent)" : "var(--fg-0)",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 13
                    }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {session ? (
            <div style={{ position: "relative" }} className="hide-on-mobile-sm">
              <button onClick={() => setProfileOpen((v) => !v)} className="chip" style={{ cursor: "pointer", padding: "6px 12px" }}>
                <span style={avatarSt}>
                  {(session.user?.name || (session.user as any)?.phone || "?").charAt(0).toUpperCase()}
                </span>
                <span style={{ fontSize: 12 }}>
                  {(session.user?.name || (session.user as any)?.phone || "").slice(0, 14)}
                </span>
              </button>
              {profileOpen && (
                <div style={dropMenuSt}>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line)" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{session.user?.name || "Foydalanuvchi"}</p>
                    <p style={{ fontSize: 11, color: "var(--fg-2)", margin: 0, fontFamily: "var(--font-mono)" }}>
                      {(session.user as any)?.phone}
                    </p>
                  </div>
                  <Link href="/profile" style={dropItem}>◉ {t.common.profile}</Link>
                  <Link href="/progress" style={dropItem}>↗ {t.nav.progress}</Link>
                  {(session.user as any)?.role === "ADMIN" && (
                    <Link href="/admin" style={{ ...dropItem, color: "var(--accent)" }}>⚙ Admin panel</Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    style={{ ...dropItem, color: "var(--error)", border: "none", background: "transparent", width: "100%", textAlign: "left", cursor: "pointer" }}
                  >
                    ↪ {t.common.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hide-on-mobile-sm" style={{ display: "flex", gap: 8 }}>
              <Link href="/auth/register" className="btn btn--ghost" style={{ fontSize: 14, padding: "8px 14px" }}>
                {t.nav.register}
              </Link>
              <Link href="/auth/login" className="btn btn--primary" style={{ fontSize: 14, padding: "8px 16px" }}>
                {t.nav.login} →
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="show-on-mobile"
            style={{
              display: "none",
              padding: 8,
              borderRadius: 8,
              background: "var(--bg-2)",
              border: "1px solid var(--line)",
              color: "var(--fg-0)",
              cursor: "pointer",
              fontSize: 16
            }}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "color-mix(in oklch, var(--bg-0) 70%, transparent)",
            backdropFilter: "blur(8px)"
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "min(320px, 90vw)",
              background: "var(--bg-1)",
              borderLeft: "1px solid var(--line)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Logo small />
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: "transparent",
                  border: "1px solid var(--line)",
                  color: "var(--fg-1)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  cursor: "pointer"
                }}
              >
                ✕
              </button>
            </div>

            {session && (
              <div className="bento" style={{ padding: 14, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ ...avatarSt, width: 36, height: 36, fontSize: 14 }}>
                    {(session.user?.name || (session.user as any)?.phone || "?").charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{session.user?.name || "Foydalanuvchi"}</p>
                    <p style={{ fontSize: 11, color: "var(--fg-3)", margin: 0, fontFamily: "var(--font-mono)" }}>
                      {(session.user as any)?.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="overline">NAVIGATSIYA</div>
            {links.map((x) => (
              <Link
                key={x.href}
                href={x.href}
                onClick={() => setDrawerOpen(false)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "var(--bg-2)",
                  color: "var(--fg-0)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  border: "1px solid var(--line)"
                }}
              >
                {x.label}
              </Link>
            ))}

            <div className="overline" style={{ marginTop: 16 }}>TIL</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as Lang)}
                  className="chip"
                  style={{
                    cursor: "pointer",
                    background: lang === l.code ? "var(--accent)" : "var(--bg-2)",
                    color: lang === l.code ? "#0a1f24" : "var(--fg-1)",
                    borderColor: lang === l.code ? "var(--accent)" : "var(--line)"
                  }}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
              {session ? (
                <>
                  <Link href="/profile" onClick={() => setDrawerOpen(false)} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center", marginBottom: 8 }}>
                    {t.common.profile}
                  </Link>
                  {(session.user as any)?.role === "ADMIN" && (
                    <Link href="/admin" onClick={() => setDrawerOpen(false)} className="btn btn--primary" style={{ width: "100%", justifyContent: "center", marginBottom: 8 }}>
                      ⚙ Admin panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn btn--ghost"
                    style={{ width: "100%", justifyContent: "center", color: "var(--error)", borderColor: "color-mix(in oklch, var(--error) 40%, transparent)" }}
                  >
                    ↪ {t.common.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/register" onClick={() => setDrawerOpen(false)} className="btn btn--ghost" style={{ width: "100%", justifyContent: "center", marginBottom: 8 }}>
                    {t.nav.register}
                  </Link>
                  <Link href="/auth/login" onClick={() => setDrawerOpen(false)} className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                    {t.nav.login} →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .show-on-mobile { display: none !important; }
        @media (max-width: 900px) {
          .hide-on-mobile { display: none !important; }
          .show-on-mobile { display: inline-flex !important; }
        }
        @media (max-width: 540px) {
          .hide-on-mobile-sm { display: none !important; }
        }
      `}</style>
    </>
  );
}

const dropMenuSt: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: "calc(100% + 6px)",
  background: "var(--bg-1)",
  border: "1px solid var(--line-2)",
  borderRadius: 12,
  padding: 4,
  minWidth: 200,
  zIndex: 50,
  boxShadow: "var(--shadow-card)"
};

const dropItem: React.CSSProperties = {
  display: "block",
  padding: "8px 12px",
  fontSize: 13,
  color: "var(--fg-1)",
  textDecoration: "none",
  borderRadius: 8,
  fontFamily: "var(--font-body)"
};

const avatarSt: React.CSSProperties = {
  width: 22,
  height: 22,
  borderRadius: "50%",
  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
  color: "#0a1f24",
  fontWeight: 700,
  fontSize: 11,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-mono)"
};
