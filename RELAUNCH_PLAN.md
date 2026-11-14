# Архитектурный план перезапуска портфолио (`sxfolio3`)

**Цель:** превратить `sxfolio3` из старого резюме-портфолио образца 2023–2024 года в B2B-платформу для привлечения клиентов на разработку и интеграцию автономных AI-агентских систем (под РФ и зарубежный рынок), с деплоем в Yandex Cloud для стабильного доступа без VPN.

---

## 1. Проблемы текущей версии (`sxfolio3`)
- **Позиционирование джуна:** фразы про «Full-Stack разработчик с уклоном в BackEnd», в блоке образования висят курсы SkillFactory (2022) и Django (2024).
- **Нерелевантные кейсы:** клон Apple, закрытый проект Ремэкспо, АстольфоДоро — не продают B2B-услуги с чеком 50k–200k+ ₽.
- **Один язык и баг в HTML:** сайт полностью на русском, а в `app/layout.js` стоит `<html lang="pt">`.
- **Мёртвая гостевая книга (`/chat`):** форма комментариев на старом MongoDB-бекенде не несет бизнес-ценности.
- **Блокировка домена в РФ:** Vercel / `.is-a.dev` периодически режутся провайдерами, что ломает конверсию по РФ-аутричу.

---

## 2. Целевое позиционирование
- **Заголовок / Роль:** `Emir Strydex — AI Agent Architect & Full-Stack Systems Engineer`
- **УТП (Value Proposition):**
  - **EN (Primary):** *"Architecting Autonomous AI Agent Workforces & High-Performance Full-Stack Systems for Modern Business."*
  - **RU (Secondary):** *"Проектирую автономные AI-агентские системы, умных ботов и высоконагруженный веб для бизнеса."*
- **Акцент на ROI:** автоматизация квалификации лидов 24/7, сокращение затрат на поддержку, сквозные пайплайны парсинга и обогащения данных, интеграция с CRM (Telegram / WhatsApp / Web).

---

## 3. Новые кейсы (B2B-фокус)
Удаляем нерелевантные пет-проекты и оставляем **4 сильных кейса**:
1. **Autonomous Lead-Gen & Qualification AI Agent** — многоканальный AI-агент (Telegram / WhatsApp / Web) с RAG, памятью контекста и автозаписью лидов в CRM.
2. **Enterprise Market Intelligence & Scraping Pipeline** — высокоскоростной парсер и агент мониторинга цен/остатков (2GIS, Яндекс.Карты, маркетплейсы) с ротацией прокси и алертами.
3. **Viper Labs — Custom Web Platforms & SaaS Engineering** — студийная разработка высоконагруженных систем на Next.js, Python, Docker, Redis, PostgreSQL.
4. **AetheriaML — Digital Twins & AI Narrative Platform** — продуктовая архитектура с chrome/glassmorphism UI и многошаговой LLM-оркестрацией.

Также убираем курсы 2022–2024 из секции «Образование» и заменяем блок на **Engineering Architecture & Domain Expertise** (AI Agents & RAG, High-Load Backend, Security & Cloud Infrastructure).

---

## 4. Двуязычность (EN Primary / RU Secondary)
- Выносим весь текстовый контент в словарь `data/locales/en.js` и `data/locales/ru.js`.
- Дефолтный язык — **English (`EN`)** для зарубежного аутрича (LinkedIn / Contra / Upwork / Telegram).
- В `Header` добавляем киберпанк-переключатель `[ EN | RU ]` с сохранением в `localStorage`.
- Исправляем `<html lang="en">` и динамические метаданные.

---

## 5. Фича-киллер: Интерактивный AI-ассистент на Vercel AI Gateway
Вместо гостевой книги на `/chat` (плюс опционально виджет-терминал на главной странице):
- Подключение **Vercel AI Gateway** (OpenAI-совместимый endpoint / `ai` SDK) через серверный Route Handler `app/api/agent/route.js` (API-ключ хранится строго в env-переменных на сервере, никогда не утекает на клиент).
- Системный промпт **Netrunner Agent (ассистент Эмира)**:
  - Отвечает на вопросы клиентов по стеку, срокам и архитектуре AI-агентов.
  - Помогает предварительно оценить задачу клиента (бот, парсер, RAG-система, интеграция с CRM) и называет ориентировочные вилки.
  - Собирает контакт (Telegram / Email) и пересылает заявку.

---

## 6. Инфраструктура и деплой (Yandex Cloud)
- При сборке на Windows Node v26 старая версия `next@14.2.18` падает на несовместимом нативном `@next/swc-win32-x64-msvc` (`ERR_DLOPEN_FAILED`).
- **Варианты деплоя в Yandex Cloud:**
  1. **Static Export (`output: 'export'`) + Object Storage + API Gateway + Cloud Function** для `/api/agent` (минимальная стоимость, копейки в месяц, максимальная скорость).
  2. Либо **Docker-контейнер → Yandex Serverless Containers + API Gateway** (полноценный SSR + API routes без ограничений, масштабирование до 0 при простое, бесплатный тир).
- Плюс обновление Next.js 14 → 15/16 (как в `viper-labs`) для корректной локальной сборки под Node v26 на текущем ноутбуке.
