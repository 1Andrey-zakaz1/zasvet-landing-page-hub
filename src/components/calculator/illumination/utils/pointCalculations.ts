// Point-based illumination calculations
import { IlluminationGrid } from '../types';

export interface Point {
  x: number;
  y: number;
  illumination: number;
}

export interface LuminairePosition {
  x: number;
  y: number;
  flux: number;
}

/**
 * Calculates illumination at a point from a luminaire using point source formula
 */
function calculatePointIllumination(
  pointX: number,
  pointY: number,
  luminaireX: number,
  luminaireY: number,
  height: number,
  flux: number
): number {
  // Distance from luminaire to point
  const dx = pointX - luminaireX;
  const dy = pointY - luminaireY;
  const distance = Math.sqrt(dx * dx + dy * dy + height * height);
  
  // Cosine of angle between vertical and line to point
  const cosTheta = height / distance;
  
  // Point source illumination formula: E = I * cos³(θ) / r²
  // For diffuse sources, we use flux/π as intensity approximation
  const intensity = flux / Math.PI;
  const illumination = (intensity * Math.pow(cosTheta, 3)) / (distance * distance);
  
  return illumination;
}

/**
 * Generates a grid of calculation points with adaptive grid size
 */
function generateCalculationGrid(
  roomLength: number,
  roomWidth: number,
  gridSize?: number
): Point[] {
  const points: Point[] = [];
  
  // Adaptive grid size based on room dimensions - more aggressive for large rooms
  let adaptiveGridSize = gridSize;
  if (!adaptiveGridSize) {
    const area = roomLength * roomWidth;
    const maxDim = Math.max(roomLength, roomWidth);
    
    if (area <= 100) {  // Up to 10x10m
      adaptiveGridSize = 0.5;
    } else if (area <= 400) {  // Up to 20x20m
      adaptiveGridSize = 1.0;
    } else if (area <= 900) {  // Up to 30x30m
      adaptiveGridSize = 2.0;
    } else if (area <= 1600) {  // Up to 40x40m
      adaptiveGridSize = 3.0;
    } else if (area <= 2500) {  // Up to 50x50m
      adaptiveGridSize = 5.0;
    } else {  // Larger rooms
      adaptiveGridSize = Math.max(5.0, maxDim / 20);
    }
  }
  
  // Limit maximum number of points to 400 (20x20 grid max) for performance
  const maxPointsPerSide = 20;
  const pointsX = Math.min(Math.max(Math.floor(roomLength / adaptiveGridSize), 2), maxPointsPerSide);
  const pointsY = Math.min(Math.max(Math.floor(roomWidth / adaptiveGridSize), 2), maxPointsPerSide);
  
  const actualGridSizeX = roomLength / pointsX;
  const actualGridSizeY = roomWidth / pointsY;
  
  // Start from edge with offset
  const offsetX = actualGridSizeX / 2;
  const offsetY = actualGridSizeY / 2;
  
  for (let i = 0; i < pointsX; i++) {
    for (let j = 0; j < pointsY; j++) {
      points.push({ 
        x: offsetX + i * actualGridSizeX, 
        y: offsetY + j * actualGridSizeY, 
        illumination: 0 
      });
    }
  }
  
  return points;
}

/**
 * Calculates luminaire positions based on grid
 */
function calculateLuminairePositions(
  roomLength: number,
  roomWidth: number,
  grid: IlluminationGrid,
  flux: number
): LuminairePosition[] {
  const { rows, cols } = grid;
  const positions: LuminairePosition[] = [];
  
  // Calculate spacing
  const xSpacing = roomLength / cols;
  const ySpacing = roomWidth / rows;
  
  // Calculate offset to center the grid
  const xOffset = xSpacing / 2;
  const yOffset = ySpacing / 2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({
        x: xOffset + col * xSpacing,
        y: yOffset + row * ySpacing,
        flux
      });
    }
  }
  
  return positions;
}

/**
 * Calculates total illumination at all points from all luminaires
 */
export function calculatePointBasedIllumination(
  roomLength: number,
  roomWidth: number,
  roomHeight: number,
  grid: IlluminationGrid,
  flux: number,
  gridSize: number = 0.5
): {
  points: Point[];
  average: number;
  minimum: number;
  maximum: number;
  uniformity: number;
} {
  // Generate calculation points
  const points = generateCalculationGrid(roomLength, roomWidth, gridSize);
  
  // Calculate luminaire positions
  const luminaires = calculateLuminairePositions(roomLength, roomWidth, grid, flux);
  
  // Calculate illumination at each point
  points.forEach(point => {
    let totalIllumination = 0;
    
    luminaires.forEach(luminaire => {
      totalIllumination += calculatePointIllumination(
        point.x,
        point.y,
        luminaire.x,
        luminaire.y,
        roomHeight,
        luminaire.flux
      );
    });
    
    point.illumination = totalIllumination;
  });
  
  // Calculate statistics
  const illuminationValues = points.map(p => p.illumination);
  const average = illuminationValues.reduce((sum, val) => sum + val, 0) / illuminationValues.length;
  const minimum = Math.min(...illuminationValues);
  const maximum = Math.max(...illuminationValues);
  const uniformity = minimum / average;
  
  return {
    points,
    average,
    minimum,
    maximum,
    uniformity
  };
}

/**
 * Finds optimal number of luminaires using point-based calculation
 */
export function findOptimalLuminaireCount(
  roomLength: number,
  roomWidth: number,
  roomHeight: number,
  targetLux: number,
  flux: number,
  testGrid: IlluminationGrid
): {
  count: number;
  actualLux: number;
  uniformity: number;
  meetsRequirements: boolean;
} {
  const result = calculatePointBasedIllumination(
    roomLength,
    roomWidth,
    roomHeight,
    testGrid,
    flux
  );
  
  const count = testGrid.rows * testGrid.cols;
  const meetsRequirements = result.uniformity >= 0.4;
  
  return {
    count,
    actualLux: result.average,
    uniformity: result.uniformity,
    meetsRequirements
  };
}