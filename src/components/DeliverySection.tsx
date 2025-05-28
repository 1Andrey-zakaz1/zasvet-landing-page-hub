
import React from 'react';
import { Truck, MapPin, Clock } from 'lucide-react';

const DeliverySection = () => {
  return (
    <section className="bg-zasvet-gray/10 py-16 border-t border-zasvet-gold/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-gold mb-4">
            Доставка по всей России
          </h2>
          <p className="text-lg text-zasvet-white/80 max-w-3xl mx-auto">
            Производственная компания "Zасвет" осуществляет доставку светодиодных светильников 
            транспортными компаниями по всей территории Российской Федерации из Новосибирска
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-zasvet-gold" />
            </div>
            <h3 className="text-xl font-semibold text-zasvet-gold mb-2">
              География доставки
            </h3>
            <p className="text-zasvet-white/80">
              Доставка светодиодного освещения во все регионы РФ из Новосибирска
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-zasvet-gold" />
            </div>
            <h3 className="text-xl font-semibold text-zasvet-gold mb-2">
              Транспортные компании
            </h3>
            <p className="text-zasvet-white/80">
              Сотрудничаем с ведущими ТК для надежной доставки светильников
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-zasvet-gold" />
            </div>
            <h3 className="text-xl font-semibold text-zasvet-gold mb-2">
              Быстрая отправка
            </h3>
            <p className="text-zasvet-white/80">
              Отправка заказов светильников производится в кратчайшие сроки
            </p>
          </div>
        </div>
        
        <div className="bg-zasvet-gold/5 rounded-lg p-6 mt-12 border border-zasvet-gold/20">
          <h3 className="text-xl font-semibold text-zasvet-gold mb-3">
            Условия доставки светодиодных светильников
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zasvet-white/80">
            <div>
              <strong className="text-zasvet-gold">• Отправка из Новосибирска:</strong> Центральный склад производственной компании
            </div>
            <div>
              <strong className="text-zasvet-gold">• Транспортные компании:</strong> СДЭК, ПЭК, Деловые линии, КИТ и другие
            </div>
            <div>
              <strong className="text-zasvet-gold">• Упаковка:</strong> Надежная заводская упаковка для светильников
            </div>
            <div>
              <strong className="text-zasvet-gold">• Документы:</strong> Полный пакет документов для юридических лиц
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
