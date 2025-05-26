
import React from 'react';

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
              Производственная компания Zасвет - инновационные решения в области освещения
            </p>
          </div>
          
          <div>
            <h3 className="text-zasvet-gold font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
              <li>Email: info@zasvet.ru</li>
              <li>Адрес: г. Москва, ул. Примерная, д. 123</li>
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
            </ul>
          </div>
          
          <div>
            <h3 className="text-zasvet-gold font-semibold text-lg mb-4">Подписка</h3>
            <p className="mb-4">Подпишитесь на наши новости</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="bg-zasvet-gray/30 border border-zasvet-gray/50 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-zasvet-gold rounded-l"
              />
              <button className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black px-4 py-2 rounded-r transition-colors">
                Отправить
              </button>
            </div>
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
