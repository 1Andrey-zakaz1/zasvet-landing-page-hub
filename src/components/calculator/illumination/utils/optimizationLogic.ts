import { TableData } from '../types';
import { luminaireModels } from '../data';
import { findExactGrid, findBestGrid } from './gridCalculations';
import { findOptimalLuminaireCount, calculatePointBasedIllumination } from './pointCalculations';

export const calculateOptimalLuminaires = (
  roomLength: number,
  roomWidth: number,
  requiredLux: number,
  luminaireType: string,
  roomHeight: number = 3
): { tableData: TableData[], bestResult: TableData | null } => {
  const models = luminaireModels[luminaireType as keyof typeof luminaireModels] || [];
  const tableData: TableData[] = [];
  
  models.forEach((m) => {
    let bestOption: {grid: any, actualLux: number, uniformity: number} | null = null;
    let bestScore = Infinity;
    
    // Limit iterations for large rooms to improve performance
    const area = roomLength * roomWidth;
    const maxIterations = area > 1000 ? 10 : area > 400 ? 15 : area > 100 ? 25 : 50;
    
    // Test different grid configurations
    for (let testCount = 1; testCount <= maxIterations; testCount++) {
      const testGrid = findBestGrid(testCount, roomLength, roomWidth);
      const actualCount = testGrid.rows * testGrid.cols;
      
      const result = findOptimalLuminaireCount(
        roomLength, 
        roomWidth, 
        roomHeight, 
        requiredLux, 
        m.flux, 
        testGrid
      );
      
      // Score based on cost and requirements compliance - more flexible for large rooms
      const costScore = actualCount * m.price;
      const luxDiff = Math.abs(result.actualLux - requiredLux);
      const uniformityPenalty = result.uniformity < 0.3 ? 1000 : 0; // Reduced from 0.4 for large rooms
      const minLuxPenalty = result.actualLux < requiredLux * 0.6 ? 2000 : 0; // Reduced from 0.8 for large rooms
      
      const totalScore = costScore + luxDiff * 10 + uniformityPenalty + minLuxPenalty;
      
      if (totalScore < bestScore && result.actualLux >= requiredLux * 0.6) { // Reduced threshold
        bestScore = totalScore;
        bestOption = {
          grid: testGrid,
          actualLux: result.actualLux,
          uniformity: result.uniformity
        };
      }
    }
    
    if (bestOption) {
      const actualCount = bestOption.grid.rows * bestOption.grid.cols;
      
      tableData.push({
        ...m,
        count: actualCount,
        totalCost: actualCount * m.price,
        achieved: bestOption.actualLux.toFixed(1),
        grid: bestOption.grid
      });
    }
  });
  
  // Select the best option by minimal total cost among those that meet requirements
  if (tableData.length === 0) {
    return { tableData: [], bestResult: null };
  }
  
  // For very large rooms, be even more flexible
  const area = roomLength * roomWidth;
  const flexibilityThreshold = area > 1000 ? 0.4 : area > 500 ? 0.5 : 0.6;
  
  const validOptions = tableData.filter(item => parseFloat(item.achieved) >= requiredLux * flexibilityThreshold);
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
    best.flux
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
