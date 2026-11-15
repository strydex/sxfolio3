"use client";

import React from "react";
import CyberpunkFont from "../CyberpunkFont";
import { BsGithub, BsTelegram } from "react-icons/bs";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-black">
      <footer className="container flex flex-col items-center justify-between gap-6 py-12 sm:flex-row sm:py-14">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap">
          <span className="hidden whitespace-nowrap sm:inline">
            &copy; {new Date().getFullYear()}
          </span>
          <CyberpunkFont className="whitespace-nowrap text-3xl font-bold">
            Emir Strydex
          </CyberpunkFont>
          <span className="hidden whitespace-nowrap text-sm text-secondary/80 sm:inline">
            {t.footer.rights}
          </span>
        </div>
        <div className="flex items-center justify-center gap-5">
          <a
            className="cursor-pointer text-2xl hover:opacity-50"
            href="https://github.com/strydex/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub />
          </a>
          <a
            className="cursor-pointer text-2xl hover:opacity-50"
            href="https://t.me/strydex/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTelegram />
          </a>
        </div>
        <div className="block text-center text-sm sm:hidden">
          <span>
            {new Date().getFullYear()} &copy; {t.footer.rights}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
