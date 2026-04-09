import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openContactForm } = useContactForm();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 50;
      
      if (currentScrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
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
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleScrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { to: "/owners", label: "Собственникам" },
    { to: "/buyers", label: "Закупщикам" },
    { to: "/designers", label: "Проектировщикам" },
    { to: "/installers", label: "Монтажникам" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zasvet-black/95 shadow-md' : 'bg-transparent'
      } ${
        hideHeader ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/4569d5b4-87f4-40ae-aba3-b6fd8fcedf96.png" 
            alt="Zасвет" 
            className="h-12 md:h-16" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <Link 
              key={link.to}
              to={link.to} 
              className={`text-zasvet-white hover:text-zasvet-gold transition-colors ${
                location.pathname === link.to ? 'text-zasvet-gold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button 
            onClick={() => handleScrollTo('#products')}
            className="text-zasvet-white hover:text-zasvet-gold transition-colors"
          >
            Продукция
          </button>
          <button 
            onClick={() => handleScrollTo('#calculator')}
            className="text-zasvet-white hover:text-zasvet-gold transition-colors"
          >
            Калькуляторы
          </button>
          <button 
            onClick={() => handleScrollTo('#catalog')}
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
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`text-zasvet-white hover:text-zasvet-gold transition-colors py-2 ${
                  location.pathname === link.to ? 'text-zasvet-gold' : ''
                }`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <button 
              onClick={() => handleScrollTo('#products')}
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2 text-left"
            >
              Продукция
            </button>
            <button 
              onClick={() => handleScrollTo('#calculator')}
              className="text-zasvet-white hover:text-zasvet-gold transition-colors py-2 text-left"
            >
              Калькуляторы
            </button>
            <button 
              onClick={() => handleScrollTo('#catalog')}
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
