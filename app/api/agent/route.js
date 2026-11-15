import { NextResponse } from "next/server";

const FOLDER_ID = process.env.YC_FOLDER_ID || "b1gdq32pe7ih51cn5lhn";

const SYSTEM_PROMPT_RU = `Ты — Камио (Camio), цифровой AI-ассистент разработчика Эмира.
Твоя главная цель: проконсультировать потенциального клиента, внести полную ясность по срокам, бюджету и процессу работы, и мягко подвести к оставлению заявки в форме ниже или к диалогу с Эмиром в Telegram (@strydex).

Что делает Эмир (прямой формат работы без агентств и стажеров):
1. Магазины на WB, Ozon и E-commerce: AI-Агент первой линии для ответов покупателям (характеристики, совместимость, статусы заказов) + быстрая аналитика остатков и маржи в чате.
2. Клиники и сфера услуг: AI-Агент в Telegram, WhatsApp и Авито, который отвечает за 15 секунд 24/7, консультирует строго по прайсу, проверяет свободные окна и записывает клиента в CRM.
3. Оптовые компании и B2B-поставщики: автоматический разбор входящих заявок и смет из PDF/Excel, сопоставление с 1С или прайсом и сборка черновика КП в CRM за 1 минуту.
4. Недвижимость и подбор персонала (HR): автоматический первичный отбор резюме или заявок покупателей по критериям и запись целевых на созвон.
5. Комплексные веб-платформы, сайты, парсеры и перенос сервисов на облачные серверы.

Ориентиры по бюджету и срокам:
- Предпроектный аудит и архитектура: стоимость 20 000 – 35 000 ₽, срок 2–3 дня (разбираем узкие места, составляем схему и считаем окупаемость).
- Запуск рабочего AI-Агента под ключ: срок 2–3 недели, стоимость 80 000 – 250 000 ₽ (интеграция с CRM/1С, защита от выдумывания цен, деплой на сервер).
- Поддержка и развитие после запуска: 15 000 – 30 000 ₽/мес.

Стиль общения Камио:
- Отвечай строго на русском языке. Называй разработчика просто «Эмир» / «Эмиру» (без фамилии).
- Пиши живо, уверенно, без воды и сложных технических терминов. Говори на языке бизнеса: экономия времени команды, скорость ответа, конверсия и окупаемость.
- Задавай 1 короткий уточняющий вопрос по процессу клиента (например, какая CRM или сколько заявок в день), если это поможет точнее оценить проект.
- В конце каждого ответа мягко предлагай оставить контакты в форме ниже на сайте или написать Эмиру напрямую в Telegram (@strydex).`;

const SYSTEM_PROMPT_EN = `You are Camio, the AI Assistant for Emir, a direct Solo AI Systems Engineer & Full-Stack Developer (founder of Viper Labs).
Your primary goal: advise prospective B2B clients, give them total clarity on solution architecture, timelines, and pricing, and guide them to submit a request in the contact form below or message Emir on Telegram (@strydex).

What Emir builds (direct engineering with no agency middlemen):
1. Clinics & Service Businesses: 24/7 AI lead qualifier & booking agent in Telegram, WhatsApp, and web chat — replies in 15 seconds, follows strict pricing rules, checks open slots, and books directly into CRM.
2. B2B Wholesale & Suppliers: Automated RFQ & quote parser from messy PDF/Excel files, matching items against your ERP/price catalog and generating a draft commercial proposal in CRM in under 60 seconds.
3. E-Commerce & Marketplaces: L1 customer support agent connected to order status & product spec APIs, plus instant chat-based sales, margin, and low-stock analytics.
4. Real Estate & Recruiting (HR): Automated applicant and buyer screening agent that scores fit criteria and schedules qualified calls.
5. Custom web platforms, SaaS backends, scraping pipelines, and cloud infrastructure.

Pricing & Timeline Benchmarks:
- Process Audit & Architecture Blueprint: $250 – $400 (1–2 calls, bottleneck breakdown, system blueprint, and ROI calculation).
- Production AI Agent Pilot (2–3 weeks): $1,000 – $3,000 (full backend, CRM/ERP integration, strict anti-hallucination guardrails, isolated server deployment).
- Ongoing Maintenance & Tuning: $200 – $400/month.

Camio's Rules:
- Reply strictly in natural, fluent English. NEVER include any Russian words.
- Be sharp, helpful, and business-focused (talk ROI, response speed, and team time saved rather than technical buzzwords).
- Ask 1 brief clarifying question about their workflow (e.g., which CRM they use or daily lead volume) when useful to give a tighter estimate.
- Always conclude by inviting them to leave their contact in the form below or message Emir directly on Telegram (@strydex).`;

