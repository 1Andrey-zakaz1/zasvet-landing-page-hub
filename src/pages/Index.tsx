
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import OwnersSection from '@/components/sections/OwnersSection';
import EnergeticsSection from '@/components/sections/EnergeticsSection';
import BuyersSection from '@/components/sections/BuyersSection';
import DesignersSection from '@/components/sections/DesignersSection';
import InstallersSection from '@/components/sections/InstallersSection';
import ProductSlider from '@/components/ProductSlider';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-zasvet-black text-zasvet-white">
      <Header />
      <HeroSection />
      <OwnersSection />
      <EnergeticsSection />
      <BuyersSection />
      <DesignersSection />
      <InstallersSection />
      <ProductSlider />
      <Footer />
    </div>
  );
};

export default Index;
