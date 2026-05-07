import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Telegram bot webhook
// Sozlash: BotFather'dan token olib, .env'ga qo'shing va Bot URL'ni ushbu endpoint'ga o'rnating:
//   curl -F "url=https://your-domain/api/telegram/webhook" \
//     https://api.telegram.org/bot<TOKEN>/setWebhook
//
// Foydalanuvchi botga "/start <phone_e164_no_plus>" yoki "/start" yuboradi.
// Bot deeplink: https://t.me/<bot_username>?start=998901234567
// User'ning telegramId va telegramUser saqlanadi — keyin OTP shu chat'ga yuboriladi.
export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    // eslint-disable-next-line no-console
    console.log("[telegram webhook]", JSON.stringify(update).slice(0, 300));

    const message = update.message;
    if (!message || !message.text) return NextResponse.json({ ok: true });

    const chatId = String(message.chat.id);
    const username = message.from?.username || null;
    const text: string = message.text.trim();

    if (text.startsWith("/start")) {
      const arg = text.slice(6).trim();
      // arg = phone (raqam, +'siz)
      let payload: any = {
        telegramId: chatId,
        telegramUser: username
      };

      if (/^\d{12}$/.test(arg)) {
        // user'ni telefon orqali topib, telegramId saqlaymiz
        const phone = "+" + arg;
        await prisma.user.upsert({
          where: { phone },
          update: payload,
          create: { phone, ...payload, role: "USER" }
        });
        await sendMessage(chatId, "✅ Hisob ulandi! Endi saytda *Kirish* tugmasini bossangiz, kod shu yerga keladi.");
      } else {
        // Faqat telegramId'ni saqlab qo'yamiz (anonim)
        await sendMessage(
          chatId,
          "👋 Salom! AvtoTest.uz botiga xush kelibsiz.\n\nHisobni ulash uchun saytda telefon raqamingizni kiriting va kod yuborganingizda men sizga yuboraman."
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error("telegram webhook error", e);
    return NextResponse.json({ ok: false, error: String(e?.message) }, { status: 200 });
    // Telegram'ga 200 qaytarish kerak — aks holda qayta urinib ko'radi
  }
}

async function sendMessage(chatId: string, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" })
  });
}
