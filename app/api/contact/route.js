import { NextResponse } from "next/server";
import dns from "node:dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch {}

async function sendDirectTelegram(botToken, chatId, text) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
        signal: controller.signal,
      },
    );
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

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
    const relayUrl = process.env.TELEGRAM_RELAY_URL;
    const relaySecret = process.env.RELAY_SECRET;
    const incomingSecret = req.headers.get("x-relay-secret");

    if (incomingSecret && relaySecret && incomingSecret !== relaySecret) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    const text = [
      "🔥 Новая заявка с портфолио (sxfolio):",
      `👤 Имя: ${name}`,
      `📬 Контакт: ${email}`,
      `💬 Задача: ${message}`,
      `⏱ Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} MSK`,
    ].join("\n");

    if (botToken && chatId) {
      const ok = await sendDirectTelegram(botToken, chatId, text);
      if (ok) {
        return NextResponse.json({ ok: true, via: "direct-telegram" });
      }
    }

    if (relayUrl && !incomingSecret) {
      try {
        const relayRes = await fetch(relayUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(relaySecret ? { "x-relay-secret": relaySecret } : {}),
          },
          body: JSON.stringify({ name, email, message }),
        });
        const relayData = await relayRes.json();
        if (relayRes.ok && relayData?.ok) {
          return NextResponse.json({ ok: true, via: "vercel-relay" });
        }
      } catch {}
    }

    return NextResponse.json(
      { ok: false, error: "Delivery failed" },
      { status: 502 },
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 },
    );
  }
}
