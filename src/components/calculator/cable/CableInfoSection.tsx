
import { Info } from 'lucide-react';

const CableInfoSection: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-zasvet-gray/20 rounded-lg">
      <h5 className="text-lg mb-2 flex items-center text-zasvet-gold">
        <Info className="mr-2 h-5 w-5" /> О калькуляторе
      </h5>
      <p className="text-zasvet-white/80 mb-3">
        Калькулятор поможет вам правильно подобрать сечение кабеля для вашей электрической сети.
      </p>
      
      <div className="text-zasvet-white/80">
        <p className="font-medium mb-1">Важные упрощения:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Используются усредненные значения cosφ = 0.9 и КПД = 0.95</li>
          <li>Максимальные потери напряжения фиксированы на уровне 5%</li>
          <li>Учитываются только стандартные сечения кабелей от 1.5мм²</li>
          <li>Температурные поправки не учитываются</li>
        </ul>
      </div>
    </div>
  );
};

export default CableInfoSection;
