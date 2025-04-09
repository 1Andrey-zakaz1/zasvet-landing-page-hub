
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with improved visibility */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url('/lovable-uploads/86a842ad-9bc0-40e5-a6fc-693be2b6e0f1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      ></div>
      
      {/* Darker gradient overlay to improve text contrast */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-zasvet-black/70 to-zasvet-black/60"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 h-screen flex items-center justify-center relative z-10">
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
