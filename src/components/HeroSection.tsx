/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HERO_CONTENT, CLINIC_WHATSAPP } from '../data';
import { Calendar, PhoneCall, Check, AlertCircle } from 'lucide-react';
import { ConsultationSubmit } from '../types';

interface HeroSectionProps {
  onRegister: (data: ConsultationSubmit) => void;
}

export default function HeroSection({ onRegister }: HeroSectionProps) {
  const [formData, setFormData] = useState<ConsultationSubmit>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ConsultationSubmit>>({});
  const [phoneCode, setPhoneCode] = useState('+90');

  const countryCodes = [
    { code: '+90', flag: '🇹🇷', label: 'Turkey' },
    { code: '+44', flag: '🇬🇧', label: 'UK' },
    { code: '+1', flag: '🇺🇸', label: 'USA' },
    { code: '+49', flag: '🇩🇪', label: 'Germany' },
    { code: '+33', flag: '🇫🇷', label: 'France' },
    { code: '+966', flag: '🇸🇦', label: 'KSA' },
    { code: '+971', flag: '🇦🇪', label: 'UAE' },
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
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/dental_hero_bg_1783270138708.jpg"
          alt="Soufia Clinic Dental Lobby"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-charcoal/80 via-neutral-charcoal/65 to-black/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Title & Description */}
          <div className="lg:col-span-7 text-white space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary-blue/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary-blue-accent/30">
              <span className="w-2 h-2 rounded-full bg-[#FCB900] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                {HERO_CONTENT.subtitle}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {HERO_CONTENT.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl">
              {HERO_CONTENT.description}
            </p>

            {/* Social Proof/Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href={CLINIC_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.852-4.382 9.855-9.742.002-2.596-1.006-5.037-2.839-6.871C16.452 2.158 14.025 1.151 11.43 1.151c-5.441 0-9.856 4.384-9.86 9.744-.002 2.078.543 4.103 1.582 5.857L2.14 20.783l4.507-1.629zm11.233-5.334c-.312-.156-1.848-.91-2.128-1.012-.28-.102-.484-.153-.688.153-.204.307-.791.995-.97 1.2-.178.205-.357.23-.669.074-1.25-.625-2.071-1.11-2.888-2.51-.213-.367.213-.34.609-1.127.097-.196.048-.367-.024-.521-.071-.154-.688-1.66-.943-2.272-.248-.597-.501-.515-.688-.524l-.587-.01c-.204 0-.536.077-.816.383-.28.307-1.071 1.047-1.071 2.556s1.097 2.966 1.25 3.17c.153.204 2.16 3.299 5.23 4.625.73.315 1.3.503 1.745.644.733.233 1.4.2 1.928.121.588-.087 1.848-.756 2.11-1.45.263-.694.263-1.29.184-1.417-.079-.127-.293-.204-.606-.36z" />
                </svg>
                <span>{HERO_CONTENT.whatsappLabel}</span>
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200"
              >
                <span>Explore Packages</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
              <div>
                <span className="block text-2xl font-bold text-[#FCB900]">100%</span>
                <span className="text-xs text-gray-300">Painless Care</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#FCB900]">5-Star</span>
                <span className="text-xs text-gray-300">Hospital Facility</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#FCB900]">12k+</span>
                <span className="text-xs text-gray-300">Perfect Smiles</span>
              </div>
            </div>
          </div>

          {/* Right Side: Reservation Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 max-w-md mx-auto">
              <div className="text-center mb-6">
                <span className="inline-block bg-[#B11E76]/10 text-accent-magenta text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  Free Consultation
                </span>
                <h3 className="text-2xl font-extrabold text-neutral-charcoal">
                  Get a Consultation
                </h3>
                <p className="text-sm text-neutral-gray mt-1 font-light">
                  Complete this form to claim your free treatment plan.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="hero-name" className="block text-sm font-bold text-neutral-charcoal mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="hero-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className={`w-full h-11 px-3.5 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 ${
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

                {/* Phone */}
                <div>
                  <label htmlFor="hero-phone" className="block text-sm font-bold text-neutral-charcoal mb-1">
                    Phone Number
                  </label>
                  <div className="flex space-x-2">
                    {/* Country Code Selector */}
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
                      id="hero-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 555000000"
                      className={`flex-1 h-11 px-3.5 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 ${
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
                  <label htmlFor="hero-email" className="block text-sm font-bold text-neutral-charcoal mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="hero-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@example.com"
                    className={`w-full h-11 px-3.5 rounded-lg border text-sm text-neutral-charcoal bg-white transition-all duration-200 ${
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

                {/* Message */}
                <div>
                  <label htmlFor="hero-message" className="block text-sm font-bold text-neutral-charcoal mb-1">
                    Message / Desired Treatment
                  </label>
                  <textarea
                    id="hero-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Describe your dental goals (e.g. implants, whitening, alignment)..."
                    className="w-full p-3 rounded-lg border border-gray-200 text-sm text-neutral-charcoal bg-white focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 outline-none resize-none transition-all duration-200"
                  />
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  className="w-full h-[45px] mt-2 inline-flex items-center justify-center space-x-2 bg-accent-magenta hover:bg-accent-magenta-hover text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a consultation</span>
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-neutral-gray font-light">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>100% Secure & Confidential</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
