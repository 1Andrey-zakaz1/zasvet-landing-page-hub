
import React from 'react';
import { LightbulbOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OldLightingSectionProps {
  formData: {
    old_quantity: string;
    old_power: string;
    maintenance_cost: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OldLightingSection: React.FC<OldLightingSectionProps> = ({
  formData,
  errors,
  handleChange
}) => {
  return (
    <div className="p-4 border border-zasvet-gold/20 rounded-lg">
      <h4 className="calculator-section-title">
        <LightbulbOff className="mr-2 h-5 w-5" /> Старые светильники
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="old_quantity">Количество старых светильников</Label>
          <div className="relative">
            <Input
              id="old_quantity"
              name="old_quantity"
              type="number"
              placeholder="Укажите количество"
              className={`pr-12 ${errors.old_quantity ? 'border-red-500' : ''}`}
              value={formData.old_quantity}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              шт.
            </div>
          </div>
          {errors.old_quantity && (
            <p className="text-red-500 text-sm">{errors.old_quantity}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="old_power">Мощность одного старого светильника</Label>
          <div className="relative">
            <Input
              id="old_power"
              name="old_power"
              type="number"
              step="0.1"
              placeholder="Укажите мощность"
              className={`pr-12 ${errors.old_power ? 'border-red-500' : ''}`}
              value={formData.old_power}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              Вт
            </div>
          </div>
          {errors.old_power && (
            <p className="text-red-500 text-sm">{errors.old_power}</p>
          )}
        </div>
      </div>
      
      <div>
        <div className="space-y-2">
          <Label htmlFor="maintenance_cost">Затраты на обслуживание одного старого светильника</Label>
          <div className="relative">
            <Input
              id="maintenance_cost"
              name="maintenance_cost"
              type="number"
              step="0.01"
              placeholder="Укажите затраты"
              className={`pr-12 ${errors.maintenance_cost ? 'border-red-500' : ''}`}
              value={formData.maintenance_cost}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              руб.
            </div>
          </div>
          {errors.maintenance_cost && (
            <p className="text-red-500 text-sm">{errors.maintenance_cost}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OldLightingSection;
