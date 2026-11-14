import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are NETRUNNER AGENT, the AI Systems Architect assistant for Emir Strydex (@strydex, founder of Viper Labs).
Your job: qualify B2B leads, explain how Emir's AI agents solve their operational pain, and guide them to book an audit or message @strydex on Telegram.

Emir's Positioning:
- Solo AI Systems Architect & Full-Stack Engineer (not an agency with junior handoffs).
- Production AI = 80% reliable backend (APIs, PostgreSQL, Redis, Docker, CRM/1C integration, anti-hallucination guardrails) + 20% LLM orchestration.
- Stack: Python (FastAPI, Aiogram), Node.js / Next.js, Docker, PostgreSQL, Redis, RAG / Vector DBs, n8n, Yandex Cloud Serverless.

4 Core B2B Solutions:
1. B2B Suppliers & Wholesale: PDF/Excel RFQ parser + RAG over technical catalog -> draft quote in 1C/CRM in <60 sec.
2. Clinics & High-Ticket B2C: 24/7 omnichannel qualifier (Telegram, WhatsApp, Avito) with live slot lookup & CRM booking (15s response).
3. E-Commerce & Marketplaces: Text-to-SQL analytics agent over sales Postgres + L1 support agent connected to order status APIs (-70% support load).
4. Real Estate & HR: Automated candidate/buyer scoring agent with Zoom calendar booking (3x faster screening).

Engagement & Pricing Model:
1. Paid Architecture Audit: 20,000 - 35,000 RUB ($250 - $400) — 1-2 calls, bottleneck breakdown, system architecture, ROI math.
2. Production Pilot (1 core process, 2-3 weeks): 80,000 - 250,000 RUB ($1,000 - $3,000) — full backend, CRM integration, Docker deployment.
3. Monthly Retainer / Support: 15,000 - 30,000 RUB/mo ($200 - $400/mo) — monitoring, token limits, prompt tuning.

Rules:
- Reply in the same language as the user's message (English or Russian).
- Be concise, sharp, business-focused (talk ROI, speed, cost reduction, not buzzwords).
- Always end with a clear next step: suggest leaving a request in the Contact form below or messaging @strydex on Telegram.`;

function buildFallbackReply(lastMessage, lang) {
  const q = (lastMessage || "").toLowerCase();
  const isRu =
    lang === "ru" || /[а-яё]/i.test(lastMessage || "");

  if (q.includes("pdf") || q.includes("1с") || q.includes("1c") || q.includes("опт") || q.includes("quote")) {
    return isRu
      ? "Архитектура B2B-парсера смет: входящий PDF/Excel с почты или Telegram -> парсинг позиций и сопоставление с вашим прайсом/1С через RAG -> генерация готового черновика КП в CRM за ~60 секунд.\n\nСрок пилота: 2-3 недели. Вилка: 80 000 – 250 000 ₽ (предпроектный аудит — 20 000 – 35 000 ₽). Напишите @strydex в Telegram или оставьте заявку в форме ниже."
      : "B2B Quote Parser architecture: incoming PDF/Excel via email or Telegram -> structured extraction + RAG matching against your 1C/price catalog -> draft quote created in CRM in <60 seconds.\n\nPilot timeline: 2-3 weeks. Budget: $1,000–$3,000 (Architecture Audit: $250–$400). Message @strydex on Telegram or use the contact form below.";
  }

  if (q.includes("клиник") || q.includes("clinic") || q.includes("бот") || q.includes("bot")) {
    return isRu
      ? "Для клиник и B2C-услуг ставим мультиканального AI-квалификатора (Telegram / WhatsApp / Авито): отвечает за 15 секунд 24/7, проверяет свободные слоты в CRM и записывает клиента без галлюцинаций по прайсу.\n\nСрок пилота: 2 недели. Вилка: 80 000 – 180 000 ₽. Окупается на 2-й месяц за счет экономии ФОТ и ночных лидов. Для старта напишите @strydex."
      : "For clinics & B2C services, we deploy an omnichannel AI qualifier (Telegram / WhatsApp): 15-second response 24/7, live slot lookup, strict pricing guardrails, and direct CRM booking.\n\nPilot timeline: 2 weeks. Budget: $1,000–$2,200. Message @strydex on Telegram to schedule a 20-min architecture audit.";
  }

  return isRu
    ? "Формат работы с Эмиром Страйдеком:\n1) Предпроектный аудит и архитектура: 20 000 – 35 000 ₽ (схема интеграции + расчет ROI).\n2) Боевой пилот на 1 процесс (2–3 недели): 80 000 – 250 000 ₽ (Python/Next.js, Docker, CRM/1С).\n3) Поддержка: 15 000 – 30 000 ₽/мес.\n\nОпишите вашу нишу или напишите напрямую в Telegram: @strydex."
    : "Engagement model with Emir Strydex:\n1) Architecture Audit: $250–$400 (system blueprint + ROI calculation).\n2) Production Pilot (2–3 weeks): $1,000–$3,000 (Dockerized backend + CRM/ERP integration).\n3) Monthly Retainer: $200–$400/mo.\n\nDescribe your workflow or message @strydex on Telegram.";
}

async function callUpstream(url, apiKey, model, messages) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-8)],
      max_tokens: 450,
      temperature: 0.5,
    }),
  });
  if (!res.ok) {
    throw new Error(`Upstream ${res.status}`);
  }
  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) throw new Error("Empty completion");
  return reply;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const lang = body?.lang === "ru" ? "ru" : "en";
    const lastUserMsg =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";

    const vercelKey = process.env.VERCEL_AI_GATEWAY_API_KEY;
    const openrouterKey = process.env.OPENROUTER_API_KEY;

    if (vercelKey) {
      try {
        const reply = await callUpstream(
          "https://ai-gateway.vercel.sh/v1/chat/completions",
          vercelKey,
          "deepseek/deepseek-v4.1-flash",
          messages,
        );
        return NextResponse.json({ reply, source: "vercel-gateway" });
      } catch {
        // fallback to OpenRouter or deterministic mode
      }
    }

    if (openrouterKey) {
      try {
        const reply = await callUpstream(
          "https://openrouter.ai/api/v1/chat/completions",
          openrouterKey,
          "openai/gpt-4o-mini",
          messages,
        );
        return NextResponse.json({ reply, source: "openrouter" });
      } catch {
        // fallback to deterministic mode
      }
    }

    return NextResponse.json({
      reply: buildFallbackReply(lastUserMsg, lang),
      source: "local-estimator",
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Terminal connection interrupted. Reach Emir directly on Telegram: @strydex.",
        source: "error-fallback",
      },
      { status: 200 },
    );
  }
}
