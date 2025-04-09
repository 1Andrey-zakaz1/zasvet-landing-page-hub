
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const scrollY = window.scrollY;
      // Calculate transition threshold (50px for scrolled state)
      const threshold = 50;
      // Calculate viewport height
      const viewportHeight = window.innerHeight;
      
      // Set scrolled state based on threshold
      if (scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Calculate scroll progress for smooth transitions
      // This ensures a gradual transition between 0 and viewport height
      const progress = Math.min(scrollY / viewportHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Calculate opacity for hero content based on scroll progress
  const heroContentOpacity = Math.max(1 - scrollProgress * 2, 0);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zasvet-black/95 shadow-md' : 'bg-transparent'
      }`}
    >
      {/* Фоновое изображение в шапке (с плавным затуханием при прокрутке) */}
      <div className="absolute inset-0 -z-10 h-screen w-full transition-opacity duration-300" 
           style={{ opacity: 1 - scrollProgress * 0.7 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-zasvet-black/80 to-zasvet-black/40 w-full h-full"></div>
        <img 
          src="/lovable-uploads/bd6e1f11-5009-4d95-a578-082eb853a850.png" 
          alt="Здание с освещением" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/4c2a654c-e07e-459b-841c-f2f10a50db05.png" 
            alt="Zасвет" 
            className="h-20 md:h-28" 
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#owners" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Собственникам</a>
          <a href="#buyers" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Закупщикам</a>
          <a href="#designers" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Проектировщикам</a>
          <a href="#installers" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Монтажникам</a>
          <a href="#products" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Продукция</a>
        </nav>

        <Button 
          className="hidden md:flex bg-transparent border-2 border-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black transition-all"
        >
          Связаться
        </Button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-zasvet-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zasvet-black/95 py-4 animate-fade-in">
          <nav className="flex flex-col space-y-4 px-4">
            <a 
              href="#owners" 
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Собственникам
            </a>
            <a 
              href="#buyers" 
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Закупщикам
            </a>
            <a 
              href="#designers" 
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Проектировщикам
            </a>
            <a 
              href="#installers" 
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Монтажникам
            </a>
            <a 
              href="#products" 
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Продукция
            </a>
            <Button 
              className="bg-transparent border-2 border-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black transition-all w-full mt-4"
            >
              Связаться
            </Button>
          </nav>
        </div>
      )}

      {/* Hero Content with fade out effect based on scroll */}
      <div 
        className="container mx-auto px-4 z-10 text-center h-screen flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: heroContentOpacity }}
      >
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
    </header>
  );
};

export default Header;
