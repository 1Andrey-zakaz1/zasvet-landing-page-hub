
import { TableData, IlluminationGrid } from './types';
import { luminaireModels } from './data';

/**
 * Для заданного N и пропорций комнаты подбирает оптимальные rows×cols = N
 * Возвращает { rows, cols, ratioDiff }
 */
function findBestGrid(N: number, L: number, W: number): IlluminationGrid {
  let best: IlluminationGrid | null = null;
  const targetRatio = L / W;
  for (let rows = 1; rows * rows <= N; rows++) {
    if (N % rows === 0) {
      const cols = N / rows;
      const ratio = cols / rows;
      const diff = Math.abs(ratio - targetRatio);
      if (!best || diff < best.ratioDiff) {
        best = { rows, cols, ratioDiff: diff };
      }
      // и пробуем зеркальную пару (чтобы не пропустить вариант rows>cols)
      if (rows !== cols) {
        const diff2 = Math.abs((rows / cols) - targetRatio);
        if (diff2 < best.ratioDiff) {
          best = { rows: cols, cols: rows, ratioDiff: diff2 };
        }
      }
    }
  }
  // Если N простое число, rows будет равно 1, а cols = N
  return best || { rows: 1, cols: N, ratioDiff: Math.abs(N - targetRatio) };
}

export const calculateOptimalLuminaires = (
  roomLength: number,
  roomWidth: number,
  requiredLux: number,
  luminaireType: string
): { tableData: TableData[], bestResult: TableData | null } => {
  // Calculate area and required luminous flux
  const area = roomLength * roomWidth;
  const phiReq = requiredLux * area; // lumens
  
  // Get models for selected category
  const models = luminaireModels[luminaireType as keyof typeof luminaireModels] || [];
  
  // Find optimal model and prepare table data
  const tableData: TableData[] = [];
  
  models.forEach((m) => {
    const n = Math.ceil(phiReq / m.flux);
    const grid = findBestGrid(n, roomLength, roomWidth);
    const isPerfect = (grid.rows * grid.cols === n);
    const avgLux = (n * m.flux) / area;
    const cost = n * m.price;
    
    tableData.push({
      ...m,
      count: n,
      totalCost: cost,
      achieved: avgLux.toFixed(1),
      grid,
      perfectGrid: isPerfect
    });
  });
  
  // сначала фильтруем «идеальные» варианты
  const perfectOptions = tableData.filter(r => r.perfectGrid);
  let best: TableData | null = null;
  
  if (perfectOptions.length > 0) {
    // из них — минимальный по стоимости
    best = perfectOptions.reduce((a, b) => a.totalCost < b.totalCost ? a : b);
  } else {
    // fallback — самая дешевая модель вообще
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
  
  // Use the grid from the best result
  const { rows, cols } = best.grid;
  
  const xSp = roomLength / cols;
  const ySp = roomWidth / rows;
  
  // Point calculation on 5×5 grid
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
  
  // 1) средняя по люмен-методу (точно попадёт в требуемую норму)
  const avgByFlux = (best.count * best.flux) / area;
  
  // 2) точечная средняя (как было)
  const avgPoint = totalLux / (gp * gp);
  
  const uni = minLux / avgPoint;
  
  return {
    layout: { cols, rows, xSp, ySp, N },
    illuminationValues: {
      avgByFlux: parseFloat(avgByFlux.toFixed(1)),
      average: parseFloat(avgPoint.toFixed(1)),
      minimum: parseFloat(minLux.toFixed(1)),
      uniformity: parseFloat((uni * 100).toFixed(1))
    }
  };
};

export const drawRoomLayout = (
  canvas: HTMLCanvasElement,
  roomLength: number,
  roomWidth: number,
  layout: { cols: number, rows: number, xSp: number, ySp: number, N: number }
) => {
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Scale to fit canvas
    const scale = 50;
    canvas.width = roomLength * scale;
    canvas.height = roomWidth * scale;
    
    // Draw room
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Draw luminaires
    ctx.fillStyle = "#ffbd00";
    ctx.strokeStyle = "#d9a200";
    
    for (let r = 0; r < layout.rows; r++) {
      for (let k = 0; k < layout.cols; k++) {
        if (r * layout.cols + k >= layout.N) break;
        
        const x = (k + 0.5) * layout.xSp * scale;
        const y = (r + 0.5) * layout.ySp * scale;
        
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }
  }
};
