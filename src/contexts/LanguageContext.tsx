import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../data/en.json';
import fr from '../data/fr.json';

type Lang = 'en' | 'fr';
type Content = typeof en;

interface LanguageContextValue {
  lang: Lang;
  t: Content;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  t: en,
  setLang: () => {},
});

const contentMap: Record<Lang, Content> = { en, fr };

function detectLang(): Lang {
  const path = window.location.pathname;
  if (path.startsWith('/fr')) return 'fr';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    const path = window.location.pathname.replace(/^\/(en|fr)/, '');
    const newPath = newLang === 'en' ? path || '/' : `/fr${path}`;
    window.history.pushState({}, '', newPath);
  };

  useEffect(() => {
    const handlePop = () => setLangState(detectLang());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: contentMap[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
