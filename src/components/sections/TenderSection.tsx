
import React from 'react';
import { FileText, ClipboardCheck, Search, FileQuestion, Scale, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/hooks/use-contact-form';

const services = [
  { icon: <ClipboardCheck className="h-5 w-5" />, text: 'Подготовка документов для прохождения квалификации и предквалификационных отборов' },
  { icon: <ShieldCheck className="h-5 w-5" />, text: 'Подготовка документов для прохождения аккредитации' },
  { icon: <Search className="h-5 w-5" />, text: 'Обработка и анализ тендерной документации' },
  { icon: <CheckCircle2 className="h-5 w-5" />, text: 'Предоставление чек-листа по закупочной документации' },
  { icon: <FileText className="h-5 w-5" />, text: 'Подготовка заявки на участие в закупках по 44 ФЗ, 223 ФЗ, коммерческих закупках' },
  { icon: <FileQuestion className="h-5 w-5" />, text: 'Подготовка запросов на разъяснение документации' },
  { icon: <Scale className="h-5 w-5" />, text: 'Подготовка жалобы в ФАС' },
];

const tariffs = [
  { service: 'Подготовка тендерной документации', unit: 'Одна закупка', price: 'от 3 000 ₽' },
  { service: 'Подготовка документов для аккредитации на площадке', unit: 'Один заказчик', price: 'от 6 000 ₽' },
  { service: 'Подготовка документов для квалификации и предквалификационных отборов', unit: 'Один заказчик', price: 'от 9 000 ₽' },
];

const extras = [
  { factor: 'Срочность (<24 ч)', coeff: '×2.0', when: 'Срочная подготовка документации' },
  { factor: 'Большой объём документации (от 30 листов)', coeff: '×2.0', when: 'Закупки РОСНЕФТЬ, площадки ЕТПРФ, ГПБ, закрытые секции' },
];

const TenderSection = () => {
  const { openContactForm } = useContactForm();

  return (
    <section id="tender" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-wider text-zasvet-gold font-semibold mb-2">Услуга</div>
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-white mb-4">
            Подготовка тендерной документации
          </h2>
          <div className="w-16 h-1 bg-zasvet-gold mx-auto mb-6"></div>
          <p className="text-lg text-zasvet-white/80 max-w-3xl mx-auto">
            Полный цикл подготовки документов для участия в закупках —
            <span className="font-semibold text-zasvet-gold"> от аккредитации до подачи заявки.</span>
          </p>
        </div>

        {/* Services list */}
        <div className="bg-zasvet-gray/40 border border-zasvet-gold/20 rounded-lg p-8 mb-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-zasvet-white mb-6">Что мы делаем</h3>
          <ul className="space-y-4">
            {services.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="text-zasvet-gold flex-shrink-0 mt-0.5">{s.icon}</div>
                <span className="text-zasvet-white/80">{s.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tariffs */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-zasvet-white text-center mb-8">Тарифы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tariffs.map((t, i) => (
              <div key={i} className="bg-zasvet-gray/40 border border-zasvet-gold/20 rounded-lg p-6 text-center hover:border-zasvet-gold/50 transition-colors">
                <div className="text-2xl font-bold text-zasvet-gold mb-2">{t.price}</div>
                <div className="text-zasvet-white font-medium mb-2">{t.service}</div>
                <div className="text-zasvet-white/50 text-sm">{t.unit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Extra coefficients */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-zasvet-white text-center mb-8">Дополнительные коэффициенты</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zasvet-gold/30">
                  <th className="py-3 px-4 text-zasvet-gold font-semibold text-sm">Услуга</th>
                  <th className="py-3 px-4 text-zasvet-gold font-semibold text-sm">Коэффициент</th>
                  <th className="py-3 px-4 text-zasvet-gold font-semibold text-sm">Когда применяется</th>
                </tr>
              </thead>
              <tbody>
                {extras.map((e, i) => (
                  <tr key={i} className="border-b border-zasvet-gold/10 hover:bg-zasvet-gold/5 transition-colors">
                    <td className="py-3 px-4 text-zasvet-white font-medium">{e.factor}</td>
                    <td className="py-3 px-4 text-zasvet-gold font-bold">{e.coeff}</td>
                    <td className="py-3 px-4 text-zasvet-white/70 text-sm">{e.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black border-2 border-zasvet-gold px-10 py-4 text-lg font-semibold"
            onClick={() => openContactForm("request")}
          >
            <Send className="mr-2 h-5 w-5" />
            Заказать подготовку документации
          </Button>
          <p className="text-zasvet-white/50 text-sm mt-3">
            Опишите закупку — подготовим документы в срок
          </p>
        </div>
      </div>
    </section>
  );
};

export default TenderSection;
