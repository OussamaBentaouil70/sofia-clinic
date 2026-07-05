/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CLINIC_NAME, CLINIC_PHONE, CLINIC_WHATSAPP } from '../data';
import { Send, Phone, MapPin, Mail, ChevronRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface FooterProps {
  onRegister: (data: { name: string; phone: string; message: string; email: string }) => void;
}

export default function Footer({ onRegister }: FooterProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [phoneCode, setPhoneCode] = useState('+90');

  const countryCodes = [
    { code: '+90', flag: '🇹🇷' },
    { code: '+44', flag: '🇬🇧' },
    { code: '+1', flag: '🇺🇸' },
  ];

  const validate = () => {
    const tempErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone is required';
    } else if (!/^\d{6,14}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      tempErrors.phone = 'Invalid phone';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onRegister({
        name: formData.name,
        phone: `${phoneCode} ${formData.phone}`,
        message: formData.message,
        email: 'quick-contact@soufia-clinic.com',
      });
      setFormData({ name: '', phone: '', message: '' });
      setErrors({});
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <footer className="bg-neutral-charcoal text-white pt-16 pb-8 relative z-30">
      
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="flex flex-col select-none">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold tracking-tight text-accent-magenta italic font-sans">
                  Soufia
                </span>
                <span className="text-sm font-bold tracking-[0.25em] text-[#FCB900] uppercase font-sans">
                  Clinic
                </span>
              </div>
              <span className="text-[10px] text-gray-400 -mt-1 font-light tracking-wide">
                Dental Care & Aesthetics
              </span>
            </a>

            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Soufia Clinic delivers state-of-the-art dental implants, smile makeovers, and orthodontic treatments with highly accredited cosmetic surgeons in Istanbul, Turkey. We combine premium comfort with flawless clinical results.
            </p>

            {/* Quick Contact Icons */}
            <div className="space-y-2 pt-2 text-xs sm:text-sm text-gray-300 font-light">
              <a href={`tel:${CLINIC_PHONE.replace(/\s+/g, '')}`} className="flex items-center space-x-2 hover:text-primary-blue-accent transition-colors">
                <Phone className="w-4 h-4 text-accent-magenta" />
                <span>{CLINIC_PHONE}</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-accent-magenta" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent-magenta" />
                <span>info@soufia-clinic.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-4">
            <h4 className="text-base font-bold tracking-wider uppercase text-white border-b border-white/10 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-light">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Before & After', href: '#before-after' },
                { label: 'Our Specialty', href: '#specialty' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Free Consultation', href: '#consultation-form' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center hover:text-primary-blue-accent transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-accent-magenta" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us Form */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold tracking-wider uppercase text-white border-b border-white/10 pb-2">
              Contact Us
            </h4>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className={`w-full h-10 px-3 rounded-lg border text-xs text-white bg-white/5 placeholder-gray-500 outline-none transition-all ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary-blue'
                  }`}
                />
              </div>

              {/* Phone */}
              <div className="flex space-x-2">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="h-10 px-1.5 rounded-lg border border-white/10 text-xs text-white bg-white/5 outline-none cursor-pointer"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code} className="bg-neutral-charcoal text-white">
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className={`flex-1 h-10 px-3 rounded-lg border text-xs text-white bg-white/5 placeholder-gray-500 outline-none transition-all ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary-blue'
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Your Message"
                  className="w-full p-3 rounded-lg border border-white/10 text-xs text-white bg-white/5 placeholder-gray-500 outline-none focus:border-primary-blue resize-none transition-all"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full h-10 bg-accent-magenta hover:bg-accent-magenta-hover text-white text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact us</span>
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Lower Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-xs text-gray-500 font-light">
        <div>
          © 2026. Soufia clinic. All Rights Reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Floating Sticky Whatsapp Launcher */}
      <a
        href={CLINIC_WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba59] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
        {/* Hover tool tip */}
        <span className="absolute right-16 bg-white text-neutral-charcoal font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat with us!
        </span>
      </a>

    </footer>
  );
}
