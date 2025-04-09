
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TargetSection from '@/components/TargetSection';
import ProductSlider from '@/components/ProductSlider';
import Footer from '@/components/Footer';
import { 
  Calculator, 
  ZapOff, 
  Building, 
  CreditCard, 
  FileText, 
  Lightbulb, 
  Package, 
  Truck, 
  Coins,
  Cable,
  Zap,
  FileCheck
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-zasvet-black text-zasvet-white">
      <Header />
      <HeroSection />
      
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
      />
      
      <TargetSection 
        id="buyers"
        title="Энергетику"
        subtitle="Наша продукция помогает энергетикам оптимизировать энергопотребление и обеспечить качественное освещение на объектах."
        services={[
          {
            icon: <Calculator className="h-6 w-6" />,
            title: "Расчет освещения для помещения:",
            description: "Зная размер и назначение помещения, рассчитайте необходимое освещение."
          },
          {
            icon: <Cable className="h-6 w-6" />,
            title: "Расчет сечения кабеля:",
            description: "Учитывает длину кабеля, мощность оборудования, тип проводки."
          },
          {
            icon: <ZapOff className="h-6 w-6" />,
            title: "Расчет снижения электропотребления:",
            description: "При замене старых светильников на светодиодные."
          },
          {
            icon: <Package className="h-6 w-6" />,
            title: "Подбор сопутствующих материалов:",
            description: "Оставьте заявку и мы подберем и поставим сопутствующие материалы."
          }
        ]}
        imageSrc="/lovable-uploads/c659065f-6d51-40c9-b4e7-369b1600d01e.png"
        imageAlt="Энергетику"
        buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
        reverse={true}
      />
      
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
      />
      
      <TargetSection 
        id="designers"
        title="Проектировщику"
        subtitle="Мы предоставляем проектировщикам все необходимые инструменты и документацию для реализации самых сложных светотехнических проектов."
        services={[
          {
            icon: <Lightbulb className="h-6 w-6" />,
            title: "Подбор оптимального светильника:",
            description: "Наш калькулятор автоматически перебирает все варианты из серии светильников и предлагает оптимальный по цене для нужной освещенности."
          },
          {
            icon: <FileCheck className="h-6 w-6" />,
            title: "Разработка светильника по Т.З.:",
            description: "Оставьте заявку и мы разработаем светильник под Ваш объект и предоставим проект IES файла для него."
          },
          {
            icon: <Calculator className="h-6 w-6" />,
            title: "Другие калькуляторы:",
            description: "Подбор сечения кабеля, подбор УЗО, энергопотребление объекта, подбор аналога светильника."
          },
          {
            icon: <FileText className="h-6 w-6" />,
            title: "Новые инструменты:",
            description: "Мы регулярно добавляем новые инструменты, предложите тот, которого не хватает Вам."
          }
        ]}
        imageSrc="/lovable-uploads/8e2cd786-f655-4ca1-bfdb-65ec9ed06b1d.png"
        imageAlt="Проектировщику"
        buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
        reverse={true}
      />
      
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
        imageSrc="/lovable-uploads/8e5e7ca2-f3d3-4ad9-ba44-81f8526f3be2.png"
        imageAlt="Монтажнику"
        buttonText="ПЕРЕЙТИ К РАСЧЕТАМ"
        bgColor="bg-zasvet-gold"
      />
      
      <ProductSlider />
      <Footer />
    </div>
  );
};

export default Index;

