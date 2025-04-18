import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LightbulbIcon } from 'lucide-react';
import { recommendedLux } from './illumination/data';
import { IlluminationFormData, TableData } from './illumination/types';
import { calculateOptimalLuminaires } from './illumination/utils/optimizationLogic';
import IlluminationForm from './illumination/IlluminationForm';
import IlluminationResults from './illumination/IlluminationResults';

const IlluminationCalculator = () => {
  const [formData, setFormData] = useState<IlluminationFormData>({
    roomLength: '',
    roomWidth: '',
    roomHeight: '3',
    roomType: 'office',
    requiredLux: '301',
    luminaireType: 'office'
  });
  
  const [showResults, setShowResults] = useState(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [bestResult, setBestResult] = useState<TableData | null>(null);
  const [layout, setLayout] = useState({ 
    cols: 0, 
    rows: 0, 
    xSp: 0, 
    ySp: 0, 
    N: 0 
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
    
    if (id === 'roomType' && recommendedLux[value as keyof typeof recommendedLux]) {
      setFormData(prev => ({
        ...prev,
        [id]: value,
        requiredLux: recommendedLux[value as keyof typeof recommendedLux].toString()
      }));
    }
  };
  
  const calculateResults = (e: React.FormEvent) => {
    e.preventDefault();
    
    const L = parseFloat(formData.roomLength);
    const W = parseFloat(formData.roomWidth);
    const H = parseFloat(formData.roomHeight);
    const E_req = parseFloat(formData.requiredLux);
    const category = formData.luminaireType;
    
    if (!L || !W || !H || !E_req) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    
    const { tableData: newTableData, bestResult: newBestResult } = 
      calculateOptimalLuminaires(L, W, E_req, category, H);
    
    if (!newBestResult) {
      alert("Не удалось подобрать оптимальный светильник.");
      return;
    }
    
    setTableData(newTableData);
    setBestResult(newBestResult);
    
    setLayout({
      cols: newBestResult.grid!.cols, 
      rows: newBestResult.grid!.rows, 
      xSp: 0, 
      ySp: 0, 
      N: newBestResult.count
    });
    
    setShowResults(true);
  };
  
  return (
    <section id="calculator" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Калькулятор расчета освещенности помещения</h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
            <CardHeader className="bg-transparent text-zasvet-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center">
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
                
                {showResults && (
                  <IlluminationResults 
                    tableData={tableData}
                    bestResult={bestResult}
                    illuminationValues={{
                      avgByFlux: 0,
                      average: 0,
                      minimum: 0,
                      uniformity: 0,
                      kz: 1.1,
                      eta: 0.85
                    }}
                    formData={formData}
                    layout={layout}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IlluminationCalculator;
