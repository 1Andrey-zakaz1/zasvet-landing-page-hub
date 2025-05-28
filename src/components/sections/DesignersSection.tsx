
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, FileEdit, FileSpreadsheet, PlusCircle } from "lucide-react";

const DesignersSection = () => {
  return (
    <TargetSection 
      id="designers"
      title="Проектировщику"
      subtitle="Мы предоставляем комплексные инструменты для проектирования эффективных систем освещения, отвечающих техническим требованиям и эстетическим ожиданиям."
      services={[
        {
          icon: <Calculator className="h-6 w-6 text-zasvet-gold" />,
          title: "Подбор оптимального светильника:",
          description: "Наш калькулятор автоматически перебирает все варианты из серии светильников и предлагает оптимальный по цене для нужной освещенности."
        },
        {
          icon: <FileEdit className="h-6 w-6 text-zasvet-gold" />,
          title: "Разработка светильника по Т.З.:",
          description: "Оставьте заявку и мы разработаем светильник под Ваш объект и предоставим проект IES файла для него."
        },
        {
          icon: <FileSpreadsheet className="h-6 w-6 text-zasvet-gold" />,
          title: "Другие калькуляторы:",
          description: "Подбор сечения кабеля, подбор УЗО, энергопотребление объекта."
        },
        {
          icon: <PlusCircle className="h-6 w-6 text-zasvet-gold" />,
          title: "Новые инструменты:",
          description: "Мы регулярно добавляем новые инструменты, предложите тот, которого не хватает Вам."
        }
      ]}
      imageSrc="/lovable-uploads/378d7b1c-0ee8-4206-a084-ba0d42292fb4.png"
      imageAlt="Проектировщику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      calculationType="проект"
      reverse={true}
      bgColor="bg-zasvet-black"
    />
  );
};

export default DesignersSection;
