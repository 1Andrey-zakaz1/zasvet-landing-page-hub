
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
              <strong>Средняя освещенность (люмен-метод):</strong> {illuminationValues.avgByFlux} лк
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
  );
};

export default IlluminationResults;
