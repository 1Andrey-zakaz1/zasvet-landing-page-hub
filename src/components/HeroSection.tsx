
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with AspectRatio */}
      <div className="absolute inset-0">
        <AspectRatio ratio={16 / 9} className="h-full">
          <img 
            src="/lovable-uploads/7e9e809e-b491-42a7-987f-aadb6e32c8bf.png"
            alt="Background image"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      {/* Overlay с меньшей непрозрачностью для лучшей видимости изображения */}
      <div className="absolute inset-0 bg-black/15"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 h-screen flex items-center justify-center relative z-10">
        <div className="space-y-6 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Современные решения <span className="text-zasvet-gold">освещения</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zasvet-white/80 max-w-2xl mx-auto">
            Производственная компания Zасвет создает инновационные системы освещения для различных отраслей и потребностей
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black font-semibold px-8 py-6 text-lg">
              Наша продукция
            </Button>
            <Button className="bg-transparent border-2 border-zasvet-white hover:bg-zasvet-white/10 text-zasvet-white font-semibold px-8 py-6 text-lg">
              Связаться с нами <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
