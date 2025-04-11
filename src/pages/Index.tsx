
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
import Footer from '@/components/Footer';

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
        <VideoSlider />
        <ProductSlider />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
