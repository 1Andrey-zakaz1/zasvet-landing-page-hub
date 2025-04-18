
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { recommendedLux } from './data';
import { IlluminationFormData } from './types';

interface IlluminationFormProps {
  formData: IlluminationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (id: string, value: string) => void;
  calculateResults: (e: React.FormEvent) => void;
}

const IlluminationForm: React.FC<IlluminationFormProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  calculateResults
}) => {
  // Sort room types by illumination level
  const sortedRoomTypes = Object.entries(recommendedLux)
    .sort(([, a], [, b]) => a - b)
    .map(([type]) => type);

  return (
    <form onSubmit={calculateResults} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room dimensions */}
        <div className="space-y-4">
          <h4 className="calculator-section-title">Параметры помещения</h4>
          
          <div className="space-y-2">
            <Label htmlFor="roomLength">Длина помещения, м</Label>
            <Input
              id="roomLength"
              type="number"
              min="1"
              step="0.1"
              value={formData.roomLength}
              onChange={handleChange}
              required
              className="text-zasvet-black"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="roomWidth">Ширина помещения, м</Label>
            <Input
              id="roomWidth"
              type="number"
              min="1"
              step="0.1"
              value={formData.roomWidth}
              onChange={handleChange}
              required
              className="text-zasvet-black"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="roomHeight">Высота помещения, м</Label>
            <Input
              id="roomHeight"
              type="number"
              min="1"
              step="0.1"
              value={formData.roomHeight}
              onChange={handleChange}
              required
              className="text-zasvet-black"
            />
          </div>
        </div>
        
        {/* Room type and lighting parameters */}
        <div className="space-y-4">
          <h4 className="calculator-section-title">Параметры освещения</h4>
          
          <div className="space-y-2">
            <Label htmlFor="roomType">Тип помещения</Label>
            <Select
              value={formData.roomType}
              onValueChange={(value) => handleSelectChange('roomType', value)}
            >
              <SelectTrigger id="roomType" className="text-zasvet-black">
                <SelectValue placeholder="Выберите тип помещения" />
              </SelectTrigger>
              <SelectContent>
                {sortedRoomTypes.map(type => {
                  const labels: Record<string, string> = {
                    corridor: 'Коридор',
                    kladovka: 'Кладовка',
                    warehouse: 'Склад',
                    office: 'Офис',
                    retail: 'Торговый зал',
                    vitrina: 'Витрина'
                  };
                  return (
                    <SelectItem key={type} value={type}>
                      {labels[type]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requiredLux">Требуемая освещённость, лк</Label>
            <Input
              id="requiredLux"
              type="number"
              min="1"
              step="10"
              value={formData.requiredLux}
              onChange={handleChange}
              required
              className="text-zasvet-black"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="luminaireType">Тип светильников</Label>
            <Select
              value={formData.luminaireType}
              onValueChange={(value) => handleSelectChange('luminaireType', value)}
            >
              <SelectTrigger id="luminaireType" className="text-zasvet-black">
                <SelectValue placeholder="Выберите тип светильников" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="office">Офисные</SelectItem>
                <SelectItem value="industrial">Промышленные</SelectItem>
                <SelectItem value="commercial">Торговые</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Button type="submit" variant="gold" className="w-full mt-6">
        Рассчитать
      </Button>
    </form>
  );
};

export default IlluminationForm;
