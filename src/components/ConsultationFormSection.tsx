/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { ConsultationSubmit } from '../types';

interface ConsultationFormSectionProps {
  onRegister: (data: ConsultationSubmit) => void;
}

export default function ConsultationFormSection({ onRegister }: ConsultationFormSectionProps) {
  const [formData, setFormData] = useState<ConsultationSubmit>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ConsultationSubmit>>({});
  const [phoneCode, setPhoneCode] = useState('+90');

  const countryCodes = [
    { code: '+90', flag: '🇹🇷' },
    { code: '+44', flag: '🇬🇧' },
    { code: '+1', flag: '🇺🇸' },
    { code: '+49', flag: '🇩🇪' },
    { code: '+33', flag: '🇫🇷' },
    { code: '+966', flag: '🇸🇦' },
    { code: '+971', flag: '🇦🇪' },
  ];

  const validate = () => {
    const tempErrors: Partial<ConsultationSubmit> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\d{6,14}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      tempErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onRegister({
        ...formData,
        phone: `${phoneCode} ${formData.phone}`,
      });
      // Reset form
      setFormData({ name: '', phone: '', email: '', message: '' });
      setErrors({});
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ConsultationSubmit]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="consultation-form" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Form Questionnaire */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block">
                No-Obligation Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">
                Get a free consultation
              </h2>
              <div className="w-16 h-1 bg-primary-blue rounded-full" />
              <p className="text-sm sm:text-base text-neutral-gray font-light leading-relaxed">
                Fill out this quick form to request your free clinical consultation. Tell us about your dental goals, preferred travel/appointment dates, and any medical history we should know. Our specialists will contact you to arrange a personalized digital smile assessment and answer all your questions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 bg-surface-warm/20 rounded-2xl p-6 sm:p-8 border border-gray-50 shadow-sm max-w-2xl">
              
              {/* Full Name */}
              <div>
                <label htmlFor="consult-name" className="block text-sm font-bold text-neutral-charcoal mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="consult-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Sarah Connor"
                  className={`w-full h-11 px-4 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10'
                  } outline-none`}
                />
                {errors.name && (
                  <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Grid: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label htmlFor="consult-phone" className="block text-sm font-bold text-neutral-charcoal mb-1.5">
                    Phone Number
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <select
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        className="h-11 px-2 pr-6 rounded-lg border border-gray-200 text-xs font-medium text-neutral-charcoal bg-gray-50 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 outline-none appearance-none cursor-pointer"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8px]">
                        ▼
                      </span>
                    </div>
                    <input
                      type="tel"
                      id="consult-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 505123456"
                      className={`flex-1 h-11 px-4 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10'
                      } outline-none`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="consult-email" className="block text-sm font-bold text-neutral-charcoal mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="consult-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. sarah@example.com"
                    className={`w-full h-11 px-4 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10'
                    } outline-none`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center text-xs text-[#D63637] font-medium">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="consult-message" className="block text-sm font-bold text-neutral-charcoal mb-1.5">
                  Treatment Details / Questions
                </label>
                <textarea
                  id="consult-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your dental concerns or questions..."
                  className="w-full p-4 rounded-lg border border-gray-200 text-sm text-neutral-charcoal bg-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 outline-none resize-none transition-all duration-200"
                />
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                className="w-full h-[45px] inline-flex items-center justify-center space-x-2 bg-accent-magenta hover:bg-accent-magenta-hover text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a consultation</span>
              </button>

            </form>
          </div>

          {/* Right Column: Circular Smiling Patient Portrait */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#FCB900]/40 animate-[spin_60s_linear_infinite]" />
              
              {/* Main Circular Profile */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl z-10 m-4">
                <img
                  src="/src/assets/images/dental_patient_1783270173837.jpg"
                  alt="Happy Patient at Soufia Clinic"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/30 via-transparent to-transparent" />
              </div>

              {/* Floating review count helper */}
              <div className="absolute bottom-6 right-6 bg-white rounded-xl p-3 shadow-2xl border border-gray-100 z-20 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-neutral-charcoal">Free Treatment Plan</span>
                  <span className="block text-[10px] text-neutral-gray font-light">With international quote</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
