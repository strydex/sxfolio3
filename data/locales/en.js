const en = {
  nav: {
    home: "Home",
    cases: "Cases",
    agent: "Camio AI",
    github: "GitHub",
    contact: "Contact",
  },
  hero: {
    badge: "AI AGENTS & FULL-STACK SYSTEMS",
    title: "AI Agents & Systems That Work 24/7",
    subtitle:
      "Hi, I am Emir. I build custom AI Agents, automated request processing, and end-to-end web platforms. My systems reply to every client in 15 seconds, integrate with your CRM or ERP, and eliminate up to 70% of team routine.",
    ctaPrimary: "Ask Camio AI",
    ctaSecondary: "Discuss Project",
    metrics: [
      { value: "15s", label: "Client Reply 24/7" },
      { value: "-70%", label: "Team Routine" },
      { value: "2-3w", label: "Launch Timeline" },
    ],
  },
  about: {
    title: "Direct AI Architecture for Business",
    jp: "• 私について •",
    p1: "Businesses don't need another fragile GPT wrapper that invents prices. A real production AI Agent means reliable integration with your spreadsheets, ERP, CRM, corporate guidelines, and strict safety rules: what is allowed and what is not.",
    p2: "You work directly with the engineer who studies your workflow, writes the code, and deploys the system on your server. No agency markups, no junior handoffs.",
    cta: "Book Architecture Audit",
  },
  capabilities: {
    leftTitle: "How I Help Businesses",
    rightTitle: "Experience & Track",
    leftItems: [
      {
        summary: "AI Sales & Booking Agents 24/7",
        content:
          "Smart agents in Telegram, WhatsApp, and web chat that follow your price list, check open calendar slots, qualify leads, and book directly into CRM.",
      },
      {
        summary: "Automated Document & Quote Processing",
        content:
          "Parsing messy incoming PDF/Excel requests, matching positions with your catalog or ERP, and generating ready commercial proposals in 1 minute.",
      },
      {
        summary: "Web Platforms & Cloud Systems",
        content:
          "Building custom websites, client portals, data scrapers, and resilient cloud deployments with zero downtime.",
      },
    ],
    rightItems: [
      {
        summary: "Viper Labs — Founder & Lead Engineer | 2025–2026",
        content:
          "Building custom web platforms, cloud migrations, and internal AI automation systems for B2B clients.",
      },
      {
        summary: "NFM Studio — Backend Systems Engineer | 2024",
        content:
          "Designed, developed, and load-tested commercial web platforms and backend APIs.",
      },
      {
        summary: "Independent Full-Stack & Automation | 2023–2026",
        content:
          "Delivered Telegram bots, scraping pipelines, and web applications for clients across CIS and Europe.",
      },
    ],
  },
  skills: {
    title: "Skills",
    jp: "• スキル •",
  },
  projects: {
    title: "Live Projects & AI Solutions",
    jp: "• プロジェクト •",
    liveTitle: "Production Projects",
    blueprintsTitle: "Ready-to-Deploy AI Solutions for Your Niche",
    painLabel: "Problem:",
    solutionLabel: "Solution:",
    inputLabel: "Input:",
    agentLabel: "AI Agent:",
    outputLabel: "Result:",
    viewFlow: "See Details",
    testInTerminal: "Discuss with Camio",
    visitLink: "Open Website",
    howItWorks: "Workflow",
    liveItems: [
      {
        id: "viper-labs",
        segment: "Web Engineering Studio",
        name: "Viper Labs — Web & AI Ops",
        metric: "Production",
        image: "/images/projects/viperlabs-screen.png",
        pain: "Businesses need fast websites, custom portals, and internal workflow automation across messengers and trackers.",
        solution:
          "Full-stack development studio (viperlabs.ru) running on Yandex Cloud + internal Telegram AI assistant built for team task orchestration.",
        steps: [
          "Custom high-converting websites and SaaS platforms built end-to-end",
          "Internal Telegram AI agents integrated with YouTrack, TickTick, and Git",
          "Reliable cloud deployment accessible globally",
        ],
        link: "https://viperlabs.ru/",
        promptPreset:
          "Tell me about Viper Labs web development and custom AI agent integration.",
      },
      {
        id: "aetheria-ml",
        segment: "R&D Startup (In Development)",
        name: "AetheriaML — Digital Twins",
        metric: "In Development",
        image: "/images/projects/aetheriaml-screen.png",
        pain: "Preserving personal stories and family memory in an interactive digital format without AI hallucinations.",
        solution:
          "Proprietary R&D product currently in active development: chrome/glass UI, empathetic interview bot, and fact-grounded memory architecture.",
        steps: [
          "Empathetic interview flow gathers real personal memories",
          "Structured memory base prevents the AI from inventing fake facts",
          "Interactive digital diary web experience (currently in R&D)",
        ],
        link: "https://aetheriaml.com/",
        promptPreset:
          "What is the AetheriaML startup and what stage is it at?",
      },
      {
        id: "communicode",
        segment: "Commercial Web Platform",
        name: "Communicode — Mental Health Platform",
        metric: "Shipped",
        image: "/images/projects/communicode.png",
        pain: "Need for an accessible, structured online support platform for users in Europe.",
        solution:
          "Full-stack web platform engineered for reliability, responsive UX, and clean data workflows.",
        steps: [
          "Structured user onboarding and content architecture",
          "Responsive web interface for desktop and mobile users",
          "Production release for European market",
        ],
        link: "https://communicode.es/",
        promptPreset:
          "Can you build a custom web platform or client portal for our business?",
      },
    ],
    blueprints: [
      {
        id: "ecom-sellers",
        segment: "E-Commerce & Marketplaces",
        name: "Customer Support & Sales Analytics AI",
        metric: "-70% Support Load",
        input: "Customer questions on specs/delivery or owner chat queries",
        agent: "Checks product catalog, live order APIs, and sales metrics",
        output: "Instant accurate customer reply or stock/margin report in chat",
        promptPreset:
          "E-commerce customer support & sales analytics copilot",
      },
      {
        id: "clinics-b2c",
        segment: "Clinics & Service Businesses",
        name: "24/7 AI Lead Qualifier & Booking Agent",
        metric: "15s Reply 24/7",
        input: "Evening/weekend inquiries in WhatsApp, Telegram, or web chat",
        agent: "Answers strictly from price list, checks open calendar slots",
        output: "Confirmed booking inside CRM + zero lost leads",
        promptPreset:
          "24/7 AI lead qualifier & calendar booking for services",
      },
      {
        id: "b2b-wholesale",
        segment: "B2B Wholesale & Suppliers",
        name: "Automated PDF / Excel Quote Parser",
        metric: "40 min -> 60 sec",
        input: "Unstructured RFQ lists in PDF, Excel, or email",
        agent: "Extracts SKU lines and matches them against ERP / price list",
        output: "Ready-to-send draft commercial quote inside CRM",
        promptPreset:
          "Automated PDF/Excel quote & invoice parser into ERP/CRM",
      },
      {
        id: "realestate-hr",
        segment: "Real Estate & HR Teams",
        name: "Candidate & Buyer Screening Agent",
        metric: "3x Faster Filter",
        input: "High volume of resumes or cold property buyer inquiries",
        agent: "Runs structured screening dialog and scores fit criteria",
        output: "Only qualified matches auto-book a Zoom call",
        promptPreset:
          "Automated screening agent for HR or real estate leads",
      },
    ],
  },
  terminal: {
    title: "CAMIO // AI ASSISTANT",
    status: "ONLINE",
    jp: "• カミオ •",
    subtitle:
      "Ask Camio about AI Agent workflows for your niche, timelines, and pricing — and get a clear action plan.",
    placeholder: "Describe your business task or ask Camio...",
    send: "Send",
    thinking: "Camio is thinking...",
    ctaContact: "Ready to start? Leave a request to Emir ↓",
    welcome:
      "Hey! I am Camio, Emir's AI Assistant. Tell me what your business does and which routine slows your team down — I will map out the right AI Agent workflow, timeline, and budget.",
    presets: [
      "24/7 AI lead qualifier & calendar booking for services",
      "Automated PDF/Excel quote & invoice parser into ERP/CRM",
      "E-commerce customer support & sales analytics copilot",
      "Pricing, pilot timeline, and how we work together",
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
