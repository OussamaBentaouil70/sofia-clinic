/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SPECIALTY_CONTENT, CLINIC_WHATSAPP } from '../data';
import { Award, ShieldCheck, Heart } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function SpecialtySection() {
  return (
    <section id="specialty" className="relative bg-white overflow-hidden border-b border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left Side: Medical Experts Image */}
        <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full overflow-hidden">
          <img
            src="/src/assets/images/dental_specialty_1783270156800.jpg"
            alt="Soufia Clinic Dental Specialties Team"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
          />
          {/* Subtle brand graphic marker */}
          <div className="absolute top-6 left-6 bg-[#FCB900] text-neutral-charcoal text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
            ★ Top Dental Clinic Turkey
          </div>
        </div>

        {/* Right Side: Specialty Details (Magenta Box overlay design) */}
        <div className="lg:col-span-6 bg-accent-magenta text-white p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6 relative">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full filter blur-xl pointer-events-none" />

          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FCB900]">
              Expertise & Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {SPECIALTY_CONTENT.title}
            </h2>
          </div>

          <div className="w-16 h-1 bg-white rounded-full" />

          <p className="text-base font-medium text-white/95 leading-relaxed">
            {SPECIALTY_CONTENT.description}
          </p>

          <p className="text-sm text-white/85 font-light leading-relaxed">
            {SPECIALTY_CONTENT.longDescription}
          </p>

          {/* Core values list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-[#FCB900]" />
              <span className="text-xs font-semibold">ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#FCB900]" />
              <span className="text-xs font-semibold">100% Guaranteed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#FCB900]" />
              <span className="text-xs font-semibold">Painless Sedation</span>
            </div>
          </div>

          {/* Social WhatsApp CTA */}
          <div className="pt-4">
            <a
              href={CLINIC_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{SPECIALTY_CONTENT.whatsappButton}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
