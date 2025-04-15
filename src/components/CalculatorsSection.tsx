
import React from 'react';
import { Calculator, Settings, Filter } from 'lucide-react';

const CalculatorsSection = () => {
  return (
    <section id="calculators" className="py-16 md:py-24 bg-zasvet-gray/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-zasvet-white mb-4">Инструменты для расчетов</h2>
          <p className="text-zasvet-white/80 text-lg max-w-3xl mx-auto">
            Профессиональные калькуляторы для точного расчета освещения, энергопотребления и финансовой эффективности
          </p>
          <div className="flex justify-center mt-8">
            <div className="inline-flex gap-4 p-2 bg-zasvet-black/50 rounded-lg border border-zasvet-gold/20">
              <Filter className="h-6 w-6 text-zasvet-gold" />
              <Calculator className="h-6 w-6 text-zasvet-gold" />
              <Settings className="h-6 w-6 text-zasvet-gold" />
            </div>
          </div>
        </div>
        
        {/* Здесь будут размещены все калькуляторы */}
        {/* В настоящее время у нас есть только LedCalculator */}
      </div>
    </section>
  );
};

export default CalculatorsSection;
