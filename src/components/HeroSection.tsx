
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zasvet-black/80 to-zasvet-black/40"></div>
        <img 
          src="/lovable-uploads/066daff8-4f43-483a-98dd-fa0142f62bb0.png" 
          alt="Здание с современным освещением" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 h-screen flex items-center justify-center">
        <div className="space-y-6 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Современные решения <span className="gold-text">освещения</span>
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
