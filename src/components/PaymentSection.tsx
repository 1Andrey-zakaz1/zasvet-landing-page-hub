
import React from 'react';
import { FileText, Building, User, CreditCard } from 'lucide-react';

const PaymentSection = () => {
  return (
    <section className="bg-zasvet-gray/5 py-16 border-t border-zasvet-gold/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-gold mb-4">
            Оплата светодиодных светильников
          </h2>
          <p className="text-lg text-zasvet-white/80 max-w-3xl mx-auto">
            Производственная компания "Zасвет" работает с юридическими и физическими лицами. 
            Оплата светильников осуществляется по выставленному счету
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-8 w-8 text-zasvet-gold" />
            </div>
            <h3 className="text-xl font-semibold text-zasvet-gold mb-2">
              Юридические лица
            </h3>
            <p className="text-zasvet-white/80">
              Работаем с организациями по договору поставки светодиодного оборудования
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-zasvet-gold" />
            </div>
            <h3 className="text-xl font-semibold text-zasvet-gold mb-2">
              Физические лица
            </h3>
            <p className="text-zasvet-white/80">
              Принимаем заказы от частных лиц на покупку светильников
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-zasvet-gold" />
            </div>
            <h3 className="text-xl font-semibold text-zasvet-gold mb-2">
              Оплата по счету
            </h3>
            <p className="text-zasvet-white/80">
              Выставляем счет на оплату светодиодных светильников
            </p>
          </div>
        </div>
        
        <div className="bg-zasvet-gold/5 rounded-lg p-6 mt-12 border border-zasvet-gold/20">
          <h3 className="text-xl font-semibold text-zasvet-gold mb-3">
            Условия оплаты светодиодного освещения
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zasvet-white/80">
            <div>
              <strong className="text-zasvet-gold">• Для юридических лиц:</strong> Договор поставки и счет на оплату светильников с НДС
            </div>
            <div>
              <strong className="text-zasvet-gold">• Для физических лиц:</strong> Счет на оплату без НДС
            </div>
            <div>
              <strong className="text-zasvet-gold">• Способ оплаты:</strong> Безналичный расчет по выставленному счету
            </div>
            <div>
              <strong className="text-zasvet-gold">• Документооборот:</strong> Полный пакет документов
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
