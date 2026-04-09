
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuditSection from '@/components/sections/AuditSection';
import ChatWidget from '@/components/ChatWidget';

const AuditPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <AuditSection />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);

export default AuditPage;
