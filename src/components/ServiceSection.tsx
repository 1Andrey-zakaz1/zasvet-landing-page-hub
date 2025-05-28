
import React from 'react';
import { Wrench, Phone, Truck, FileText, CheckCircle } from 'lucide-react';

const ServiceSection = () => {
  return (
    <section className="bg-zasvet-black py-16 border-t border-zasvet-gold/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-gold mb-4">
            Сервисное обслуживание
          </h2>
          <p className="text-lg text-zasvet-white/80 max-w-3xl mx-auto">
            Если светильник вышел из строя, мы обеспечиваем полный цикл сервисного обслуживания 
            с гарантийной поддержкой и качественной диагностикой
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-8 w-8 text-zasvet-gold" />
            </div>
            <div className="bg-zasvet-gold text-zasvet-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-zasvet-gold mb-2">
              Проверка
            </h3>
            <p className="text-zasvet-white/80 text-sm">
              Убедитесь, что вышел из строя именно светильник, а не проводка или другие элементы системы
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-zasvet-gold" />
            </div>
            <div className="bg-zasvet-gold text-zasvet-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-zasvet-gold mb-2">
              Обращение
            </h3>
            <p className="text-zasvet-white/80 text-sm">
              Свяжитесь с нами любым удобным способом: телефон, email или через форму на сайте
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-zasvet-gold" />
            </div>
            <div className="bg-zasvet-gold text-zasvet-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-zasvet-gold mb-2">
              Доставка к нам
            </h3>
            <p className="text-zasvet-white/80 text-sm">
              Если светильник на гарантии и случай гарантийный — доставка до нас за наш счет
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-zasvet-gold" />
            </div>
            <div className="bg-zasvet-gold text-zasvet-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
              4
            </div>
            <h3 className="text-lg font-semibold text-zasvet-gold mb-2">
              Диагностика
            </h3>
            <p className="text-zasvet-white/80 text-sm">
              После получения светильника проводим диагностику и предоставляем заключение с причинами поломки
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-zasvet-gold" />
            </div>
            <div className="bg-zasvet-gold text-zasvet-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
              5
            </div>
            <h3 className="text-lg font-semibold text-zasvet-gold mb-2">
              Возврат
            </h3>
            <p className="text-zasvet-white/80 text-sm">
              Если случай гарантийный — доставка отремонтированного светильника до вас за наш счет
            </p>
          </div>
        </div>
        
        <div className="bg-zasvet-gold/5 rounded-lg p-6 mt-12 border border-zasvet-gold/20">
          <h3 className="text-xl font-semibold text-zasvet-gold mb-3">
            Гарантийное обслуживание
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zasvet-white/80">
            <div>
              <strong className="text-zasvet-gold">• Бесплатная диагностика:</strong> Для всех светильников ПК "Zасвет"
            </div>
            <div>
              <strong className="text-zasvet-gold">• Гарантийный ремонт:</strong> При соблюдении условий эксплуатации
            </div>
            <div>
              <strong className="text-zasvet-gold">• Быстрое обслуживание:</strong> Диагностика в течение 3-5 рабочих дней
            </div>
            <div>
              <strong className="text-zasvet-gold">• Полная отчетность:</strong> Детальное заключение по результатам диагностики
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
