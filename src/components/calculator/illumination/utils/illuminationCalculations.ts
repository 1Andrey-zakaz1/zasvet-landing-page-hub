
import { findBestGrid } from './gridCalculations';

// Constants
export const Kz = 1.0;   // reserve coefficient (changed from 1.1 to 1.0)
export const eta = 0.90;  // utilization coefficient (changed from 0.85 to 0.90)

/**
 * Calculates average illumination using point method for given number of luminaires
 */
export function calculatePointAverage(
  n: number, 
  L: number, 
  W: number, 
  H: number, 
  flux: number
): number {
  const grid = findBestGrid(n, L, W);
  
  // Spacing between luminaires
  const xSp = L / grid.cols;
  const ySp = W / grid.rows;
  
  const gp = 5;  // 5×5 points
  let sumE = 0;
  
  for (let i = 0; i < gp; i++) {
    for (let j = 0; j < gp; j++) {
      const px = (i + 0.5) * (L / gp);
      const py = (j + 0.5) * (W / gp);
      let Ept = 0;
      
      for (let r = 0; r < grid.rows; r++) {
        for (let c = 0; c < grid.cols; c++) {
          const idx = r * grid.cols + c;
          if (idx >= n) break;
          
          const lx = (c + 0.5) * xSp;
          const ly = (r + 0.5) * ySp;
          const lz = H; 
          
          const dx = px - lx;
          const dy = py - ly;
          const dz = -lz;
          const d = Math.hypot(dx, dy, dz);
          if (d <= 0) continue;
          
          const cosT = H / d;
          const I = (flux * eta / Kz) / (2 * Math.PI);
          
          Ept += (I * cosT) / (d * d);
        }
      }
      sumE += Ept;
    }
  }
  
  return sumE / (gp * gp);
}