function buildFallbackReply(lastMessage, isRu) {
  const q = (lastMessage || "").toLowerCase();

  if (q.includes("wb") || q.includes("ozon") || q.includes("маркетплейс") || q.includes("e-com")) {
    return isRu
      ? "Для магазинов на WB / Ozon и e-commerce Эмир настраивает AI-Агента в двух контурах:\n1. Автоответы покупателям по характеристикам, совместимости и статусам доставки — снимает до 70% рутины.\n2. Быстрая аналитика в чате: задаете вопрос по марже или остаткам и сразу получаете сводку.\n\nСрок запуска: 2–3 недели, бюджет пилота: 80 000 – 200 000 ₽. Какие площадки у вас сейчас основные — WB, Ozon или свой сайт? Оставьте заявку в форме ниже или напишите Эмиру в Telegram: @strydex."
      : "For e-commerce stores, Emir builds a dual AI workflow: L1 customer support connected to your order & product data (-70% routine tickets) plus instant sales & inventory analytics in chat.\n\nTimeline: 2–3 weeks. Pilot budget: $1,000–$2,500. Which platform are you running on? Leave a request in the form below or message Emir on Telegram: @strydex.";
  }

  if (q.includes("pdf") || q.includes("1с") || q.includes("1c") || q.includes("опт") || q.includes("смет") || q.includes("quote")) {
    return isRu
      ? "AI-разбор смет для опта работает так: входящий PDF, Excel или письмо -> система извлекает позиции, сверяет остатки и цены с вашей 1С или прайсом -> за 1 минуту собирает готовый черновик КП в CRM.\n\nСрок внедрения: 2–3 недели. Бюджет пилота: 80 000 – 250 000 ₽ (аудит и схема — 20 000 – 35 000 ₽). Какая у вас учетная система — 1С или МойСклад? Оставьте контакт в форме ниже или напишите Эмиру в Telegram: @strydex."
      : "The B2B quote parser automates messy PDF/Excel RFQs: it extracts line items, matches them against your catalog or ERP, and creates a draft quote inside your CRM in under 60 seconds.\n\nTimeline: 2–3 weeks. Pilot budget: $1,000–$3,000 (Architecture Audit: $250–$400). Leave your details below or message Emir on Telegram: @strydex.";
  }

  if (q.includes("клиник") || q.includes("clinic") || q.includes("запис") || q.includes("whatsapp") || q.includes("booking")) {
    return isRu
      ? "Для клиник и сферы услуг подключаем AI-Агента в Telegram, WhatsApp и Авито: отвечает за 15 секунд 24/7, строго следует вашему прайсу, проверяет свободные окна и записывает клиента в CRM.\n\nСрок запуска: 2 недели. Бюджет: от 80 000 ₽. Окупается за счет ночных и быстрых лидов, которых обычно упускают администраторы. Сколько заявок в день у вас приходит? Оставьте контакт ниже или напишите Эмиру: @strydex."
      : "For clinics and service businesses, Emir deploys a 24/7 AI booking agent across WhatsApp, Telegram, and web chat: 15-second response, strict pricing rules, live calendar check, and automatic CRM booking.\n\nTimeline: 2 weeks. Budget: from $1,000. Leave your details in the form below or message Emir on Telegram: @strydex.";
  }

  return isRu
    ? "Формат работы с Эмиром:\n1. Разбор процессов и схема внедрения: 20 000 – 35 000 ₽ (показываем, где бизнес теряет деньги и как окупить систему).\n2. Запуск готового AI-Агента под ключ (2–3 недели): 80 000 – 250 000 ₽ (интеграция с CRM/1С и деплой на сервер).\n3. Поддержка и развитие: 15 000 – 30 000 ₽/мес.\n\nКакая задача у вас сейчас в приоритете? Оставьте контакт в форме ниже или напишите Эмиру в Telegram: @strydex."
    : "How working with Emir works:\n1. Process Audit & Blueprint: $250–$400 (pinpointing bottlenecks and ROI math).\n2. Production AI Agent Pilot (2–3 weeks): $1,000–$3,000 (full integration with your CRM/ERP and server deployment).\n3. Ongoing Maintenance & Tuning: $200–$400/mo.\n\nWhat workflow would you like to automate first? Leave your contact below or message Emir on Telegram: @strydex.";
}

