
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, Cable, ZapOff, Package } from "lucide-react";

const EnergeticsSection = () => {
  return (
    <TargetSection 
      id="buyers"
      title="Энергетику"
      subtitle="Наша продукция помогает энергетикам оптимизировать энергопотребление и обеспечить качественное освещение на объектах."
      services={[
        {
          icon: <Calculator className="h-6 w-6" />,
          title: "Расчет освещения для помещения:",
          description: "Зная размер и назначение помещения, рассчитайте необходимое освещение."
        },
        {
          icon: <Cable className="h-6 w-6" />,
          title: "Расчет сечения кабеля:",
          description: "Учитывает длину кабеля, мощность оборудования, тип проводки."
        },
        {
          icon: <ZapOff className="h-6 w-6" />,
          title: "Расчет снижения электропотребления:",
          description: "При замене старых светильников на светодиодные."
        },
        {
          icon: <Package className="h-6 w-6" />,
          title: "Подбор сопутствующих материалов:",
          description: "Оставьте заявку и мы подберем и поставим сопутствующие материалы."
        }
      ]}
      imageSrc="/lovable-uploads/c659065f-6d51-40c9-b4e7-369b1600d01e.png"
      imageAlt="Энергетику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      reverse={true}
      showDiagonalCut={false}
    />
  );
};

export default EnergeticsSection;
