
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Cable, Zap, Lightbulb, Package } from "lucide-react";

const InstallersSection = () => {
  return (
    <TargetSection 
      id="installers"
      title="Монтажнику"
      subtitle="Наша продукция разработана с учетом простоты монтажа и подключения, что позволяет сократить время и затраты на установку."
      services={[
        {
          icon: <Cable className="h-6 w-6" />,
          title: "Расчет сечения кабеля:",
          description: "Учитывает длину кабеля, мощность оборудования, тип проводки."
        },
        {
          icon: <Zap className="h-6 w-6" />,
          title: "Расчет УЗО:",
          description: "По мощности оборудования."
        },
        {
          icon: <Lightbulb className="h-6 w-6" />,
          title: "Подбор аналога светильника:",
          description: "Который заложен в проект для замены на более качественный или дешевый."
        },
        {
          icon: <Package className="h-6 w-6" />,
          title: "Комплексная поставка:",
          description: "Нужны не только светильники? Оставьте заявку и мы найдем Вам всё необходимое."
        }
      ]}
      imageSrc="/lovable-uploads/ae97a4a7-8461-4970-bb14-53435a6a17f4.png"
      imageAlt="Монтажнику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      bgColor="bg-zasvet-gold"
      showDiagonalCut={true}
    />
  );
};

export default InstallersSection;
