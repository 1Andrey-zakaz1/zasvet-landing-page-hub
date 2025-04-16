
import React, { useState } from 'react';
import { Cable, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import CableCalculatorForm from './cable/CableCalculatorForm';
import CableResultsPanel from './cable/CableResultsPanel';
import { 
  calculateCableSection, 
  validateCableFormData, 
  type CableCalculationResult, 
  type MaterialType, 
  type PhaseType, 
  type InstallationType 
} from './utils/cableCalculatorUtils';

const CableCalculator = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    power: '',
    voltage: '220',
    length: '',
    material: 'copper' as MaterialType,
    phaseType: 'single' as PhaseType,
    installation: 'air' as InstallationType
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CableCalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

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

  const handleMaterialChange = (value: MaterialType) => {
    setFormData(prev => ({ ...prev, material: value }));
  };

  const handlePhaseTypeChange = (value: PhaseType) => {
    // Автоматически обновляем напряжение для трехфазной сети
    let newVoltage = formData.voltage;
    if (value === 'three' && formData.voltage === '220') {
      newVoltage = '380';
    } else if (value === 'single' && formData.voltage === '380') {
      newVoltage = '220';
    }
    
    setFormData(prev => ({ 
      ...prev, 
      phaseType: value,
      voltage: newVoltage
    }));
  };

  const handleInstallationChange = (value: InstallationType) => {
    setFormData(prev => ({ ...prev, installation: value }));
  };

  const validateForm = () => {
    const newErrors = validateCableFormData(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    try {
      if (validateForm()) {
        const calculationInputs = {
          power: parseFloat(formData.power),
          voltage: parseFloat(formData.voltage),
          length: parseFloat(formData.length),
          material: formData.material,
          phaseType: formData.phaseType,
          installation: formData.installation
        };
        
        // Имитация задержки расчета для большей интерактивности
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const result = calculateCableSection(calculationInputs);
        
        if (result.error) {
          toast({
            title: "Ошибка расчета",
            description: result.error,
            variant: "destructive"
          });
        } else {
          setResults(result);
          setShowResults(true);
          
          toast({
            title: "Расчет завершен",
            description: `Рекомендуемое сечение кабеля: ${result.finalSection} мм²`,
            variant: "default"
          });
        }
      } else {
        toast({
          title: "Ошибка валидации",
          description: "Пожалуйста, исправьте отмеченные поля.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Непредвиденная ошибка",
        description: "Произошла ошибка при расчете, пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetCalculator = () => {
    setResults(null);
    setShowResults(false);
    setIsExpanded(true);
    setFormData({
      power: '',
      voltage: '220',
      length: '',
      material: 'copper',
      phaseType: 'single',
      installation: 'air'
    });
    setErrors({});
  };

  const collapseResults = () => {
    setShowResults(false);
    setIsExpanded(false);
  };

  return (
    <section id="cable-calculator" className="bg-zasvet-black py-12 md:py-16 border-t border-zasvet-gray/20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Калькулятор сечения кабеля</h2>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="flex justify-between items-center bg-zasvet-gray/20 p-4 rounded-lg mb-4 cursor-pointer border border-zasvet-gold/30"
            onClick={toggleForm}
            style={{ display: (results && showResults) ? 'none' : 'flex' }}
          >
            <h3 className="text-xl font-bold text-zasvet-white flex items-center">
              <Cable className="mr-2 h-5 w-5" /> 
              Расчет сечения кабеля
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
            <CableCalculatorForm 
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleMaterialChange={handleMaterialChange}
              handlePhaseTypeChange={handlePhaseTypeChange}
              handleInstallationChange={handleInstallationChange}
              handleSubmit={handleSubmit}
            />
          )}
          
          {results && showResults && (
            <CableResultsPanel 
              results={results}
              resetCalculator={resetCalculator}
              collapseResults={collapseResults}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CableCalculator;
