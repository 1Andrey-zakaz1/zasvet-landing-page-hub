
import React from 'react';
import Header from '@/components/Header';
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
      <div className="pt-[70vh]"> {/* Keep this padding to push content below the header initially */}
        <OwnersSection />
        <EnergeticsSection />
        <BuyersSection />
        <DesignersSection />
        <InstallersSection />
        <ProductSlider />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