async function getYandexMetadataToken() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
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

async function callYandexGPT(messages, systemPrompt) {
  const iamToken =
    process.env.YC_IAM_TOKEN || (await getYandexMetadataToken());
  const apiKey = process.env.YC_API_KEY;
  if (!iamToken && !apiKey) {
    throw new Error("No Yandex credentials");
  }

  const headers = {
    "Content-Type": "application/json",
    "x-folder-id": FOLDER_ID,
    Authorization: iamToken ? `Bearer ${iamToken}` : `Api-Key ${apiKey}`,
  };

  const ycMessages = [
    { role: "system", text: systemPrompt },
    ...messages.slice(-8).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      text: String(m.content || ""),
    })),
  ];

  for (const modelName of ["yandexgpt/latest", "yandexgpt-lite/latest"]) {
    try {
      const res = await fetch(
        "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            modelUri: `gpt://${FOLDER_ID}/${modelName}`,
            completionOptions: {
              stream: false,
              temperature: 0.4,
              maxTokens: 450,
            },
            messages: ycMessages,
          }),
        },
      );
      if (!res.ok) continue;
      const data = await res.json();
      const text = data?.result?.alternatives?.[0]?.message?.text;
      if (text) return { reply: text, source: modelName };
    } catch {}
  }
  throw new Error("YandexGPT failed");
}

async function callOpenAICompatible(url, apiKey, model, messages, systemPrompt) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: systemPrompt }, ...messages.slice(-8)],
      max_tokens: 450,
      temperature: 0.5,
    }),
  });
  if (!res.ok) throw new Error(`Upstream ${res.status}`);
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

    const hasCyrillic = /[а-яё]/i.test(lastUserMsg);
    const hasLatin = /[a-z]/i.test(lastUserMsg);
    const isRu = hasCyrillic || (!hasLatin && lang === "ru");
    const systemPrompt = isRu ? SYSTEM_PROMPT_RU : SYSTEM_PROMPT_EN;

    try {
      const ycRes = await callYandexGPT(messages, systemPrompt);
      return NextResponse.json(ycRes);
    } catch {}

    if (process.env.OPENROUTER_API_KEY) {
      for (const model of [
        "deepseek/deepseek-chat-v3-0324:free",
        "google/gemini-2.0-flash-exp:free",
        "openai/gpt-4o-mini",
      ]) {
        try {
          const reply = await callOpenAICompatible(
            "https://openrouter.ai/api/v1/chat/completions",
            process.env.OPENROUTER_API_KEY,
            model,
            messages,
            systemPrompt,
          );
          return NextResponse.json({ reply, source: `openrouter:${model}` });
        } catch {}
      }
    }

    if (process.env.VERCEL_AI_GATEWAY_API_KEY) {
      try {
        const reply = await callOpenAICompatible(
          "https://ai-gateway.vercel.sh/v1/chat/completions",
          process.env.VERCEL_AI_GATEWAY_API_KEY,
          "deepseek/deepseek-v4.1-flash",
          messages,
          systemPrompt,
        );
        return NextResponse.json({ reply, source: "vercel-gateway" });
      } catch {}
    }

    return NextResponse.json({
      reply: buildFallbackReply(lastUserMsg, isRu),
      source: "local-estimator",
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Connection interrupted. Message Emir directly on Telegram: @strydex.",
        source: "error-fallback",
      },
      { status: 200 },
    );
  }
}
