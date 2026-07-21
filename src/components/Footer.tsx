import React, { useState } from 'react';
import { Send, Phone, Mail, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import PhoneField from './PhoneField';
import { useTranslation } from '../contexts/LanguageContext';

interface FooterProps {
  onRegister: (data: { name: string; phone: string; message: string; email: string }) => Promise<void>;
}

export default function Footer({ onRegister }: FooterProps) {
  const { t } = useTranslation();
  const CLINIC_PHONE = t.clinic.phone;
  const CLINIC_WHATSAPP = t.clinic.whatsapp;
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = t.form.errors.nameRequired;
    if (!formData.phone.trim()) e.phone = t.form.errors.phoneRequired;
    else if (!/^\+\d{7,15}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) e.phone = t.form.errors.phoneInvalid;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onRegister({ name: formData.name, phone: formData.phone, message: formData.message, email: 'quick-contact@soufia-clinic.com' });
        setFormData({ name: '', phone: '', message: '' });
        setErrors({});
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData(prev => ({ ...prev, phone }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  return (
    <footer className="bg-neutral-charcoal text-white pt-16 pb-8 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="flex flex-col select-none">
              <img src="/images/sofia_logo.webp" alt={t.clinic.name} className="h-12 w-auto object-contain" />
              <span className="text-[10px] text-gray-400 mt-1 font-light tracking-wide">{t.clinic.tagline}</span>
            </a>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">{t.footer.description}</p>
            <div className="space-y-2 pt-2 text-xs sm:text-sm text-gray-300 font-light">
              <a href={`tel:${CLINIC_PHONE.replace(/\s+/g, '')}`} className="flex items-center space-x-2 hover:text-primary-blue-accent transition-colors">
                <Phone className="w-4 h-4 text-accent-magenta" /><span>{CLINIC_PHONE}</span>
              </a>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent-magenta" /><span>{t.clinic.email}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-4">
            <h4 className="text-base font-bold tracking-wider uppercase text-white border-b border-white/10 pb-2">{t.footer.usefulLinks}</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400 font-light">
              {t.footer.links.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="flex items-center hover:text-primary-blue-accent transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-accent-magenta" /><span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold tracking-wider uppercase text-white border-b border-white/10 pb-2">{t.footer.contactUs}</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  placeholder={t.form.yourName}
                  className={`w-full h-10 px-3 rounded-lg border text-xs text-white bg-white/5 placeholder-gray-500 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-primary-blue'}`} />
                {errors.name && <p className="mt-1 flex items-center text-xs text-red-400"><AlertCircle className="w-3 h-3 mr-1" />{errors.name}</p>}
              </div>
              <PhoneField value={formData.phone} onChange={handlePhoneChange}
                placeholder={t.form.phone} hasError={!!errors.phone} dark height={40} />
              {errors.phone && <p className="flex items-center text-xs text-red-400"><AlertCircle className="w-3 h-3 mr-1" />{errors.phone}</p>}
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows={2}
                placeholder={t.form.yourMessage}
                className="w-full p-3 rounded-lg border border-white/10 text-xs text-white bg-white/5 placeholder-gray-500 outline-none focus:border-primary-blue resize-none transition-all" />
              <button type="submit" disabled={isSubmitting}
                className="w-full h-10 bg-accent-magenta hover:bg-accent-magenta-hover disabled:opacity-70 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer">
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{isSubmitting ? t.form.sending : t.form.contactSubmit}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-xs text-gray-500 font-light">
        <div>{t.footer.copyright}</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400 transition-colors">{t.footer.privacy}</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-400 transition-colors">{t.footer.terms}</a>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a href={CLINIC_WHATSAPP} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba59] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp">
        <WhatsAppIcon className="w-7 h-7" />
        <span className="absolute right-16 bg-white text-neutral-charcoal font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {t.footer.chatTooltip}
        </span>
      </a>
    </footer>
  );
}
