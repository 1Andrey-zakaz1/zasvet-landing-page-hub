
import { useState } from 'react';
import { FormData, CalculationResult } from '@/components/calculator/types';
import { validatePositiveInteger, validatePositiveNumber, validateNonNegativeNumber, validateRange, calculateResults, type CalculationInputs } from '@/components/calculator/utils/calculatorUtils';
import { useToast } from "@/hooks/use-toast";

export const useCalculatorState = () => {
  const { toast } = useToast();
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
  const [isExpanded, setIsExpanded] = useState(false);

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
      setIsExpanded(false);
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

  return {
    formData,
    errors,
    results,
    showResults,
    isExpanded,
    toggleForm,
    handleChange,
    handleSelectChange,
    handleSubmit,
    resetCalculator,
    collapseResults
  };
};
