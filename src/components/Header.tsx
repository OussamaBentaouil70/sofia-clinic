import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { CLINIC_WHATSAPP } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import WhatsAppIcon from './WhatsAppIcon';
import { useTranslation } from '../contexts/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.treatments, href: '#treatments' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.beforeAfter, href: '#before-after' },
    { label: t.nav.specialty, href: '#specialty' },
    { label: t.nav.team, href: '#team' },
    { label: t.nav.testimonials, href: '#testimonials' },
  ];

  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
  ];

  const currentLang = languages.find(l => l.code === lang)!;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-100 shadow-md py-3 border-b border-gray-200' : 'bg-black/25 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex flex-col select-none group">
              <div className="h-[34px] sm:h-[41px] overflow-hidden">
                <img src="/src/assets/images/sofia_logo.webp" alt={t.clinic.name} className="h-10 sm:h-12 w-auto object-contain" />
              </div>
              <span
                className={`block text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase -mt-0.5 transition-colors duration-300 ${
                  scrolled ? 'text-neutral-charcoal' : 'text-white/90'
                }`}
              >
                Clinic
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 border-b-2 border-transparent hover:border-primary-blue hover:text-primary-blue py-1 ${
                    scrolled ? 'text-neutral-charcoal' : 'text-white hover:text-primary-blue-accent'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                    scrolled
                      ? 'border-gray-200 text-neutral-charcoal hover:border-primary-blue hover:text-primary-blue bg-white'
                      : 'border-white/30 text-white hover:border-white bg-white/10'
                  }`}
                  aria-label="Select language"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                  <span className="text-[8px] opacity-60">▼</span>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center space-x-2.5 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                            lang === l.code
                              ? 'bg-primary-blue/10 text-primary-blue font-bold'
                              : 'text-neutral-charcoal hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-base">{l.flag}</span>
                          <span>{l.label}</span>
                          {lang === l.code && <span className="ml-auto text-primary-blue text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WhatsApp button */}
              <a
                href={CLINIC_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{t.nav.whatsapp}</span>
              </a>
            </div>

            {/* Mobile icons */}
            <div className="flex items-center sm:hidden space-x-2">
              {/* Mobile language toggle (simple flag cycle) */}
              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className={`p-2 rounded-full text-sm font-bold border transition-all ${
                  scrolled ? 'border-gray-200 bg-white' : 'border-white/30 bg-white/10 text-white'
                }`}
                aria-label="Toggle language"
              >
                {lang === 'en' ? '🇫🇷' : '🇬🇧'}
              </button>
              <a href={CLINIC_WHATSAPP} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white p-2 rounded-full shadow">
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${scrolled ? 'text-neutral-charcoal hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-xl overflow-hidden block sm:hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-semibold text-neutral-charcoal hover:text-primary-blue py-2 border-b border-gray-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col space-y-3">
                {/* Language buttons in mobile drawer */}
                <div className="flex gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setIsOpen(false); }}
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg border text-sm font-bold transition-all cursor-pointer ${
                        lang === l.code ? 'bg-primary-blue text-white border-primary-blue' : 'border-gray-200 text-neutral-charcoal'
                      }`}
                    >
                      <span>{l.flag}</span><span>{l.label}</span>
                    </button>
                  ))}
                </div>
                <a
                  href={CLINIC_WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 rounded-xl shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>{t.nav.chatWhatsapp}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
