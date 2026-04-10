
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RepairSection from '@/components/sections/RepairSection';
import ChatWidget from '@/components/ChatWidget';

const RepairPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <RepairSection />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);

export default RepairPage;
