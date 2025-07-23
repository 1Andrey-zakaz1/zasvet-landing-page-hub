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
    // Multiple estimation approaches for more reliable starting points
    const estimatedFluxNeeded = requiredLux * area;
    
    // Approach 1: Simple flux-based estimate
    const simpleEstimate = Math.max(1, Math.ceil(estimatedFluxNeeded / (m.flux * eta / Kz)));
    
    // Approach 2: Conservative estimate (assuming lower efficiency)
    const conservativeEstimate = Math.max(1, Math.ceil(estimatedFluxNeeded / (m.flux * 0.5)));
    
    // Approach 3: Aggressive estimate (assuming higher efficiency)  
    const aggressiveEstimate = Math.max(1, Math.ceil(estimatedFluxNeeded / (m.flux * 1.2)));
    
    // Use the widest range from all estimates
    const allEstimates = [simpleEstimate, conservativeEstimate, aggressiveEstimate];
    const minEstimate = Math.min(...allEstimates);
    const maxEstimate = Math.max(...allEstimates);
    
    // Expanded search range - at least from 1 to 3x max estimate
    const minTest = 1;
    const maxTest = Math.max(100, maxEstimate * 3);
    
    let bestOption = null;
    let minDiff = Infinity;
    
    // Test different quantities in the expanded range
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
