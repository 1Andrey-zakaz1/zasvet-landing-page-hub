
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProcurementSection from '@/components/sections/ProcurementSection';
import ChatWidget from '@/components/ChatWidget';

const ProcurementPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <ProcurementSection />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);

export default ProcurementPage;
