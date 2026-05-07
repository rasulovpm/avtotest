import { prisma } from "@/lib/prisma";
import AdminTopBar from "../AdminTopBar";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  const tariffs = await prisma.tariff.findMany({ orderBy: { priceUzs: "asc" } });

  return (
    <>
      <AdminTopBar
        title="Sozlamalar"
        sub="Tizim, to'lov va tariflar"
        breadcrumbs={[{ label: "Tizim" }, { label: "Sozlamalar" }]}
      />
      <div style={{ padding: 28 }}>
        <SettingsClient
          initial={{
            click_enabled: map.click_enabled === "true",
            manual_payments_enabled: map.manual_payments_enabled === "true",
            site_name_uz: map.site_name_uz || "AvtoTest.uz"
          }}
          tariffs={tariffs.map((t) => ({
            id: t.id,
            slug: t.slug,
            nameUz: t.nameUz,
            durationDays: t.durationDays,
            priceUzs: t.priceUzs,
            isActive: t.isActive
          }))}
        />
      </div>
    </>
  );
}
