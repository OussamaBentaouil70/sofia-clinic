import React, { useState } from 'react';
import { BEFORE_AFTER_RESULTS, CLINIC_WHATSAPP } from '../data';
import { ArrowLeftRight, Check, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WhatsAppIcon from './WhatsAppIcon';

export default function BeforeAfterSection() {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(1);

  const total = BEFORE_AFTER_RESULTS.length;
  const activeResult = BEFORE_AFTER_RESULTS[activeCase];

  const go = (delta: number) => {
    setDirection(delta);
    setActiveCase((prev) => (prev + delta + total) % total);
    setSliderPosition(50);
  };

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - container.left;
    const percentage = Math.max(0, Math.min(100, (x / container.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section id="before-after" className="py-20 bg-surface-warm/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block mb-2">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">
            Before & After Results
          </h2>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-gray font-light leading-relaxed">
            Drag the gold slider left and right to compare actual pre-treatment and post-treatment smile results.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100">

            {/* Draggable Slider */}
            <div
              className="relative aspect-[4/3] rounded-xl overflow-hidden select-none cursor-ew-resize"
              onMouseMove={(e) => { if (isDragging || e.buttons === 1) handleSliderMove(e); }}
              onTouchMove={handleSliderMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeCase}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  {/* After image (base) */}
                  <img
                    src={activeResult.afterImg}
                    alt={`${activeResult.title} - After`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute right-4 bottom-4 bg-[#25D366]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-md">
                    <Check className="w-3.5 h-3.5" />
                    <span>AFTER (Beautiful Smile)</span>
                  </div>

                  {/* Before image (clipped) */}
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={activeResult.beforeImg}
                      alt={`${activeResult.title} - Before`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute left-4 bottom-4 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>BEFORE Treatment</span>
                    </div>
                  </div>

                  {/* Gold divider handle */}
                  <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
                    <div className="absolute inset-y-0 -left-0.5 w-1 bg-[#FCB900]" />
                    <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-[#FCB900] border-4 border-white shadow-xl flex items-center justify-center text-neutral-charcoal">
                      <ArrowLeftRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Title + description */}
            <div className="mt-6 text-center space-y-2">
              <h3 className="text-xl font-bold text-neutral-charcoal">{activeResult.title} Results</h3>
              <p className="text-sm text-neutral-gray font-light max-w-2xl mx-auto">{activeResult.description}</p>
            </div>

            {/* Carousel navigation */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => go(-1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-neutral-charcoal hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-200 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {BEFORE_AFTER_RESULTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDirection(idx > activeCase ? 1 : -1); setActiveCase(idx); setSliderPosition(50); }}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeCase ? 'w-6 h-2.5 bg-primary-blue' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Case ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-neutral-charcoal hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-200 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href={CLINIC_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-neutral-charcoal hover:bg-neutral-charcoal/90 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span>Consult our Experts on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
