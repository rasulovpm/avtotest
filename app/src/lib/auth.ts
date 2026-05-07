import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { normalizePhone, isValidUzPhone } from "./utils";
import { verifyOtp } from "./telegram";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: {
    signIn: "/auth/login"
  },
  providers: [
    CredentialsProvider({
      name: "phone-otp",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) return null;
        const phone = normalizePhone(credentials.phone);
        if (!isValidUzPhone(phone)) return null;

        const ok = await verifyOtp(phone, credentials.code);
        if (!ok) return null;

        // Foydalanuvchini topamiz yoki yaratamiz
        const user = await prisma.user.upsert({
          where: { phone },
          update: { lastActiveAt: new Date() },
          create: { phone, role: "USER" }
        });

        return {
          id: user.id,
          name: user.fullName ?? null,
          email: null,
          image: user.avatarUrl ?? null,
          phone: user.phone,
          role: user.role,
          plan: user.plan
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.uid = (user as any).id;
        token.phone = (user as any).phone;
        token.role = (user as any).role;
        token.plan = (user as any).plan;
      }
      // Plan/role'ni har safar yangilab turamiz (admin tasdiqlasa darhol kuchga kiradi)
      if (trigger === "update" || token.uid) {
        try {
          const u = await prisma.user.findUnique({
            where: { id: token.uid as string },
            select: { role: true, plan: true, planExpiresAt: true, fullName: true }
          });
          if (u) {
            token.role = u.role as "USER" | "ADMIN";
            token.plan = u.plan as "FREE" | "STANDARD" | "PREMIUM";
            (token as any).planExpiresAt = u.planExpiresAt?.toISOString() ?? null;
            token.name = u.fullName ?? token.name;
          }
        } catch (_) {}
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.uid;
        (session.user as any).phone = token.phone;
        (session.user as any).role = token.role;
        (session.user as any).plan = token.plan;
        (session.user as any).planExpiresAt = (token as any).planExpiresAt;
      }
      return session;
    }
  }
};

export async function getAuthSession() {
  return getServerSession(authOptions);
}

export async function requireUser() {
  const s = await getAuthSession();
  if (!s?.user) throw new Error("UNAUTHENTICATED");
  return s.user as any;
}

export async function requireAdmin() {
  const u = await requireUser();
  if (u.role !== "ADMIN") throw new Error("FORBIDDEN");
  return u;
}
