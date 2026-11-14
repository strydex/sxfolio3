"use client";

import React from "react";
import Link from "next/link";
import CyberpunkFont from "../CyberpunkFont";
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="container flex items-center justify-between py-4">
      <div className="py-4 sm:py-0">
        <Link href="/" className="hover:opacity-100">
          <CyberpunkFont className="text-3xl font-bold text-primary">
            Emir Strydex
          </CyberpunkFont>
        </Link>
      </div>
      <div className="hidden items-center justify-end gap-6 sm:flex">
        <Link href="/">{t.nav.home}</Link>
        <Link href="/#cases">{t.nav.cases}</Link>
        <Link href="/chat">{t.nav.agent}</Link>
        <Link href="/github">{t.nav.github}</Link>
        <div className="ml-2 flex items-center border border-text_color/40 font-mono text-xs">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-2 py-1 transition ${
              lang === "en"
                ? "bg-primary font-bold text-background"
                : "text-secondary hover:text-primary"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("ru")}
            className={`px-2 py-1 transition ${
              lang === "ru"
                ? "bg-primary font-bold text-background"
                : "text-secondary hover:text-primary"
            }`}
          >
            RU
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
