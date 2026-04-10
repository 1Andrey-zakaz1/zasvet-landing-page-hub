
import React from 'react';
import { Search, Lightbulb, Coins, ShieldCheck, Eye, Users, Clock, Award, CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/hooks/use-contact-form';

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    num: '01',
    title: 'Аудит',
    desc: 'Присылаете смету или реестр позиций — мы проверяем цены, поставщиков, технические решения',
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    num: '02',
    title: 'Предложения',
    desc: 'Готовим отчёт: где можно заменить, где переплата, где можно получить скидку',
  },
  {
    icon: <Coins className="h-8 w-8" />,
    num: '03',
    title: 'Экономия',
    desc: 'Внедряем изменения → фиксируем экономию → наш гонорар = 50% от сэкономленного',
  },
];

const benefits = [
  { icon: <ShieldCheck className="h-5 w-5" />, title: 'Нет рисков', desc: 'Не нашли экономию? Вы ничего не платите' },
  { icon: <Eye className="h-5 w-5" />, title: 'Прозрачно', desc: 'Все предложения — с обоснованием и расчётами в отчёте' },
  { icon: <Users className="h-5 w-5" />, title: 'Нет конфликтов', desc: 'Мы не «обвиняем», а предлагаем решения для оптимизации' },
  { icon: <Clock className="h-5 w-5" />, title: 'Без отвлечения', desc: 'Ваша команда продолжает работать, мы делаем аудит параллельно' },
  { icon: <Award className="h-5 w-5" />, title: 'Экспертиза', desc: 'Знаем рынок электротехники, альтернативы и «подводные камни»' },
];

const checklist = [
  'Соответствие цен рыночному уровню',
  'Возможность замены на аналоги без потери качества',
  'Условия оплаты и поставки (дополнительные скидки)',
  'Надёжность поставщиков в спецификации',
  'Логистические издержки и скрытые расходы',
];

const AuditSection = () => {
  const { openContactForm } = useContactForm();

  return (
    <section id="audit" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-wider text-zasvet-gold font-semibold mb-2">
            Услуга
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-white mb-4">
            Аудит смет на электротехнику
          </h2>
          <div className="w-16 h-1 bg-zasvet-gold mx-auto mb-6"></div>
          <p className="text-lg text-zasvet-white/80 max-w-3xl mx-auto">
            Находим переплаты, предлагаем замены, ведём переговоры с поставщиками.
            <br className="hidden md:block" />
            <span className="font-semibold text-zasvet-gold">Платите только если мы сэкономили ваши деньги.</span>
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.num} className="relative bg-zasvet-gray/40 border border-zasvet-gold/20 rounded-lg p-8 text-center group hover:border-zasvet-gold/60 transition-colors">
              <div className="text-zasvet-gold/30 text-5xl font-bold absolute top-4 right-6 select-none">{step.num}</div>
              <div className="text-zasvet-gold mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-bold text-zasvet-white mb-3">{step.title}</h3>
              <p className="text-zasvet-white/70">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Case study */}
        <div className="bg-zasvet-gold/10 border border-zasvet-gold/30 rounded-lg p-8 mb-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-zasvet-gold mb-4 text-center">Пример: реальный кейс</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-zasvet-white">10 млн ₽</div>
              <div className="text-sm text-zasvet-white/60">Смета до аудита</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zasvet-gold">8,5 млн ₽</div>
              <div className="text-sm text-zasvet-white/60">После аудита</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-zasvet-white">1,5 млн ₽</div>
              <div className="text-sm text-zasvet-white/60">Экономия</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">+750 тыс. ₽</div>
              <div className="text-sm text-zasvet-white/60">Ваш результат</div>
            </div>
          </div>
          <p className="text-zasvet-white/50 text-sm text-center mt-4">
            Наш гонорар 750 тыс. ₽ — только из сэкономленной суммы. Вы ничего не платите заранее.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-zasvet-white text-center mb-8">Почему это выгодно</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="text-zasvet-gold flex-shrink-0 mt-1">{b.icon}</div>
                <div>
                  <h4 className="font-semibold text-zasvet-white">{b.title}</h4>
                  <p className="text-zasvet-white/70 text-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="mb-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-zasvet-white text-center mb-6">Что мы проверяем</h3>
          <ul className="space-y-3">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-zasvet-white/80">
                <CheckCircle2 className="h-5 w-5 text-zasvet-gold flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Key message */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-lg text-zasvet-white/80 italic">
            «Мы зарабатываем только тогда, когда экономите вы. Нет экономии — нет оплаты.
            Ваши интересы и наши — совпадают.»
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black border-2 border-zasvet-gold px-10 py-4 text-lg font-semibold"
            onClick={() => openContactForm("request")}
          >
            <Send className="mr-2 h-5 w-5" />
            Получить бесплатную оценку сметы
          </Button>
          <p className="text-zasvet-white/50 text-sm mt-3">
            Пришлите 5–10 позиций — покажем потенциал экономии
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuditSection;
