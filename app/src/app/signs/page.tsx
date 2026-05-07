import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import SignsClient from "./SignsClient";

export const dynamic = "force-dynamic";

export default async function SignsPage() {
  const signs = await prisma.roadSign.findMany({ orderBy: { orderIndex: "asc" } });
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <SignsClient signs={signs} />
      </main>
      <Footer />
    </>
  );
}
