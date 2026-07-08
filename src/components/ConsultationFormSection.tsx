import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ConsultationSubmit } from '../types';
import PhoneField from './PhoneField';
import { useTranslation } from '../contexts/LanguageContext';

interface ConsultationFormSectionProps {
  onRegister: (data: ConsultationSubmit) => Promise<void>;
}

export default function ConsultationFormSection({ onRegister }: ConsultationFormSectionProps) {
  const { t } = useTranslation();
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
    `w-full h-11 px-4 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 outline-none ${
      err ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
          : 'border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10'
    }`;

  return (
    <section id="consultation-form" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block">{t.consultation.sectionLabel}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">{t.consultation.title}</h2>
              <div className="w-16 h-1 bg-primary-blue rounded-full" />
              <p className="text-sm sm:text-base text-neutral-gray font-light leading-relaxed">{t.consultation.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 bg-surface-warm/20 rounded-2xl p-6 sm:p-8 border border-gray-50 shadow-sm max-w-2xl">
              <div>
                <label className="block text-sm font-bold text-neutral-charcoal mb-1.5">{t.form.name}</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  placeholder={t.form.namePlaceholder} className={inputCls(errors.name)} />
                {errors.name && <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-neutral-charcoal mb-1.5">{t.form.phone}</label>
                  <PhoneField value={formData.phone} onChange={handlePhoneChange}
                    placeholder={t.form.phonePlaceholder} hasError={!!errors.phone} />
                  {errors.phone && <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-charcoal mb-1.5">{t.form.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    placeholder={t.form.emailPlaceholder} className={inputCls(errors.email)} />
                  {errors.email && <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-charcoal mb-1.5">{t.form.message}</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4}
                  className="w-full p-4 rounded-lg border border-gray-200 text-sm text-neutral-charcoal bg-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 outline-none resize-none transition-all duration-200" />
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full h-[45px] inline-flex items-center justify-center space-x-2 bg-accent-magenta hover:bg-accent-magenta-hover disabled:opacity-70 disabled:cursor-not-allowed text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.98] cursor-pointer">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
                <span>{isSubmitting ? t.form.sending : t.form.submit}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#FCB900]/40 animate-[spin_60s_linear_infinite]" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl z-10 m-4">
                <img src="/images/dental_patient_1783270173837.jpg" alt="Happy Patient at Soufia Clinic"
                  referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/30 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 right-6 bg-white rounded-xl p-3 shadow-2xl border border-gray-100 z-20 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-charcoal">{t.consultation.badge}</span>
                  <span className="block text-[10px] text-neutral-gray font-light">{t.clinic.tagline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
