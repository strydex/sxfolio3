"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/data/locales/en";
import ru from "@/data/locales/ru";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: en,
});

const dictionaries = { en, ru };

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sx_lang");
      if (saved === "ru" || saved === "en") {
        setLangState(saved);
      }
    } catch {}
  }, []);

  const setLang = (nextLang) => {
    setLangState(nextLang);
    try {
      localStorage.setItem("sx_lang", nextLang);
      document.documentElement.lang = nextLang;
    } catch {}
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: dictionaries[lang] || en }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
