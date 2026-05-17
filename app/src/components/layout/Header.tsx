"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useLang } from "@/components/lang-provider";
import { Logo } from "@/components/layout/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const { data: session } = useSession();
  const { t, lang } = useLang();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const links: { href: string; label: string }[] = [
    { href: "/", label: lang === "ru" ? "Главная" : lang === "cy" ? "Бош саҳифа" : "Bosh sahifa" },
    { href: "/signs", label: t.nav.signs },
    { href: "/progress", label: t.nav.progress },
    { href: "/pricing", label: t.nav.pricing }
  ];

  const userPlan = (session?.user as any)?.plan as string | undefined;
  const planExpiresAt = (session?.user as any)?.planExpiresAt as string | null | undefined;
  const isPro = userPlan && userPlan !== "FREE";
  const daysLeft = planExpiresAt
    ? Math.max(0, Math.ceil((new Date(planExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          background: "color-mix(in oklch, var(--bg-0) 70%, transparent)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 30
        }}
      >
      <div
        className="shell"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 16,
          paddingBottom: 16,
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

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="hide-on-mobile-sm">
            <LangSwitch />
          </span>
          <span className="hide-on-mobile-sm">
            <ThemeToggle />
          </span>

          {session ? (
            <>
              {isPro && (
                <span className="chip chip--lime hide-on-mobile-sm" style={{ fontSize: 11, padding: "5px 10px" }}>
                  ● {userPlan} {daysLeft !== null ? `· ${daysLeft} ${lang === "ru" ? "дн" : "kun"}` : ""}
                </span>
              )}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                    color: "#0a1f24",
                    fontWeight: 700,
                    fontSize: 14,
                    fontFamily: "var(--font-mono)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 0 2px var(--bg-0), 0 0 0 3px var(--line-2)"
                  }}
                >
                  {(session.user?.name || (session.user as any)?.phone || "?").charAt(0).toUpperCase()}
                </button>
                {profileOpen && (
                  <div style={dropMenuSt}>
                    <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line)" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{session.user?.name || "Foydalanuvchi"}</p>
                      <p style={{ fontSize: 11, color: "var(--fg-2)", margin: 0, fontFamily: "var(--font-mono)" }}>
                        {(session.user as any)?.phone}
                      </p>
                    </div>
                    <Link href="/profile" style={dropItem} onClick={() => setProfileOpen(false)}>◉ {t.common.profile}</Link>
                    <Link href="/progress" style={dropItem} onClick={() => setProfileOpen(false)}>↗ {t.nav.progress}</Link>
                    <Link href="/pricing" style={dropItem} onClick={() => setProfileOpen(false)}>★ {t.nav.pricing}</Link>
                    {(session.user as any)?.role === "ADMIN" && (
                      <Link href="/admin" style={{ ...dropItem, color: "var(--accent)" }} onClick={() => setProfileOpen(false)}>
                        ⚙ Admin panel
                      </Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      style={{
                        ...dropItem,
                        color: "var(--error)",
                        border: "none",
                        background: "transparent",
                        width: "100%",
                        textAlign: "left",
                        cursor: "pointer"
                      }}
                    >
                      ↪ {t.common.logout}
                    </button>
                  </div>
                )}
              </div>
            </>
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
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                      color: "#0a1f24",
                      fontWeight: 700,
                      fontSize: 14,
                      fontFamily: "var(--font-mono)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {(session.user?.name || (session.user as any)?.phone || "?").charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{session.user?.name || "Foydalanuvchi"}</p>
                    <p style={{ fontSize: 11, color: "var(--fg-3)", margin: 0, fontFamily: "var(--font-mono)" }}>
                      {(session.user as any)?.phone}
                    </p>
                  </div>
                </div>
                {isPro && (
                  <span className="chip chip--lime" style={{ fontSize: 11, marginTop: 10, display: "inline-flex" }}>
                    ● {userPlan} · {daysLeft} {lang === "ru" ? "дн" : "kun"}
                  </span>
                )}
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

            <div className="overline" style={{ marginTop: 16 }}>SOZLAMALAR</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <LangSwitch />
              <ThemeToggle />
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
  minWidth: 220,
  zIndex: 50,
  boxShadow: "0 12px 32px rgba(0,0,0,0.4)"
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
