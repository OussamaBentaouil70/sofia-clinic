import { useTranslation } from '../contexts/LanguageContext';

export default function StatsSection() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-gradient-to-br from-[#7A00DF] to-[#B11E76] text-white py-16 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#FCB900]">{t.specialty.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t.specialty.title}</h2>
          <div className="w-16 h-1 bg-[#FCB900] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed max-w-3xl mx-auto">{t.specialty.longDescription}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto pt-8 border-t border-white/10">
          {t.stats.items.map((stat, idx) => (
            <div key={idx} className="space-y-2 flex flex-col items-center border-r last:border-r-0 border-white/10 px-2 last:border-none">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FCB900] tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm font-light text-white/90 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
