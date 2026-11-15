import { NextResponse } from "next/server";
import dns from "node:dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch {}

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { ok: false, error: "Telegram credentials not configured on server" },
        { status: 500 },
      );
    }

    const text = [
      "🔥 Новая заявка с портфолио (sxfolio):",
      `👤 Имя: ${name}`,
      `📬 Контакт: ${email}`,
      `💬 Задача: ${message}`,
      `⏱ Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} MSK`,
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
      return NextResponse.json({ ok: true, via: "server-telegram" });
    }

    const errText = await tgRes.text();
    return NextResponse.json(
      { ok: false, error: errText },
      { status: 502 },
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 },
    );
  }
}
