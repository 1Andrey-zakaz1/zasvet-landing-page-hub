
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, ZapOff, Package } from "lucide-react";

const EnergeticsSection = () => {
  return (
    <TargetSection 
      id="energetics"
      title="Энергетику"
      subtitle="Мы разрабатываем энергоэффективные решения, которые помогают значительно снизить энергопотребление без ущерба для качества освещения. Рассчитайте какие мощности можно освободить на Вашем объекте."
      services={[
        {
          icon: <Calculator className="h-6 w-6" />,
          title: "Расчет освещения для помещения:",
          description: "Зная размер и назначение помещения"
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
  );
};

export default EnergeticsSection;
