
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cable } from 'lucide-react';
import { MaterialType, PhaseType, InstallationType } from '../utils/cableCalculatorUtils';
import CableInfoSection from './CableInfoSection';
import CableInputFields from './CableInputFields';
import CableSelectionOptions from './CableSelectionOptions';
import CableSubmitButton from './CableSubmitButton';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await handleSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
      <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
        <CardTitle className="text-xl flex items-center">
          <Cable className="mr-2 h-5 w-5" />
          Калькулятор сечения кабеля
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <CableInfoSection />
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CableInputFields 
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />
            
            <CableSelectionOptions 
              formData={formData}
              handleMaterialChange={handleMaterialChange}
              handlePhaseTypeChange={handlePhaseTypeChange}
              handleInstallationChange={handleInstallationChange}
            />
          </div>
          
          <CableSubmitButton isLoading={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
};

export default CableCalculatorForm;
