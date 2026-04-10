
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, Cable, ZapOff, Package, Wrench } from "lucide-react";
import { Link } from 'react-router-dom';

const EnergeticsSection = () => {
  return (
    <div>
      <TargetSection 
        id="energetics"
        title="Энергетику"
        subtitle="Мы разрабатываем энергоэффективные решения, которые помогают значительно снизить энергопотребление без ущерба для качества освещения. Рассчитайте какие мощности можно освободить на Вашем объекте."
        services={[
          {
            icon: <Calculator className="h-6 w-6" />,
            title: "Расчет освещения для помещения:",
            description: "Наш калькулятор поможет определить тип и рассчитать количество светильников на объект без специальных знаний."
          },
          {
            icon: <Cable className="h-6 w-6" />,
            title: "Расчет сечения кабеля:",
            description: "Учитывает длину кабеля, мощность оборудования, тип проводки."
          },
          {
            icon: <ZapOff className="h-6 w-6" />,
            title: "Расчет снижения электропотребления:",
            description: "При замене старых светильников на светодиодные"
          },
          {
            icon: <Package className="h-6 w-6" />,
            title: "Подбор сопутствующих материалов:",
            description: "Оставьте заявку и мы подберем и поставим сопутствующие материалы"
          }
        ]}
        imageSrc="/lovable-uploads/9aa29444-c53f-406a-ab71-94572c977bc9.png"
        imageAlt="Энергетику"
        buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
        calculationType="электропотребление"
        reverse={true}
      />
      
      <div className="bg-zasvet-gray/40 border border-zasvet-gold/20 rounded-lg p-8 max-w-3xl mx-auto my-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-zasvet-gold/10 w-12 h-12 rounded-full flex items-center justify-center">
            <Wrench className="h-6 w-6 text-zasvet-gold" />
          </div>
          <h3 className="text-xl font-bold text-zasvet-gold">Ремонт светодиодных светильников</h3>
        </div>
        <p className="text-zasvet-white/80 mb-4">
          Ремонтируем светильники любого производителя или подготовим ремкомплект для самостоятельного ремонта.
        </p>
        <Link 
          to="/repair" 
          className="inline-flex items-center text-zasvet-gold hover:text-zasvet-darkgold font-semibold transition-colors"
        >
          Подробнее о ремонте →
        </Link>
      </div>
    </div>
  );
};

export default EnergeticsSection;
