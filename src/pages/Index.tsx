
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import OwnersSection from '@/components/sections/OwnersSection';
import EnergeticsSection from '@/components/sections/EnergeticsSection';
import BuyersSection from '@/components/sections/BuyersSection';
import DesignersSection from '@/components/sections/DesignersSection';
import InstallersSection from '@/components/sections/InstallersSection';
import VideoSlider from '@/components/VideoSlider';
import ProductSlider from '@/components/ProductSlider';
import LedCalculator from '@/components/LedCalculator';
import CableCalculator from '@/components/calculator/CableCalculator';
import Footer from '@/components/Footer';
import TelegramBotWidget from '@/components/TelegramBotWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-zasvet-black text-zasvet-white">
      <Header />
      <main>
        <HeroSection />
        <OwnersSection />
        <EnergeticsSection />
        <BuyersSection />
        <DesignersSection />
        <InstallersSection />
        <LedCalculator />
        <CableCalculator />
        <VideoSlider />
        <ProductSlider />
      </main>
      <Footer />
      <TelegramBotWidget />
    </div>
  );
};

export default Index;
