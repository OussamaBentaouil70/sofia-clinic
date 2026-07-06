/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CoreFeatures from './components/CoreFeatures';
import AboutSection from './components/AboutSection';
import TreatmentsSection from './components/TreatmentsSection';
import ServicesSection from './components/ServicesSection';
import BeforeAfterSection from './components/BeforeAfterSection';
import SpecialtySection from './components/SpecialtySection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import ConsultationFormSection from './components/ConsultationFormSection';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';
import { ConsultationSubmit, ConsultationRequest } from './types';

export default function App() {
  const [activeConsultation, setActiveConsultation] = useState<ConsultationRequest | null>(null);

  const handleRegister = (data: ConsultationSubmit) => {
    // Generate a beautiful, realistic medical booking ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SOUFIA-DE-${randomNum}`;
    
    // Get current date representation
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newRequest: ConsultationRequest = {
      ...data,
      id: bookingId,
      date: formattedDate,
      status: 'pending',
    };

    setActiveConsultation(newRequest);
  };

  const handleCloseSuccess = () => {
    setActiveConsultation(null);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-charcoal selection:bg-accent-magenta selection:text-white antialiased">
      {/* Header Navigation */}
      <Header />

      <main className="space-y-0">
        {/* Hero Banner with Integrated Reservation Form */}
        <HeroSection onRegister={handleRegister} />

        {/* Overview & Feature blocks */}
        <CoreFeatures />

        {/* About clinic narrative with clinic tour video overlay */}
        <AboutSection />

        {/* Dental care treatments grid with detail modal */}
        <TreatmentsSection />

        {/* Support services grid */}
        <ServicesSection />

        {/* Interactive Pre/Post slide comparison */}
        <BeforeAfterSection />

        {/* Clinical specialties split showcase */}
        <SpecialtySection />

        {/* Meet the team slider */}
        <TeamSection />

        {/* Patient reviews carousel */}
        <TestimonialsSection />

        {/* Statistics overview */}
        <StatsSection />

        {/* Bottom Booking Consultation form */}
        <ConsultationFormSection onRegister={handleRegister} />
      </main>

      {/* Dark Footer with quick contact form and sticky WhatsApp widget */}
      <Footer onRegister={handleRegister} />

      {/* Booking Success Ticket overlay */}
      <SuccessModal request={activeConsultation} onClose={handleCloseSuccess} />
    </div>
  );
}
