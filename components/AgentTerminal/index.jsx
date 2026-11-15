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
      {lineIdx !== undefined ? "\n" : null}
    </React.Fragment>
  );
}

function FormattedMessage({ content }) {
  const lines = String(content || "").split("\n");
  return (
    <div className="whitespace-pre-wrap leading-relaxed">
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {renderFormattedLine(line)}
          {i < lines.length - 1 ? "\n" : null}
        </React.Fragment>
      ))}
    </div>
  );
}

const AgentTerminal = ({ initialPrompt = "" }) => {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([
    { role: "assistant", content: t.terminal.welcome },
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const scrollBoxRef = useRef(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: t.terminal.welcome }];
      }
      return prev;
    });
  }, [lang, t.terminal.welcome]);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <Box className="w-full p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-text_color/30 pb-3">
        <div className="flex items-center gap-2 font-mono text-sm text-primary">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-primary"></span>
          <span>{t.terminal.title}</span>
        </div>
        <span className="font-mono text-xs text-secondary/70">
          {t.terminal.jp}
        </span>
      </div>

      {/* Preset chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {t.terminal.presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => sendMessage(preset)}
            className="border border-text_color/40 bg-background/80 px-3 py-1.5 font-mono text-xs text-secondary transition hover:border-primary hover:text-primary"
          >
            &gt; {preset}
          </button>
        ))}
      </div>

      {/* Messages inside self-contained scrollable box */}
      <div
        ref={scrollBoxRef}
        className="mb-4 flex h-80 flex-col gap-3 overflow-y-auto border border-text_color/20 bg-black/50 p-4 font-mono text-sm"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[90%] ${
              msg.role === "user"
                ? "self-end border-r-2 border-primary pr-3 text-right text-primary"
                : "self-start border-l-2 border-text_color pl-3 text-secondary"
            }`}
          >
            <div className="mb-1 text-[11px] uppercase opacity-60">
              {msg.role === "user"
                ? lang === "ru"
                  ? "КЛИЕНТ"
                  : "CLIENT"
                : lang === "ru"
                  ? "AI-АССИСТЕНТ"
                  : "AI_ASSISTANT"}
            </div>
            <FormattedMessage content={msg.content} />
          </div>
        ))}
        {loading && (
          <div className="self-start pl-3 text-xs text-primary animate-pulse">
            {t.terminal.thinking}
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
