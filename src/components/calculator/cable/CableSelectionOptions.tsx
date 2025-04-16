
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { MaterialType, PhaseType, InstallationType } from '../utils/cableCalculatorUtils';

interface CableSelectionOptionsProps {
  formData: {
    material: MaterialType;
    phaseType: PhaseType;
    installation: InstallationType;
  };
  handleMaterialChange: (value: MaterialType) => void;
  handlePhaseTypeChange: (value: PhaseType) => void;
  handleInstallationChange: (value: InstallationType) => void;
}

const CableSelectionOptions: React.FC<CableSelectionOptionsProps> = ({
  formData,
  handleMaterialChange,
  handlePhaseTypeChange,
  handleInstallationChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-1">
          <Label className="calculator-form-label mb-2 block">
            Материал кабеля
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-zasvet-gold/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Медь имеет лучшую проводимость, но алюминий дешевле</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
        <div className="flex items-center gap-1">
          <Label className="calculator-form-label mb-2 block">
            Тип сети
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-zasvet-gold/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Однофазная сеть (фаза и ноль) или трехфазная (три фазы и ноль)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
        <div className="flex items-center gap-1">
          <Label htmlFor="installation" className="calculator-form-label mb-2 block">
            Способ прокладки
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-zasvet-gold/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">Разные способы прокладки имеют разные допустимые токовые нагрузки</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
  );
};

export default CableSelectionOptions;
