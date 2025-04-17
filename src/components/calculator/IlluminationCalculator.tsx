import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LightbulbIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Recommended illumination by room type (СП 52.13330.2016)
const recommendedLux = {
  "office": 300,    // Office: 300 lx
  "warehouse": 75,  // Warehouse: 75 lx
  "corridor": 50,   // Corridor: 50 lx
  "retail": 300     // Retail: 300 lx
};

// Luminaire models database
const luminaireModels = {
  // Industrial - Granite series
  "industrial": [
    { model: "Гранит 48-67-5000-Д-220-Кронштейн", flux: 8698, power: 48, size: [250,110,70], price: 5550 },
    { model: "Гранит 96-67-5000-Д-220-Кронштейн", flux: 17396, power: 96, size: [500,110,70], price: 10484 },
    { model: "Гранит 144-67-5000-Д-220-Кронштейн", flux: 26094, power: 144, size: [750,110,70], price: 15036 },
    { model: "Гранит 192-67-5000-Д-220-Кронштейн", flux: 34792, power: 192, size: [1000,110,70], price: 20039 }
  ],
  // Office - Harmony series
  "office": [
    { model: "Гармония 34-20-5000-Д-220-универсальное", flux: 4250, power: 34, size: [595,595,40], price: 3418 },
    { model: "Гармония 40-20-5000-Д-220-универсальное", flux: 5400, power: 40, size: [595,595,40], price: 3533 },
    { model: "Гармония 42-20-5000-Д-220-универсальное", flux: 5670, power: 42, size: [595,595,40], price: 3633 },
    { model: "Гармония 52-20-5000-Д-220-универсальное", flux: 7100, power: 52, size: [595,595,40], price: 3747 }
  ],
  // Commercial - Boutique series
  "commercial": [
    { model: "Бутик 24-54-5000-Д-220-подвес", flux: 3000, power: 24, size: [600,60,55], price: 4191 },
    { model: "Бутик 36-54-5000-Д-220-подвес", flux: 4500, power: 36, size: [900,60,55], price: 5365 },
    { model: "Бутик 48-54-5000-Д-220-подвес", flux: 6000, power: 48, size: [1200,60,55], price: 6689 },
    { model: "Бутик 60-54-5000-Д-220-подвес", flux: 7500, power: 60, size: [1500,60,55], price: 8586 },
    { model: "Бутик 120-54-5000-Д-220-подвес", flux: 15000, power: 120, size: [3000,60,55], price: 17118 }
  ]
};

interface LuminaireModel {
  model: string;
  flux: number;
  power: number;
  size: number[];
  price: number;
}

interface TableData extends LuminaireModel {
  count: number;
  totalCost: number;
  achieved: string;
}

