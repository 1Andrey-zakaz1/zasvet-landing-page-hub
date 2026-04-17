import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Sun, Shield, Wallet, TrendingDown, CheckCircle2 } from 'lucide-react';
import { useContactForm } from '@/hooks/use-contact-form';

export interface BudgetLuminaire {
  id: string;
  name: string;
  replaces?: string;
  power: number; // Вт
  flux: number; // Лм
  ip: string;
  price: number; // ₽
  image?: string;
}

// Заглушки — заменим на реальный список, который вы пришлёте
const PLACEHOLDER_ITEMS: BudgetLuminaire[] = [
  { id: 'b-1', name: 'Светильник «Эконом-1»', replaces: 'аналог премиум-бренда', power: 30, flux: 4200, ip: 'IP40', price: 1290 },
  { id: 'b-2', name: 'Светильник «Эконом-2»', replaces: 'аналог премиум-бренда', power: 40, flux: 5600, ip: 'IP54', price: 1690 },
  { id: 'b-3', name: 'Светильник «Эконом-3»', replaces: 'аналог премиум-бренда', power: 50, flux: 7000, ip: 'IP65', price: 1990 },
  { id: 'b-4', name: 'Светильник «Эконом-4»', replaces: 'аналог премиум-бренда', power: 60, flux: 8400, ip: 'IP65', price: 2390 },
  { id: 'b-5', name: 'Светильник «Эконом-5»', replaces: 'аналог премиум-бренда', power: 80, flux: 11200, ip: 'IP65', price: 2990 },
  { id: 'b-6', name: 'Светильник «Эконом-6»', replaces: 'аналог премиум-бренда', power: 100, flux: 14000, ip: 'IP66', price: 3490 },
];

const BudgetSection = () => {
  const { openContactForm } = useContactForm();

  return (
    <section className="py-16 md:py-24 bg-zasvet-black text-zasvet-white">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-zasvet-gold/20 text-zasvet-gold border-zasvet-gold/40 hover:bg-zasvet-gold/30">
            Бюджетная серия
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Замена дорогих брендов <span className="text-zasvet-gold">без потери качества</span>
          </h1>
          <p className="text-lg md:text-xl text-zasvet-white/80 mb-8">
            Светильники с теми же характеристиками, что и у премиум-производителей,
            но дешевле в 1,5–2 раза. Идеально для тендеров и крупных объектов,
            где важна каждая статья экономии.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              size="lg"
              className="bg-zasvet-gold text-zasvet-black hover:bg-zasvet-gold/90"
              onClick={() => openContactForm('request')}
            >
              Запросить прайс
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-zasvet-gold/50 text-zasvet-white hover:bg-zasvet-gold/10"
              onClick={() => openContactForm('contact')}
            >
              Подобрать аналог
            </Button>
          </div>
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="flex items-start gap-3 p-5 rounded-lg bg-zasvet-black/60 border border-zasvet-gold/20">
            <TrendingDown className="h-6 w-6 text-zasvet-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Экономия до 40%</h3>
              <p className="text-sm text-zasvet-white/70">По сравнению с премиум-аналогами при равных параметрах света.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-lg bg-zasvet-black/60 border border-zasvet-gold/20">
            <Shield className="h-6 w-6 text-zasvet-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Гарантия 3 года</h3>
              <p className="text-sm text-zasvet-white/70">Полная замена в случае выхода из строя в гарантийный период.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-lg bg-zasvet-black/60 border border-zasvet-gold/20">
            <CheckCircle2 className="h-6 w-6 text-zasvet-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Со склада</h3>
              <p className="text-sm text-zasvet-white/70">Быстрая отгрузка популярных моделей под объёмы тендеров.</p>
            </div>
          </div>
        </div>

        {/* Карточки */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Каталог бюджетной серии</h2>
          <p className="text-zasvet-white/70">Базовые характеристики и цена. Подробности — по запросу.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_ITEMS.map((item) => (
            <Card
              key={item.id}
              className="bg-zasvet-black/80 border-zasvet-gold/30 text-zasvet-white hover:border-zasvet-gold transition-colors"
            >
              <CardHeader>
                <div className="aspect-video w-full rounded-md bg-zasvet-gold/5 border border-zasvet-gold/20 flex items-center justify-center mb-3">
                  <Sun className="h-12 w-12 text-zasvet-gold/40" />
                </div>
                <CardTitle className="text-xl">{item.name}</CardTitle>
                {item.replaces && (
                  <p className="text-xs text-zasvet-white/60">Заменяет: {item.replaces}</p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-5 text-sm">
                  <li className="flex items-center justify-between border-b border-zasvet-gold/10 pb-2">
                    <span className="flex items-center gap-2 text-zasvet-white/70">
                      <Zap className="h-4 w-4 text-zasvet-gold" /> Мощность
                    </span>
                    <span className="font-semibold">{item.power} Вт</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-zasvet-gold/10 pb-2">
                    <span className="flex items-center gap-2 text-zasvet-white/70">
                      <Sun className="h-4 w-4 text-zasvet-gold" /> Световой поток
                    </span>
                    <span className="font-semibold">{item.flux.toLocaleString('ru-RU')} лм</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zasvet-white/70">
                      <Shield className="h-4 w-4 text-zasvet-gold" /> Защита
                    </span>
                    <span className="font-semibold">{item.ip}</span>
                  </li>
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-zasvet-white/60">Цена от</p>
                    <p className="text-2xl font-bold text-zasvet-gold flex items-center gap-1">
                      <Wallet className="h-5 w-5" />
                      {item.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-zasvet-gold text-zasvet-black hover:bg-zasvet-gold/90"
                    onClick={() => openContactForm('request')}
                  >
                    Заказать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA снизу */}
        <div className="mt-16 max-w-3xl mx-auto text-center p-8 rounded-xl border border-zasvet-gold/30 bg-zasvet-gold/5">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Нужен подбор под ваш проект?</h2>
          <p className="text-zasvet-white/80 mb-6">
            Пришлите спецификацию — подберём бюджетные аналоги с сохранением требований по
            световому потоку, IP и КСС.
          </p>
          <Button
            size="lg"
            className="bg-zasvet-gold text-zasvet-black hover:bg-zasvet-gold/90"
            onClick={() => openContactForm('request')}
          >
            Отправить спецификацию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BudgetSection;
