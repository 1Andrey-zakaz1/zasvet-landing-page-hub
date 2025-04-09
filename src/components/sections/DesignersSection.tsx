
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { FileText, Ruler, Clock, Download } from "lucide-react";

const DesignersSection = () => {
  return (
    <TargetSection 
      id="designers"
      title="Проектировщику"
      subtitle="Мы предоставляем комплексные инструменты для проектирования эффективных систем освещения, отвечающих техническим требованиям и эстетическим ожиданиям."
      services={[
        {
          icon: <FileText className="h-6 w-6" />,
          title: "Проекты в Dialux:",
          description: "Предоставляем базы данных светильников для Dialux, упрощающие процесс дизайна освещения."
        },
        {
          icon: <Ruler className="h-6 w-6" />,
          title: "Каталоги и BIM модели:",
          description: "Доступ к BIM моделям для удобной интеграции наших решений в ваши проекты."
        },
        {
          icon: <Clock className="h-6 w-6" />,
          title: "Техническое задание:",
          description: "Оставьте техническое задание и мы проконсультируем по типам и количеству светильников."
        },
        {
          icon: <Download className="h-6 w-6" />,
          title: "Документация:",
          description: "Получите доступ к технической документации, сертификатам и инструкциям по установке."
        }
      ]}
      imageSrc="/lovable-uploads/378d7b1c-0ee8-4206-a084-ba0d42292fb4.png"
      imageAlt="Проектировщику"
      buttonText="ЗАГРУЗИТЬ МОДЕЛИ"
      reverse={true}
    />
  );
};

export default DesignersSection;
