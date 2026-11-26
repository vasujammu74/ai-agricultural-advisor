'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { LanguageCode, getLanguage, Language } from '@/lib/languages';
import { translate, TranslationKey } from '@/lib/translations';

interface LanguageContextValue {
  lang: LanguageCode;
  language: Language;
  setLang: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'aaa-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (stored && ['en', 'te', 'hi', 'ta', 'kn'].includes(stored)) {
        setLangState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((code: LanguageCode) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((key: TranslationKey) => translate(lang, key), [lang]);

  const value: LanguageContextValue = {
    lang,
    language: getLanguage(lang),
    setLang,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
