
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LightbulbIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { recommendedLux } from './illumination/data';
import { IlluminationFormData, TableData } from './illumination/types';
import { calculateOptimalLuminaires, calculateIllumination } from './illumination/calculations';
import IlluminationForm from './illumination/IlluminationForm';
import IlluminationResults from './illumination/IlluminationResults';

const IlluminationCalculator: React.FC = () => {
  // Collapsible state
  const [isExpanded, setIsExpanded] = useState(false);
  
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
  
  // Toggle expanded state
  const toggleForm = () => {
    setIsExpanded(!isExpanded);
    if (showResults) {
      setShowResults(false);
    }
  };
  
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
  
  // Reset calculator and show form
  const resetCalculator = () => {
    setShowResults(false);
    setIsExpanded(true);
  };
  
  return (
    <section id="illumination-calculator" className="bg-zasvet-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-zasvet-white mb-12">Калькулятор освещенности помещения</h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Collapsible Header */}
          <div 
            className="flex justify-between items-center bg-zasvet-gray/20 p-4 rounded-lg mb-4 cursor-pointer border border-zasvet-gold/30"
            onClick={toggleForm}
            style={{ display: (showResults) ? 'none' : 'flex' }}
          >
            <h3 className="text-xl font-bold text-zasvet-white flex items-center">
              <LightbulbIcon className="mr-2 h-5 w-5" /> 
              Калькулятор освещенности помещения
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
                <><ChevronDown className="mr-1" /> Расчет-подбор светильников</>
              }
            </Button>
          </div>
          
          {/* Form */}
          {isExpanded && !showResults && (
            <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
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
          
          {/* Results */}
          {showResults && (
            <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
              <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <LightbulbIcon className="mr-2 h-5 w-5" />
                  Результаты расчета освещенности
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <IlluminationResults 
                  tableData={tableData}
                  bestResult={bestResult}
                  illuminationValues={illuminationValues}
                  formData={formData}
                  layout={layout}
                />
                
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={resetCalculator} className="text-zasvet-white border-zasvet-gold/50 hover:bg-zasvet-gold/20">
                    Новый расчет
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default IlluminationCalculator;
