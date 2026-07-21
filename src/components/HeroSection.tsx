import React, { useState } from 'react';
import { Calendar, Check, AlertCircle, Loader2 } from 'lucide-react';
import { ConsultationSubmit } from '../types';
import WhatsAppIcon from './WhatsAppIcon';
import PhoneField from './PhoneField';
import { useTranslation } from '../contexts/LanguageContext';

interface HeroSectionProps {
  onRegister: (data: ConsultationSubmit) => Promise<void>;
}

export default function HeroSection({ onRegister }: HeroSectionProps) {
  const { t } = useTranslation();
  const CLINIC_WHATSAPP = t.clinic.whatsapp;
  const [formData, setFormData] = useState<ConsultationSubmit>({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<ConsultationSubmit>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<ConsultationSubmit> = {};
    if (!formData.name.trim()) e.name = t.form.errors.nameRequired;
    if (!formData.phone.trim()) e.phone = t.form.errors.phoneRequired;
    else if (!/^\+\d{7,15}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) e.phone = t.form.errors.phoneInvalid;
    if (!formData.email.trim()) e.email = t.form.errors.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = t.form.errors.emailInvalid;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onRegister(formData);
        setFormData({ name: '', phone: '', email: '', message: '' });
        setErrors({});
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ConsultationSubmit]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData(prev => ({ ...prev, phone }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const inputCls = (err?: string) =>
    `w-full h-11 px-3.5 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 outline-none ${
      err ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
          : 'border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10'
    }`;

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/background_image.webp" alt="Soufia Clinic"
          referrerPolicy="no-referrer" className="w-full h-full object-cover object-center transform scale-105 filter brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-charcoal/60 via-neutral-charcoal/45 to-black/55" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Hero text */}
          <div className="lg:col-span-7 text-white space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a href={CLINIC_WHATSAPP} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                <WhatsAppIcon className="w-5 h-5" />
                <span>{t.hero.whatsappLabel}</span>
              </a>
              <a href="#services"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200">
                <span>{t.services.sectionLabel}</span>
              </a>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
              {t.about.stats.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <span className="block text-2xl font-bold text-[#FCB900]">{s.value}</span>
                  <span className="text-xs text-gray-300">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 max-w-md mx-auto">
              <div className="text-center mb-6">
                <span className="inline-block bg-[#B11E76]/10 text-accent-magenta text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  {t.consultation.sectionLabel}
                </span>
                <h3 className="text-2xl font-extrabold text-neutral-charcoal">{t.consultation.title}</h3>
                <p className="text-sm text-neutral-gray mt-1 font-light">{t.consultation.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-charcoal mb-1">{t.form.name}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                    placeholder={t.form.namePlaceholder} className={inputCls(errors.name)} />
                  {errors.name && <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-charcoal mb-1">{t.form.phone}</label>
                  <PhoneField value={formData.phone} onChange={handlePhoneChange}
                    placeholder={t.form.phonePlaceholder} hasError={!!errors.phone} />
                  {errors.phone && <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-charcoal mb-1">{t.form.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    placeholder={t.form.emailPlaceholder} className={inputCls(errors.email)} />
                  {errors.email && <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-charcoal mb-1">{t.form.message}</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={2}
                    className="w-full p-3 rounded-lg border border-gray-200 text-sm text-neutral-charcoal bg-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 outline-none resize-none transition-all duration-200" />
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full h-[45px] mt-2 inline-flex items-center justify-center space-x-2 bg-accent-magenta hover:bg-accent-magenta-hover disabled:opacity-70 disabled:cursor-not-allowed text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.98] cursor-pointer">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
                  <span>{isSubmitting ? t.form.sending : t.form.submit}</span>
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-neutral-gray font-light">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{t.form.secure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
