
import React from 'react';
import { Calculator, LightbulbOff, Lightbulb, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OldLightingSection from './OldLightingSection';
import LedLightingSection from './LedLightingSection';
import GeneralParamsSection from './GeneralParamsSection';

interface CalculatorFormProps {
  formData: {
    old_quantity: string;
    old_power: string;
    maintenance_cost: string;
    led_quantity: string;
    led_power: string;
    led_cost: string;
    hours: string;
    energy_cost: string;
    operation_mode: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSelectChange,
  handleSubmit
}) => {
  return (
    <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
      <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
        <CardTitle className="text-xl flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Калькулятор окупаемости светодиодных светильников
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <OldLightingSection 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
          />
          
          <LedLightingSection 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
          />
          
          <GeneralParamsSection 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
          
          <Button type="submit" variant="gold" className="w-full py-6 text-lg">
            <Calculator className="mr-2" /> Рассчитать окупаемость
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CalculatorForm;
