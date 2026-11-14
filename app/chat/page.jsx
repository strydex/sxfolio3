"use client";

import React from "react";
import AgentTerminal from "@/components/AgentTerminal";
import BlinkingText from "@/components/BlinkingText";
import { useLanguage } from "@/context/LanguageContext";

const Chat = () => {
  const { t } = useLanguage();

  return (
    <main className="container flex flex-col items-center justify-center py-10">
      <h1 className="text-center text-3xl font-bold text-primary sm:text-4xl">
        {t.terminal.title}
      </h1>
      <BlinkingText className="mb-2">{t.terminal.jp}</BlinkingText>
      <p className="mb-8 max-w-2xl text-center text-secondary">
        {t.terminal.subtitle}
      </p>
      <div className="w-full max-w-4xl">
        <AgentTerminal />
      </div>
    </main>
  );
};

export default Chat;
