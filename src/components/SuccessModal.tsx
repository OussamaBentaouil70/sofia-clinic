/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, CheckCircle2, Calendar, Phone, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { ConsultationRequest } from '../types';

interface SuccessModalProps {
  request: ConsultationRequest | null;
  onClose: () => void;
}

export default function SuccessModal({ request, onClose }: SuccessModalProps) {
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
            Consultation Requested!
          </h3>
          <p className="text-xs sm:text-sm text-white/95 mt-1 font-light">
            Your personalized digital treatment plan is being prepared.
          </p>
        </div>

        {/* Voucher Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Medical Ticket / Voucher details */}
          <div className="border border-dashed border-gray-200 rounded-xl p-5 bg-surface-warm/35 space-y-4 relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r border-gray-100" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l border-gray-100" />

            <div className="flex justify-between items-center text-[10px] text-neutral-gray tracking-widest uppercase font-semibold border-b border-gray-100 pb-3">
              <span>Treatment Voucher</span>
              <span className="text-primary-blue">ID: {request.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-neutral-gray font-light">Patient Name</span>
                <span className="block font-bold text-neutral-charcoal text-sm mt-0.5">{request.name}</span>
              </div>
              <div>
                <span className="block text-neutral-gray font-light">Contact Number</span>
                <span className="block font-bold text-neutral-charcoal mt-0.5">{request.phone}</span>
              </div>
              <div>
                <span className="block text-neutral-gray font-light">Request Date</span>
                <span className="block font-bold text-neutral-charcoal mt-0.5">{request.date}</span>
              </div>
              <div>
                <span className="block text-neutral-gray font-light">Clinic Center</span>
                <span className="block font-bold text-[#FCB900] mt-0.5">Istanbul Facility</span>
              </div>
            </div>

            {request.message && (
              <div className="pt-2 text-xs border-t border-gray-100/60">
                <span className="block text-neutral-gray font-light">Notes / Symptoms</span>
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
              onClick={() => {
                alert("Voucher downloaded successfully! Please present this booking reference to your personal medical host upon arrival.");
              }}
              className="flex-1 h-11 border border-gray-200 hover:bg-gray-50 text-neutral-charcoal text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-neutral-gray" />
              <span>Save Voucher</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-11 bg-primary-blue hover:bg-primary-blue-hover text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>Done</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
