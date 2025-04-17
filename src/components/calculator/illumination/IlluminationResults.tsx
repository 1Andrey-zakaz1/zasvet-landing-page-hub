
import React, { useRef, useEffect } from 'react';
import { Alert } from '@/components/ui/alert';
import { TableData, IlluminationFormData } from './types';
import { drawRoomLayout } from './calculations';

interface IlluminationResultsProps {
  tableData: TableData[];
  bestResult: TableData | null;
  illuminationValues: {
    avgByFlux: number;
    average: number;
    minimum: number;
    uniformity: number;
    kz: number;
    eta: number;
  };
  formData: IlluminationFormData;
  layout: { 
    cols: number; 
    rows: number; 
    xSp: number; 
    ySp: number; 
    N: number;
  };
}

const IlluminationResults: React.FC<IlluminationResultsProps> = ({
  tableData,
  bestResult,
  illuminationValues,
  formData,
  layout
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current && bestResult) {
      drawRoomLayout(
        canvasRef.current,
        parseFloat(formData.roomLength),
        parseFloat(formData.roomWidth),
        layout
      );
    }
  }, [bestResult, formData.roomLength, formData.roomWidth, layout]);
  
  return (
    <div className="mt-8 space-y-4 print-container">
      <h4 className="calculator-section-title">Результаты подбора моделей</h4>
      
      <div className="overflow-x-auto results-section">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zasvet-gray/20">
              <th className="border border-zasvet-gold/20 p-2 text-left text-white">Модель</th>
              <th className="border border-zasvet-gold/20 p-2 text-center text-white">Поток</th>
              <th className="border border-zasvet-gold/20 p-2 text-center text-white">Вт</th>
              <th className="border border-zasvet-gold/20 p-2 text-center text-white">Цена</th>
              <th className="border border-zasvet-gold/20 p-2 text-center text-white">Кол-во</th>
              <th className="border border-zasvet-gold/20 p-2 text-center text-white">Сетка</th>
              <th className="border border-zasvet-gold/20 p-2 text-center text-white">Сумма</th>
              <th className="border border-zasvet-gold/20 p-2 text-center text-white">Освещ., лк</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr 
                key={index}
                className={`${
                  row.model === bestResult?.model 
                    ? "bg-zasvet-gold/10 font-medium" 
                    : "bg-zasvet-gray/10"
                }`}
              >
                <td className="border border-zasvet-gold/20 p-2 text-left text-white">{row.model}</td>
                <td className="border border-zasvet-gold/20 p-2 text-center text-white">{row.flux}</td>
                <td className="border border-zasvet-gold/20 p-2 text-center text-white">{row.power}</td>
                <td className="border border-zasvet-gold/20 p-2 text-center text-white">{row.price}</td>
                <td className="border border-zasvet-gold/20 p-2 text-center text-white">{row.count}</td>
                <td className="border border-zasvet-gold/20 p-2 text-center text-white">
                  {row.grid ? `${row.grid.rows}×${row.grid.cols}` : '-'}
                  {row.perfectGrid && <span className="ml-1 text-zasvet-gold">✓</span>}
                </td>
                <td className="border border-zasvet-gold/20 p-2 text-center text-white">{row.totalCost.toFixed(2)}</td>
                <td className="border border-zasvet-gold/20 p-2 text-center text-white">{row.achieved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="space-y-4 results-section">
        <h4 className="calculator-section-title">План размещения светильников</h4>
        <div className="border border-zasvet-gold/20 p-2 flex justify-center">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>
        
        <Alert className="bg-zasvet-gray/20 border-zasvet-gold/20">
          <div className="text-white text-sm">
            <p>
              <strong className="text-zasvet-gold">Средняя освещенность (люмен-метод):</strong> {illuminationValues.avgByFlux} лк
            </p>
            <p>
              <strong className="text-zasvet-gold">Минимальная освещенность:</strong> {illuminationValues.minimum} лк
            </p>
            {bestResult?.perfectGrid && (
              <p className="mt-2">
                <strong className="text-zasvet-gold">✓ Идеальная сетка:</strong> {bestResult.grid?.rows} × {bestResult.grid?.cols}
              </p>
            )}
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default IlluminationResults;
