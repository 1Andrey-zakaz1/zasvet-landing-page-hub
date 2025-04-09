
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Package, Truck, FileText, ShoppingCart } from "lucide-react";

const BuyersSection = () => {
  return (
    <section className="relative">
      {/* Top diagonal yellow element */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-zasvet-gold bg-wave-top"></div>
      
      <TargetSection 
        id="buyers"
        title="Закупщику"
        subtitle="Мы предлагаем прозрачные условия сотрудничества, гибкую ценовую политику и полный комплект документации для закупщиков и снабженцев."
        services={[
          {
            icon: <FileText className="h-6 w-6" />,
            title: "Коммерческие предложения:",
            description: "Оперативное формирование индивидуальных КП с учетом объема заказа и особенностей проекта."
          },
          {
            icon: <Package className="h-6 w-6" />,
            title: "Подбор аналогов:",
            description: "Подберем аналоги светильников других производителей с сохранением или улучшением характеристик."
          },
          {
            icon: <Truck className="h-6 w-6" />,
            title: "Условия доставки:",
            description: "Прозрачные условия и сроки доставки с возможностью отслеживания груза."
          },
          {
            icon: <ShoppingCart className="h-6 w-6" />,
            title: "Скидочная система:",
            description: "Прогрессивная система скидок в зависимости от объема заказа и истории сотрудничества."
          }
        ]}
        imageSrc="/lovable-uploads/986a3006-77c9-4bc8-bb49-262b91958066.png"
        imageAlt="Закупщику"
        buttonText="ОСТАВИТЬ ЗАЯВКУ"
      />
      
      {/* Bottom diagonal yellow element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-zasvet-gold bg-wave-bottom"></div>
    </section>
  );
};

export default BuyersSection;
