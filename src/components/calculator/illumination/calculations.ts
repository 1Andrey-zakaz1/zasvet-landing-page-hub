
import { TableData, IlluminationGrid } from './types';
import { luminaireModels } from './data';

// ======= Запас и коэффициент использования =======
const Kz = 1.1;   // коэффициент запаса
const eta = 0.85;  // коэффициент использования

/**
 * Для заданного N и пропорций L×W находит rows×cols >= N с минимальным числом пустых ячеек,
 * а среди равных — с лучшим соответствием cols/rows ≈ L/W.
 */
function findCoveringGrid(N: number, L: number, W: number): IlluminationGrid {
  const target = L / W;
  let best = { rows: 1, cols: N, wasted: N - 1, ratioDiff: Math.abs(N - target) };
  
  for (let rows = 1; rows <= N; rows++) {
    const cols = Math.ceil(N / rows);
    const cells = rows * cols;
    const wasted = cells - N;
    const ratio = cols / rows;
    const diff = Math.abs(ratio - target);
    
    // Сначала предпочитаем меньше пустых, потом лучше ratio
    if (wasted < best.wasted || (wasted === best.wasted && diff < best.ratioDiff)) {
      best = { rows, cols, wasted, ratioDiff: diff };
    }
  }
  
  return best;
}

/**
 * Рассчитывает среднюю освещенность по точечному методу для заданного числа светильников
 */
function calculatePointAverage(
  n: number, 
  L: number, 
  W: number, 
  H: number, 
  flux: number
): number {
  const grid = findCoveringGrid(n, L, W);
  const xSp = L / grid.cols;
  const ySp = W / grid.rows;
  const gp = 5;  // 5×5 точек
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
          
          // координаты светильника
          const lx = (c + 0.5) * xSp;
          const ly = (r + 0.5) * ySp;
          const lz = H; 
          
          // расстояние до точки
          const dx = px - lx;
          const dy = py - ly;
          const dz = -lz;
          const d = Math.hypot(dx, dy, dz);
          if (d <= 0) continue;
          
          // угол падения
          const cosT = H / d;
          
          // сила света (приблизительно равномерно по полусфере)
          const I = (flux * eta / Kz) / (2 * Math.PI);
          
          // вклад одного светильника
          Ept += (I * cosT) / (d * d);
        }
      }
      sumE += Ept;
    }
  }
  
  return sumE / (gp * gp);
}

export const calculateOptimalLuminaires = (
  roomLength: number,
  roomWidth: number,
  requiredLux: number,
  luminaireType: string,
  roomHeight: number = 3 // Default height if not provided
): { tableData: TableData[], bestResult: TableData | null } => {
  // Calculate area and required luminous flux
  const area = roomLength * roomWidth;
  
  // Get models for selected category
  const models = luminaireModels[luminaireType as keyof typeof luminaireModels] || [];
  
  // Find optimal model and prepare table data
  const tableData: TableData[] = [];
  
  models.forEach((m) => {
    // 1) стартовое N по люмен-методу (для ускорения)
    const phiReq0 = requiredLux * area * Kz / eta;
    let N = Math.ceil(phiReq0 / m.flux);
    
    // 2) итеративно добираем N, пока точечная средняя < E_req
    let avgPt = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);
    
    // Предел итераций для предотвращения бесконечного цикла
    const MAX_ITERATIONS = 200;
    let iterations = 0;
    
    while (avgPt < requiredLux && iterations < MAX_ITERATIONS) {
      N++;
      avgPt = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);
      iterations++;
    }
    
    // 3) теперь "дозабиваем" до полного сеточного заполнения
    const grid = findCoveringGrid(N, roomLength, roomWidth);
    if (grid.rows * grid.cols > N) {
      N = grid.rows * grid.cols;
      avgPt = calculatePointAverage(N, roomLength, roomWidth, roomHeight, m.flux);  // обновляем среднюю на новом N
    }
    
    // 4) сохраняем результаты для модели
    const cost = N * m.price;
    
    tableData.push({
      ...m,
      count: N,
      totalCost: cost,
      achieved: avgPt.toFixed(1),
      grid,
      perfectGrid: true // все сетки "идеальные", так как мы их добиваем до полного заполнения
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
  
  // 1) Средняя освещенность по люмен-методу с учетом коэффициентов
  const deliveredFlux = N * best.flux * eta / Kz;
  const avgByFlux = deliveredFlux / area;
  
  // 2) точечная средняя (теперь тоже с учетом коэффициентов)
  const avgPoint = (totalLux * eta / Kz) / (gp * gp);
  
  // Минимальная освещенность и коэффициент равномерности (с учетом коэффициентов)
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
