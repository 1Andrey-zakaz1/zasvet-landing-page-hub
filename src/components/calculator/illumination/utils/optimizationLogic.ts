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
    // 1) Calculate effective flux considering efficiency and safety factor
    const effFlux = m.flux * eta / Kz;
    const phiReq = requiredLux * area;
    
    // 2) Calculate ideal fractional number
    const rawN = phiReq / effFlux;
    const nFloor = Math.floor(rawN);
    const nCeil = Math.ceil(rawN);
    
    // 3) Candidates - both variants > 0
    const candidates = [];
    if (nFloor > 0) candidates.push(nFloor);
    if (nCeil > 0 && nCeil !== nFloor) candidates.push(nCeil);
    
    // 4) For each candidate calculate average illumination using point method
    const options = candidates.map(N => {
      const avgLux = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);
      return {
        N,
        avgLux,
        diff: Math.abs(avgLux - requiredLux)
      };
    });
    
    // 5) Choose the option with minimal difference
    const bestOpt = options.reduce((a, b) => a.diff <= b.diff ? a : b);
    
    // 6) Final N and exact grid calculation
    const N = bestOpt.N;
    const grid = findExactGrid(N, roomLength, roomWidth);
    const achievedLux = bestOpt.avgLux;
    
    tableData.push({
      ...m,
      count: N,
      totalCost: N * m.price,
      achieved: achievedLux.toFixed(1),
      grid
    });
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
