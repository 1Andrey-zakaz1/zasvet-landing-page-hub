import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import IlluminationForm from './illumination/IlluminationForm';
import IlluminationResults from './illumination/IlluminationResults';
import { calculateIllumination } from './illumination/calculations';
import { TableData, IlluminationFormData } from './illumination/types';

const IlluminationCalculator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<IlluminationFormData>({
    roomLength: '',
    roomWidth: '',
    roomHeight: '',
    roomType: '',
    requiredLux: '',
    luminaireType: 'downlight'
  });
  const [results, setResults] = useState<{
    tableData: TableData[];
    bestResult: TableData | null;
    illuminationValues: {
      avgByFlux: number;
      average: number;
      minimum: number;
      uniformity: number;
      kz: number;
      eta: number;
    };
    layout: { 
      cols: number; 
      rows: number; 
      xSp: number; 
      ySp: number; 
      N: number;
    };
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setFormData(prev => ({ ...prev, roomType: value }));
    if (errors.roomType) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.roomType;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.roomLength || isNaN(Number(formData.roomLength)) || Number(formData.roomLength) <= 0) {
      newErrors.roomLength = 'Длина комнаты должна быть положительным числом.';
      isValid = false;
    }

    if (!formData.roomWidth || isNaN(Number(formData.roomWidth)) || Number(formData.roomWidth) <= 0) {
      newErrors.roomWidth = 'Ширина комнаты должна быть положительным числом.';
      isValid = false;
    }

    if (!formData.roomHeight || isNaN(Number(formData.roomHeight)) || Number(formData.roomHeight) <= 0) {
      newErrors.roomHeight = 'Высота комнаты должна быть положительным числом.';
      isValid = false;
    }

    if (!formData.requiredLux || isNaN(Number(formData.requiredLux)) || Number(formData.requiredLux) <= 0) {
      newErrors.requiredLux = 'Требуемая освещенность должна быть положительным числом.';
      isValid = false;
    }

    if (!formData.roomType) {
      newErrors.roomType = 'Выберите тип помещения.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Calculate results using the new utility function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const roomLength = parseFloat(formData.roomLength);
      const roomWidth = parseFloat(formData.roomWidth);
      const roomHeight = parseFloat(formData.roomHeight);
      const requiredLux = parseFloat(formData.requiredLux);
      const luminaireType = formData.luminaireType;

      const { tableData, bestResult, illuminationValues, layout } = calculateIllumination(
        roomLength,
        roomWidth,
        roomHeight,
        requiredLux,
        luminaireType
      );

      setResults({
        tableData,
        bestResult,
        illuminationValues: {
          avgByFlux: illuminationValues.avgByFlux,
          average: illuminationValues.average,
          minimum: illuminationValues.minimum,
          uniformity: illuminationValues.uniformity,
          kz: illuminationValues.kz,
          eta: illuminationValues.eta
        },
        layout
      });
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
  };

  return (
    <section id="illumination-calculator" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Калькулятор освещенности</h2>
        
        {!showResults ? (
          <IlluminationForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          results && (
            <IlluminationResults
              tableData={results.tableData}
              bestResult={results.bestResult}
              illuminationValues={results.illuminationValues}
              formData={formData}
              layout={results.layout}
            />
          )
        )}

        {showResults && (
          <div className="mt-8 flex justify-center">
            <button
              className="bg-zasvet-gold text-zasvet-black font-bold py-2 px-4 rounded"
              onClick={resetCalculator}
            >
              Новый расчет
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default IlluminationCalculator;
