"use client";

import Image from "next/image";
import Link from "next/link";
import BlinkingText from "@/components/BlinkingText";
import Form from "@/components/Form";
import { BiLinkExternal } from "react-icons/bi";
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

  return (
    <main className="container">
      {/* Hero */}
      <section className="flex min-h-[85vh] flex-col justify-center py-12">
        <div className="mb-3 font-mono text-xs tracking-widest text-secondary/80 sm:text-sm">
          {t.hero.badge}
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex w-full flex-col items-start justify-center gap-5 sm:w-3/5">
            <Typewriter
              as="h1"
              className="text-4xl font-bold leading-tight text-primary sm:text-5xl"
            >
              {t.hero.title}
            </Typewriter>
            <p className="text-lg leading-relaxed text-secondary sm:text-xl">
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
                  <div className="text-2xl font-bold text-primary sm:text-3xl">
                    {m.value}
                  </div>
                  <div className="text-xs text-secondary/80">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden w-2/5 items-center justify-center sm:flex">
            <BlinkingText className="text-center text-[4rem] font-bold">
              • こんにちは •
            </BlinkingText>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mb-16 grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 sm:px-6">
        <div className="flex items-center justify-center">
          <Image
            className="w-full border-2 border-solid border-primary shadow-[5px_5px_0_0_rgba(222,254,71)] sm:w-3/4"
            src="/images/guerreiro-cyberpunk.jpg"
            alt="Emir Strydex"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
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
              <details className="w-full p-3 text-left" open>
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
              <details className="w-full p-3 text-left" open>
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
      <section className="py-10">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          {t.skills.title}
        </h2>
        <BlinkingText className="text-center">{t.skills.jp}</BlinkingText>
        <AutoPlay className="my-8 flex">
          {skills.frontend.map((skill, i) => (
            <div key={i}>
              <a
                className="flex items-center justify-center text-6xl sm:text-7xl"
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
                className="flex items-center justify-center text-6xl sm:text-7xl"
                href={skill.link}
                target="_blank"
              >
                {skill.icon}
              </a>
            </div>
          ))}
        </AutoPlay>
      </section>

      {/* B2B Cases */}
      <section id="cases" className="py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.projects.title}</h2>
          <BlinkingText>{t.projects.jp}</BlinkingText>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.projects.items.map((project) => (
            <Box
              key={project.id}
              className="flex flex-col justify-between gap-4 p-5"
            >
              <div>
                <div className="mb-2 flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-secondary/80">{project.segment}</span>
                  <span className="border border-primary/60 px-2 py-0.5 text-primary">
                    {project.metric}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary">
                  {project.name}
                </h3>
                <p className="mb-2 text-sm leading-relaxed text-secondary/90">
                  <strong className="text-accent">{t.projects.painLabel}</strong>{" "}
                  {project.pain}
                </p>
                <p className="text-sm leading-relaxed text-secondary">
                  <strong className="text-primary">
                    {t.projects.solutionLabel}
                  </strong>{" "}
                  {project.solution}
                </p>
              </div>
              <div className="border-t border-text_color/20 pt-3">
                <div className="mb-3 flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-text_color/40 px-2 py-0.5 text-text_color"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <Link href="/chat" className="text-primary hover:opacity-80">
                    &gt; {t.projects.testInTerminal}
                  </Link>
                  {project.link && (
                    <a href={project.link} target="_blank">
                      {t.projects.visitLink} <BiLinkExternal />
                    </a>
                  )}
                </div>
              </div>
            </Box>
          ))}
        </div>
      </section>

      {/* Interactive AI Terminal */}
      <section id="ai-terminal" className="py-12">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.terminal.title}</h2>
          <p className="mt-2 text-base text-secondary">{t.terminal.subtitle}</p>
        </div>
        <AgentTerminal />
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
