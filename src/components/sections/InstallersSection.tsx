
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, Cable, LightbulbIcon, Package } from "lucide-react";

const InstallersSection = () => {
  return (
    <TargetSection 
      id="installers"
      title="Монтажнику"
      subtitle="Мы обеспечиваем монтажников всем необходимым для быстрой и безопасной установки наших систем освещения, от инструкций до технической поддержки."
      services={[
        {
          icon: <Cable className="h-6 w-6 text-zasvet-black" />,
          title: "Расчет сечения кабеля:",
          description: "Учитывает длину кабеля, мощность оборудования, тип проводки."
        },
        {
          icon: <Calculator className="h-6 w-6 text-zasvet-black" />,
          title: "Расчет освещения для помещения:",
          description: "Наш калькулятор поможет определить тип и рассчитать количество светильников на объект без специальных знаний."
        },
        {
          icon: <LightbulbIcon className="h-6 w-6 text-zasvet-black" />,
          title: "Подбор аналога светильника:",
          description: "Который заложен в проект для замены на более качественный или дешевый."
        },
        {
          icon: <Package className="h-6 w-6 text-zasvet-black" />,
          title: "Комплексная поставка:",
          description: "Нужны не только светильники? Оставьте заявку и мы найдем Вам всё необходимое."
        }
      ]}
      imageSrc="/lovable-uploads/6167e761-934b-41db-9211-4fff41b61777.png"
      imageAlt="Монтажнику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      calculationType="кабель"
      reverse={false}
      bgColor="bg-zasvet-gold"
      showDiagonalCut={true}
    />
  );
};

export default InstallersSection;