const IlluminationCalculator: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
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
    average: 0,
    minimum: 0,
    uniformity: 0
  });
  
  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
    
    // Calculate area and required luminous flux
    const area = L * W;
    const phiReq = E_req * area; // lumens
    
    // Get models for selected category
    const models = luminaireModels[category as keyof typeof luminaireModels] || [];
    if (!models.length) {
      alert("Нет моделей для выбранной категории светильников.");
      return;
    }
    
    // Find optimal model and prepare table data
    let best: TableData | null = null;
    const newTableData: TableData[] = [];
    
    models.forEach((m: LuminaireModel) => {
      const n = Math.ceil(phiReq / m.flux);
      const avgLux = (n * m.flux) / area;
      const cost = n * m.price;
      
      const rowData = {
        ...m,
        count: n,
        totalCost: cost,
        achieved: avgLux.toFixed(1)
      };
      
      newTableData.push(rowData);
      
      if (!best || cost < best.totalCost) {
        best = rowData;
      }
    });
    
    setTableData(newTableData);
    setBestResult(best);
    setShowResults(true);
    
    // Calculate point-by-point illumination
    if (best) {
      calculateIllumination(L, W, H, best);
    }
  };
  
  // Calculate detailed illumination values
  const calculateIllumination = (L: number, W: number, H: number, best: TableData) => {
    const N = best.count;
    let cols = Math.ceil(Math.sqrt(N * L / W));
    let rows = Math.ceil(N / cols);
    
    if ((cols * rows - N) >= cols) {
      rows = Math.ceil(Math.sqrt(N * W / L));
      cols = Math.ceil(N / rows);
    }
    
    const xSp = L / cols;
    const ySp = W / rows;
    
    // Point calculation on 5×5 grid
    const gp = 5;
    let totalLux = 0;
    let minLux = Infinity;
    
    for (let i = 0; i < gp; i++) {
      for (let j = 0; j < gp; j++) {
        const px = (i + 0.5) * (L / gp);
        const py = (j + 0.5) * (W / gp);
        let Ept = 0;
        
        for (let r = 0; r < rows; r++) {
          for (let k = 0; k < cols; k++) {
            if (r * cols + k >= N) break;
            
            const lx = (k + 0.5) * xSp;
            const ly = (r + 0.5) * ySp;
            const lz = H;
            
            const dx = px - lx;
            const dy = py - ly;
            const dz = -lz;
            
            const d = Math.hypot(dx, dy, dz);
            if (!d) continue;
            
            const cosT = H / d;
            const I = best.flux / (2 * Math.PI);
            Ept += (I * cosT) / (d * d);
          }
        }
        
        totalLux += Ept;
        minLux = Math.min(minLux, Ept);
      }
    }
    
    // 1) средняя по люмен-методу (точно попадёт в требуемую норму)
    const avgByFlux = (best.count * best.flux) / area;
    
    // 2) точечная средняя (как было)
    const avgPoint = totalLux / (gp * gp);
    
    const uni = minLux / avgPoint;
    
    setIlluminationValues({
      average: parseFloat(avgPoint.toFixed(1)),
      minimum: parseFloat(minLux.toFixed(1)),
      uniformity: parseFloat((uni * 100).toFixed(1))
    });
    
    // Draw room layout
    setTimeout(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Scale to fit canvas
          const scale = 50;
          canvas.width = L * scale;
          canvas.height = W * scale;
          
          // Draw room
          ctx.fillStyle = "#222";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.strokeStyle = "#555";
          ctx.lineWidth = 2;
          ctx.strokeRect(0, 0, canvas.width, canvas.height);
          
          // Draw luminaires
          ctx.fillStyle = "#ffbd00";
          ctx.strokeStyle = "#d9a200";
          
          for (let r = 0; r < rows; r++) {
            for (let k = 0; k < cols; k++) {
              if (r * cols + k >= N) break;
              
              const x = (k + 0.5) * xSp * scale;
              const y = (r + 0.5) * ySp * scale;
              
              ctx.beginPath();
              ctx.arc(x, y, 8, 0, 2 * Math.PI);
              ctx.fill();
              ctx.stroke();
            }
          }
        }
      }
    }, 100);
  };
  
  return (
    <section className="container mx-auto px-4 py-12">
      <Card className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl mb-8">
        <CardHeader className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg">
          <CardTitle className="text-xl flex items-center">
            <LightbulbIcon className="mr-2 h-5 w-5" />
            Калькулятор освещённости
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-4">
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
                        <SelectItem value="office">Офис</SelectItem>
                        <SelectItem value="warehouse">Склад</SelectItem>
                        <SelectItem value="corridor">Коридор</SelectItem>
                        <SelectItem value="retail">Торговый зал</SelectItem>
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
            
            {/* Results section */}
            {showResults && (
              <div className="mt-8 space-y-4">
                <h4 className="calculator-section-title">Результаты подбора моделей</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-zasvet-gray/20">
                        <th className="border border-zasvet-gold/20 p-2 text-left">Модель</th>
                        <th className="border border-zasvet-gold/20 p-2 text-center">Поток</th>
                        <th className="border border-zasvet-gold/20 p-2 text-center">Вт</th>
                        <th className="border border-zasvet-gold/20 p-2 text-center">Цена</th>
                        <th className="border border-zasvet-gold/20 p-2 text-center">Кол-во</th>
                        <th className="border border-zasvet-gold/20 p-2 text-center">Сумма</th>
                        <th className="border border-zasvet-gold/20 p-2 text-center">Освещ., лк</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr 
                          key={index}
                          className={row.model === bestResult?.model ? "bg-zasvet-gold/10 font-medium" : ""}
                        >
                          <td className="border border-zasvet-gold/20 p-2 text-left">{row.model}</td>
                          <td className="border border-zasvet-gold/20 p-2 text-center">{row.flux}</td>
                          <td className="border border-zasvet-gold/20 p-2 text-center">{row.power}</td>
                          <td className="border border-zasvet-gold/20 p-2 text-center">{row.price}</td>
                          <td className="border border-zasvet-gold/20 p-2 text-center">{row.count}</td>
                          <td className="border border-zasvet-gold/20 p-2 text-center">{row.totalCost.toFixed(2)}</td>
                          <td className="border border-zasvet-gold/20 p-2 text-center">{row.achieved}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="space-y-4">
                  <h4 className="calculator-section-title">План размещения светильников</h4>
                  <div className="border border-zasvet-gold/20 p-2 flex justify-center">
                    <canvas ref={canvasRef} className="max-w-full" />
                  </div>
                  
                  <Alert className="bg-zasvet-gray/20 border-zasvet-gold/20">
                    <div className="text-zasvet-white text-sm">
                      <p>
                        <strong>Средняя освещенность (люмен-метод):</strong> {bestResult ? ((bestResult.count * bestResult.flux) / (parseFloat(formData.roomLength) * parseFloat(formData.roomWidth))).toFixed(1) : 0} лк
                      </p>
                      <p>
                        <strong>Средняя освещенность (точечный метод):</strong> {illuminationValues.average} лк
                      </p>
                      <p>
                        <strong>Минимальная освещенность:</strong> {illuminationValues.minimum} лк
                      </p>
                      <p>
                        <strong>Равномерность:</strong> {illuminationValues.uniformity}%
                      </p>
                    </div>
                  </Alert>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default IlluminationCalculator;
