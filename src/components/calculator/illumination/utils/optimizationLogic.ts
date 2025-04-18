import { TableData } from '../types';
import { luminaireModels } from '../data';
import { calculatePointAverage } from './illuminationCalculations';
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
    
    // 2) Required total flux using lumen method
    const phiReq = requiredLux * area;
    
    // 3) Calculate optimal number of luminaires
    const rawN = phiReq / effFlux;
    
    const nFloor = Math.floor(rawN);
    const nCeil = Math.ceil(rawN);
    
    const cand = [];
    if (nFloor > 0) cand.push(nFloor);
    if (nCeil > 0) cand.push(nCeil);
    
    const best = cand
      .map(n => {
        const avg = (effFlux * n) / area;
        return { n, avg, diff: Math.abs(avg - requiredLux) };
      })
      .reduce((a, b) => a.diff <= b.diff ? a : b);
    
    let N = best.n;
    
    // 4) Verify using point method and adjust if needed
    let avgPt = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);
    
    const MAX_ITERATIONS = 200;
    let iterations = 0;
    
    while (avgPt < requiredLux && iterations < MAX_ITERATIONS) {
      N++;
      avgPt = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);
      iterations++;
    }
    
    // 5) Find optimal grid layout
    const grid = findBestGrid(N, roomLength, roomWidth);
    
    if (grid.rows * grid.cols > N) {
      N = grid.rows * grid.cols;
      avgPt = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);
    }
    
    // 6) Calculate average illumination using effective flux
    const avgLux = (N * effFlux) / area;
    
    const cost = N * m.price;
    
    tableData.push({
      ...m,
      count: N,
      totalCost: cost,
      achieved: avgLux.toFixed(1),
      grid,
      perfectGrid: true
    });
  });
  
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
  const area = roomLength * roomWidth;
  const N = best.count;
  const { rows, cols } = best.grid!;
  
  const xSp = roomLength / cols;
  const ySp = roomWidth / rows;
  
  const gp = 5;
  let totalLux = 0;
  let minLux = Infinity;
  
  for (let i = 0; i < gp; i++) {
    for (let j = 0; j < gp; j++) {
      const px = (i + 0.5) * (roomLength / gp);
      const py = (j + 0.5) * (roomWidth / gp);
      let Ept = 0;
      
      for (let r = 0; r < rows; r++) {
        for (let k = 0; k < cols; k++) {
          if (r * cols + k >= N) break;
          
          const lx = (k + 0.5) * xSp;
          const ly = (r + 0.5) * ySp;
          const lz = roomHeight;
          
          const dx = px - lx;
          const dy = py - ly;
          const dz = -lz;
          
          const d = Math.hypot(dx, dy, dz);
          if (!d) continue;
          
          const cosT = roomHeight / d;
          const I = best.flux / (2 * Math.PI);
          Ept += (I * cosT) / (d * d);
        }
      }
      
      totalLux += Ept;
      minLux = Math.min(minLux, Ept);
    }
  }
  
  // Updated calculation with Kz and eta coefficients
  const deliveredFlux = N * best.flux * eta / Kz;
  const avgByFlux = deliveredFlux / area;
  const avgPoint = (totalLux * eta / Kz) / (gp * gp);
  const minPoint = minLux * eta / Kz;
  const uni = minPoint / avgPoint;
  
  return {
    layout: { cols, rows, xSp, ySp, N },
    illuminationValues: {
      avgByFlux: parseFloat(avgByFlux.toFixed(1)),
      average: parseFloat(avgPoint.toFixed(1)),
      minimum: parseFloat(minPoint.toFixed(1)),
      uniformity: parseFloat((uni * 100).toFixed(1)),
      kz: Kz,
      eta: eta
    }
  };
};
