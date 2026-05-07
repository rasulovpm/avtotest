import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import PricingClient from "./PricingClient";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const tariffs = await prisma.tariff.findMany({
    where: { isActive: true },
    orderBy: { priceUzs: "asc" }
  });
  const session = await getAuthSession();
  const settings = await prisma.setting.findMany({
    where: { key: { in: ["click_enabled", "manual_payments_enabled"] } }
  });
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <PricingClient
          tariffs={tariffs.map((t) => ({
            id: t.id,
            slug: t.slug,
            nameUz: t.nameUz,
            nameRu: t.nameRu,
            nameCy: t.nameCy,
            durationDays: t.durationDays,
            priceUzs: t.priceUzs,
            features: JSON.parse(t.features) as string[]
          }))}
          isLoggedIn={!!session?.user}
          currentPlan={(session?.user as any)?.plan || "FREE"}
          clickEnabled={settingsMap.click_enabled === "true"}
          manualEnabled={settingsMap.manual_payments_enabled === "true"}
        />
      </main>
      <Footer />
    </>
  );
}
