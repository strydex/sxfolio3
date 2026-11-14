"use client";

import React from "react";
import CyberpunkFont from "../CyberpunkFont";
import { BsGithub, BsTelegram } from "react-icons/bs";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-black">
      <footer className="container grid grid-cols-1 py-12 sm:grid-cols-2 sm:py-16">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden sm:block">
            &copy; {new Date().getFullYear()}
          </span>
          <CyberpunkFont className="text-3xl font-bold">
            Emir Strydex
          </CyberpunkFont>
          <span className="hidden sm:block">{t.footer.rights}</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 sm:mt-0">
          <a
            className="cursor-pointer text-2xl hover:opacity-50"
            href="https://github.com/strydex/"
            target="_blank"
          >
            <BsGithub />
          </a>
          <a
            className="cursor-pointer text-2xl hover:opacity-50"
            href="https://t.me/strydex/"
            target="_blank"
          >
            <BsTelegram />
          </a>
        </div>
        <div className="mt-8 block text-center sm:hidden">
          <span>
            {new Date().getFullYear()} &copy; {t.footer.rights}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
