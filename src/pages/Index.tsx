
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import IlluminationCalculator from '@/components/calculator/IlluminationCalculator';
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
        
        <section className="container mx-auto px-4 py-16 md:py-20">
          <Alert 
            variant="default" 
            className="mb-4 bg-zasvet-gold text-zasvet-black border-transparent text-center text-base font-bold"
          >
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-zasvet-black" />
              <AlertTitle className="text-base font-bold">Внимание: Предварительные расчеты</AlertTitle>
            </div>
            <AlertDescription className="mt-2 text-base font-normal">
              Калькуляторы на этой странице позволят быстро выполнить приблизительные расчеты. 
              Окончательные технические решения должны приниматься с учетом всех конкретных условий 
              и требований нормативных документов. Для точных расчетов рекомендуется 
              проконсультироваться со специалистами.
            </AlertDescription>
          </Alert>
        </section>
        
        <LedCalculator />
        <CableCalculator />
        <IlluminationCalculator />

        <VideoSlider />
        <ProductSlider />
      </main>
      <Footer />
      <TelegramBotWidget />
    </div>
  );
};

export default Index;

