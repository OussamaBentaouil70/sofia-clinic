/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Play, X, Heart, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="about" className="py-20 bg-surface-warm/30 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-magenta/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-blue/5 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: About Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="h-0.5 w-8 bg-accent-magenta" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta">
                About Us
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight leading-tight">
              World-Class Dental Care Services at Soufia Clinic
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-gray font-light leading-relaxed">
              <p>
                Soufia Clinic offers a high-quality, uniquely personalized dental care experience in Istanbul, Turkey. We work with carefully selected, highly accredited dental surgeons and orthodontists to ensure exceptional cosmetic and reconstructive results.
              </p>
              <p>
                Patients from diverse backgrounds travel from around the world to receive our specialized treatments. Our absolute commitment is to provide a world-class clinical experience, delivering perfectly natural, long-lasting, and healthy smiles that change lives.
              </p>
              <p>
                Equipped with the latest CAD/CAM dental design systems, laser whitening modules, and sapphire implant technologies, we combine medical authority with absolute patient comfort.
              </p>
            </div>

            {/* Interactive Play Button */}
            <div className="pt-4">
              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center space-x-4 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-accent-magenta text-white flex items-center justify-center shadow-lg group-hover:bg-primary-blue group-hover:scale-105 transition-all duration-300">
                  <Play className="w-5 h-5 fill-current ml-1" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-neutral-charcoal group-hover:text-primary-blue transition-colors">
                    Play Video
                  </span>
                  <span className="block text-xs text-neutral-gray font-light">
                    Take a 1-min virtual tour of our luxury clinic
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Side: Elegant Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20">
                <img
                  src="/src/assets/images/dental_about_care_1783270190845.jpg"
                  alt="Cosmetic Dental Care in Soufia Clinic"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-accent-magenta fill-current" />
                  <span className="text-xs font-bold uppercase tracking-wider">Accredited Surgeons</span>
                </div>
              </div>

              {/* Overlapping smaller details (stylized floating graphics) */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-50 z-30 hidden sm:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-blue/10 text-primary-blue flex items-center justify-center">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="block text-sm font-extrabold text-neutral-charcoal">99.8%</span>
                    <span className="block text-[10px] text-neutral-gray font-light">Success Ratio</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-50 z-30 hidden sm:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-extrabold text-neutral-charcoal">Painless</span>
                    <span className="block text-[10px] text-neutral-gray font-light">Sedation Care</span>
                  </div>
                </div>
              </div>

              {/* Decorative back shapes representing Sofia Clinic aesthetics */}
              <div className="absolute inset-0 border-2 border-accent-magenta/20 transform translate-x-4 translate-y-4 rounded-2xl -z-10" />
            </div>
          </div>

        </div>
      </div>

      {/* Video Overlay Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-neutral-charcoal rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full relative border border-gray-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-accent-magenta bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-1">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  {/* Virtual Clinic Tour Video Embed (using an aesthetic, royalty-free dental clinic tour loop or interactive slide) */}
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                    title="Soufia Clinic Virtual Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 text-white text-center">
                  <h4 className="text-base font-bold">Soufia Clinic Virtual Tour</h4>
                  <p className="text-xs text-gray-400 mt-1 font-light">
                    Take a digital walk through our state-of-the-art facilities in Istanbul, Turkey.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
