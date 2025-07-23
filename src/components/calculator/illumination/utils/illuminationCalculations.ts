
// Constants for illumination calculation
export const Kz = 1.2;   // safety coefficient
export const zeta = 1.15; // non-uniformity coefficient

/**
 * Calculates utilization coefficient based on room geometry
 */
function calculateUtilizationCoefficient(L: number, W: number, H: number): number {
  // Room index calculation
  const roomIndex = (L * W) / ((L + W) * H);
  
  // Utilization coefficient based on room index and typical reflectances
  // For typical office/industrial spaces with moderate reflectances
  if (roomIndex < 0.6) return 0.35;
  if (roomIndex < 1.0) return 0.45;
  if (roomIndex < 1.5) return 0.55;
  if (roomIndex < 2.0) return 0.65;
  if (roomIndex < 3.0) return 0.70;
  return 0.75;
}

/**
 * Calculates required number of luminaires for target illumination
 */
export function calculateRequiredLuminaires(
  targetLux: number,
  L: number,
  W: number,
  H: number,
  flux: number
): number {
  const area = L * W;
  const eta = calculateUtilizationCoefficient(L, W, H);
  
  // Standard illumination formula: n = (E * S * Kz * ζ) / (Φ * η)
  const requiredCount = (targetLux * area * Kz * zeta) / (flux * eta);
  
  return Math.ceil(requiredCount);
}

/**
 * Calculates actual illumination for given number of luminaires
 */
export function calculateActualIllumination(
  n: number,
  L: number,
  W: number,
  H: number,
  flux: number
): number {
  const area = L * W;
  const eta = calculateUtilizationCoefficient(L, W, H);
  
  // Actual illumination: E = (n * Φ * η) / (S * Kz * ζ)
  const actualLux = (n * flux * eta) / (area * Kz * zeta);
  
  return actualLux;
}
