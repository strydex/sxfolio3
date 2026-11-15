import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text = [
        "🔥 Новая заявка с портфолио (sxfolio):",
        `👤 Имя: ${name}`,
        `📬 Контакт: ${email}`,
        `💬 Задача: ${message}`,
      ].join("\n");

      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
          }),
        },
      );
      if (tgRes.ok) {
        return NextResponse.json({ ok: true, via: "telegram" });
      }
    }

    return NextResponse.json({ ok: false, via: "none" }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
