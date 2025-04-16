
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
    setFormData(prev => ({ ...prev, phaseType: value }));
  };

  const handleInstallationChange = (value: InstallationType) => {
    setFormData(prev => ({ ...prev, installation: value }));
  };

  const validateForm = () => {
    const newErrors = validateCableFormData(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const calculationInputs = {
        power: parseFloat(formData.power),
        voltage: parseFloat(formData.voltage),
        length: parseFloat(formData.length),
        material: formData.material,
        phaseType: formData.phaseType,
        installation: formData.installation
      };
      
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
      }
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
