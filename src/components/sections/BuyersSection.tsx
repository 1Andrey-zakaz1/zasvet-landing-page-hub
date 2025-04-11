
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Calculator, ShoppingCart, Truck, BarChart3 } from "lucide-react";

const BuyersSection = () => {
  return (
    <TargetSection 
      id="buyers"
      title="Закупщику"
      subtitle="Мы предлагаем прозрачные условия сотрудничества, гибкую ценовую политику и полный комплект документации для закупщиков и снабженцев."
      services={[
        {
          icon: <Calculator className="h-6 w-6" />,
          title: "Подбор аналогов:",
          description: "Наш калькулятор подберет в онлайн режиме аналог нужного Вам светильника."
        },
        {
          icon: <ShoppingCart className="h-6 w-6" />,
          title: "Комплексная поставка:",
          description: "Нужны не только светильники? Оставьте заявку и мы найдем Вам всё необходимое."
        },
        {
          icon: <Truck className="h-6 w-6" />,
          title: "Расчет доставки:",
          description: "Оставьте заявку и мы рассчитаем поставку до Вашего объекта."
        },
        {
          icon: <BarChart3 className="h-6 w-6" />,
          title: "Конъюнктурный анализ цен:",
          description: "Оставьте заявку и мы подберем светильники из разных ценовых категорий."
        }
      ]}
      imageSrc="/lovable-uploads/986a3006-77c9-4bc8-bb49-262b91958066.png"
      imageAlt="Закупщику"
      buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
      bgColor="bg-zasvet-gold"
      showDiagonalCut={true}
    />
  );
};

export default BuyersSection;
