
export const drawRoomLayout = (
  canvas: HTMLCanvasElement,
  roomLength: number,
  roomWidth: number,
  layout: { cols: number, rows: number, xSp: number, ySp: number, N: number }
) => {
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    const scale = 50;
    canvas.width = roomLength * scale;
    canvas.height = roomWidth * scale;
    
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#ffbd00";
    ctx.strokeStyle = "#d9a200";
    
    const xSpacing = roomLength / layout.cols;
    const ySpacing = roomWidth / layout.rows;
    
    for (let r = 0; r < layout.rows; r++) {
      for (let c = 0; c < layout.cols; c++) {
        if (r * layout.cols + c >= layout.N) break;
        
        const x = (c + 0.5) * xSpacing * scale;
        const y = (r + 0.5) * ySpacing * scale;
        
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }
  }
};
