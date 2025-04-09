
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Start showing this section as we approach viewport height
      if (scrollY > viewportHeight * 0.5) {
        setIsVisible(true);
        
        // Calculate opacity based on scroll progress
        // Full opacity at viewport height
        const fadeInStart = viewportHeight * 0.5;
        const fadeInEnd = viewportHeight * 0.9;
        const fadeRange = fadeInEnd - fadeInStart;
        
        if (scrollY > fadeInStart && scrollY < fadeInEnd) {
          // Calculate opacity value between 0 and 1
          const newOpacity = (scrollY - fadeInStart) / fadeRange;
          setOpacity(newOpacity);
        } else if (scrollY >= fadeInEnd) {
          setOpacity(1);
        } else {
          setOpacity(0);
        }
      } else {
        setIsVisible(false);
        setOpacity(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't render if completely invisible
  if (!isVisible) {
    return null;
  }

  return (
    <section 
      className="hero-section flex items-center justify-center relative overflow-hidden py-24 mt-24 transition-opacity duration-500"
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
