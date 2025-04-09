
import React from 'react';
import TargetSection from '@/components/TargetSection';
import { Wrench, Video, FileText, Clock } from "lucide-react";

const InstallersSection = () => {
  return (
    <TargetSection 
      id="installers"
      title="Монтажнику"
      subtitle="Мы обеспечиваем монтажников всем необходимым для быстрой и безопасной установки наших систем освещения, от инструкций до технической поддержки."
      services={[
        {
          icon: <Wrench className="h-6 w-6" />,
          title: "Инструкции по монтажу:",
          description: "Подробные руководства по установке наших систем освещения с учетом всех нюансов."
        },
        {
          icon: <Video className="h-6 w-6" />,
          title: "Видео мастер-классы:",
          description: "Обучающие видео по монтажу сложных систем освещения и решению типовых задач."
        },
        {
          icon: <FileText className="h-6 w-6" />,
          title: "Бланки отчетов:",
          description: "Стандартизированные формы для документирования выполненных работ и сдачи объектов."
        },
        {
          icon: <Clock className="h-6 w-6" />,
          title: "Техническая поддержка:",
          description: "Оперативные консультации наших специалистов в случае возникновения вопросов при монтаже."
        }
      ]}
      imageSrc="/lovable-uploads/6167e761-934b-41db-9211-4fff41b61777.png"
      imageAlt="Монтажнику"
      buttonText="СКАЧАТЬ ИНСТРУКЦИИ"
      reverse={true}
      bgColor="bg-zasvet-gold"
      showDiagonalCut={true}
    />
  );
};

export default InstallersSection;
