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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/sofia-clinic/api';

export default function App() {
  const [activeConsultation, setActiveConsultation] = useState<ConsultationRequest | null>(null);

  const handleRegister = async (data: ConsultationSubmit) => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    try {
      const res = await fetch(`${API_URL}/send-mail.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!json.booking_id) {
        throw new Error(json.message || 'Email server did not return a booking ID');
      }
      if (json.errors?.length) {
        console.warn('Consultation request partially failed:', json.errors);
      }

      setActiveConsultation({ ...data, id: json.booking_id, date: formattedDate, status: 'pending' });
    } catch (err) {
      console.error('Consultation request failed:', err);
      alert('Sorry, we could not send your request right now. Please try again or contact us on WhatsApp.');
    }
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
