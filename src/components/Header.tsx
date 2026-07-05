/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CLINIC_PHONE, CLINIC_WHATSAPP } from '../data';
import WhatsAppIcon from './WhatsAppIcon';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Before & After', href: '#before-after' },
    { label: 'Our Specialty', href: '#specialty' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-3 border-b border-gray-100'
            : 'bg-black/25 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <a href="#" className="flex flex-col select-none group">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-accent-magenta italic font-sans">
                  Soufia
                </span>
                <span className="text-xs font-bold tracking-[0.25em] text-[#FCB900] uppercase font-sans">
                  Clinic
                </span>
              </div>
              <span className="text-[9px] text-gray-400 -mt-1 font-light tracking-wide group-hover:text-primary-blue transition-colors">
                Dental Care & Aesthetics
              </span>
            </a>

            {/* Desktop Nav Links */}
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

            {/* Header Actions */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href={`tel:${CLINIC_PHONE.replace(/\s+/g, '')}`}
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors ${
                  scrolled ? 'text-primary-blue hover:text-primary-blue-hover' : 'text-white hover:text-primary-blue-accent'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{CLINIC_PHONE}</span>
              </a>

              {/* Whatsapp Button */}
              <a
                href={CLINIC_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Whatsapp</span>
              </a>
            </div>

            {/* Mobile Hamburger Menu Icon */}
            <div className="flex items-center sm:hidden space-x-2">
              <a
                href={CLINIC_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white p-2 rounded-full shadow"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${
                  scrolled ? 'text-neutral-charcoal hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
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
                <a
                  href={`tel:${CLINIC_PHONE.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-2 text-sm font-semibold text-primary-blue"
                >
                  <Phone className="w-4 h-4" />
                  <span>{CLINIC_PHONE}</span>
                </a>
                <a
                  href={CLINIC_WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 rounded-xl shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
