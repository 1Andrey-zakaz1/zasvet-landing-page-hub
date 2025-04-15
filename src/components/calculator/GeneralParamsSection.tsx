
import React from 'react';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GeneralParamsSectionProps {
  formData: {
    hours: string;
    energy_cost: string;
    operation_mode: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
}

const GeneralParamsSection: React.FC<GeneralParamsSectionProps> = ({
  formData,
  errors,
  handleChange,
  handleSelectChange
}) => {
  return (
    <div className="p-4 border border-zasvet-gold/20 rounded-lg">
      <h4 className="calculator-section-title">
        <Info className="mr-2 h-5 w-5" /> Общие параметры
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="hours">Часы работы в день</Label>
          <div className="relative">
            <Input
              id="hours"
              name="hours"
              type="number"
              min="0.1"
              max="24"
              step="0.1"
              placeholder="От 0.1 до 24"
              className={`pr-12 ${errors.hours ? 'border-red-500' : ''}`}
              value={formData.hours}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              часов
            </div>
          </div>
          {errors.hours && (
            <p className="text-red-500 text-sm">{errors.hours}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="energy_cost">Стоимость электроэнергии</Label>
          <div className="relative">
            <Input
              id="energy_cost"
              name="energy_cost"
              type="number"
              step="0.01"
              placeholder="Укажите стоимость"
              className={`pr-12 ${errors.energy_cost ? 'border-red-500' : ''}`}
              value={formData.energy_cost}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white/60">
              руб./кВт·ч
            </div>
          </div>
          {errors.energy_cost && (
            <p className="text-red-500 text-sm">{errors.energy_cost}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="operation_mode">Режим работы светильников</Label>
        <Select
          value={formData.operation_mode}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger id="operation_mode" className={errors.operation_mode ? 'border-red-500' : ''}>
            <SelectValue placeholder="Выберите режим работы..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="continuous">Непрерывный (24/7)</SelectItem>
            <SelectItem value="daily">Ежедневный (рабочие часы)</SelectItem>
            <SelectItem value="workdays">Только рабочие дни</SelectItem>
            <SelectItem value="seasonal">Сезонный (183 дня в год)</SelectItem>
          </SelectContent>
        </Select>
        {errors.operation_mode && (
          <p className="text-red-500 text-sm">{errors.operation_mode}</p>
        )}
      </div>
    </div>
  );
};

export default GeneralParamsSection;
