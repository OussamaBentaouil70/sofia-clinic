import { useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const [activeDot, setActiveDot] = useState(0);
  const items = t.testimonials.items;

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block mb-2">{t.testimonials.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">{t.testimonials.title}</h2>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-gray font-light leading-relaxed">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {items.map((testimonial, idx) => (
            <div key={testimonial.id} onClick={() => setActiveDot(idx)}
              className={`bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                idx === activeDot ? 'border-primary-blue shadow-xl scale-[1.02]' : 'border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'
              }`}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary-blue/5 text-primary-blue flex items-center justify-center">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FCB900] fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-neutral-gray font-light leading-relaxed italic">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-gray-100">
                <img src={testimonial.avatar} alt={testimonial.name} referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-blue/30" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-charcoal">{testimonial.name}</h4>
                  <p className="text-xs text-neutral-gray font-light">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2.5 mt-10">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setActiveDot(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${activeDot === idx ? 'bg-accent-magenta scale-125' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={`Go to testimonial ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
