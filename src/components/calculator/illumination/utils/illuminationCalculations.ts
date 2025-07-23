
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
  
  // Account for room height - at greater heights, we need more light to achieve same illumination
  // Standard calculation height is 2.7m, at greater heights illumination decreases
  const standardHeight = 2.7;
  const heightFactor = Math.pow(H / standardHeight, 2);
  
  // Basic illumination formula: E = (Φ * η) / (A * Kz * heightFactor)
  // heightFactor increases denominator for greater heights, reducing illumination
  const avgIllumination = (totalFlux * eta) / (area * Kz * heightFactor);
  
  return avgIllumination;
}
