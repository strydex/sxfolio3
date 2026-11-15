import { NextResponse } from "next/server";
import https from "node:https";

function requestIPv4(urlStr, method, payload, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const body = typeof payload === "string" ? payload : JSON.stringify(payload);
    const req = https.request(
      {
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method,
        family: 4,
        timeout: 4500,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          ...extraHeaders,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode || 500, body: data });
        });
      },
    );
    req.on("timeout", () => req.destroy(new Error("ETIMEDOUT")));
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function getYandexMetadataToken() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch(
      "http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/token",
      {
        headers: { "Metadata-Flavor": "Google" },
        signal: controller.signal,
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.access_token || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-relay-secret",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req) {
  const errors = [];
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const relayUrl = process.env.TELEGRAM_RELAY_URL;
    const relaySecret = process.env.RELAY_SECRET;
    const bucketName = process.env.LEADS_BUCKET || "sxfolio-leads-strydex";
    const incomingSecret = req.headers.get("x-relay-secret");

    if (incomingSecret && relaySecret && incomingSecret !== relaySecret) {
      return NextResponse.json(
        { ok: false, error: "Forbidden" },
        { status: 403, headers: CORS_HEADERS },
      );
    }

    const createdAt = new Date().toISOString();
    const text = [
      "🔥 Новая заявка с портфолио (sxfolio):",
      `👤 Имя: ${name}`,
      `📬 Контакт: ${email}`,
      `💬 Задача: ${message}`,
      `⏱ Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} MSK`,
    ].join("\n");

    console.log("[LEAD_RECEIVED]", JSON.stringify({ name, email, message, createdAt }));

    // 1. Direct Telegram (works on Vercel / outside RU)
    if (botToken && chatId) {
      try {
        const tgRes = await requestIPv4(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          "POST",
          { chat_id: chatId, text },
        );
        if (tgRes.status >= 200 && tgRes.status < 300) {
          return NextResponse.json(
            { ok: true, via: "direct-telegram" },
            { headers: CORS_HEADERS },
          );
        }
        errors.push(`tg:${tgRes.status}`);
      } catch (err) {
        errors.push(`tg:${err?.code || err?.message}`);
      }
    }

    // 2. Vercel Relay (when direct TG blocked)
    if (relayUrl && !incomingSecret) {
      try {
        const relayRes = await requestIPv4(
          relayUrl,
          "POST",
          { name, email, message },
          relaySecret ? { "x-relay-secret": relaySecret } : {},
        );
        if (relayRes.status >= 200 && relayRes.status < 300) {
          return NextResponse.json(
            { ok: true, via: "vercel-relay" },
            { headers: CORS_HEADERS },
          );
        }
        errors.push(`relay:${relayRes.status}`);
      } catch (err) {
        errors.push(`relay:${err?.code || err?.message}`);
      }
    }

    // 3. Yandex Object Storage (100% reliable internal Yandex Cloud storage)
    const iamToken = await getYandexMetadataToken();
    if (iamToken && bucketName) {
      try {
        const key = `leads/${createdAt.replace(/[:.]/g, "-")}.json`;
        const s3Res = await requestIPv4(
          `https://storage.yandexcloud.net/${bucketName}/${key}`,
          "PUT",
          { name, email, message, createdAt },
          { "X-YaCloud-SubjectToken": iamToken },
        );
        if (s3Res.status >= 200 && s3Res.status < 300) {
          return NextResponse.json(
            { ok: true, via: "yandex-storage" },
            { headers: CORS_HEADERS },
          );
        }
        errors.push(`s3:${s3Res.status}`);
      } catch (err) {
        errors.push(`s3:${err?.code || err?.message}`);
      }
    }

    return NextResponse.json(
      { ok: false, error: errors.join("; ") || "Delivery failed" },
      { status: 502, headers: CORS_HEADERS },
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
