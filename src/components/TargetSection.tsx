
import React from 'react';
import { Button } from "@/components/ui/button";

type TargetSectionProps = {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  reverse?: boolean;
};

const TargetSection = ({
  id,
  title,
  description,
  benefits,
  imageSrc,
  imageAlt,
  buttonText,
  reverse = false,
}: TargetSectionProps) => {
  return (
    <section id={id} className="section-padding bg-zasvet-black text-zasvet-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
          <div className="w-full lg:w-1/2">
            <h2 className="section-title">{title}</h2>
            <p className="text-lg mb-8 text-zasvet-white/80">{description}</p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-zasvet-gold mt-1 min-w-5">
                    <div className="h-5 w-5 rounded-full gold-gradient flex items-center justify-center text-zasvet-black font-bold text-xs">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-zasvet-white/90">{benefit}</p>
                </div>
              ))}
            </div>
            
            <Button className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black">
              {buttonText}
            </Button>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 gold-gradient opacity-50 blur-lg rounded-lg transform -translate-x-4 -translate-y-4"></div>
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover rounded-lg relative z-10 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetSection;
