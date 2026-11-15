"use client";

import React, { useState } from "react";
import Image from "next/image";
import BlinkingText from "@/components/BlinkingText";
import Form from "@/components/Form";
import { BiLinkExternal, BiX } from "react-icons/bi";
import Typewriter from "@/components/ArwesComponents/Typewriter";
import Sequence from "@/components/ArwesComponents/Sequence";
import Button from "@/components/Button";
import Box from "@/components/Box";
import skills from "@/data/skills";
import AutoPlay from "@/components/SlickComponents/AutoPlay";
import AgentTerminal from "@/components/AgentTerminal";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [selectedCase, setSelectedCase] = useState(null);
  const [terminalPreset, setTerminalPreset] = useState("");

  const handleTestInTerminal = (prompt) => {
    setSelectedCase(null);
    setTerminalPreset(prompt);
    const el = document.getElementById("ai-terminal");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="container">
      {/* Hero */}
      <section className="flex min-h-[85vh] text-xl sm:text-2xl">
        <div className="flex w-full flex-col items-start justify-center gap-4 sm:w-1/2">
          <span className="font-mono text-xs tracking-widest text-secondary/80 sm:text-sm">
            {t.hero.badge}
          </span>
          <Typewriter
            as="h1"
            className="text-4xl font-bold leading-tight text-primary sm:text-5xl"
          >
            {t.hero.title}
          </Typewriter>
          <BlinkingText className="text-base sm:hidden">
            • こんにちは •
          </BlinkingText>
          <p className="text-base leading-relaxed text-secondary sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#ai-terminal" className="hover:opacity-100">
              <Button>{t.hero.ctaPrimary}</Button>
            </a>
            <a href="#contact" className="hover:opacity-100">
              <Button>{t.hero.ctaSecondary}</Button>
            </a>
          </div>
          <div className="mt-4 grid w-full grid-cols-3 gap-4 border-t border-text_color/30 pt-4 font-mono">
            {t.hero.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-xl font-bold text-primary sm:text-2xl">
                  {m.value}
                </div>
                <div className="text-xs text-secondary/80">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden w-1/2 items-center justify-center sm:flex">
          <BlinkingText className="whitespace-nowrap text-[3.2rem] font-bold lg:text-[4.5rem]">
            • こんにちは •
          </BlinkingText>
        </div>
      </section>

      {/* About */}
      <section className="mb-12 grid grid-cols-1 gap-8 py-8 text-xl sm:grid-cols-2 sm:px-6">
        <div className="flex items-center justify-center">
          <Image
            className="w-full border-2 border-solid border-primary shadow-[5px_5px_0_0_rgba(225,225,0)] sm:w-2/3"
            src="/images/guerreiro-cyberpunk.jpg"
            alt="Emir Strydex"
            width={500}
            height={500}
          />
        </div>
        <div className="mt-6 flex flex-col items-start justify-center">
          <Typewriter as="h2" className="text-3xl font-bold text-primary sm:text-4xl">
            {t.about.title}
          </Typewriter>
          <BlinkingText className="pb-4 text-lg">{t.about.jp}</BlinkingText>
          <Sequence>
            <p className="pb-3 text-lg leading-relaxed text-secondary">
              {t.about.p1}
            </p>
            <p className="text-lg leading-relaxed text-secondary">
              {t.about.p2}
            </p>
          </Sequence>
          <div className="mt-6">
            <a href="#contact" className="hover:opacity-100">
              <Button>{t.about.cta}</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities & Experience */}
      <section className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-start">
          <h2 className="mb-4 text-center text-3xl font-bold">
            {t.capabilities.leftTitle}
          </h2>
          {t.capabilities.leftItems.map((item) => (
            <Box key={item.summary} className="my-2 w-full">
              <details className="w-full p-3 text-left">
                <summary className="cursor-pointer font-bold text-primary">
                  {item.summary}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {item.content}
                </p>
              </details>
            </Box>
          ))}
        </div>
        <div className="flex flex-col items-center justify-start">
          <h2 className="mb-4 text-center text-3xl font-bold">
            {t.capabilities.rightTitle}
          </h2>
          {t.capabilities.rightItems.map((item) => (
            <Box key={item.summary} className="my-2 w-full">
              <details className="w-full p-3 text-left">
                <summary className="cursor-pointer font-bold text-primary">
                  {item.summary}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {item.content}
                </p>
              </details>
            </Box>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-12">
        <h2 className="text-center text-4xl font-bold">{t.skills.title}</h2>
        <BlinkingText className="text-center">{t.skills.jp}</BlinkingText>
        <AutoPlay className="my-8 flex">
          {skills.frontend.map((skill, i) => (
            <div key={i}>
              <a
                className="flex items-center justify-center text-7xl"
                href={skill.link}
                target="_blank"
              >
                {skill.icon}
              </a>
            </div>
          ))}
        </AutoPlay>
        <AutoPlay className="my-8 flex" rtl>
          {skills.backend.map((skill, i) => (
            <div key={i}>
              <a
                className="flex items-center justify-center text-7xl"
                href={skill.link}
                target="_blank"
              >
                {skill.icon}
              </a>
            </div>
          ))}
        </AutoPlay>
      </section>

      {/* Projects / Case Studies */}
      <section id="cases" className="py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold">{t.projects.title}</h2>
          <BlinkingText>{t.projects.jp}</BlinkingText>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((project) => (
            <Box
              key={project.id}
              className="flex flex-col justify-between p-3"
            >
              <div>
                <div
                  onClick={() => setSelectedCase(project)}
                  className="mb-3 cursor-pointer overflow-hidden border border-text_color/30 bg-black"
                >
                  <img
                    alt={project.name}
                    src={project.image}
                    className="h-44 w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="mb-2 flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-secondary/80">{project.segment}</span>
                  <span className="border border-primary/60 px-2 py-0.5 text-primary">
                    {project.metric}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-primary">
                  {project.name}
                </h3>
                <p className="mb-2 text-xs leading-relaxed text-secondary/90">
                  <strong className="text-accent">{t.projects.painLabel}</strong>{" "}
                  {project.pain}
                </p>
                <p className="text-xs leading-relaxed text-secondary">
                  <strong className="text-primary">
                    {t.projects.solutionLabel}
                  </strong>{" "}
                  {project.solution}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-text_color/20 pt-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCase(project)}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  &gt; {t.projects.viewFlow}
                </button>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-accent"
                  >
                    {t.projects.visitLink} <BiLinkExternal />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleTestInTerminal(project.promptPreset)}
                    className="text-text_color underline-offset-4 hover:underline"
                  >
                    {t.projects.testInTerminal}
                  </button>
                )}
              </div>
            </Box>
          ))}
        </div>
      </section>

      {/* Case Workflow Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="w-full max-w-2xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <Box className="p-6">
              <div className="mb-4 flex items-start justify-between gap-4 border-b border-text_color/30 pb-3">
                <div>
                  <div className="font-mono text-xs text-secondary/80">
                    {selectedCase.segment} • {selectedCase.metric}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-primary">
                    {selectedCase.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="text-3xl text-accent hover:opacity-70"
                >
                  <BiX />
                </button>
              </div>
              <div className="mb-4 overflow-hidden border border-text_color/30 bg-black">
                <img
                  src={selectedCase.image}
                  alt={selectedCase.name}
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="mb-4 font-mono text-sm">
                <div className="mb-2 font-bold text-primary">
                  {t.projects.howItWorks}:
                </div>
                <ol className="space-y-2 text-secondary">
                  {selectedCase.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-primary">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                {selectedCase.link && (
                  <a
                    href={selectedCase.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100"
                  >
                    <Button>
                      {t.projects.visitLink} <BiLinkExternal />
                    </Button>
                  </a>
                )}
                <Button
                  type="button"
                  onClick={() => handleTestInTerminal(selectedCase.promptPreset)}
                >
                  {t.projects.testInTerminal}
                </Button>
              </div>
            </Box>
          </div>
        </div>
      )}

      {/* Interactive AI Terminal */}
      <section id="ai-terminal" className="py-12">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold">{t.terminal.title}</h2>
          <p className="mt-2 text-base text-secondary">{t.terminal.subtitle}</p>
        </div>
        <AgentTerminal initialPrompt={terminalPreset} />
      </section>

      {/* Contact */}
      <section id="contact" className="flex flex-col items-center py-12">
        <h2 className="text-3xl font-bold">{t.contact.title}</h2>
        <BlinkingText>{t.contact.jp}</BlinkingText>
        <div className="mt-4 w-full max-w-2xl">
          <Form />
        </div>
      </section>
    </main>
  );
}
