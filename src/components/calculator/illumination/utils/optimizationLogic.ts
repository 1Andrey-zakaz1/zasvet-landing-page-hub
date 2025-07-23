import { TableData } from '../types';
import { luminaireModels } from '../data';
import { findExactGrid } from './gridCalculations';
import { Kz, zeta, calculateRequiredLuminaires, calculateActualIllumination } from './illuminationCalculations';

export const calculateOptimalLuminaires = (
  roomLength: number,
  roomWidth: number,
  requiredLux: number,
  luminaireType: string,
  roomHeight: number = 3
): { tableData: TableData[], bestResult: TableData | null } => {
  const models = luminaireModels[luminaireType as keyof typeof luminaireModels] || [];
  const tableData: TableData[] = [];
  
  models.forEach((m) => {
    // Calculate required number of luminaires using proper formula
    const requiredCount = calculateRequiredLuminaires(requiredLux, roomLength, roomWidth, roomHeight, m.flux);
    
    // Test a range around the calculated value to find the best match
    const testRange = Math.max(5, Math.ceil(requiredCount * 0.3));
    const minTest = Math.max(1, requiredCount - testRange);
    const maxTest = requiredCount + testRange;
    
    let bestOption = null;
    let minDiff = Infinity;
    
    // Find the count that gives closest match to required lux
    for (let N = minTest; N <= maxTest; N++) {
      const actualLux = calculateActualIllumination(N, roomLength, roomWidth, roomHeight, m.flux);
      const diff = Math.abs(actualLux - requiredLux);
      
      if (diff < minDiff) {
        minDiff = diff;
        bestOption = {
          N,
          actualLux,
          diff
        };
      }
    }
    
    if (bestOption) {
      const N = bestOption.N;
      const grid = findExactGrid(N, roomLength, roomWidth);
      const achievedLux = bestOption.actualLux;
      
      tableData.push({
        ...m,
        count: N,
        totalCost: N * m.price,
        achieved: achievedLux.toFixed(1),
        grid
      });
    }
  });
  
  // Select the best option by minimal total cost among those that meet requirements
  const validOptions = tableData.filter(item => parseFloat(item.achieved) >= requiredLux * 0.9);
  const best = validOptions.length > 0 
    ? validOptions.reduce((a, b) => a.totalCost < b.totalCost ? a : b)
    : tableData.reduce((a, b) => a.totalCost < b.totalCost ? a : b);
  
  return { tableData, bestResult: best };
};

export const calculateIllumination = (
  roomLength: number,
  roomWidth: number,
  roomHeight: number,
  best: TableData
) => {
  const N = best.count;
  const { rows, cols } = best.grid!;
  
  const xSp = roomLength / cols;
  const ySp = roomWidth / rows;
  
  return {
    layout: { cols, rows, xSp, ySp, N },
    illuminationValues: {
      avgByFlux: 0,
      average: 0,
      minimum: 0,
      uniformity: 0,
      kz: Kz,
      eta: zeta
    }
  };
};
