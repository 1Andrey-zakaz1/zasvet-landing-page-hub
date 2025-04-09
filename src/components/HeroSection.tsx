
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const maxScroll = window.innerHeight;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate opacity based on scroll progress for a smooth fade-in
  const opacity = Math.min(scrollProgress * 1.5, 1); // Fade in faster than scroll

  // Only start rendering when we've scrolled a bit (10%)
  if (scrollProgress < 0.1) {
    return null;
  }

  return (
    <section 
      className="hero-section flex items-center justify-center relative overflow-hidden py-24 mt-24"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-zasvet-black/90 to-zasvet-black"></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="space-y-6 max-w-3xl mx-auto">
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
