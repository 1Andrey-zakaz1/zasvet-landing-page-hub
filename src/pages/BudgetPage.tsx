import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BudgetSection from '@/components/sections/BudgetSection';
import ChatWidget from '@/components/ChatWidget';

const BudgetPage = () => (
  <div className="min-h-screen flex flex-col bg-zasvet-black">
    <Header />
    <main className="flex-grow pt-24">
      <BudgetSection />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);

export default BudgetPage;
