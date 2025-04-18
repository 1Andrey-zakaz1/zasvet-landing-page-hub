
import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import CalculatorForm from './calculator/CalculatorForm';
import ResultsPanel from './calculator/ResultsPanel';
import { 
  validatePositiveInteger, 
  validatePositiveNumber, 
  validateNonNegativeNumber, 
  validateRange, 
  calculateResults,
  type CalculationInputs
} from './calculator/utils/calculatorUtils';
import { FormData, CalculationResult } from './calculator/types';

const LedCalculator = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
  const [showResults, setShowResults] = useState(false);

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
      const calculationInputs: CalculationInputs = {
        oldQuantity: parseInt(formData.old_quantity),
        oldPower: parseFloat(formData.old_power),
        maintenanceCost: parseFloat(formData.maintenance_cost),
        ledQuantity: parseInt(formData.led_quantity),
        ledPower: parseFloat(formData.led_power),
        ledCost: parseFloat(formData.led_cost),
        hoursPerDay: parseFloat(formData.hours),
        energyCost: parseFloat(formData.energy_cost),
        operationMode: formData.operation_mode
      };
      
      const result = calculateResults(calculationInputs);
      setResults(result);
      setShowResults(true);
    } else {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, исправьте отмеченные поля.",
        variant: "destructive"
      });
    }
  };

  const resetCalculator = () => {
    setResults(null);
    setShowResults(false);
    setIsExpanded(true);
  };

  const collapseResults = () => {
    setShowResults(false);
    setIsExpanded(false);
  };

  return (
    <section id="calculator" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="section-title text-zasvet-white mb-2">Калькулятор окупаемости</h2>
          <p className="text-zasvet-white/70 text-base max-w-2xl mx-auto">
            Рассчитайте экономическую эффективность замены старых светильников на энергосберегающие LED
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="flex justify-between items-center bg-zasvet-gray/20 p-4 rounded-lg mb-4 cursor-pointer border border-zasvet-gold/30"
            onClick={toggleForm}
            style={{ display: (results && showResults) ? 'none' : 'flex' }}
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
          
          {isExpanded && !showResults && (
            <CalculatorForm 
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleSubmit={handleSubmit}
            />
          )}
          
          {results && showResults && (
            <ResultsPanel 
              results={results}
              formData={formData}
              resetCalculator={resetCalculator}
              collapseResults={collapseResults}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LedCalculator;
