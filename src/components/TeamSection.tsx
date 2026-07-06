import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export default function TeamSection() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 280;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section id="team" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block mb-2">{t.team.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">{t.team.title}</h2>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-gray font-light leading-relaxed">{t.team.subtitle}</p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {t.team.items.map((member) => (
              <div
                key={member.id}
                className="snap-start shrink-0 w-[80%] sm:w-[46%] lg:w-[calc((100%-48px)/3)] bg-surface-warm/20 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-4/5 overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-base font-bold text-neutral-charcoal">{member.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-blue mt-1">{t.team.roleLabel}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="hidden sm:flex absolute -left-5 top-[calc(50%-16px)] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-neutral-charcoal hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-200 cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="hidden sm:flex absolute -right-5 top-[calc(50%-16px)] -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-neutral-charcoal hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-200 cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
