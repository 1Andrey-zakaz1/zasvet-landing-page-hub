
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Lightbulb, FileCheck, Calculator, FileText } from "lucide-react";

const DesignersSection = () => {
  return (
    <TargetSection 
      id="designers"
      title="Проектировщику"
      subtitle="Мы предоставляем проектировщикам все необходимые инструменты и документацию для реализации самых сложных светотехнических проектов."
      services={[
        {
          icon: <Lightbulb className="h-6 w-6" />,
          title: "Подбор оптимального светильника:",
          description: "Наш калькулятор автоматически перебирает все варианты из серии светильников и предлагает оптимальный по цене для нужной освещенности."
        },
        {
          icon: <FileCheck className="h-6 w-6" />,
          title: "Разработка светильника по Т.З.:",
          description: "Оставьте заявку и мы разработаем светильник под Ваш объект и предоставим проект IES файла для него."
        },
        {
          icon: <Calculator className="h-6 w-6" />,
          title: "Другие калькуляторы:",
          description: "Подбор сечения кабеля, подбор УЗО, энергопотребление объекта, подбор аналога светильника."
        },
        {
          icon: <FileText className="h-6 w-6" />,
          title: "Новые инструменты:",
          description: "Мы регулярно добавляем новые инструменты, предложите тот, которого не хватает Вам."
        }
      ]}
      imageSrc="/lovable-uploads/e0b07c7d-ee21-487e-9ae4-4e79dcac1972.png"
      imageAlt="Проектировщику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      reverse={true}
      showDiagonalCut={false}
    />
  );
};

export default DesignersSection;
