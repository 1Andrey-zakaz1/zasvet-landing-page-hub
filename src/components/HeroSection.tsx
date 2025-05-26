
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useContactForm } from "@/hooks/use-contact-form";

const HeroSection = () => {
  const { openContactForm } = useContactForm();

  const handleRequestClick = () => {
    openContactForm("request");
  };

  const handleProductsClick = () => {
    console.log('Клик по кнопке "Наша продукция" в HeroSection');
    // Скроллим к секции продукции
    const productsSection = document.querySelector('#products');
    console.log('Найден элемент #products:', productsSection);
    
    if (productsSection) {
      console.log('Прокручиваем к секции продукции из HeroSection');
      productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Элемент #products не найден!');
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with AspectRatio */}
      <div className="absolute inset-0">
        <AspectRatio ratio={16 / 9} className="h-full">
          <img 
            src="/lovable-uploads/fba28b49-c1d0-410a-b376-68d38bab8660.png"
            alt="Фоновое изображение"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
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
            <Button 
              className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black font-semibold px-8 py-6 text-lg"
              onClick={handleProductsClick}
            >
              Наша продукция
            </Button>
            <Button 
              className="bg-transparent border-2 border-zasvet-white hover:bg-zasvet-white/10 text-zasvet-white font-semibold px-8 py-6 text-lg"
              onClick={handleRequestClick}
            >
              Отправить запрос <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
