
import React from 'react';
import SubscriptionForm from './SubscriptionForm';

const Footer = () => {
  const handleProductsClick = () => {
    const productsSection = document.querySelector('#products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCalculatorsClick = () => {
    const calculatorSection = document.querySelector('#calculator');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCatalogClick = () => {
    const catalogSection = document.querySelector('#catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeliveryClick = () => {
    window.scrollTo({ top: document.body.scrollHeight - window.innerHeight - 500, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zasvet-black py-12 text-zasvet-white/80 border-t border-zasvet-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img 
              src="/lovable-uploads/4569d5b4-87f4-40ae-aba3-b6fd8fcedf96.png" 
              alt="Zасвет" 
              className="h-16 mb-4"
            />
            <p className="max-w-xs">
              Производственная компания Zасвет - инновационные решения в области освещения с доставкой по России
            </p>
          </div>
          
          <div>
            <h3 className="text-zasvet-gold font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li>Телефон: +7 383 312-00-91</li>
              <li>Email: zakaz@pkzasvet.ru</li>
              <li>Адрес: г. Новосибирск, ул. Станционная 32 к 40 оф 405</li>
              <li className="text-zasvet-gold">Доставка по всей РФ из Новосибирска</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-zasvet-gold font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><a href="#owners" className="hover:text-zasvet-gold transition-colors">Собственникам</a></li>
              <li><a href="#buyers" className="hover:text-zasvet-gold transition-colors">Закупщикам</a></li>
              <li><a href="#designers" className="hover:text-zasvet-gold transition-colors">Проектировщикам</a></li>
              <li><a href="#installers" className="hover:text-zasvet-gold transition-colors">Монтажникам</a></li>
              <li>
                <button 
                  onClick={handleProductsClick}
                  className="hover:text-zasvet-gold transition-colors text-left"
                >
                  Продукция
                </button>
              </li>
              <li>
                <button 
                  onClick={handleCalculatorsClick}
                  className="hover:text-zasvet-gold transition-colors text-left"
                >
                  Калькуляторы
                </button>
              </li>
              <li>
                <button 
                  onClick={handleCatalogClick}
                  className="hover:text-zasvet-gold transition-colors text-left"
                >
                  Каталог
                </button>
              </li>
              <li>
                <button 
                  onClick={handleDeliveryClick}
                  className="hover:text-zasvet-gold transition-colors text-left"
                >
                  Доставка
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <SubscriptionForm />
          </div>
        </div>
        
        <div className="border-t border-zasvet-gray/30 mt-8 pt-8 text-center text-zasvet-white/60">
          <p>© {new Date().getFullYear()} ПК "Zасвет". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
