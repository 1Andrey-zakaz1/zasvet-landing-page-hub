
import React from 'react';
import { Link } from 'react-router-dom';
import RolePage from './RolePage';
import BuyersSection from '@/components/sections/BuyersSection';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TenderBanner = () => (
  <section className="bg-zasvet-gray py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="bg-zasvet-black border border-zasvet-gold/30 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-zasvet-gold/20 flex items-center justify-center">
            <FileText className="h-8 w-8 text-zasvet-gold" />
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-2xl font-bold text-zasvet-white mb-2">
            Подготовка тендерной документации
          </h3>
          <p className="text-zasvet-white/70 max-w-xl">
            Подготовка заявок по 44 ФЗ, 223 ФЗ, коммерческим закупкам. Аккредитация и квалификация.
            <span className="text-zasvet-gold font-semibold"> От 3 000 ₽ за закупку.</span>
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link to="/tender">
            <Button className="bg-zasvet-gold hover:bg-zasvet-darkgold text-zasvet-black px-8 py-4 text-lg font-semibold group">
              Подробнее
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const BuyersPage = () => (
  <RolePage roleSection={
    <>
      <BuyersSection />
      <TenderBanner />
    </>
  } />
);

export default BuyersPage;
