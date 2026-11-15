import { NextResponse } from "next/server";

const FOLDER_ID = process.env.YC_FOLDER_ID || "b1gdq32pe7ih51cn5lhn";

const SYSTEM_PROMPT = `Ты — AI-Ассистент Эмира (создателя студии Viper Labs).
Твоя задача: понятным языком без лишнего технического жаргона помочь клиенту оценить, как внедрение AI-Ассистента окупится в его бизнесе, и предложить связаться с Эмиром в Telegram (@strydex) или через форму на сайте.

Что делает Эмир (прямой формат работы без агентств и посредников):
1. Оптовые компании и B2B-поставщики: автоматический разбор входящих заявок/смет из PDF и Excel, поиск по прайсу/1С и сборка готового коммерческого предложения в CRM за 1 минуту.
2. Клиники и сфера услуг: AI-Ассистент (администратор) в Telegram, WhatsApp и Авито, который отвечает за 15 секунд 24/7, проверяет свободные окна и записывает клиента в CRM.
3. Магазины на WB/Ozon и E-commerce: AI-Ассистент для ответов покупателям (статусы заказов, характеристики товаров) и быстрой аналитики продаж и остатков.
4. Недвижимость и подбор персонала (HR): автоматический отбор резюме или заявок покупателей по заданным критериям и запись подходящих людей на созвон.

Ориентиры по бюджету и срокам:
- Разбор процессов и схема внедрения (предпроектный аудит): 20 000 – 35 000 ₽ ($250–$400).
- Запуск готового AI-Ассистента под ключ (за 2–3 недели): 80 000 – 250 000 ₽ ($1,000–$3,000).
- Поддержка и доработка: 15 000 – 30 000 ₽/мес ($200–$400/мес).

Правила ответа:
- Отвечай строго на том же языке, на котором написал пользователь (если по-русски — на русском, называй просто «Эмир» или «Эмиром» без фамилии; если на английском — на английском, Emir).
- Пиши кратко, по делу, без воды и сложных терминов вроде "RAG", "векторные эмбеддинги", "оркестрация". Говори про экономию времени менеджеров, скорость ответа клиентам и окупаемость.
- В конце предложи оставить контакт в форме ниже или написать Эмиру напрямую в Telegram: @strydex.`;

function buildFallbackReply(lastMessage, lang) {
  const q = (lastMessage || "").toLowerCase();
  const isRu = lang === "ru" || /[а-яё]/i.test(lastMessage || "");

  if (
    q.includes("pdf") ||
    q.includes("1с") ||
    q.includes("1c") ||
    q.includes("опт") ||
    q.includes("смет") ||
    q.includes("quote")
  ) {
    return isRu
      ? "Как работает AI-обработка смет для опта: клиент присылает список в PDF, Excel или письмом -> система распознает позиции, сверяет остатки и цены с вашей 1С или прайсом -> за 1 минуту собирает готовый черновик КП в CRM.\n\nСрок запуска: 2–3 недели. Бюджет пилота: 80 000 – 250 000 ₽ (предварительный разбор и схема — 20 000 – 35 000 ₽). Напишите Эмиру в Telegram (@strydex) или оставьте заявку в форме ниже."
      : "How the B2B Quote Parser works: a client sends a messy PDF or Excel list -> the system matches items against your catalog/ERP -> generates a ready commercial quote in CRM in under 60 seconds.\n\nTimeline: 2–3 weeks. Pilot budget: $1,000–$3,000 (Architecture Audit: $250–$400). Message Emir on Telegram (@strydex) or use the form below.";
  }

  if (
    q.includes("клиник") ||
    q.includes("clinic") ||
    q.includes("бот") ||
    q.includes("bot") ||
    q.includes("запис")
  ) {
    return isRu
      ? "Для клиник и сферы услуг подключаем AI-администратора в Telegram, WhatsApp и Авито: отвечает за 15 секунд круглосуточно, не путается в прайсе, проверяет свободные окна и записывает в вашу CRM. Если вопрос нестандартный — тихо переводит на живого администратора.\n\nСрок запуска: 2 недели. Бюджет: от 80 000 ₽. Окупается на 2-й месяц за счет экономии на потерянных вечерних лидах. Напишите Эмиру в Telegram: @strydex."
      : "For clinics and service businesses, we set up a 24/7 AI assistant in Telegram & WhatsApp: replies in 15 seconds, checks open slots, and books straight into your CRM.\n\nTimeline: 2 weeks. Budget: from $1,000. Message Emir on Telegram (@strydex) to discuss your workflow.";
  }

  return isRu
    ? "Формат работы с Эмиром:\n1. Разбор задачи и схема внедрения: 20 000 – 35 000 ₽ (показываем, где бизнес теряет деньги и как окупить систему).\n2. Запуск рабочего AI-помощника под ключ (2–3 недели): 80 000 – 250 000 ₽.\n3. Поддержка и доработка: 15 000 – 30 000 ₽/мес.\n\nОпишите вашу нишу здесь или напишите Эмиру напрямую в Telegram: @strydex."
    : "How working with Emir works:\n1. Process Audit & Blueprint: $250–$400 (pinpointing bottlenecks and ROI).\n2. Production Pilot (2–3 weeks): $1,000–$3,000 (end-to-end integration with your CRM/tools).\n3. Monthly Support: $200–$400/mo.\n\nTell me about your business here or message @strydex on Telegram.";
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

async function callYandexGPT(messages) {
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
    { role: "system", text: SYSTEM_PROMPT },
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
              temperature: 0.45,
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
    } catch {
      // try next model
    }
  }
  throw new Error("YandexGPT failed");
}

async function callOpenAICompatible(url, apiKey, model, messages) {
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

    // 1. Primary: YandexGPT inside Yandex Cloud (fast, no blocks in RU)
    try {
      const ycRes = await callYandexGPT(messages);
      return NextResponse.json(ycRes);
    } catch {
      // continue to secondary providers
    }

    // 2. Secondary: OpenRouter free/paid fallback
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
          );
          return NextResponse.json({ reply, source: `openrouter:${model}` });
        } catch {}
      }
    }

    // 3. Tertiary: Vercel AI Gateway
    if (process.env.VERCEL_AI_GATEWAY_API_KEY) {
      try {
        const reply = await callOpenAICompatible(
          "https://ai-gateway.vercel.sh/v1/chat/completions",
          process.env.VERCEL_AI_GATEWAY_API_KEY,
          "deepseek/deepseek-v4.1-flash",
          messages,
        );
        return NextResponse.json({ reply, source: "vercel-gateway" });
      } catch {}
    }

    return NextResponse.json({
      reply: buildFallbackReply(lastUserMsg, lang),
      source: "local-estimator",
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Связь с терминалом прервалась. Напишите Эмиру напрямую в Telegram: @strydex.",
        source: "error-fallback",
      },
      { status: 200 },
    );
  }
}
