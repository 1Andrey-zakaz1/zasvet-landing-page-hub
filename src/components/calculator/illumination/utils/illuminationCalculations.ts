
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
  // Simplified calculation using uniform illumination method
  // This is more predictable and matches industry practice
  
  const area = L * W;
  const totalFlux = n * flux;
  
  // Basic illumination formula: E = (Φ * η * Kz) / A
  // Where Φ is total luminous flux, η is utilization factor, Kz is maintenance factor
  const avgIllumination = (totalFlux * eta) / (area * Kz);
  
  return avgIllumination;
}
