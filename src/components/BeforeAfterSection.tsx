import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useTranslation } from '../contexts/LanguageContext';

export default function BeforeAfterSection() {
  const { t } = useTranslation();
  const CLINIC_WHATSAPP = t.clinic.whatsapp;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="before-after" className="py-20 bg-surface-warm/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-magenta block mb-2">{t.beforeAfter.sectionLabel}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-charcoal tracking-tight">{t.beforeAfter.title}</h2>
          <div className="w-16 h-1 bg-primary-blue mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-gray font-light leading-relaxed">{t.beforeAfter.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {t.beforeAfter.images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white aspect-[4/5] cursor-zoom-in group"
              aria-label={`Zoom into result ${idx + 1}`}
            >
              <img
                src={image}
                alt={`Soufia Clinic smile transformation result ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 text-neutral-charcoal" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href={CLINIC_WHATSAPP} target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-neutral-charcoal hover:bg-neutral-charcoal/90 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200">
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <span>{t.beforeAfter.ctaWhatsapp}</span>
          </a>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={t.beforeAfter.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

interface ImageLightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef({ dragging: false, moved: false, startX: 0, startY: 0, startOffsetX: 0, startOffsetY: 0 });

  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const goPrev = () => onNavigate((index - 1 + images.length) % images.length);
  const goNext = () => onNavigate((index + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, images.length, onClose, onNavigate]);

  const zoomBy = (delta: number) => {
    setScale((prev) => {
      const next = Math.min(4, Math.max(1, prev + delta));
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomBy(-e.deltaY * 0.0015 * scale);
  };

  const toggleZoomClick = () => {
    if (dragState.current.moved) return;
    setScale((prev) => {
      const next = prev > 1 ? 1 : 2.2;
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (scale <= 1) return;
    dragState.current = { dragging: true, moved: false, startX: e.clientX, startY: e.clientY, startOffsetX: offset.x, startOffsetY: offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.current.moved = true;
    setOffset({ x: dragState.current.startOffsetX + dx, y: dragState.current.startOffsetY + dy });
  };

  const handlePointerUp = () => {
    dragState.current.dragging = false;
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-10 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div
        className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center overflow-hidden touch-none"
        onWheel={handleWheel}
      >
        <img
          src={images[index]}
          alt={`Soufia Clinic smile transformation result ${index + 1} enlarged`}
          referrerPolicy="no-referrer"
          draggable={false}
          onClick={(e) => { e.stopPropagation(); toggleZoomClick(); }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            cursor: scale > 1 ? 'grab' : 'zoom-in',
          }}
          className="max-w-full max-h-full object-contain select-none transition-transform duration-150 ease-out"
        />
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-2 z-10">
        <button onClick={() => zoomBy(-0.5)} aria-label="Zoom out" className="text-white hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-white text-xs font-semibold w-10 text-center select-none">{Math.round(scale * 100)}%</span>
        <button onClick={() => zoomBy(0.5)} aria-label="Zoom in" className="text-white hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer">
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-white/20" />
        <button
          onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }}
          aria-label="Reset zoom"
          className="text-white hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {images.length > 1 && (
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${i === index ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
