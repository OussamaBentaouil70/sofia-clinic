import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../data/en.json';
import fr from '../data/fr.json';
import es from '../data/es.json';

type Lang = 'en' | 'fr' | 'es';
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

const contentMap: Record<Lang, Content> = { en, fr, es };
const langPrefixes: Lang[] = ['fr', 'es'];

function detectLang(): Lang {
  const path = window.location.pathname;
  const match = langPrefixes.find((code) => path.startsWith(`/${code}`));
  return match ?? 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    const prefixPattern = new RegExp(`^/(${langPrefixes.join('|')})`);
    const path = window.location.pathname.replace(prefixPattern, '');
    const newPath = newLang === 'en' ? path || '/' : `/${newLang}${path}`;
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
