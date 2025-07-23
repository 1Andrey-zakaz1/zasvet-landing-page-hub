import { IlluminationGrid } from '../types';

/**
 * For given N and L×W proportions, finds rows×cols == N,
 * minimizing |cols/rows – (L/W)|.
 * Returns {rows:1, cols:N} for prime N.
 */
export function findExactGrid(N: number, L: number, W: number): IlluminationGrid {
  const target = L / W;
  let best = { rows: 1, cols: N, diff: Math.abs(N - target) };
  
  for (let r = 1; r <= Math.sqrt(N); r++) {
    if (N % r === 0) {
      const c = N / r;
      const diff = Math.abs((c/r) - target);
      if (diff < best.diff) {
        best = { rows: r, cols: c, diff };
      }
      // Try mirrored variant
      const diff2 = Math.abs((r/c) - target);
      if (diff2 < best.diff) {
        best = { rows: c, cols: r, diff: diff2 };
      }
    }
  }
  
  // Align rows along the longer side
  if (L >= W && best.cols < best.rows) {
    [best.rows, best.cols] = [best.cols, best.rows];
  }
  
  return {
    rows: best.rows,
    cols: best.cols,
    ratioDiff: best.diff,
    wasted: 0  // Exact grid always has 0 wasted cells
  };
}

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
  
  for (let rows = 1; rows <= Math.min(N, 50); rows++) {
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
