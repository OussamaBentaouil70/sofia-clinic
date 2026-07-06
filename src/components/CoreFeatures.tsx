import { useTranslation } from '../contexts/LanguageContext';

export default function CoreFeatures() {
  const { t } = useTranslation();
  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-charcoal tracking-tight">{t.overview.title}</h2>
        <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
        <p className="mt-6 text-sm sm:text-base md:text-lg text-neutral-gray font-light leading-relaxed">{t.overview.text}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pb-8">
        {t.coreFeatures.map((feature) => (
          <div key={feature.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-blue/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-24 h-24 flex items-center justify-center">
              <img src={feature.image} alt={feature.title} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-lg font-bold text-neutral-charcoal mt-5">{feature.title}</h3>
            <p className="text-sm text-neutral-gray mt-3 font-light leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
