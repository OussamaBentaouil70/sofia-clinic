import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';
import { Treatment } from '../types';
import WhatsAppIcon from './WhatsAppIcon';

export default function TreatmentsSection() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Treatment | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="treatments" className="py-20 bg-surface-warm/10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block mb-2">{t.treatments.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">{t.treatments.title}</h2>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-gray font-light leading-relaxed">{t.treatments.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.treatments.items.map((treatment) => (
            <button
              key={treatment.id}
              onClick={() => setSelected(treatment)}
              className="text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                <span className="absolute bottom-3 left-4 text-white text-xs font-bold uppercase tracking-wide bg-accent-magenta/90 px-3 py-1 rounded-full">
                  {treatment.tagline}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-neutral-charcoal group-hover:text-primary-blue transition-colors duration-300">
                  {treatment.title}
                </h3>
                <p className="text-sm text-neutral-gray mt-3 font-light leading-relaxed flex-grow">{treatment.cardDescription}</p>
                <span className="inline-flex items-center mt-5 text-sm font-bold text-primary-blue group-hover:text-accent-magenta transition-colors duration-300">
                  {t.treatments.viewDetails}
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <TreatmentModal
            treatment={selected}
            highlightsLabel={t.treatments.highlightsLabel}
            ctaLabel={t.treatments.ctaLabel}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface TreatmentModalProps {
  treatment: Treatment;
  highlightsLabel: string;
  ctaLabel: string;
  onClose: () => void;
}

function TreatmentModal({ treatment, highlightsLabel, ctaLabel, onClose }: TreatmentModalProps) {
  const { t } = useTranslation();
  const CLINIC_WHATSAPP = t.clinic.whatsapp;
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col relative border border-gray-100"
      >
        <div className="relative h-64 sm:h-72 flex-shrink-0">
          <img
            src={treatment.image}
            alt={treatment.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6">
            <span className="text-[#FCB900] text-xs font-bold uppercase tracking-widest">{treatment.tagline}</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">{treatment.title}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-9 overflow-y-auto space-y-8">
          <p className="text-base sm:text-lg text-neutral-charcoal/85 font-medium leading-relaxed">{treatment.intro}</p>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent-magenta mb-3">{highlightsLabel}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {treatment.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start space-x-2 bg-surface-warm/25 rounded-lg p-3.5">
                  <CheckCircle2 className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-neutral-charcoal leading-snug">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {treatment.sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-base font-bold text-neutral-charcoal mb-2.5">{section.heading}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm sm:text-base text-neutral-charcoal/80 font-medium leading-relaxed flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-blue mt-2.5 mr-2.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-100">
            <a
              href={CLINIC_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{ctaLabel}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
