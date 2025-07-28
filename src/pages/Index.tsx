
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
import PaymentSection from '@/components/PaymentSection';
import DeliverySection from '@/components/DeliverySection';
import ServiceSection from '@/components/ServiceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import TelegramBotWidget from '@/components/TelegramBotWidget';
import ChatWidget from '@/components/ChatWidget';
import CatalogSection from '@/components/catalog/CatalogSection';
import { ContactFormProvider } from '@/hooks/use-contact-form';

const Index = () => {
  return (
    <ContactFormProvider>
      <div className="min-h-screen bg-zasvet-black text-zasvet-white">
        <Header />
        <main>
          <HeroSection />
          <OwnersSection />
          <EnergeticsSection />
          <BuyersSection />
          <DesignersSection />
          <InstallersSection />
          
          <section className="container mx-auto px-4 py-16 md:py-20 mt-20">
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
          
          <div className="container mx-auto px-4 mt-20">
            <div id="led-calculator">
              <LedCalculator />
            </div>
            <div id="cable-calculator">
              <CableCalculator />
            </div>
            <div id="illumination-calculator">
              <IlluminationCalculator />
            </div>
          </div>
          
          {/* Каталог светильников добавлен после калькуляторов */}
          <div id="catalog" className="container mx-auto px-4 mt-20">
            <CatalogSection />
          </div>
          
          {/* Якорная ссылка для серии Буран */}
          <div id="buran" className="container mx-auto px-4 mt-20">
            <CatalogSection initialSeriesFilter="Буран" />
          </div>

          {/* Блок с видео скрыт */}
          <div className="hidden">
            <VideoSlider />
          </div>
          
          <ProductSlider />
          
          {/* Блок оплаты добавлен перед доставкой */}
          <PaymentSection />
          
          {/* Блок доставки добавлен перед сервисным обслуживанием */}
          <DeliverySection />
          
          {/* Блок сервисного обслуживания добавлен после доставки */}
          <ServiceSection />
          
          {/* Блок отзывов клиентов добавлен после сервисного обслуживания */}
          <TestimonialsSection />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ContactFormProvider>
  );
};

export default Index;
