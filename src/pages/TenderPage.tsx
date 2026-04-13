
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TenderSection from '@/components/sections/TenderSection';
import ChatWidget from '@/components/ChatWidget';

const TenderPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <TenderSection />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);

export default TenderPage;
