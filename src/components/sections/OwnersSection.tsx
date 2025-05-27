
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, ZapOff, Building, CreditCard } from "lucide-react";

const OwnersSection = () => {
  return (
    <TargetSection 
      id="owners"
      title="Собственнику"
      subtitle="Мы предлагаем решения, которые помогают собственникам зданий и объектов оптимизировать затраты на освещение и повысить энергоэффективность. Проверьте возможно замена освещения на вашем объекте это статья доходов?"
      services={[
        {
          icon: <Calculator className="h-6 w-6 text-zasvet-black" />,
          title: "Расчет освещения для помещения:",
          description: "Наш калькулятор поможет определить тип и рассчитать количество светильников на объект без специальных знаний."
        },
        {
          icon: <ZapOff className="h-6 w-6 text-zasvet-black" />,
          title: "Расчет окупаемости при замене светильников:",
          description: "Узнайте как быстро окупятся вложения в модернизацию освещения."
        },
        {
          icon: <Building className="h-6 w-6 text-zasvet-black" />,
          title: "Объект под ключ:",
          description: "Оставьте заявку и мы просчитаем Ваш объект с монтажными работами и материалами."
        },
        {
          icon: <CreditCard className="h-6 w-6 text-zasvet-black" />,
          title: "КП со скидкой от объема:",
          description: "Оставьте заявку и получите КП со скидкой от объема закупки."
        }
      ]}
      imageSrc="/lovable-uploads/5a6fad7c-b33c-4449-8fa4-925a3a8e58a0.png"
      imageAlt="Собственнику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      calculationType="освещение"
      bgColor="bg-zasvet-gold"
      showDiagonalCut={true}
    />
  );
};

export default OwnersSection;
