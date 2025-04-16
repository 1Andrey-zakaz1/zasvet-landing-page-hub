
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface CableInputFieldsProps {
  formData: {
    power: string;
    voltage: string;
    length: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CableInputFields: React.FC<CableInputFieldsProps> = ({
  formData,
  errors,
  handleChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-1">
          <Label htmlFor="power" className="calculator-form-label">
            Мощность нагрузки (кВт)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-zasvet-gold/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Введите полную мощность потребителя или группы потребителей в киловаттах</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="power"
          name="power"
          type="number"
          min="0.1"
          step="0.1"
          value={formData.power}
          onChange={handleChange}
          className={errors.power ? "border-red-500" : ""}
        />
        {errors.power && (
          <p className="text-red-500 text-sm mt-1">{errors.power}</p>
        )}
      </div>
      
      <div>
        <div className="flex items-center gap-1">
          <Label htmlFor="voltage" className="calculator-form-label">
            Напряжение сети (В)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-zasvet-gold/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Стандартные значения: 220В для однофазной и 380В для трехфазной сети</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="voltage"
          name="voltage"
          type="number"
          min="110"
          step="1"
          value={formData.voltage}
          onChange={handleChange}
          className={errors.voltage ? "border-red-500" : ""}
        />
        {errors.voltage && (
          <p className="text-red-500 text-sm mt-1">{errors.voltage}</p>
        )}
      </div>
      
      <div>
        <div className="flex items-center gap-1">
          <Label htmlFor="length" className="calculator-form-label">
            Длина кабеля (м)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-zasvet-gold/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Укажите полную длину кабеля от источника до потребителя</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="length"
          name="length"
          type="number"
          min="1"
          step="1"
          value={formData.length}
          onChange={handleChange}
          className={errors.length ? "border-red-500" : ""}
        />
        {errors.length && (
          <p className="text-red-500 text-sm mt-1">{errors.length}</p>
        )}
      </div>
    </div>
  );
};

export default CableInputFields;
