/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ConsultationRequest } from '../types';
import { CLINIC_WHATSAPP } from '../data';
import { useTranslation } from '../contexts/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

interface SuccessModalProps {
  request: ConsultationRequest | null;
  onClose: () => void;
}

export default function SuccessModal({ request, onClose }: SuccessModalProps) {
  const { t } = useTranslation();
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full relative border border-gray-100"
      >
        {/* Banner with Accent Pattern */}
        <div className="bg-gradient-to-r from-primary-blue to-primary-blue-accent p-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 fill-emerald-50" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {t.success.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-light">
            {t.success.subtitle}
          </p>
        </div>

        {/* Voucher Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Medical Ticket / Voucher details */}
          <div className="border border-dashed border-gray-200 rounded-xl p-5 bg-surface-warm/35 space-y-4 relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r border-gray-100" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l border-gray-100" />

            <div className="flex justify-between items-center text-[10px] text-neutral-gray tracking-widest uppercase font-semibold border-b border-gray-100 pb-3">
              <span>{t.success.bookingReference}</span>
              <span className="text-primary-blue">{request.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-neutral-gray font-light">{t.success.patientName}</span>
                <span className="block font-bold text-neutral-charcoal text-sm mt-0.5">{request.name}</span>
              </div>
              <div>
                <span className="block text-neutral-gray font-light">{t.success.contactNumber}</span>
                <span className="block font-bold text-neutral-charcoal mt-0.5">{request.phone}</span>
              </div>
              <div>
                <span className="block text-neutral-gray font-light">{t.success.requestDate}</span>
                <span className="block font-bold text-neutral-charcoal mt-0.5">{request.date}</span>
              </div>
              <div>
                <span className="block text-neutral-gray font-light">{t.success.clinicCenter}</span>
                <span className="block font-bold text-[#FCB900] mt-0.5">{t.success.istanbulFacility}</span>
              </div>
            </div>

            {request.message && (
              <div className="pt-2 text-xs border-t border-gray-100/60">
                <span className="block text-neutral-gray font-light">{t.success.notes}</span>
                <p className="text-neutral-charcoal italic mt-1 font-light">"{request.message}"</p>
              </div>
            )}
          </div>

          {/* Next Steps Milestone timeline */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-neutral-charcoal uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-4.5 h-4.5 mr-1.5 text-accent-magenta" />
              <span>What Happens Next?</span>
            </h4>

            <div className="space-y-4 text-xs font-light text-neutral-gray relative pl-5 border-l border-gray-100">
              <div className="relative">
                <div className="absolute -left-7 top-0.5 w-4 h-4 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-[9px]">1</div>
                <span className="block font-bold text-neutral-charcoal">Digital Smile Analysis</span>
                <p className="mt-0.5">Our dental surgeons will review your request and diagnostic details within 2 hours.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-7 top-0.5 w-4 h-4 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-[9px]">2</div>
                <span className="block font-bold text-neutral-charcoal">Personal Call & Proposal</span>
                <p className="mt-0.5">A designated multilanguage consultant will contact you via WhatsApp to present your customized quote, luxury hotel options, and travel plan.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-7 top-0.5 w-4 h-4 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-[9px]">3</div>
                <span className="block font-bold text-neutral-charcoal">VIP Travel Arrangements</span>
                <p className="mt-0.5">Confirm dates, book flights, and receive your final clinical appointment tickets.</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 h-11 border border-gray-200 hover:bg-gray-50 text-neutral-charcoal text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-gray" />
              <span>{t.success.backHome}</span>
            </button>
            <a
              href={CLINIC_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="flex-1 h-11 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.success.whatsappCta}</span>
            </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
