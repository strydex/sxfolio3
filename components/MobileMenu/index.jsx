"use client";

import React, { useState } from "react";
import Link from "next/link";
import BlinkingText from "../BlinkingText";
import CyberpunkFont from "../CyberpunkFont";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { BsGithub, BsTelegram } from "react-icons/bs";
import { useLanguage } from "@/context/LanguageContext";

const MobileMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <>
      {menuIsOpen ? (
        <div className="fixed inset-0 z-30 h-screen w-screen bg-background">
          <button
            className="absolute right-8 top-8 text-4xl"
            onClick={() => setMenuIsOpen(false)}
          >
            <BiX />
          </button>
          <div className="flex h-1/4 flex-col items-center justify-center bg-black">
            <CyberpunkFont className="text-4xl">Emir Strydex</CyberpunkFont>
            <BlinkingText>• メニュー •</BlinkingText>
          </div>
          <nav className="flex h-2/4 flex-col items-center justify-center gap-4 text-2xl">
            <Link href="/" onClick={() => setMenuIsOpen(false)}>
              {t.nav.home}
            </Link>
            <Link href="/#cases" onClick={() => setMenuIsOpen(false)}>
              {t.nav.cases}
            </Link>
            <Link href="/chat" onClick={() => setMenuIsOpen(false)}>
              {t.nav.agent}
            </Link>
            <Link href="/github" onClick={() => setMenuIsOpen(false)}>
              {t.nav.github}
            </Link>
            <Link href="/#contact" onClick={() => setMenuIsOpen(false)}>
              {t.nav.contact}
            </Link>
            <div className="mt-2 flex items-center border border-text_color/40 font-mono text-sm">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 ${
                  lang === "en"
                    ? "bg-primary font-bold text-background"
                    : "text-secondary"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("ru")}
                className={`px-3 py-1 ${
                  lang === "ru"
                    ? "bg-primary font-bold text-background"
                    : "text-secondary"
                }`}
              >
                RU
              </button>
            </div>
          </nav>
          <div className="flex h-1/4 items-center justify-center gap-4">
            <a
              className="text-2xl hover:opacity-50"
              href="https://github.com/strydex"
              target="_blank"
            >
              <BsGithub />
            </a>
            <a
              className="text-2xl hover:opacity-50"
              href="https://t.me/strydex"
              target="_blank"
            >
              <BsTelegram />
            </a>
          </div>
        </div>
      ) : (
        <button
          className="absolute right-8 top-8 block text-4xl sm:hidden"
          onClick={() => setMenuIsOpen(true)}
        >
          <BiMenuAltRight />
        </button>
      )}
    </>
  );
};

export default MobileMenu;
