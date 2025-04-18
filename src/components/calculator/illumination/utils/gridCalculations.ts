
import { IlluminationGrid } from '../types';

/**
 * For given N and L×W proportions, selects rows×cols ≥ N
 * with minimal difference cols/rows ≃ L/W, and with minimal empty cells.
 * Ensures:
 *   — if L>=W, then cols>=rows (rows along the long side),
 *   — otherwise reversed.
 */
export function findBestGrid(N: number, L: number, W: number): IlluminationGrid {
  const target = L / W;
  let best: { rows: number; cols: number; diff: number; wasted: number } | null = null;
  
  for (let rows = 1; rows <= N; rows++) {
    const cols = Math.ceil(N / rows);
    const cells = rows * cols;
    const wasted = cells - N;
    const ratio = cols / rows;
    const diff = Math.abs(ratio - target);
    
    if (!best || diff < best.diff || (diff === best.diff && wasted < best.wasted)) {
      best = { rows, cols, diff, wasted };
    }
  }
  
  // Guarantee rows along the longer side
  if (L >= W && best!.cols < best!.rows) {
    [best!.rows, best!.cols] = [best!.cols, best!.rows];
  } else if (W > L && best!.rows < best!.cols) {
    [best!.rows, best!.cols] = [best!.cols, best!.rows];
  }
  
  return {
    rows: best!.rows,
    cols: best!.cols,
    ratioDiff: best!.diff,
    wasted: best!.wasted
  };
}
