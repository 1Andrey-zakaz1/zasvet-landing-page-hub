
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductSlider from '@/components/ProductSlider';
import LedCalculator from '@/components/LedCalculator';
import CableCalculator from '@/components/calculator/CableCalculator';
import IlluminationCalculator from '@/components/calculator/IlluminationCalculator';
import PaymentSection from '@/components/PaymentSection';
import DeliverySection from '@/components/DeliverySection';
import ServiceSection from '@/components/ServiceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import CatalogSection from '@/components/catalog/CatalogSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import { ContactFormProvider } from '@/hooks/use-contact-form';

interface RolePageProps {
  roleSection: React.ReactNode;
}

const RolePage: React.FC<RolePageProps> = ({ roleSection }) => {
  return (
    <ContactFormProvider>
      <div className="min-h-screen bg-zasvet-black text-zasvet-white">
        <Header />
        <main>
          <HeroSection />
          {roleSection}
          
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
          
          <div id="catalog" className="container mx-auto px-4 mt-20">
            <CatalogSection />
          </div>
          
          <ProductSlider />
          <PaymentSection />
          <DeliverySection />
          <ServiceSection />
          <TestimonialsSection />
          
          <div id="our-projects" className="container mx-auto px-4 mt-20">
            <ProjectsSection />
          </div>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ContactFormProvider>
  );
};

export default RolePage;
