
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, ZapOff, Building, Wrench, Award, Package, Truck, Coins } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  reverse = false,
  bgColor = "bg-zasvet-black",
  showDiagonalCut = false,
}: TargetSectionProps) => {
  return (
    <section id={id} className={`relative overflow-hidden ${bgColor}`}>
      {/* Diagonal cut at the top - only shown when showDiagonalCut is true */}
      {showDiagonalCut && (
        <div className="absolute top-0 left-0 right-0 h-24 bg-wave-top"></div>
      )}
      
      <div className="container mx-auto px-4 py-16 md:py-24 z-10 relative">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
          {/* Image column - now smaller */}
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
              {/* Gold accent border */}
              <div className="absolute -bottom-3 -right-3 w-2/3 h-2/3 border-4 border-zasvet-gold rounded-lg -z-10"></div>
            </div>
          </div>
          
          {/* Content column - now larger */}
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
                  <div className="text-zasvet-gold mt-1 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zasvet-white mb-1">{service.title}</h3>
                    <p className="text-zasvet-white/70">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black px-8 py-3 text-lg font-medium">
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Diagonal cut at the bottom - only shown when showDiagonalCut is true */}
      {showDiagonalCut && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-wave-bottom"></div>
      )}
    </section>
  );
};

export default TargetSection;
