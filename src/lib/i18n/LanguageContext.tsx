"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Locale, type TranslationKey } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Load saved language preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("kalappura-lang") as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.slice(0, 2) as Locale;
      if (translations[browserLang]) {
        setLocaleState(browserLang);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("kalappura-lang", newLocale);
    // Update html lang attribute
    document.documentElement.lang = newLocale;
  };

  const t = (key: TranslationKey): string => {
    const dict = translations[locale];
    return (dict as Record<string, string>)[key] || (translations.en as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { t, locale } = useContext(LanguageContext);
  return { t, locale };
}
