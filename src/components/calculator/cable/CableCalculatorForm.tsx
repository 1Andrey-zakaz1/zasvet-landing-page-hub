
import React from 'react';
import { Cable, Calculator, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { MaterialType, PhaseType, InstallationType } from '../utils/cableCalculatorUtils';

interface CableCalculatorFormProps {
  formData: {
    power: string;
    voltage: string;
    length: string;
    material: MaterialType;
    phaseType: PhaseType;
    installation: InstallationType;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaterialChange: (value: MaterialType) => void;
  handlePhaseTypeChange: (value: PhaseType) => void;
  handleInstallationChange: (value: InstallationType) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CableCalculatorForm: React.FC<CableCalculatorFormProps> = ({
  formData,
  errors,
  handleChange,
  handleMaterialChange,
  handlePhaseTypeChange,
  handleInstallationChange,
  handleSubmit
}) => {
  return (
    <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
      <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
        <CardTitle className="text-xl flex items-center">
          <Cable className="mr-2 h-5 w-5" />
          Калькулятор сечения кабеля
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-6 p-4 bg-zasvet-gray/20 rounded-lg">
          <h5 className="text-lg mb-2 flex items-center text-zasvet-gold">
            <Info className="mr-2 h-5 w-5" /> О калькуляторе
          </h5>
          <p className="text-zasvet-white/80 mb-3">
            Калькулятор поможет вам правильно подобрать сечение кабеля для вашей электрической сети.
          </p>
          
          <div className="text-zasvet-white/80">
            <p className="font-medium mb-1">Важные упрощения:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Используются усредненные значения cosφ = 0.9 и КПД = 0.95</li>
              <li>Максимальные потери напряжения фиксированы на уровне 5%</li>
              <li>Учитываются только стандартные сечения кабелей от 1.5мм²</li>
              <li>Температурные поправки не учитываются</li>
            </ul>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="power" className="calculator-form-label">
                  Мощность нагрузки (кВт)
                </Label>
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
                <Label htmlFor="voltage" className="calculator-form-label">
                  Напряжение сети (В)
                </Label>
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
                <Label htmlFor="length" className="calculator-form-label">
                  Длина кабеля (м)
                </Label>
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
            
            <div className="space-y-4">
              <div>
                <Label className="calculator-form-label mb-2 block">
                  Материал кабеля
                </Label>
                <RadioGroup 
                  value={formData.material} 
                  onValueChange={(value) => handleMaterialChange(value as MaterialType)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="copper" id="copper" />
                    <Label htmlFor="copper" className="text-white">Медь</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aluminum" id="aluminum" />
                    <Label htmlFor="aluminum" className="text-white">Алюминий</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="calculator-form-label mb-2 block">
                  Тип сети
                </Label>
                <RadioGroup 
                  value={formData.phaseType} 
                  onValueChange={(value) => handlePhaseTypeChange(value as PhaseType)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single" className="text-white">Однофазная</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="three" id="three" />
                    <Label htmlFor="three" className="text-white">Трехфазная</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="installation" className="calculator-form-label mb-2 block">
                  Способ прокладки
                </Label>
                <Select 
                  value={formData.installation} 
                  onValueChange={(value) => handleInstallationChange(value as InstallationType)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите способ прокладки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="air">В воздухе</SelectItem>
                    <SelectItem value="ground">В земле</SelectItem>
                    <SelectItem value="pipe">В трубах</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button type="submit" variant="gold" className="w-full py-6 text-lg">
            <Calculator className="mr-2" /> Рассчитать сечение кабеля
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CableCalculatorForm;
