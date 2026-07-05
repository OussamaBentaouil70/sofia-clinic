import { Hotel, Languages, ShieldAlert, CalendarDays, Heart, Car, LucideIcon } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const iconMap: Record<string, LucideIcon> = { Hotel, Languages, ShieldAlert, CalendarDays, Heart, Car };

export default function ServicesSection() {
  const { t } = useTranslation();
  return (
    <section id="services" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block mb-2">{t.services.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">{t.services.title}</h2>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-gray font-light leading-relaxed">{t.services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service) => {
            const Icon = iconMap[service.iconName] || Heart;
            return (
              <div key={service.id} className="bg-surface-warm/20 rounded-2xl p-6 sm:p-8 border border-gray-50 hover:border-primary-blue-accent/20 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary-blue/10 text-primary-blue flex items-center justify-center group-hover:bg-accent-magenta/10 group-hover:text-accent-magenta transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-neutral-charcoal mt-6 group-hover:text-primary-blue transition-colors duration-300">{service.title}</h3>
                <p className="text-sm text-neutral-gray mt-3 font-light leading-relaxed flex-grow">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
