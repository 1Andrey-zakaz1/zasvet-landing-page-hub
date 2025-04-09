
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Zap, Award, BarChart, FileCode } from "lucide-react";

const EnergeticsSection = () => {
  return (
    <TargetSection 
      id="energetics"
      title="Энергетику"
      subtitle="Мы разрабатываем энергоэффективные решения, которые помогают значительно снизить энергопотребление без ущерба для качества освещения."
      services={[
        {
          icon: <Zap className="h-6 w-6" />,
          title: "Энергоэффективные решения:",
          description: "Светильники с высоким КПД и низким энергопотреблением для оптимизации затрат на электроэнергию."
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: "Соответствие стандартам:",
          description: "Все наши продукты соответствуют российским и международным стандартам энергоэффективности."
        },
        {
          icon: <BarChart className="h-6 w-6" />,
          title: "Расчеты экономии:",
          description: "Предоставляем детальные расчеты потенциальной экономии электроэнергии при внедрении наших решений."
        },
        {
          icon: <FileCode className="h-6 w-6" />,
          title: "Техническая документация:",
          description: "Полный комплект технической документации для интеграции наших систем в энергетическую инфраструктуру."
        }
      ]}
      imageSrc="/lovable-uploads/9aa29444-c53f-406a-ab71-94572c977bc9.png"
      imageAlt="Энергетику"
      buttonText="ЗАПРОСИТЬ РАСЧЕТ"
      reverse={true}
    />
  );
};

export default EnergeticsSection;
