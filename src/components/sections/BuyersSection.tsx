
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Lightbulb, Package, Truck, Coins } from "lucide-react";

const BuyersSection = () => {
  return (
    <TargetSection 
      id="designers"
      title="Закупщику"
      subtitle="Наша продукция соответствует высоким стандартам качества и имеет все необходимые сертификаты, что делает процесс закупок прозрачным и надежным."
      services={[
        {
          icon: <Lightbulb className="h-6 w-6" />,
          title: "Подбор аналогов:",
          description: "Наш калькулятор подберет в онлайн режиме аналог нужного Вам светильника."
        },
        {
          icon: <Package className="h-6 w-6" />,
          title: "Комплексная поставка:",
          description: "Нужны не только светильники? Оставьте заявку и мы найдем Вам всё необходимое."
        },
        {
          icon: <Truck className="h-6 w-6" />,
          title: "Расчет доставки:",
          description: "Оставьте заявку и мы рассчитаем поставку до Вашего объекта."
        },
        {
          icon: <Coins className="h-6 w-6" />,
          title: "Конкурентоспособный анализ цен:",
          description: "Оставьте заявку и мы подберем светильники из разных ценовых категорий."
        }
      ]}
      imageSrc="/lovable-uploads/73a54517-b93b-448f-bad2-1848a88f57d1.png"
      imageAlt="Закупщику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      bgColor="bg-zasvet-gold"
      showDiagonalCut={true}
    />
  );
};

export default BuyersSection;
