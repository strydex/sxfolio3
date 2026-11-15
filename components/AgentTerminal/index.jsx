"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Box from "@/components/Box";
import Button from "@/components/Button";

function renderFormattedLine(line, lineIdx) {
  const cleaned = line.replace(/^\s*\*\s+/, "• ");
  const parts = cleaned.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <React.Fragment key={lineIdx}>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-bold text-primary">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={idx}
              className="border border-text_color/30 bg-background px-1.5 py-0.5 text-primary"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </React.Fragment>
  );
}

function FormattedMessage({ content }) {
  const lines = String(content || "").split("\n");
  return (
    <div className="whitespace-pre-wrap leading-relaxed">
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {renderFormattedLine(line, i)}
          {i < lines.length - 1 ? "\n" : null}
        </React.Fragment>
      ))}
    </div>
  );
}

const AgentTerminal = ({ initialPrompt = "", onJumpToContact }) => {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([
    { role: "assistant", content: t.terminal.welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollBoxRef = useRef(null);
  const lastInitialRef = useRef("");

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: t.terminal.welcome }];
      }
      return prev;
    });
  }, [lang, t.terminal.welcome]);

  useEffect(() => {
    if (messages.length > 1 && scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    if (!textOverride) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });
      const data = await res.json();
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            (lang === "ru"
              ? "Нет ответа. Напишите Эмиру напрямую в Telegram: @strydex."
              : "No response received. Message Emir on Telegram: @strydex."),
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            lang === "ru"
              ? "Сбой соединения. Напишите Эмиру напрямую в Telegram: @strydex."
              : "Connection interrupted. Reach Emir directly on Telegram: @strydex.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialPrompt && initialPrompt !== lastInitialRef.current) {
      lastInitialRef.current = initialPrompt;
      sendMessage(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <Box className="w-full p-4 sm:p-6">
      {/* Camio Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-text_color/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-primary shadow-[0_0_12px_rgba(222,254,71,0.4)]">
            <img
              src="/images/camio-avatar.png"
              alt="Camio AI"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-primary">
              <span>{t.terminal.title}</span>
              <span className="inline-flex items-center gap-1 border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[10px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></span>
                {t.terminal.status}
              </span>
            </div>
            <div className="font-mono text-xs text-secondary/70">
              {t.terminal.jp}
            </div>
          </div>
        </div>
        <a
          href="#contact"
          onClick={(e) => {
            if (onJumpToContact) {
              e.preventDefault();
              onJumpToContact();
            }
          }}
          className="border border-primary/50 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary transition hover:bg-primary hover:text-background"
        >
          {t.terminal.ctaContact}
        </a>
      </div>

      {/* Preset chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {t.terminal.presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => sendMessage(preset)}
            className="border border-text_color/40 bg-background/80 px-3 py-1.5 text-left font-mono text-xs text-secondary transition hover:border-primary hover:text-primary"
          >
            &gt; {preset}
          </button>
        ))}
      </div>

      {/* Messages inside self-contained scrollable box */}
      <div
        ref={scrollBoxRef}
        className="mb-4 flex h-80 flex-col gap-4 overflow-y-auto border border-text_color/20 bg-black/50 p-4 font-mono text-sm sm:h-96"
      >
        {messages.map((msg, idx) =>
          msg.role === "user" ? (
            <div
              key={idx}
              className="max-w-[85%] self-end border-r-2 border-primary pr-3 text-right text-primary"
            >
              <div className="mb-1 text-[11px] uppercase opacity-60">
                {lang === "ru" ? "ВЫ" : "YOU"}
              </div>
              <FormattedMessage content={msg.content} />
            </div>
          ) : (
            <div
              key={idx}
              className="flex max-w-[92%] items-start gap-3 self-start"
            >
              <img
                src="/images/camio-avatar.png"
                alt="Camio"
                className="mt-1 h-8 w-8 shrink-0 rounded-full border border-primary/60 object-cover"
              />
              <div className="border-l-2 border-text_color pl-3 text-secondary">
                <div className="mb-1 text-[11px] font-bold uppercase text-primary/80">
                  {lang === "ru" ? "КАМИО" : "CAMIO"}
                </div>
                <FormattedMessage content={msg.content} />
              </div>
            </div>
          ),
        )}
        {loading && (
          <div className="flex items-center gap-3 self-start">
            <img
              src="/images/camio-avatar.png"
              alt="Camio"
              className="h-8 w-8 shrink-0 animate-pulse rounded-full border border-primary/60 object-cover"
            />
            <div className="pl-1 text-xs text-primary animate-pulse">
              {t.terminal.thinking}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.terminal.placeholder}
          className="flex-1 border border-text_color/50 bg-black/70 px-4 py-2.5 font-mono text-sm text-secondary outline-none focus:border-primary"
        />
        <Button type="submit" disabled={loading}>
          {loading ? t.terminal.thinking : t.terminal.send}
        </Button>
      </form>
    </Box>
  );
};

export default AgentTerminal;
