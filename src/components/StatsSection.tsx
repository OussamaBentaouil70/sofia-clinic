/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CLINIC_STATS } from '../data';
import { ShieldCheck, Trophy, Heart, Star } from 'lucide-react';

export default function StatsSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#7A00DF] to-[#B11E76] text-white py-16 overflow-hidden">
      {/* Decorative ambient blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Header copy */}
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#FCB900]">
            Established Clinic Authority
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Speciality Clinic
          </h2>
          <div className="w-16 h-1 bg-[#FCB900] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
            A specialist dental care centre offering comprehensive outpatient and inpatient cosmetic, alignment, and implant care. We use world-class clinical techniques and highly accredited surgical teams to deliver exceptionally natural-looking, long-lasting results with 100% full service support.
          </p>
        </div>

        {/* 4 Stats columns exactly matching screenshot style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto pt-8 border-t border-white/10">
          {CLINIC_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="space-y-2 flex flex-col items-center border-r last:border-r-0 border-white/10 px-2 last:border-none"
            >
              {/* Animated/Bold Numbers */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FCB900] tracking-tight">
                {stat.value}
              </div>
              
              {/* Stat Labels */}
              <div className="text-xs sm:text-sm font-light text-white/90 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
