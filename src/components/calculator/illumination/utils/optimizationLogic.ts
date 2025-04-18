
import { TableData } from '../types';
import { luminaireModels } from '../data';
import { findBestGrid } from './gridCalculations';
import { Kz, eta } from './illuminationCalculations';

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
    
    // 4) For each candidate, find the final grid and calculate diff
    const options = candidates.map(n0 => {
      const grid = findBestGrid(n0, roomLength, roomWidth);
      const N_full = grid.rows * grid.cols;
      
      // Average by lumen method
      const avgLux = (effFlux * N_full) / area;
      
      return {
        N_full,
        grid,
        avgLux,
        diff: Math.abs(avgLux - requiredLux)
      };
    });
    
    // 5) Choose the option with minimal difference
    const bestOpt = options.reduce((a, b) => a.diff <= b.diff ? a : b);
    
    // 6) Final N and grid that will go to the table
    const N = bestOpt.N_full;
    const grid = bestOpt.grid;
    const achievedLux = bestOpt.avgLux;
    
    tableData.push({
      ...m,
      count: N,
      totalCost: N * m.price,
      achieved: achievedLux.toFixed(1),
      grid
    });
  });
  
  // Select the best option from all models
  const perfectOptions = tableData.filter(r => r.perfectGrid);
  let best: TableData | null = null;
  
  if (perfectOptions.length > 0) {
    best = perfectOptions.reduce((a, b) => a.totalCost < b.totalCost ? a : b);
  } else {
    best = tableData.reduce((a, b) => a.totalCost < b.totalCost ? a : b);
  }
  
  return { tableData, bestResult: best };
};

export const calculateIllumination = (
  roomLength: number,
  roomWidth: number,
  roomHeight: number,
  best: TableData
) => {
  // Using the final grid values from the table data
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
