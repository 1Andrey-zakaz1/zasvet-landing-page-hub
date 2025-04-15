import React, { useState } from 'react';
import { Lightbulb, LightbulbOff, Info, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const LedCalculator = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    old_quantity: '',
    old_power: '',
    maintenance_cost: '',
    led_quantity: '',
    led_power: '',
    led_cost: '',
    hours: '',
    energy_cost: '',
    operation_mode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CalculationResult | null>(null);

  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, operation_mode: value }));
    
    if (errors.operation_mode) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.operation_mode;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!validatePositiveInteger(formData.old_quantity)) {
      newErrors.old_quantity = 'Количество старых светильников должно быть положительным целым числом.';
      isValid = false;
    }
    
    if (!validatePositiveNumber(formData.old_power)) {
      newErrors.old_power = 'Мощность старых светильников должна быть положительным числом.';
      isValid = false;
    }
    
    if (!validateNonNegativeNumber(formData.maintenance_cost)) {
      newErrors.maintenance_cost = 'Затраты на обслуживание не могут быть отрицательными.';
      isValid = false;
    }
    
    if (!validatePositiveInteger(formData.led_quantity)) {
      newErrors.led_quantity = 'Количество LED светильников должно быть положительным целым числом.';
      isValid = false;
    }
    
    if (!validatePositiveNumber(formData.led_power)) {
      newErrors.led_power = 'Мощность LED светильников должна быть положительным числом.';
      isValid = false;
    }
    
    if (!validatePositiveNumber(formData.led_cost)) {
      newErrors.led_cost = 'Стоимость LED светильника должна быть положительным числом.';
      isValid = false;
    }
    
    if (!validateRange(formData.hours, 0.1, 24)) {
      newErrors.hours = 'Часы работы должны быть в диапазоне от 0.1 до 24.';
      isValid = false;
    }
    
    if (!validatePositiveNumber(formData.energy_cost)) {
      newErrors.energy_cost = 'Стоимость электроэнергии должна быть положительным числом.';
      isValid = false;
    }
    
    if (!formData.operation_mode || ['continuous', 'daily', 'workdays', 'seasonal'].indexOf(formData.operation_mode) === -1) {
      newErrors.operation_mode = 'Выберите режим работы светильников.';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      calculateResults();
    } else {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, исправьте отмеченные поля.",
        variant: "destructive"
      });
    }
  };

  const calculateResults = () => {
    const oldQuantity = parseInt(formData.old_quantity);
    const oldPower = parseFloat(formData.old_power);
    const maintenanceCost = parseFloat(formData.maintenance_cost);
    const ledQuantity = parseInt(formData.led_quantity);
    const ledPower = parseFloat(formData.led_power);
    const ledCost = parseFloat(formData.led_cost);
    const hoursPerDay = parseFloat(formData.hours);
    const energyCost = parseFloat(formData.energy_cost);
    
    let daysPerYear;
    switch (formData.operation_mode) {
      case 'continuous':
        daysPerYear = 365;
        break;
      case 'daily':
        daysPerYear = 365;
        break;
      case 'workdays':
        daysPerYear = 250;
        break;
      case 'seasonal':
        daysPerYear = 183;
        break;
      default:
        daysPerYear = 365;
    }
    
    const oldEnergyConsumption = oldQuantity * oldPower * hoursPerDay * daysPerYear / 1000;
    const ledEnergyConsumption = ledQuantity * ledPower * hoursPerDay * daysPerYear / 1000;
    
    const oldEnergyCost = oldEnergyConsumption * energyCost;
    const ledEnergyCost = ledEnergyConsumption * energyCost;
    
    const energySavings = oldEnergyCost - ledEnergyCost;
    
    const oldMaintenanceCostPerYear = oldQuantity * maintenanceCost;
    
    const totalSavingsPerYear = energySavings + oldMaintenanceCostPerYear;
    
    const ledInvestment = ledQuantity * ledCost;
    
    const paybackPeriod = ledInvestment / totalSavingsPerYear;
    
    const paybackPeriodMonths = paybackPeriod * 12;
    
    const savingsFiveYears = totalSavingsPerYear * 5 - ledInvestment;
    
    const powerReduction = (oldQuantity * oldPower) - (ledQuantity * ledPower);
    
    setResults({
      oldEnergyConsumption: oldEnergyConsumption.toFixed(2),
      ledEnergyConsumption: ledEnergyConsumption.toFixed(2),
      oldEnergyCost: oldEnergyCost.toFixed(2),
      ledEnergyCost: ledEnergyCost.toFixed(2),
      energySavings: energySavings.toFixed(2),
      oldMaintenanceCostPerYear: oldMaintenanceCostPerYear.toFixed(2),
      totalSavingsPerYear: totalSavingsPerYear.toFixed(2),
      ledInvestment: ledInvestment.toFixed(2),
      paybackPeriod: paybackPeriod.toFixed(2),
      paybackPeriodMonths: Math.ceil(paybackPeriodMonths),
      savingsFiveYears: savingsFiveYears.toFixed(2),
      powerReduction: powerReduction.toFixed(2)
    });
  };

  const validatePositiveInteger = (value: string) => {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && num === parseFloat(value);
  };

  const validatePositiveNumber = (value: string) => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  };

  const validateNonNegativeNumber = (value: string) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0;
  };

  const validateRange = (value: string, min: number, max: number) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  };

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
    <section id="calculator-электропотребление" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12 text-center">Калькулятор окупаемости</h2>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="flex justify-between items-center bg-zasvet-gray/20 p-4 rounded-lg mb-4 cursor-pointer border border-zasvet-gold/30"
            onClick={toggleForm}
            style={{ display: results ? 'none' : 'flex' }}
          >
            <h3 className="text-xl font-bold text-zasvet-white flex items-center">
              <Calculator className="mr-2 h-5 w-5" /> 
              <span className="text-zasvet-gold/90">Расчет окупаемости светодиодных светильников</span>
            </h3>
            <Button 
              variant="gold" 
              className="transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                toggleForm();
              }}
            >
              {isExpanded ? 
                <><ChevronUp className="mr-1" /> Свернуть</> : 
                <><ChevronDown className="mr-1" /> Рассчитать</>
              }
            </Button>
          </div>
          
          {isExpanded && !results && (
            <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
              <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Калькулятор окупаемости светодиодных светильников
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="p-4 border border-zasvet-gold/20 rounded-lg">
                    <h4 className="text-lg font-medium flex items-center mb-4 pb-2 border-b border-zasvet-gold/20 text-zasvet-gold">
                      <LightbulbOff className="mr-2 h-5 w-5" /> Старые светильники
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="old_quantity" className="text-zasvet-white text-base">Количество старых светильников</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
                            шт.
                          </div>
                        </div>
                        {errors.old_quantity && (
                          <p className="text-red-500 text-sm">{errors.old_quantity}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="old_power" className="text-zasvet-white text-base">Мощность одного старого светильника</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
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
                        <Label htmlFor="maintenance_cost" className="text-zasvet-white text-base">Затраты на обслуживание одного старого светильника</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
                            руб.
                          </div>
                        </div>
                        {errors.maintenance_cost && (
                          <p className="text-red-500 text-sm">{errors.maintenance_cost}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-zasvet-gold/20 rounded-lg">
                    <h4 className="text-lg font-medium flex items-center mb-4 pb-2 border-b border-zasvet-gold/20 text-zasvet-gold">
                      <Lightbulb className="mr-2 h-5 w-5" /> Светодиодные светильники
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="led_quantity" className="text-zasvet-white text-base">Количество светодиодных светильников</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
                            шт.
                          </div>
                        </div>
                        {errors.led_quantity && (
                          <p className="text-red-500 text-sm">{errors.led_quantity}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="led_power" className="text-zasvet-white text-base">Мощность одного светодиодного светильника</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
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
                        <Label htmlFor="led_cost" className="text-zasvet-white text-base">Стоимость одного светодиодного светильника</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
                            руб.
                          </div>
                        </div>
                        {errors.led_cost && (
                          <p className="text-red-500 text-sm">{errors.led_cost}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-zasvet-gold/20 rounded-lg">
                    <h4 className="text-lg font-medium flex items-center mb-4 pb-2 border-b border-zasvet-gold/20 text-zasvet-gold">
                      <Info className="mr-2 h-5 w-5" /> Общие параметры
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="hours" className="text-zasvet-white text-base">Часы работы в день</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
                            часов
                          </div>
                        </div>
                        {errors.hours && (
                          <p className="text-red-500 text-sm">{errors.hours}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="energy_cost" className="text-zasvet-white text-base">Стоимость электроэнергии</Label>
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
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zasvet-white">
                            руб./кВт·ч
                          </div>
                        </div>
                        {errors.energy_cost && (
                          <p className="text-red-500 text-sm">{errors.energy_cost}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="operation_mode" className="text-zasvet-white text-base">Режим работы светильников</Label>
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
                  
                  <Button type="submit" variant="gold" className="w-full py-6 text-lg">
                    <Calculator className="mr-2" /> Рассчитать окупаемость
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
          
          {results && (
            <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
              <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Результаты расчета окупаемости
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="p-4 bg-zasvet-gold/10 rounded-lg border border-zasvet-gold mb-4">
                  <h5 className="text-xl font-bold text-zasvet-gold mb-3">
                    <Info className="inline-block mr-2 h-5 w-5" /> Результат
                  </h5>
                  <p className="text-lg">
                    Срок окупаемости: <strong>
                      {Number(results.paybackPeriod) === Infinity 
                        ? "Не окупится" 
                        : `${Math.floor(Number(results.paybackPeriod))} ${
                            Math.floor(Number(results.paybackPeriod)) === 1 ? "год" : 
                            Math.floor(Number(results.paybackPeriod)) < 5 ? "года" :
                            "лет"
                          } ${results.paybackPeriodMonths} ${
                            results.paybackPeriodMonths === 1 ? "месяц" :
                            results.paybackPeriodMonths < 5 ? "месяца" :
                            "месяцев"
                          }`
                      }
                    </strong>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-zasvet-black/30 rounded-lg">
                    <h5 className="text-lg font-medium text-zasvet-gold mb-3 flex items-center">
                      <LightbulbOff className="mr-2 h-5 w-5" /> Старые светильники
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Количество:</span>
                        <span className="font-medium">{formData.old_quantity} шт.</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Мощность одного светильника:</span>
                        <span className="font-medium">{formData.old_power} Вт</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Суммарная мощность:</span>
                        <span className="font-medium">{parseInt(formData.old_quantity) * parseFloat(formData.old_power)} Вт</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Годовое энергопотребление:</span>
                        <span className="font-medium">{results.oldEnergyConsumption} кВт·ч</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Затраты на электроэнергию в год:</span>
                        <span className="font-medium">{parseFloat(results.oldEnergyCost).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} руб.</span>
                      </li>
                      <li className="flex justify-between pt-2 border-t border-zasvet-gold/20">
                        <span>Общие годовые затраты:</span>
                        <span className="font-bold text-zasvet-gold">
                          {(parseFloat(results.oldEnergyCost) + parseFloat(results.oldMaintenanceCostPerYear)).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} руб.
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-zasvet-black/30 rounded-lg">
                    <h5 className="text-lg font-medium text-zasvet-gold mb-3 flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5" /> Светодиодные светильники
                    </h5>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Количество:</span>
                        <span className="font-medium">{formData.led_quantity} шт.</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Мощность одного светильника:</span>
                        <span className="font-medium">{formData.led_power} Вт</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Суммарная мощность:</span>
                        <span className="font-medium">{parseInt(formData.led_quantity) * parseFloat(formData.led_power)} Вт</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Годовое энергопотребление:</span>
                        <span className="font-medium">{results.ledEnergyConsumption} кВт·ч</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Затраты на электроэнергию в год:</span>
                        <span className="font-medium">{parseFloat(results.ledEnergyCost).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} руб.</span>
                      </li>
                      <li className="flex justify-between pt-2 border-t border-zasvet-gold/20">
                        <span>Общие затраты на покупку:</span>
                        <span className="font-bold text-zasvet-gold">
                          {parseFloat(results.ledInvestment).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} руб.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 bg-zasvet-black/30 rounded-lg mb-6">
                  <h5 className="text-lg font-medium text-zasvet-gold mb-3 flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Экономия
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-zasvet-gray/20 rounded-lg">
                      <p className="text-sm mb-1">Годовая экономия</p>
                      <p className="text-xl font-bold text-zasvet-gold">{parseFloat(results.totalSavingsPerYear).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} руб.</p>
                    </div>
                    
                    <div className="text-center p-3 bg-zasvet-gray/20 rounded-lg">
                      <p className="text-sm mb-1">Снижение мощности</p>
                      <p className="text-xl font-bold text-zasvet-gold">{results.powerReduction} Вт</p>
                    </div>
                    
                    <div className="text-center p-3 bg-zasvet-gray/20 rounded-lg">
                      <p className="text-sm mb-1">Снижение энергопотребления</p>
                      <p className="text-xl font-bold text-zasvet-gold">
                        {(parseFloat(results.oldEnergyConsumption) - parseFloat(results.ledEnergyConsumption)).toFixed(1)} кВт·ч
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-zasvet-gray/20 rounded-lg">
                      <p className="text-sm mb-1">Экономия за 5 лет</p>
                      <p className="text-xl font-bold text-zasvet-gold">{parseFloat(results.savingsFiveYears).toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2})} руб.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-zasvet-black/30 rounded-lg mb-6">
                  <h5 className="text-lg font-medium text-zasvet-gold mb-3 flex items-center">
                    <Info className="mr-2 h-5 w-5" /> Общие параметры расчета
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-zasvet-gray/20 rounded-lg">
                      <p className="text-sm mb-1">Часы работы в день</p>
                      <p className="text-lg font-medium">{formData.hours} часов</p>
                    </div>
                    <div className="p-3 bg-zasvet-gray/20 rounded-lg">
                      <p className="text-sm mb-1">Стоимость электроэнергии</p>
                      <p className="text-lg font-medium">{formData.energy_cost} руб./кВт·ч</p>
                    </div>
                    <div className="p-3 bg-zasvet-gray/20 rounded-lg">
                      <p className="text-sm mb-1">Режим работы светильников</p>
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
                    onClick={() => {
                      setResults(null);
                      setIsExpanded(true);
                    }}
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default LedCalculator;
