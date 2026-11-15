const en = {
  nav: {
    home: "Home",
    cases: "Cases",
    agent: "AI Terminal",
    github: "GitHub",
    contact: "Contact",
  },
  hero: {
    badge: "AI AUTOMATION & FULL-STACK SYSTEMS",
    title: "AI Assistants & Systems That Sell 24/7",
    subtitle:
      "I am Emir Strydex. I build custom AI assistants, automated request parsers, and fast web platforms that answer every client in 15 seconds, integrate with your CRM/ERP, and cut manual team routine by up to 70%.",
    ctaPrimary: "Launch AI Terminal",
    ctaSecondary: "Discuss Project",
    metrics: [
      { value: "15s", label: "Client Reply 24/7" },
      { value: "-70%", label: "Manual Routine" },
      { value: "2-3w", label: "Launch Timeline" },
    ],
  },
  about: {
    title: "Direct AI Architecture for Business",
    jp: "• 私について •",
    p1: "Businesses don't need fragile chatbots that make things up. A reliable AI assistant is 80% solid engineering — clean data, CRM/ERP integration, strict error protection — and 20% AI logic.",
    p2: "You work directly with the engineer who studies your workflow, builds the system, and deploys it on your servers. No agency middlemen, no junior handoffs.",
    cta: "Book Architecture Audit",
  },
  capabilities: {
    leftTitle: "Core Solutions",
    rightTitle: "Experience & Track",
    leftItems: [
      {
        summary: "AI Sales & Support Assistants",
        content:
          "24/7 assistants in Telegram, WhatsApp, and web chat that qualify leads, answer pricing questions accurately, check calendar slots, and book straight into your CRM.",
      },
      {
        summary: "Automated Document & Quote Processing",
        content:
          "Instant parsing of messy PDF/Excel requests, matching items against your price list or ERP, and generating ready commercial proposals in 1 minute.",
      },
      {
        summary: "Web Platforms & Cloud Deployment",
        content:
          "Full-stack web apps, client portals, and isolated cloud deployment (Next.js, Python, Docker, Yandex Cloud) built for speed and security.",
      },
    ],
    rightItems: [
      {
        summary: "Viper Labs — Founder & Lead Engineer | 2025–2026",
        content:
          "Building custom web platforms, cloud migrations, and internal AI automation tools for B2B clients.",
      },
      {
        summary: "NFM Studio — Backend Systems Engineer | 2024",
        content:
          "Designed, developed, and tested commercial web platforms and high-load backend APIs.",
      },
      {
        summary: "Independent Full-Stack & Automation | 2023–2026",
        content:
          "Delivered custom bots, data parsers, web services, and cloud infrastructure for clients across CIS and Europe.",
      },
    ],
  },
  skills: {
    title: "Skills",
    jp: "• スキル •",
  },
  projects: {
    title: "Solutions & Case Studies",
    jp: "• プロジェクト •",
    painLabel: "Problem:",
    solutionLabel: "Solution:",
    viewFlow: "View Workflow",
    testInTerminal: "Estimate in AI Terminal",
    visitLink: "Open Website",
    closeModal: "Close",
    howItWorks: "How It Works",
    items: [
      {
        id: "b2b-wholesale",
        segment: "B2B Wholesale & Suppliers",
        name: "AI Quote & Estimate Parser",
        metric: "40 min -> 60 sec",
        image: "/images/projects/b2b-parser.svg",
        pain: "Requests arrive as messy PDFs, Excel files, and emails; managers spend hours matching items against 1C or price lists.",
        solution:
          "The system reads incoming files, matches items with your catalog, and builds a ready commercial quote in CRM in 1 minute.",
        steps: [
          "Client sends a PDF/Excel list by email or Telegram",
          "AI extracts all positions, quantities, and matches them to your price list",
          "Manager receives a ready draft quote inside CRM in 60 seconds",
        ],
        promptPreset:
          "Estimate an AI quote parser from PDF/Excel into CRM for a wholesale company.",
      },
      {
        id: "clinics-b2c",
        segment: "Clinics & Service Businesses",
        name: "24/7 AI Administrator & Booking",
        metric: "15s Reply 24/7",
        image: "/images/projects/clinic-qualifier.svg",
        pain: "Admins miss evening leads, forget follow-ups, and get confused in complex service pricing across Telegram and WhatsApp.",
        solution:
          "24/7 AI assistant answers in 15 seconds, checks open slots, books into CRM, and hands off edge cases to staff.",
        steps: [
          "Client messages in Telegram, WhatsApp, or web chat at any hour",
          "AI answers accurately using your price list and checks available slots",
          "Appointment is automatically created in CRM with a reminder",
        ],
        promptPreset:
          "Estimate a 24/7 AI booking assistant for a clinic or service business.",
      },
      {
        id: "ecom-sellers",
        segment: "E-Commerce & Marketplaces",
        name: "AI Support & Analytics Copilot",
        metric: "-70% Support Load",
        image: "/images/projects/ecom-analytics.svg",
        pain: "Endless repetitive questions about product specs and order statuses, plus manual stock and margin reports.",
        solution:
          "Customer support assistant connected to order status APIs + instant sales & stock analytics in plain language.",
        steps: [
          "Buyer asks about product specs or delivery status",
          "AI fetches live order/stock data and replies accurately",
          "Owner asks for top low-stock SKUs or margin stats in chat and gets instant charts",
        ],
        promptPreset:
          "Estimate an AI support and sales analytics assistant for an e-commerce store.",
      },
      {
        id: "realestate-hr",
        segment: "Real Estate & HR Teams",
        name: "AI Lead & Candidate Screening",
        metric: "3x Faster Screening",
        image: "/images/projects/hr-screening.svg",
        pain: "Brokers and recruiters burn out manually filtering hundreds of non-target resumes and cold buyer messages.",
        solution:
          "Automated screening assistant scores applicants by your criteria and books Zoom calls only with qualified fits.",
        steps: [
          "Incoming resume or buyer inquiry arrives from job boards or ads",
          "AI runs a quick structured qualification chat and assigns a fit score",
          "Top matches automatically pick a time slot on your calendar",
        ],
        promptPreset:
          "Estimate an AI screening assistant for real estate or HR.",
      },
      {
        id: "viper-labs",
        segment: "Engineering Studio",
        name: "Viper Labs — Web & AI Ops",
        metric: "Live in Cloud",
        image: "/images/projects/viperlabs-screen.png",
        pain: "Companies need fast, reliable web platforms and internal automation across task trackers and messengers.",
        solution:
          "Full-stack web studio (viperlabs.ru) hosted in Yandex Cloud + experience building Cindy, an internal Telegram AI bot for task & workflow automation.",
        steps: [
          "Custom web interfaces and backend APIs deployed in isolated containers",
          "Internal Telegram AI assistant connected to YouTrack, TickTick, and Git",
          "Zero downtime, fast global access, and transparent cloud architecture",
        ],
        link: "https://viperlabs.ru/",
        promptPreset:
          "Tell me about Viper Labs web development and internal Telegram AI bots.",
      },
      {
        id: "aetheria-ml",
        segment: "R&D Startup (In Development)",
        name: "AetheriaML — Digital Twins",
        metric: "In Development",
        image: "/images/projects/aetheriaml-screen.png",
        pain: "Preserving personal stories and family memory in an interactive digital format without AI hallucinations.",
        solution:
          "Proprietary R&D product currently in active development: futuristic chrome UI, interview bot, and strict fact-grounded memory architecture.",
        steps: [
          "Empathetic interview flow gathers real personal memories",
          "Structured memory base prevents the AI from inventing fake facts",
          "Interactive digital diary web experience (currently in R&D)",
        ],
        link: "https://aetheriaml.com/",
        promptPreset:
          "What is the AetheriaML startup and what stage is it at?",
      },
    ],
  },
  terminal: {
    title: "STRYDEX // AI ASSISTANT",
    jp: "• エージェント •",
    subtitle:
      "Describe your business task — our AI will outline how automation works in your niche, timeline, and budget.",
    placeholder: "Describe your business task or ask a question...",
    send: "Send",
    thinking: "Thinking...",
    welcome:
      "AI ASSISTANT ONLINE. I help Emir's clients estimate automation projects. Tell me your business type (wholesale, clinic, e-commerce, real estate) or task — I will suggest the workflow, timeline, and budget.",
    presets: [
      "Estimate an AI booking bot for a clinic",
      "How does the PDF quote parser work?",
      "What are the pricing and timelines?",
    ],
  },
  contact: {
    title: "Contact Me",
    jp: "• 私に連絡して •",
    name: "Name",
    email: "Email or Telegram (@handle)",
    message: "Your Task",
    messagePlaceholder: "Tell me what process you want to automate...",
    send: "Send Message",
    sending: "Sending...",
    sent: "Message received! Emir will get back to you shortly.",
    error: "Failed to send. Please message directly on Telegram: @strydex.",
  },
  footer: {
    rights: "all rights reserved",
  },
};

export default en;
