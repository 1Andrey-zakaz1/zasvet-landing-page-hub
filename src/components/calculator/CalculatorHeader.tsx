
import React from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalculatorHeaderProps {
  isExpanded: boolean;
  toggleForm: () => void;
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({ isExpanded, toggleForm }) => {
  return (
    <div 
      className="flex justify-between items-center bg-zasvet-gray/20 p-4 rounded-lg mb-4 cursor-pointer border border-zasvet-gold/30"
      onClick={toggleForm}
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
  );
};

export default CalculatorHeader;
