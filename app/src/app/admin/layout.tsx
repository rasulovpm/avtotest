import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  if (!session?.user) redirect("/auth/login?callbackUrl=/admin");
  if ((session.user as any).role !== "ADMIN") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-0)", color: "var(--fg-0)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div className="bento" style={{ padding: 32, textAlign: "center", maxWidth: 400 }}>
          <h1 className="h-display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>⛔ Ruxsat yo'q</h1>
          <p style={{ color: "var(--fg-2)", marginBottom: 16 }}>Siz admin emassiz.</p>
          <Link href="/" className="btn btn--primary">Bosh sahifa →</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-0)", color: "var(--fg-0)", display: "flex", fontFamily: "var(--font-body)" }}>
      <AdminSidebar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>{children}</main>
    </div>
  );
}
