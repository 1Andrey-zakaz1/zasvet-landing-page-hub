
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openContactForm } = useContactForm();

  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const currentScrollY = window.scrollY;
      const threshold = 50;
      
      // Set scrolled state for header background
      if (currentScrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHideHeader(true); // Hide when scrolling down
      } else {
        setHideHeader(false); // Show when scrolling up or at top
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleContactClick = () => {
    // Скроллим к секции контактов (футер)
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleCalculatorsClick = () => {
    // Скроллим к секции калькуляторов
    const calculatorSection = document.querySelector('#calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleCatalogClick = () => {
    // Скроллим к секции каталога
    const catalogSection = document.querySelector('#catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zasvet-black/95 shadow-md' : 'bg-transparent'
      } ${
        hideHeader ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/4569d5b4-87f4-40ae-aba3-b6fd8fcedf96.png" 
            alt="Zасвет" 
            className="h-12 md:h-16" 
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#owners" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Собственникам</a>
          <a href="#buyers" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Закупщикам</a>
          <a href="#designers" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Проектировщикам</a>
          <a href="#installers" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Монтажникам</a>
          <a href="#products" className="text-zasvet-white hover:text-zasvet-gold transition-colors">Продукция</a>
          <button 
            onClick={handleCalculatorsClick}
            className="text-zasvet-white hover:text-zasvet-gold transition-colors"
          >
            Калькуляторы
          </button>
          <button 
            onClick={handleCatalogClick}
            className="text-zasvet-white hover:text-zasvet-gold transition-colors"
          >
            Каталог
          </button>
        </nav>

        <Button 
          className="hidden md:flex bg-transparent border-2 border-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black transition-all"
          onClick={handleContactClick}
        >
          Контакты
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
            <button 
              onClick={handleCalculatorsClick}
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2 text-left"
            >
              Калькуляторы
            </button>
            <button 
              onClick={handleCatalogClick}
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2 text-left"
            >
              Каталог
            </button>
            <Button 
              className="bg-transparent border-2 border-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black transition-all w-full mt-4"
              onClick={handleContactClick}
            >
              Контакты
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
