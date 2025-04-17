
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LightbulbIcon } from 'lucide-react';
import { recommendedLux } from './illumination/data';
import { IlluminationFormData, TableData } from './illumination/types';
import { calculateOptimalLuminaires, calculateIllumination } from './illumination/calculations';
import IlluminationForm from './illumination/IlluminationForm';
import IlluminationResults from './illumination/IlluminationResults';

const IlluminationCalculator: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<IlluminationFormData>({
    roomLength: '',
    roomWidth: '',
    roomHeight: '3',
    roomType: 'office',
    requiredLux: '300',
    luminaireType: 'office'
  });
  
  // Results state
  const [showResults, setShowResults] = useState(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [bestResult, setBestResult] = useState<TableData | null>(null);
  const [illuminationValues, setIlluminationValues] = useState({
    avgByFlux: 0,
    average: 0,
    minimum: 0,
    uniformity: 0,
    kz: 1.1,
    eta: 0.85
  });
  const [layout, setLayout] = useState({ 
    cols: 0, 
    rows: 0, 
    xSp: 0, 
    ySp: 0, 
    N: 0 
  });
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
    
    // Set recommended lux value when room type changes
    if (id === 'roomType' && recommendedLux[value as keyof typeof recommendedLux]) {
      setFormData(prev => ({
        ...prev,
        [id]: value,
        requiredLux: recommendedLux[value as keyof typeof recommendedLux].toString()
      }));
    }
  };
  
  // Calculate results
  const calculateResults = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse input values
    const L = parseFloat(formData.roomLength);
    const W = parseFloat(formData.roomWidth);
    const H = parseFloat(formData.roomHeight);
    const E_req = parseFloat(formData.requiredLux);
    const category = formData.luminaireType;
    
    // Validate inputs
    if (!L || !W || !H || !E_req) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    
    // Calculate optimal luminaires
    const { tableData: newTableData, bestResult: newBestResult } = 
      calculateOptimalLuminaires(L, W, E_req, category);
    
    if (!newBestResult) {
      alert("Не удалось подобрать оптимальный светильник.");
      return;
    }
    
    setTableData(newTableData);
    setBestResult(newBestResult);
    
    // Calculate detailed illumination
    const { layout: newLayout, illuminationValues: newIlluminationValues } = 
      calculateIllumination(L, W, H, newBestResult);
    
    setLayout(newLayout);
    setIlluminationValues(newIlluminationValues);
    setShowResults(true);
  };
  
  return (
    <section className="container mx-auto px-4 py-12">
      <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
        <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
          <CardTitle className="text-xl flex items-center">
            <LightbulbIcon className="mr-2 h-5 w-5" />
            Расчет-подбор светильников
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-4">
            <IlluminationForm 
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              calculateResults={calculateResults}
            />
            
            {/* Results section */}
            {showResults && (
              <IlluminationResults 
                tableData={tableData}
                bestResult={bestResult}
                illuminationValues={illuminationValues}
                formData={formData}
                layout={layout}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default IlluminationCalculator;
