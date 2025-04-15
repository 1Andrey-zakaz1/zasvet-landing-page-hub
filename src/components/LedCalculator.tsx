import React, { useState } from 'react';
import { Lightbulb, LightbulbOff, Info, Calculator, ChevronDown, ChevronUp, Send, BarChart } from 'lucide-react';
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
    <section id="calculator" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Калькулятор окупаемости</h2>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="flex justify-between items-center bg-zasvet-gray/20 p-4 rounded-lg mb-4 cursor-pointer border border-zasvet-gold/30"
            onClick={toggleForm}
            style={{ display: results ? 'none' : 'flex' }}
          >
            <h3 className="text-xl font-bold text-zasvet-white flex items-center">
              <Calculator className="mr-2 h-5 w-5" /> 
              Расчет окупаемости светодиодных светильников
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
                    <h4 className="text-lg font-medium flex items-center mb-4 pb-2 border-b border-zasvet-gold/20">
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
                  
                  <div className="p-4 border border-zasvet-gold/20 rounded-lg">
                    <h4 className="text-lg font-medium flex items-center mb-4 pb-2 border-b border-zasvet-gold/20">
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
                  
                  <div className="p-4 border border-zasvet-gold/20 rounded-lg">
                    <h4 className="text-lg font-medium flex items-center mb-4 pb-2 border-b border-zasvet-gold/20">
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
                  
                  <Button type="submit" variant="gold" className="w-full py-6 text-lg">
                    <Calculator className="mr-2" /> Рассчитать окупаемость
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
          
          {results && (
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LedCalculator;
