// Telegram bot orqali OTP yuborish
// Test rejimda console.log ishlatamiz, real botni keyin ulaymiz.

import { prisma } from "./prisma";
import { generateOtp } from "./utils";

const OTP_TTL_MINUTES = 5;

export async function createOtp(phone: string): Promise<{ code: string; expiresAt: Date }> {
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000);

  await prisma.otpCode.create({
    data: { phone, code, expiresAt }
  });

  return { code, expiresAt };
}

export async function sendOtp(phone: string): Promise<{ ok: boolean; debugCode?: string }> {
  const { code } = await createOtp(phone);

  const devMode = process.env.TELEGRAM_DEV_MODE === "true" || !process.env.TELEGRAM_BOT_TOKEN;

  if (devMode) {
    // eslint-disable-next-line no-console
    console.log("\n========================================");
    console.log(`📱 OTP for ${phone}: ${code}`);
    console.log("========================================\n");
    return { ok: true, debugCode: code };
  }

  // Production rejimda Telegram bot orqali yuborish
  // Foydalanuvchi avval bot bilan suhbat boshlashi kerak (telegramId yoziladi)
  try {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user?.telegramId) {
      // Bot bilan ulanmagan — link qaytaramiz
      const botUsername = process.env.TELEGRAM_BOT_USERNAME || "";
      throw new Error(`telegram_not_linked:${botUsername}:${phone}`);
    }

    const text = `🔐 AvtoTest.uz tasdiqlash kodi: *${code}*\n\nKod 5 daqiqa amal qiladi.`;
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: user.telegramId,
        text,
        parse_mode: "Markdown"
      })
    });
    if (!res.ok) throw new Error(`telegram_api_error:${res.status}`);
    return { ok: true };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("sendOtp error:", e);
    throw e;
  }
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const record = await prisma.otpCode.findFirst({
    where: {
      phone,
      code,
      consumed: false,
      expiresAt: { gt: new Date() }
    },
    orderBy: { createdAt: "desc" }
  });

  if (!record) return false;

  await prisma.otpCode.update({
    where: { id: record.id },
    data: { consumed: true }
  });

  // Eski kodlarni ham consume qilamiz
  await prisma.otpCode.updateMany({
    where: { phone, consumed: false },
    data: { consumed: true }
  });

  return true;
}
