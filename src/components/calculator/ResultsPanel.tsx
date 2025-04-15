
import React from 'react';
import { BarChart, Info, Lightbulb, LightbulbOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface CalculationResult {
  oldEnergyConsumption: string;
  ledEnergyConsumption: string;
  oldEnergyCost: string;
  ledEnergyCost: string;
  energySavings: string;
  oldMaintenanceCostPerYear: string;
  totalSavingsPerYear: string;
  ledInvestment: string;
  paybackPeriod: string;
  paybackPeriodMonths: number;
  savingsFiveYears: string;
  powerReduction: string;
}

interface ResultsPanelProps {
  results: CalculationResult;
  formData: {
    old_quantity: string;
    old_power: string;
    led_quantity: string;
    led_power: string;
    hours: string;
    energy_cost: string;
    operation_mode: string;
  };
  resetCalculator: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, formData, resetCalculator }) => {
  const { toast } = useToast();

  const getOperationModeText = (mode: string): string => {
    switch(mode) {
      case 'continuous':
        return 'Непрерывный (24/7)';
      case 'daily':
        return 'Ежедневный (рабочие часы)';
      case 'workdays':
        return 'Только рабочие дни';
      case 'seasonal':
        return 'Сезонный (183 дня в год)';
      default:
        return mode;
    }
  };

  return (
    <div className="bg-zasvet-black/70 border border-zasvet-gold/20 shadow-xl rounded-lg mb-8">
      <div className="p-6 border-b border-zasvet-gold/20">
        <h3 className="text-2xl font-bold text-zasvet-white flex items-center mb-4">
          <BarChart className="mr-2 h-6 w-6" /> 
          Результаты расчета окупаемости
        </h3>
        
        <div className="bg-purple-100/10 rounded-lg p-4 mb-4">
          <h4 className="text-xl text-purple-100 flex items-center font-medium">
            <Info className="mr-2 h-5 w-5" /> Результат
          </h4>
          <p className="text-xl mt-2">
            Срок окупаемости: <strong className="text-zasvet-gold">
              {Number(results.paybackPeriod) === Infinity 
                ? "Не окупится" 
                : `${results.paybackPeriodMonths > 12 ? Math.floor(Number(results.paybackPeriod)) : 0} ${
                    results.paybackPeriodMonths > 12 ? (
                      Math.floor(Number(results.paybackPeriod)) === 1 ? "год" : 
                      Math.floor(Number(results.paybackPeriod)) < 5 ? "года" :
                      "лет"
                    ) : ""
                  } ${results.paybackPeriodMonths} ${
                    results.paybackPeriodMonths === 1 ? "месяц" :
                    results.paybackPeriodMonths < 5 ? "месяца" :
                    "месяцев"
                  }`
              }
            </strong>
          </p>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xl font-medium flex items-center mb-4">
            <Lightbulb className="mr-2 h-5 w-5 text-green-400" /> 
            Светодиодные светильники
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Количество</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {formData.led_quantity} шт.
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Мощность одного светильника</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {formData.led_power} Вт
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Суммарная мощность</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(formData.led_power) * parseInt(formData.led_quantity)} Вт
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Годовое энергопотребление</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(results.ledEnergyConsumption).toFixed(1)} кВт·ч
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Затраты на электроэнергию в год</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(results.ledEnergyCost).toLocaleString('ru-RU')} руб.
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2">
              <span className="text-zasvet-white/80">Общие затраты на покупку</span>
              <span className="text-lg bg-amber-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(results.ledInvestment).toLocaleString('ru-RU')} руб.
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xl font-medium flex items-center mb-4">
            <LightbulbOff className="mr-2 h-5 w-5 text-purple-400" /> 
            Старые светильники
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Количество</span>
              <span className="text-lg bg-purple-500 text-white px-3 py-1 rounded-full font-medium">
                {formData.old_quantity} шт.
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Мощность одного светильника</span>
              <span className="text-lg bg-purple-500 text-white px-3 py-1 rounded-full font-medium">
                {formData.old_power} Вт
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Суммарная мощность</span>
              <span className="text-lg bg-purple-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(formData.old_power) * parseInt(formData.old_quantity)} Вт
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Годовое энергопотребление</span>
              <span className="text-lg bg-purple-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(results.oldEnergyConsumption).toFixed(1)} кВт·ч
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Затраты на электроэнергию в год</span>
              <span className="text-lg bg-purple-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(results.oldEnergyCost).toLocaleString('ru-RU')} руб.
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2">
              <span className="text-zasvet-white/80">Общие годовые затраты</span>
              <span className="text-lg bg-red-500 text-white px-3 py-1 rounded-full font-medium">
                {(parseFloat(results.oldEnergyCost) + parseFloat(results.oldMaintenanceCostPerYear)).toLocaleString('ru-RU')} руб.
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-xl font-medium flex items-center mb-4">
            <Lightbulb className="mr-2 h-5 w-5 text-zasvet-gold" /> 
            Экономия
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Годовая экономия</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {parseFloat(results.totalSavingsPerYear).toLocaleString('ru-RU')} руб.
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-zasvet-gold/10 pb-2">
              <span className="text-zasvet-white/80">Снижение суммарной мощности</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {results.powerReduction} Вт
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2">
              <span className="text-zasvet-white/80">Снижение энергопотребления</span>
              <span className="text-lg bg-green-500 text-white px-3 py-1 rounded-full font-medium">
                {(parseFloat(results.oldEnergyConsumption) - parseFloat(results.ledEnergyConsumption)).toFixed(1)} кВт·ч
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-xl font-medium flex items-center mb-4">
            <Info className="mr-2 h-5 w-5" /> 
            Общие параметры расчета
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-zasvet-gray/20 rounded-lg">
              <p className="text-sm text-zasvet-white/70 mb-1">Часы работы в день</p>
              <p className="text-lg font-medium">{formData.hours} часов</p>
            </div>
            <div className="p-3 bg-zasvet-gray/20 rounded-lg">
              <p className="text-sm text-zasvet-white/70 mb-1">Стоимость электроэнергии</p>
              <p className="text-lg font-medium">{formData.energy_cost} руб./кВт·ч</p>
            </div>
            <div className="p-3 bg-zasvet-gray/20 rounded-lg">
              <p className="text-sm text-zasvet-white/70 mb-1">Режим работы светильников</p>
              <p className="text-lg font-medium">{getOperationModeText(formData.operation_mode)}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            variant="outline" 
            className="border-zasvet-gold text-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black"
            onClick={() => window.print()}
          >
            Распечатать результаты
          </Button>
          <Button 
            variant="gold"
            onClick={resetCalculator}
          >
            Новый расчет
          </Button>
          <Button 
            variant="gold"
            onClick={() => {
              toast({
                title: "Результаты сохранены",
                description: "Данные расчета сохранены в кэше браузера",
              });
            }}
          >
            Сохранить расчет
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
