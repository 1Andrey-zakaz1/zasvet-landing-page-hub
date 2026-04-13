
import React from 'react';
import { ShoppingCart, Search, FileCheck, Truck, Phone, ClipboardList, CreditCard, PackageCheck, FileText, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactForm } from '@/hooks/use-contact-form';

const outsourcingServices = [
  { icon: <Search className="h-5 w-5" />, text: 'Расценка запрашиваемых материалов различного уровня сложности' },
  { icon: <FileCheck className="h-5 w-5" />, text: 'Оценка надежности поставщиков' },
  { icon: <ShoppingCart className="h-5 w-5" />, text: 'Выбор оптимальных условий поставок и цен' },
  { icon: <ClipboardList className="h-5 w-5" />, text: 'Согласование контрактов с поставщиками' },
  { icon: <CreditCard className="h-5 w-5" />, text: 'Контроль оплат' },
  { icon: <Truck className="h-5 w-5" />, text: 'Отслеживание поставок: от размещения в производство до доставки' },
  { icon: <AlertTriangle className="h-5 w-5" />, text: 'Работа с рекламациями' },
  { icon: <FileText className="h-5 w-5" />, text: 'Полный документооборот по поставке' },
];

const auditServices = [
  'Аудит имеющихся у вас предложений от поставщиков',
  'Оптимизация условий и цен по поставке',
  'Предоставление отчёта',
];

const tariffs = [
  { name: 'СТАРТ', price: '30 000 ₽', positions: '30', perItem: '1 000 ₽' },
  { name: 'БИЗНЕС', price: '75 000 ₽', positions: '100', perItem: '750 ₽', popular: true },
  { name: 'ПРОФИ', price: '103 000 ₽', positions: '200', perItem: '515 ₽' },
];

const complexityFactors = [
  { factor: 'Стандарт', coeff: '×1.0', when: 'Позиция из каталога, есть у утверждённых поставщиков' },
  { factor: 'Технический подбор', coeff: '×1.5', when: 'Нужен аналог, уточнение ТХ, согласование с инженером' },
  { factor: 'Новый поставщик', coeff: '×1.8', when: 'Поставщик не в базе: проверка, договор' },
  { factor: 'Срочность (<24 ч)', coeff: '×2.0', when: 'Аварийная заявка, требуется срочная закупка' },
  { factor: 'Мелкий опт (<10 ед.)', coeff: '×1.3', when: 'Низкая маржинальность, высокая трудоёмкость обработки' },
  { factor: 'Импорт/таможня', coeff: '—', when: 'Не осуществляем' },
];

const ProcurementSection = () => {
  const { openContactForm } = useContactForm();

  return (
    <section id="procurement" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-wider text-zasvet-gold font-semibold mb-2">
            Услуга
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zasvet-white mb-4">
            Аутсорсинг закупок
          </h2>
          <div className="w-16 h-1 bg-zasvet-gold mx-auto mb-6"></div>
          <p className="text-lg text-zasvet-white/80 max-w-3xl mx-auto">
            Берём на себя закупочную функцию — от подбора поставщиков и заключения контрактов
            до контроля поставки товаров и оказания услуг.
            <br className="hidden md:block" />
            <span className="font-semibold text-zasvet-gold">Обеспечиваем эффективность ваших рутинных работ.</span>
          </p>
        </div>

        {/* Two columns: Outsourcing + Audit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Outsourcing */}
          <div className="bg-zasvet-gray/40 border border-zasvet-gold/20 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <PackageCheck className="h-7 w-7 text-zasvet-gold" />
              <h3 className="text-xl font-bold text-zasvet-white">Аутсорсинг закупок</h3>
            </div>
            <ul className="space-y-4">
              {outsourcingServices.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="text-zasvet-gold flex-shrink-0 mt-0.5">{s.icon}</div>
                  <span className="text-zasvet-white/80">{s.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Audit */}
          <div className="bg-zasvet-gray/40 border border-zasvet-gold/20 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Search className="h-7 w-7 text-zasvet-gold" />
              <h3 className="text-xl font-bold text-zasvet-white">Аудит процессов закупок</h3>
            </div>
            <ul className="space-y-4">
              {auditServices.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="text-zasvet-gold flex-shrink-0 mt-1">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <span className="text-zasvet-white/80">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tariffs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-zasvet-white text-center mb-8">Тарифы</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tariffs.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-lg p-8 text-center border transition-colors ${
                  t.popular
                    ? 'bg-zasvet-gold/10 border-zasvet-gold shadow-lg shadow-zasvet-gold/10'
                    : 'bg-zasvet-gray/40 border-zasvet-gold/20 hover:border-zasvet-gold/50'
                }`}
              >
                {t.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zasvet-gold text-zasvet-black text-xs font-bold px-3 py-1 rounded-full">
                    Популярный
                  </div>
                )}
                <h4 className="text-lg font-bold text-zasvet-gold mb-2">{t.name}</h4>
                <div className="text-3xl font-bold text-zasvet-white mb-1">{t.price}</div>
                <div className="text-zasvet-white/60 text-sm mb-4">до {t.positions} позиций</div>
                <div className="text-zasvet-white/80 text-sm">
                  <span className="text-zasvet-gold font-semibold">{t.perItem}</span> за позицию
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complexity factors */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-zasvet-white text-center mb-8">Факторы сложности</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zasvet-gold/30">
                  <th className="py-3 px-4 text-zasvet-gold font-semibold text-sm">Фактор</th>
                  <th className="py-3 px-4 text-zasvet-gold font-semibold text-sm">Коэффициент</th>
                  <th className="py-3 px-4 text-zasvet-gold font-semibold text-sm">Когда применяется</th>
                </tr>
              </thead>
              <tbody>
                {complexityFactors.map((c, i) => (
                  <tr key={i} className="border-b border-zasvet-gold/10 hover:bg-zasvet-gold/5 transition-colors">
                    <td className="py-3 px-4 text-zasvet-white font-medium">{c.factor}</td>
                    <td className="py-3 px-4 text-zasvet-gold font-bold">{c.coeff}</td>
                    <td className="py-3 px-4 text-zasvet-white/70 text-sm">{c.when}</td>
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
            Обсудить аутсорсинг закупок
          </Button>
          <p className="text-zasvet-white/50 text-sm mt-3">
            Расскажите о ваших задачах — подготовим индивидуальное предложение
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcurementSection;
