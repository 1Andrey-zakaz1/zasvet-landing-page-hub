
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LedLightingSectionProps {
  formData: {
    led_quantity: string;
    led_power: string;
    led_cost: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LedLightingSection: React.FC<LedLightingSectionProps> = ({
  formData,
  errors,
  handleChange
}) => {
  return (
    <div className="p-4 border border-zasvet-gold/20 rounded-lg">
      <h4 className="calculator-section-title">
        <Lightbulb className="mr-2 h-5 w-5" /> Светодиодные светильники
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="led_quantity">Количество светодиодных светильников</Label>
          <div className="relative">
            <Input
              id="led_quantity"
              name="led_quantity"
              type="number"
              placeholder="Укажите количество"
              className={`pr-12 ${errors.led_quantity ? 'border-red-500' : ''}`}
              value={formData.led_quantity}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              шт.
            </div>
          </div>
          {errors.led_quantity && (
            <p className="text-red-500 text-sm">{errors.led_quantity}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="led_power">Мощность одного светодиодного светильника</Label>
          <div className="relative">
            <Input
              id="led_power"
              name="led_power"
              type="number"
              step="0.1"
              placeholder="Укажите мощность"
              className={`pr-12 ${errors.led_power ? 'border-red-500' : ''}`}
              value={formData.led_power}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              Вт
            </div>
          </div>
          {errors.led_power && (
            <p className="text-red-500 text-sm">{errors.led_power}</p>
          )}
        </div>
      </div>
      
      <div>
        <div className="space-y-2">
          <Label htmlFor="led_cost">Стоимость одного светодиодного светильника</Label>
          <div className="relative">
            <Input
              id="led_cost"
              name="led_cost"
              type="number"
              step="0.01"
              placeholder="Укажите стоимость"
              className={`pr-12 ${errors.led_cost ? 'border-red-500' : ''}`}
              value={formData.led_cost}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              руб.
            </div>
          </div>
          {errors.led_cost && (
            <p className="text-red-500 text-sm">{errors.led_cost}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LedLightingSection;
