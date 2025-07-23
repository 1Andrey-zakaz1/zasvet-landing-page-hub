
import { findBestGrid } from './gridCalculations';

// Constants
export const Kz = 1.1;   // safety coefficient updated from 1.2 to 1.1
export const eta = 0.90;  // utilization coefficient remains the same

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
  const area = L * W;
  const totalFlux = n * flux;
  
  // Account for room height using distance factor
  // At standard height (2.7m), factor = 1
  // At greater heights, illumination decreases proportionally to square of distance
  const standardHeight = 2.7;
  const heightFactor = Math.pow(standardHeight / H, 2);
  
  // Basic illumination formula with height correction: E = (Φ * η * heightFactor) / (A * Kz)
  const avgIllumination = (totalFlux * eta * heightFactor) / (area * Kz);
  
  return avgIllumination;
}
