
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, ZapOff, Building, CreditCard } from "lucide-react";

const OwnersSection = () => {
  return (
    <TargetSection 
      id="owners"
      title="Собственнику"
      subtitle="Мы предлагаем решения, которые помогают собственникам зданий и объектов оптимизировать затраты на освещение и повысить энергоэффективность."
      services={[
        {
          icon: <Calculator className="h-6 w-6" />,
          title: "Расчет освещения для помещения:",
          description: "Наш калькулятор поможет определить тип и рассчитать количество светильников на объект без специальных знаний."
        },
        {
          icon: <ZapOff className="h-6 w-6" />,
          title: "Расчет окупаемости при замене светильников:",
          description: "Узнайте как быстро окупятся вложения в модернизацию освещения."
        },
        {
          icon: <Building className="h-6 w-6" />,
          title: "Объект под ключ:",
          description: "Оставьте заявку и мы просчитаем Ваш объект с монтажными работами и материалами."
        },
        {
          icon: <CreditCard className="h-6 w-6" />,
          title: "КП со скидкой от объема:",
          description: "Оставьте заявку и получите КП со скидкой от объема закупки."
        }
      ]}
      imageSrc="/lovable-uploads/8e5e7ca2-f3d3-4ad9-ba44-81f8526f3be2.png"
      imageAlt="Собственнику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      bgColor="bg-zasvet-gold"
      showDiagonalCut={true}
    />
  );
};

export default OwnersSection;
