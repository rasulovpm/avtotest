import { prisma } from "@/lib/prisma";
import AdminTopBar from "../AdminTopBar";
import { RoadSignSvg } from "@/components/RoadSignSvg";

export const dynamic = "force-dynamic";

const SIGN_KIND_BY_CODE: Record<string, any> = {
  "1.23": "warning-curve",
  "1.11": "warning-curve",
  "2.5": "prohibit-no-entry",
  "3.1": "mandatory-roundabout",
  "5.16": "info-parking",
  "2.1": "priority-main"
};

export default async function AdminSignsPage() {
  const signs = await prisma.roadSign.findMany({ orderBy: { orderIndex: "asc" } });
  return (
    <>
      <AdminTopBar
        title="Yo'l belgilari"
        sub={`${signs.length} ta belgi`}
        breadcrumbs={[{ label: "Boshqaruv" }, { label: "Belgilar" }]}
      />
      <div style={{ padding: 28 }}>
        <div className="signs-admin-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {signs.map((s) => (
            <div key={s.id} className="bento" style={{ padding: 18, display: "flex", gap: 14, alignItems: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--bg-2)",
                  borderRadius: 12,
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <RoadSignSvg kind={SIGN_KIND_BY_CODE[s.code] || "priority-main"} size={48} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>{s.code}</div>
                <p style={{ fontSize: 13, fontWeight: 600, margin: "2px 0 4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {s.nameUz}
                </p>
                <span className="chip" style={{ fontSize: 10, padding: "3px 7px" }}>
                  {s.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) { .signs-admin-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 640px) { .signs-admin-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </>
  );
}
