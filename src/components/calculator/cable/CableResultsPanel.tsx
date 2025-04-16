
import React from 'react';
import { Info, Cable, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CableCalculationResult } from '../utils/cableCalculatorUtils';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface CableResultsPanelProps {
  results: CableCalculationResult;
  resetCalculator: () => void;
  collapseResults: () => void;
}

const CableResultsPanel: React.FC<CableResultsPanelProps> = ({
  results,
  resetCalculator,
  collapseResults
}) => {
  const getMaterialText = (material: string): string => {
    return material === 'copper' ? 'Медь' : 'Алюминий';
  };

  const getPhaseTypeText = (phaseType: string): string => {
    return phaseType === 'single' ? 'Однофазная' : 'Трехфазная';
  };

  const getInstallationText = (installation: string): string => {
    switch (installation) {
      case 'air': return 'В воздухе';
      case 'ground': return 'В земле';
      case 'pipe': return 'В трубах';
      default: return installation;
    }
  };

  return (
    <div className="bg-zasvet-gray/10 border border-zasvet-gold/20 shadow-xl rounded-lg">
      <div className="bg-zasvet-gold/90 text-zasvet-black rounded-t-lg px-6 py-4">
        <h2 className="text-xl font-medium flex items-center">
          <Cable className="mr-2 h-5 w-5" /> Результаты расчета сечения кабеля
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="bg-zasvet-black/30 rounded-lg p-4 h-full">
              <h3 className="text-lg font-medium flex items-center text-zasvet-gold mb-4">
                <Info className="mr-2 h-5 w-5" /> Параметры расчета
              </h3>
              
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-zasvet-white/70">Мощность нагрузки:</TableCell>
                    <TableCell className="text-zasvet-white font-medium text-right">
                      {results.inputData.power} кВт
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-zasvet-white/70">Напряжение сети:</TableCell>
                    <TableCell className="text-zasvet-white font-medium text-right">
                      {results.inputData.voltage} В
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-zasvet-white/70">Длина кабеля:</TableCell>
                    <TableCell className="text-zasvet-white font-medium text-right">
                      {results.inputData.length} м
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-zasvet-white/70">Материал проводника:</TableCell>
                    <TableCell className="text-zasvet-white font-medium text-right">
                      {getMaterialText(results.inputData.material)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-zasvet-white/70">Тип сети:</TableCell>
                    <TableCell className="text-zasvet-white font-medium text-right">
                      {getPhaseTypeText(results.inputData.phaseType)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-zasvet-white/70">Способ прокладки:</TableCell>
                    <TableCell className="text-zasvet-white font-medium text-right">
                      {getInstallationText(results.inputData.installation)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-zasvet-black/30 rounded-lg p-4 mb-4">
              <div className="bg-zasvet-gold/10 border border-zasvet-gold/20 rounded-lg p-4 mb-4">
                <h4 className="text-zasvet-gold font-medium mb-2">Рекомендуемое сечение кабеля</h4>
                <div className="text-4xl text-center text-zasvet-gold font-bold py-3">
                  {results.finalSection} мм²
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-zasvet-gold font-medium mb-2">Расчетные данные</h4>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-zasvet-white/70">Ток нагрузки:</TableCell>
                        <TableCell className="text-zasvet-white font-medium text-right">
                          {results.current} А
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-zasvet-white/70">Сечение по току:</TableCell>
                        <TableCell className="text-zasvet-white font-medium text-right">
                          {results.currentSection} мм²
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-zasvet-white/70">Сечение по потерям:</TableCell>
                        <TableCell className="text-zasvet-white font-medium text-right">
                          {results.lossSection} мм²
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="bg-zasvet-black/40 rounded-lg p-4">
                  <h4 className="text-zasvet-gold font-medium mb-2">Пояснения</h4>
                  <p className="text-zasvet-white/80 text-sm">
                    Расчет сечения кабеля производится по двум критериям:
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-sm text-zasvet-white/80 space-y-1">
                    <li>
                      <span className="text-zasvet-white">По току</span> - минимальное сечение, способное выдержать расчетный ток нагрузки
                    </li>
                    <li>
                      <span className="text-zasvet-white">По потерям напряжения</span> - сечение, при котором потери напряжения не превышают 5%
                    </li>
                  </ul>
                  <p className="text-zasvet-white/80 text-sm mt-2">
                    Итоговое сечение выбирается как наибольшее из двух значений.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="gold"
                onClick={resetCalculator}
              >
                Новый расчет
              </Button>
              <Button
                variant="outline"
                className="border-zasvet-gold text-zasvet-gold hover:bg-zasvet-gold hover:text-zasvet-black"
                onClick={collapseResults}
              >
                <ChevronUp className="mr-1" /> Свернуть
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CableResultsPanel;
