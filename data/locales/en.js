const en = {
  nav: {
    home: "Home",
    agent: "AI Terminal",
    github: "GitHub",
    cases: "Cases",
    contact: "Contact",
  },
  hero: {
    badge: "AI AGENT ARCHITECT // FULL-STACK SYSTEMS ENGINEER",
    title: "Autonomous AI Agents & Production Systems",
    subtitle:
      "I am Emir Strydex. I architect custom AI agent workflows, multi-channel CRM qualifiers, and high-load web platforms that cut operational costs and respond to every lead in 15 seconds — 24/7.",
    ctaPrimary: "Launch AI Terminal",
    ctaSecondary: "Discuss Project",
    metrics: [
      { value: "15s", label: "Lead Response 24/7" },
      { value: "-70%", label: "Routine Ops Load" },
      { value: "2-3w", label: "Pilot to Production" },
    ],
  },
  about: {
    title: "Solo AI Systems Architect",
    jp: "• システム設計 •",
    p1: "Businesses don't need another fragile prompt wrapper. Production AI is 80% solid backend engineering — reliable APIs, databases, fallback guardrails, Docker isolation, and CRM/ERP integration — and 20% LLM orchestration.",
    p2: "You work directly with the lead engineer who designs the architecture, writes the code, and deploys it to your infrastructure. Zero agency middlemen, zero junior handoffs.",
    cta: "Book Architecture Audit",
  },
  capabilities: {
    leftTitle: "Core Engineering Stack",
    rightTitle: "Track & Engagement",
    leftItems: [
      {
        summary: "Autonomous AI Agents & Tool Use",
        content:
          "Multi-step agents with strict anti-hallucination guardrails, function calling, CRM/1C/PostgreSQL read-write tools, and deterministic human-handoff fallbacks.",
      },
      {
        summary: "Enterprise RAG & Document Parsing",
        content:
          "Vector search and structured extraction from messy PDFs, Excel specs, and technical catalogs into clean JSON, quotes, and ERP records.",
      },
      {
        summary: "Cloud, Docker & High-Load Backend",
        content:
          "Production deployment in isolated Docker containers, Yandex Cloud / AWS Serverless, Next.js, Python (FastAPI/Aiogram), Redis, and PostgreSQL.",
      },
    ],
    rightItems: [
      {
        summary: "Viper Labs — Founder & Lead Architect | 2025–2026",
        content:
          "Engineering custom web platforms, cloud migrations, and internal AI automation systems for B2B clients.",
      },
      {
        summary: "NFM Studio — Backend Systems Engineer | 2024",
        content:
          "Designed, built, and load-tested backend architectures and web platforms for commercial clients.",
      },
      {
        summary: "Independent Full-Stack & Security | 2023–2026",
        content:
          "Delivered end-to-end bots, scraping pipelines, Telegram mini-apps, and hardened cloud infrastructure across CIS & EU.",
      },
    ],
  },
  skills: {
    title: "Production Stack",
    jp: "• 技術スタック •",
  },
  projects: {
    title: "AI Solutions & Case Studies",
    jp: "• プロジェクト •",
    painLabel: "Pain:",
    solutionLabel: "Architecture:",
    stackLabel: "Stack:",
    testInTerminal: "Estimate Similar System",
    visitLink: "Open Project",
    items: [
      {
        id: "b2b-wholesale",
        segment: "B2B Suppliers & Wholesale",
        name: "B2B Quote & Estimate AI Parser",
        metric: "40 min -> 60 sec",
        pain: "Incoming RFQs arrive as messy PDFs, Excel sheets, and emails; managers spend hours matching SKUs against 1C/price lists.",
        solution:
          "Automated ingestion pipeline + RAG over technical catalog that parses unstructured specs and generates a draft commercial proposal in CRM in under 1 minute.",
        stack: ["Python", "RAG / Vector DB", "1C / CRM API", "Docker"],
      },
      {
        id: "clinics-b2c",
        segment: "Clinics & High-Ticket B2C",
        name: "Omnichannel AI Qualifier & Booking Agent",
        metric: "15s Response 24/7",
        pain: "Admins lose leads after hours, forget follow-ups, and fumble complex service pricing across Telegram, WhatsApp, and Avito.",
        solution:
          "24/7 multi-channel AI agent with strict anti-hallucination guardrails, live slot lookup, and automated CRM booking + seamless human handoff.",
        stack: ["Node.js", "Aiogram", "Webhook / CRM", "LLM Guardrails"],
      },
      {
        id: "ecom-sellers",
        segment: "E-Commerce & Marketplaces",
        name: "Text-to-SQL Analyst & L1 Support Agent",
        metric: "-70% Support Load",
        pain: "Manual stock/margin reporting across marketplaces and thousands of repetitive product & order-status questions.",
        solution:
          "Secure Text-to-SQL analytics agent over sales Postgres + L1 support agent connected to order status and product spec APIs.",
        stack: ["PostgreSQL", "Text-to-SQL", "FastAPI", "Redis"],
      },
      {
        id: "realestate-hr",
        segment: "Real Estate & HR Teams",
        name: "Automated Candidate & Buyer Screening",
        metric: "3x Faster Screening",
        pain: "Teams burn out filtering hundreds of irrelevant resumes and cold buyer inquiries manually.",
        solution:
          "Structured scoring agent that screens candidates or buyers via custom criteria, ranks fit score, and schedules qualified Zoom calls.",
        stack: ["LLM Scoring", "Calendar API", "Telegram", "n8n"],
      },
      {
        id: "viper-labs",
        segment: "Engineering Studio",
        name: "Viper Labs — Web & Internal AI Ops",
        metric: "Production Cloud",
        pain: "Need for resilient full-stack web delivery and internal task/knowledge orchestration across distributed tools.",
        solution:
          "Full-stack studio (viperlabs.ru) on Yandex Cloud Serverless + custom internal Telegram AI assistant (Cindy) built to orchestrate YouTrack, TickTick, and Git/Obsidian workflows.",
        stack: ["Next.js", "Yandex Cloud", "Docker", "Telegram Bot"],
        link: "https://viperlabs.ru/",
      },
      {
        id: "aetheria-ml",
        segment: "R&D Startup (In Development)",
        name: "AetheriaML — Digital Twins Platform",
        metric: "R&D / MVP Stage",
        pain: "Preserving family memory and personal narratives in an interactive, non-hallucinating conversational format.",
        solution:
          "Proprietary R&D product in active development: chrome/glassmorphism UI, empathetic interview bot, and anti-hallucination RAG architecture.",
        stack: ["Next.js", "Supabase", "RAG Pipeline", "DeepSeek / LLM"],
        link: "https://aetheriaml.vercel.app/",
      },
    ],
  },
  terminal: {
    title: "STRYDEX // NETRUNNER AI TERMINAL",
    jp: "• エージェント •",
    subtitle:
      "Ask about AI agent architecture, ROI for your niche, pricing, or estimate your automation pilot in real time.",
    placeholder: "Describe your business process or ask a question...",
    send: "Execute",
    thinking: "Processing...",
    welcome:
      "NETRUNNER AGENT ONLINE. I am Emir's AI Systems Architect assistant. Tell me your niche (wholesale, clinic, e-commerce, real estate) or task, and I will outline the architecture, timeline, and budget.",
    presets: [
      "Estimate an AI qualifier bot for a clinic",
      "How does the B2B PDF quote parser work?",
      "What is your pricing & engagement model?",
    ],
  },
  contact: {
    title: "Initiate Direct Contact",
    jp: "• 私に連絡して •",
    name: "Name",
    email: "Email or Telegram (@handle)",
    message: "Task / Business Bottleneck",
    messagePlaceholder: "Describe what process you want to automate...",
    send: "Transmit",
    sending: "Transmitting...",
    sent: "Transmission received. Emir will respond shortly.",
    error: "Transmission failed. Reach out directly via Telegram @strydex.",
  },
  footer: {
    rights: "all rights reserved",
  },
};

export default en;
