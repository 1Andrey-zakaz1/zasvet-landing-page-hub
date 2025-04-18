import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { recommendedLux } from './illumination/data';
import { IlluminationFormData, TableData } from './illumination/types';
import { calculateOptimalLuminaires } from './illumination/utils/optimizationLogic';
import IlluminationForm from './illumination/IlluminationForm';
import IlluminationResults from './illumination/IlluminationResults';

const IlluminationCalculator = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
  
  const toggleForm = () => {
    setIsExpanded(!isExpanded);
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
    <section id="illumination-calculator" className="bg-zasvet-black py-12 md:py-16 border-t border-zasvet-gray/20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Калькулятор расчета освещенности помещения</h2>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="flex justify-between items-center bg-zasvet-gray/20 p-4 rounded-lg mb-4 cursor-pointer border border-zasvet-gold/30"
            onClick={toggleForm}
            style={{ display: (showResults) ? 'none' : 'flex' }}
          >
            <h3 className="text-xl font-bold text-zasvet-white flex items-center">
              <Lightbulb className="mr-2 h-5 w-5" /> 
              Расчет - подбор светильников
            </h3>
            <Button 
              variant="gold" 
              className="transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
            >
              {isExpanded ? 
                <><ChevronUp className="mr-1" /> Свернуть</> : 
                <><ChevronDown className="mr-1" /> Рассчитать</>
              }
            </Button>
          </div>
          
          {isExpanded && !showResults && (
            <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
              <CardHeader className="bg-transparent text-zasvet-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center" />
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <IlluminationForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    calculateResults={calculateResults}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
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
      </div>
    </section>
  );
};

export default IlluminationCalculator;
