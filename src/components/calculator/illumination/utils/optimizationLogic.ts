import { TableData } from '../types';
import { luminaireModels } from '../data';
import { findExactGrid } from './gridCalculations';
import { Kz, eta, calculatePointAverage } from './illuminationCalculations';

export const calculateOptimalLuminaires = (
  roomLength: number,
  roomWidth: number,
  requiredLux: number,
  luminaireType: string,
  roomHeight: number = 3
): { tableData: TableData[], bestResult: TableData | null } => {
  const area = roomLength * roomWidth;
  const models = luminaireModels[luminaireType as keyof typeof luminaireModels] || [];
  const tableData: TableData[] = [];
  
  models.forEach((m) => {
    // Start with an estimated quantity based on flux and area
    const estimatedFluxNeeded = requiredLux * area;
    const estimatedQuantity = Math.max(1, Math.ceil(estimatedFluxNeeded / (m.flux * eta / Kz)));
    
    // Test quantities around the estimate
    const testRange = Math.max(10, Math.ceil(estimatedQuantity * 0.5)); // test range
    const minTest = Math.max(1, estimatedQuantity - testRange);
    const maxTest = estimatedQuantity + testRange;
    
    let bestOption = null;
    let minDiff = Infinity;
    
    // Test different quantities in the range
    for (let N = minTest; N <= maxTest; N++) {
      const avgLux = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);
      const diff = Math.abs(avgLux - requiredLux);
      
      if (diff < minDiff) {
        minDiff = diff;
        bestOption = {
          N,
          avgLux,
          diff
        };
      }
    }
    
    if (bestOption) {
      const N = bestOption.N;
      const grid = findExactGrid(N, roomLength, roomWidth);
      const achievedLux = bestOption.avgLux;
      
      tableData.push({
        ...m,
        count: N,
        totalCost: N * m.price,
        achieved: achievedLux.toFixed(1),
        grid
      });
    }
  });
  
  // Select the best option by minimal total cost
  const best = tableData.reduce((a, b) => a.totalCost < b.totalCost ? a : b);
  
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
      eta: eta
    }
  };
};
