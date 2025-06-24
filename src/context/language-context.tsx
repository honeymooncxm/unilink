"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { en } from '@/locales/en';
import { ru } from '@/locales/ru';
import { uz } from '@/locales/uz';

type Language = 'en' | 'ru' | 'uz';

const translations: Record<Language, any> = { en, ru, uz };

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && translations[storedLang]) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string): string => {
    const result = translations[language]?.[key];
    if (result !== undefined) {
      return result;
    }

    const fallbackResult = translations.en?.[key];
    if (fallbackResult !== undefined) {
      return fallbackResult;
    }

    return key;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
