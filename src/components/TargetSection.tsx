
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, ZapOff, Building, Wrench, Award, Package, Truck, Coins, Send } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useContactForm } from "@/hooks/use-contact-form";

type ServiceItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type TargetSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  services: ServiceItem[];
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  calculationType?: string; // Тип расчета для чата
  reverse?: boolean;
  bgColor?: string;
  showDiagonalCut?: boolean;
};

const TargetSection = ({
  id,
  title,
  subtitle,
  services,
  imageSrc,
  imageAlt,
  buttonText,
  calculationType = 'общий',
  reverse = false,
  bgColor = "bg-zasvet-black",
  showDiagonalCut = false,
}: TargetSectionProps) => {
  const { openContactForm } = useContactForm();
  const oppositeColor = bgColor === "bg-zasvet-black" ? "bg-zasvet-gold" : "bg-zasvet-black";
  const iconColor = bgColor === "bg-zasvet-black" ? "text-zasvet-gold" : "text-zasvet-black";
  
  // Цвет рамки в зависимости от фона
  const frameColor = bgColor === "bg-zasvet-black" ? "border-zasvet-gold" : "border-zasvet-black";
  
  const primaryButtonClass = bgColor === "bg-zasvet-black" 
    ? "bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black border-2 border-zasvet-gold" 
    : "bg-zasvet-black hover:bg-zasvet-gray text-zasvet-gold border-2 border-zasvet-black";
  
  const secondaryButtonClass = bgColor === "bg-zasvet-black"
    ? "bg-transparent hover:bg-zasvet-gold/10 text-zasvet-gold border-2 border-zasvet-gold"
    : "bg-transparent hover:bg-zasvet-black/10 text-zasvet-black border-2 border-zasvet-black";
  
  const handleCalculatorClick = () => {
    const calculatorSection = document.querySelector('#calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRequestForm = () => {
    openContactForm("request");
  };
  
  return (
    <section id={id} className={`relative overflow-hidden ${bgColor}`}>
      {showDiagonalCut && (
        <div className={`absolute top-0 left-0 right-0 h-24 ${oppositeColor} bg-wave-top`}></div>
      )}
      
      <div className="container mx-auto px-4 py-16 md:py-24 z-10 relative">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
          <div className="w-full lg:w-1/3">
            <div className="relative">
              <div className="rounded-lg shadow-xl overflow-hidden">
                <AspectRatio ratio={1/1} className="bg-zasvet-gray/10">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                </AspectRatio>
              </div>
              {/* Декоративная рамка того же размера что и изображение */}
              <div className={`absolute -bottom-4 -right-4 w-full h-full border-4 ${frameColor} rounded-lg -z-10`}></div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className="text-xs uppercase tracking-wider text-zasvet-gold font-semibold mb-2">
              ИНСТРУМЕНТЫ В ПОМОЩЬ:
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zasvet-white">
              {title}
            </h2>
            <div className="w-16 h-1 bg-zasvet-gold mb-8"></div>
            
            <p className="text-lg mb-10 text-zasvet-white/80">{subtitle}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`${iconColor} mt-1 flex-shrink-0`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zasvet-white mb-1">{service.title}</h3>
                    <p className="text-zasvet-white/70">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className={`${primaryButtonClass} px-8 py-3 text-lg font-medium`}
                onClick={handleCalculatorClick}
              >
                {buttonText}
              </Button>
              
              <Button 
                className={`${secondaryButtonClass} px-8 py-3 text-lg font-medium`}
                onClick={handleOpenRequestForm}
              >
                <Send className="mr-2 h-5 w-5" />
                ОСТАВИТЬ ЗАЯВКУ
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {showDiagonalCut && (
        <div className={`absolute bottom-0 left-0 right-0 h-24 ${oppositeColor} bg-wave-bottom`}></div>
      )}
    </section>
  );
};

export default TargetSection;
