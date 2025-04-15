
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TargetSectionProps {
  id: string;
  title: string;
  subtitle: string;
  services: Service[];
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  calculationType: string;
  reverse?: boolean;
  bgColor?: string;
  showDiagonalCut?: boolean;
}

const TargetSection: React.FC<TargetSectionProps> = ({
  id,
  title,
  subtitle,
  services,
  imageSrc,
  imageAlt,
  buttonText,
  calculationType,
  reverse = false,
  bgColor = "bg-zasvet-black",
  showDiagonalCut = false
}) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const calculatorsSection = document.getElementById('calculators');
    if (calculatorsSection) {
      calculatorsSection.scrollIntoView({ behavior: 'smooth' });
      
      // Optional: Add a URL hash for direct linking
      window.history.pushState({}, '', `#calculators-${calculationType}`);
      
      // Optional: Flash highlight on the specific calculator if it exists
      const specificCalculator = document.getElementById(`calculator-${calculationType}`);
      if (specificCalculator) {
        specificCalculator.classList.add('highlight-calculator');
        setTimeout(() => {
          specificCalculator.classList.remove('highlight-calculator');
        }, 2000);
      }
    }
  };

  const textColorClass = bgColor === 'bg-zasvet-gold' ? 'text-zasvet-black' : 'text-zasvet-white';
  const imageOrderClass = reverse ? 'order-first md:order-last' : 'order-last md:order-first';
  const contentOrderClass = reverse ? 'order-last md:order-first' : 'order-first md:order-last';

  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 ${bgColor}`}
    >
      {showDiagonalCut && (
        <>
          <div className="absolute top-0 left-0 right-0 h-16 bg-wave-top"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-wave-bottom"></div>
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`${imageOrderClass} relative`}>
            <AspectRatio ratio={16 / 9}>
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </AspectRatio>
          </div>
          
          <div className={`${contentOrderClass}`}>
            <h2 className={`section-title ${textColorClass} mb-4`}>{title}</h2>
            <p className={`text-lg ${textColorClass}/80 mb-6`}>
              {subtitle}
            </p>
            
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-4 flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className={`font-semibold ${textColorClass}`}>{service.title}</h3>
                    <p className={`${textColorClass}/80`}>{service.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Button 
                variant={textColorClass === 'text-zasvet-black' ? 'default' : 'outline'} 
                className={`px-6 py-6 text-lg ${textColorClass === 'text-zasvet-black' ? 'bg-zasvet-black text-zasvet-gold hover:bg-zasvet-gray' : 'border-zasvet-gold text-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black'}`}
                onClick={handleButtonClick}
              >
                {buttonText} <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetSection;
