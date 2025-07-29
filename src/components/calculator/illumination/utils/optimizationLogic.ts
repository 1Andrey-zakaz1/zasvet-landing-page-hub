import { TableData } from '../types';
import { luminaireModels } from '../data';
import { findExactGrid, findBestGrid } from './gridCalculations';
import { findOptimalLuminaireCount, calculatePointBasedIllumination } from './pointCalculations';
import { Kz, zeta } from './illuminationCalculations';

export const calculateOptimalLuminaires = (
  roomLength: number,
  roomWidth: number,
  requiredLux: number,
  luminaireType: string,
  roomHeight: number = 3
): { tableData: TableData[], bestResult: TableData | null } => {
  const models = luminaireModels[luminaireType as keyof typeof luminaireModels] || [];
  const tableData: TableData[] = [];
  
  console.log(`Calculating for room ${roomLength}x${roomWidth}, required lux: ${requiredLux}`);
  console.log(`Available models count: ${models.length}`);
  
  models.forEach((m) => {
    console.log(`Testing model: ${m.model}, flux: ${m.flux}, price: ${m.price}`);
    let bestOption: {grid: any, actualLux: number, uniformity: number} | null = null;
    let bestScore = Infinity;
    
    // More iterations to find better solutions, especially for large rooms
    const area = roomLength * roomWidth;
    // Significantly increase max iterations for large rooms to test more luminaires
    const maxIterations = area > 1000 ? 200 : area > 400 ? 150 : area > 100 ? 100 : 80;
    console.log(`Room area: ${area}, maxIterations: ${maxIterations}`);
    
    // Test different grid configurations
    for (let testCount = 1; testCount <= maxIterations; testCount++) {
      const testGrid = findBestGrid(testCount, roomLength, roomWidth);
      const actualCount = testGrid.rows * testGrid.cols;
      
      const result = findOptimalLuminaireCount(
        roomLength, 
        roomWidth, 
        roomHeight, 
        requiredLux, 
        m.flux * (Kz * zeta), // Apply safety coefficients
        testGrid
      );
      
      // Score based on achieving target illumination first, then cost
      const costScore = actualCount * m.price;
      const luxDiff = Math.abs(result.actualLux - requiredLux);
      const luxDeficiency = Math.max(0, requiredLux - result.actualLux);
      
      // Heavy penalties for not meeting requirements (max 2% below, up to 15% above)
      const uniformityPenalty = result.uniformity < 0.4 ? 10000 : 0;
      const minLuxPenalty = result.actualLux < requiredLux * 0.98 ? luxDeficiency * 200 : 0; // 2% threshold
      const maxLuxPenalty = result.actualLux > requiredLux * 1.15 ? (result.actualLux - requiredLux * 1.15) * 50 : 0; // 15% above threshold
      
      // Score heavily penalizes insufficient illumination and excessive over-illumination
      const totalScore = costScore + luxDiff * 30 + uniformityPenalty + minLuxPenalty + maxLuxPenalty;
      
      if (totalScore < bestScore && result.actualLux >= requiredLux * 0.98 && result.actualLux <= requiredLux * 1.15) {
        bestScore = totalScore;
        bestOption = {
          grid: testGrid,
          actualLux: result.actualLux,
          uniformity: result.uniformity
        };
        console.log(`Found valid option for ${m.model}: actualLux=${result.actualLux}, uniformity=${result.uniformity}, score=${totalScore}`);
      } else {
        if (testCount <= 5) { // Log only first few attempts to avoid spam
          console.log(`Option rejected for ${m.model}: actualLux=${result.actualLux} (target: ${requiredLux}), uniformity=${result.uniformity}, score=${totalScore}`);
        }
      }
    }
    
    if (bestOption) {
      const actualCount = bestOption.grid.rows * bestOption.grid.cols;
      console.log(`Adding to results: ${m.model} with ${actualCount} units, ${bestOption.actualLux} lux`);
      
      tableData.push({
        ...m,
        count: actualCount,
        totalCost: actualCount * m.price,
        achieved: bestOption.actualLux.toFixed(1),
        grid: bestOption.grid
      });
    } else {
      console.log(`No valid option found for model: ${m.model}`);
    }
  });
  
  // Select the best option by minimal total cost among those that meet requirements
  if (tableData.length === 0) {
    console.log('No solutions found - tableData is empty');
    return { tableData: [], bestResult: null };
  }
  
  // Precise requirements - max 2% below, up to 15% above target
  const minThreshold = 0.98; // 98% of required (max 2% below)
  const maxThreshold = 1.15; // 115% of required (max 15% above)
  
  const validOptions = tableData.filter(item => {
    const achieved = parseFloat(item.achieved);
    return achieved >= requiredLux * minThreshold && achieved <= requiredLux * maxThreshold;
  });
  
  console.log(`Valid options count: ${validOptions.length} out of ${tableData.length} total options`);
  console.log(`Min threshold: ${requiredLux * minThreshold}, Max threshold: ${requiredLux * maxThreshold}`);
  
  const best = validOptions.length > 0 
    ? validOptions.reduce((a, b) => a.totalCost < b.totalCost ? a : b)
    : tableData.length > 0 ? tableData.reduce((a, b) => a.totalCost < b.totalCost ? a : b) : null;
  
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
  
  // Calculate actual illumination values using point-based method
  const pointResults = calculatePointBasedIllumination(
    roomLength,
    roomWidth,
    roomHeight,
    best.grid!,
    best.flux * (Kz * zeta) // Apply safety coefficients
  );
  
  return {
    layout: { cols, rows, xSp, ySp, N },
    illuminationValues: {
      avgByFlux: pointResults.average,
      average: pointResults.average,
      minimum: pointResults.minimum,
      uniformity: pointResults.uniformity,
      kz: 1.2,
      eta: 1.15
    }
  };
};
