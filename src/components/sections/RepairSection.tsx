
import React from 'react';
import { Wrench, Package, CheckCircle, ShieldCheck, CircleDollarSign, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/hooks/use-contact-form';

const RepairSection = () => {
  const { openContactForm } = useContactForm();

  const handleContact = () => {
    const footer = document.querySelector('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-zasvet-black pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="bg-zasvet-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wrench className="h-10 w-10 text-zasvet-gold" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-zasvet-gold mb-6">
            Ремонт светодиодных светильников
          </h1>
          <p className="text-lg md:text-xl text-zasvet-white/80 max-w-3xl mx-auto">
            Ремонтируем светодиодные светильники <strong className="text-zasvet-gold">любого производителя</strong>. 
            Оцениваем экономическую целесообразность ремонта и предлагаем оптимальное решение.
          </p>
        </div>

        {/* Two options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zasvet-gold/5 border border-zasvet-gold/20 rounded-xl p-8">
            <div className="bg-zasvet-gold/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Wrench className="h-7 w-7 text-zasvet-gold" />
            </div>
            <h3 className="text-2xl font-bold text-zasvet-gold mb-4">Полный ремонт</h3>
            <p className="text-zasvet-white/80 mb-4">
              Берём светильник на ремонт «под ключ»: диагностика, замена вышедших из строя компонентов, 
              тестирование и возврат готового к эксплуатации изделия.
            </p>
            <ul className="space-y-2 text-zasvet-white/70">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Диагностика неисправности
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Замена светодиодных модулей и драйверов
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Тестирование и проверка параметров
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Гарантия на выполненные работы
              </li>
            </ul>
          </div>

          <div className="bg-zasvet-gold/5 border border-zasvet-gold/20 rounded-xl p-8">
            <div className="bg-zasvet-gold/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Package className="h-7 w-7 text-zasvet-gold" />
            </div>
            <h3 className="text-2xl font-bold text-zasvet-gold mb-4">Ремкомплект</h3>
            <p className="text-zasvet-white/80 mb-4">
              Подготовим индивидуальный ремкомплект к вашему светильнику, чтобы вы могли 
              осуществить ремонт самостоятельно силами своей технической службы.
            </p>
            <ul className="space-y-2 text-zasvet-white/70">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Подбор совместимых компонентов
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Инструкция по замене
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Экономия на логистике
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-zasvet-gold shrink-0 mt-0.5" />
                Оперативная доставка комплектующих
              </li>
            </ul>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-zasvet-gold text-center mb-10">
            Как это работает
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Wrench, step: '1', title: 'Обращение', desc: 'Свяжитесь с нами и опишите проблему со светильником — модель, симптомы неисправности' },
              { icon: CircleDollarSign, step: '2', title: 'Оценка', desc: 'Оценим экономическую целесообразность ремонта по сравнению с покупкой нового' },
              { icon: ShieldCheck, step: '3', title: 'Решение', desc: 'Предложим оптимальный вариант: полный ремонт или подготовка ремкомплекта' },
              { icon: Truck, step: '4', title: 'Результат', desc: 'Отремонтированный светильник или готовый ремкомплект с инструкцией' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-zasvet-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-zasvet-gold" />
                </div>
                <div className="bg-zasvet-gold text-zasvet-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-zasvet-gold mb-2">{item.title}</h3>
                <p className="text-zasvet-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key advantage */}
        <div className="bg-zasvet-gold/5 rounded-lg p-8 border border-zasvet-gold/20 mb-12">
          <h3 className="text-xl font-semibold text-zasvet-gold mb-4">
            Экономическая целесообразность — главный приоритет
          </h3>
          <p className="text-zasvet-white/80 mb-4">
            Мы честно оцениваем, имеет ли смысл ремонт. Если стоимость восстановления приближается 
            к цене нового светильника — мы скажем об этом прямо и поможем подобрать замену. 
            Наша цель — сэкономить ваши деньги, а не заработать на бессмысленном ремонте.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-zasvet-white/80">
            <div>
              <strong className="text-zasvet-gold">• Любой производитель:</strong> Работаем со светильниками всех брендов
            </div>
            <div>
              <strong className="text-zasvet-gold">• Прозрачная оценка:</strong> Детальный расчёт стоимости ремонта
            </div>
            <div>
              <strong className="text-zasvet-gold">• Честный подход:</strong> Рекомендуем ремонт только когда это выгодно
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            className="bg-zasvet-gold text-zasvet-black hover:bg-zasvet-gold/90 text-lg px-8 py-6"
            onClick={handleContact}
          >
            Оставить заявку на ремонт
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RepairSection;
