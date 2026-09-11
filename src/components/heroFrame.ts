/**
 * Placeholder "frame sequence" renderer for the cinematic hero.
 *
 * Draws a blueprint/schematic scene procedurally, parameterized by scroll
 * progress (0..1), standing in for a real pre-rendered frame sequence.
 *
 * To swap in real frames later: preload an array of HTMLImageElement/
 * ImageBitmap (e.g. /public/frames/0001.webp..NNNN.webp), then replace the
 * body of drawFrame with `ctx.drawImage(frames[Math.round(progress * (frames.length - 1))], 0, 0, w, h)`.
 * The caller already recomputes on every scroll update and on resize, so
 * no other wiring changes.
 */

const CYAN = "110, 231, 255";

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const step = 40;

  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${CYAN}, 0.06)`;
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(${CYAN}, 0.14)`;
  for (let x = 0; x <= w; x += step * 5) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += step * 5) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

function drawGear(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  teeth: number,
  rotation: number,
  alpha: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.strokeStyle = `rgba(${CYAN}, ${alpha})`;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const x1 = Math.cos(a) * r;
    const y1 = Math.sin(a) * r;
    const x2 = Math.cos(a) * (r + 12);
    const y2 = Math.sin(a) * (r + 12);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawTraces(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  progress: number
) {
  const endpoints = [
    { x: w * 0.14, y: h * 0.22 },
    { x: w * 0.86, y: h * 0.22 },
    { x: w * 0.1, y: h * 0.78 },
    { x: w * 0.9, y: h * 0.78 },
    { x: w * 0.5, y: h * 0.1 },
    { x: w * 0.5, y: h * 0.9 },
  ];

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = `rgba(${CYAN}, 0.55)`;
  ctx.shadowColor = `rgba(${CYAN}, 0.6)`;
  ctx.shadowBlur = 6;

  endpoints.forEach((pt, i) => {
    const segProgress = clamp01((progress - i * 0.05) / 0.5);
    if (segProgress <= 0) return;

    const elbowX = cx + (pt.x - cx) * Math.min(segProgress * 2, 1);

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(elbowX, cy);
    if (segProgress > 0.5) {
      const vertProgress = (segProgress - 0.5) * 2;
      ctx.lineTo(elbowX, cy + (pt.y - cy) * vertProgress);
    }
    ctx.stroke();

    if (segProgress >= 1) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CYAN}, 0.9)`;
      ctx.fill();
    }
  });

  ctx.shadowBlur = 0;
}

function drawCornerBrackets(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const m = 32;
  const len = 28;
  ctx.strokeStyle = `rgba(${CYAN}, 0.35)`;
  ctx.lineWidth = 1.5;

  const corners: [number, number, number, number][] = [
    [m, m, 1, 1],
    [w - m, m, -1, 1],
    [m, h - m, 1, -1],
    [w - m, h - m, -1, -1],
  ];

  corners.forEach(([x, y, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(x, y + len * dy);
    ctx.lineTo(x, y);
    ctx.lineTo(x + len * dx, y);
    ctx.stroke();
  });
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number
) {
  const p = clamp01(progress);

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#050a11");
  bg.addColorStop(1, "#0b1a2a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  drawGrid(ctx, w, h);

  const cx = w / 2;
  const cy = h / 2;

  drawTraces(ctx, cx, cy, w, h, p);

  drawGear(ctx, cx, cy, Math.min(w, h) * 0.09, 10, p * Math.PI * 1.5, 0.85);
  drawGear(
    ctx,
    cx - Math.min(w, h) * 0.13,
    cy + Math.min(w, h) * 0.08,
    Math.min(w, h) * 0.055,
    8,
    -p * Math.PI * 2.2,
    0.6
  );
  drawGear(
    ctx,
    cx + Math.min(w, h) * 0.14,
    cy - Math.min(w, h) * 0.07,
    Math.min(w, h) * 0.04,
    6,
    p * Math.PI * 3,
    0.5
  );

  drawCornerBrackets(ctx, w, h);

  ctx.font = "12px monospace";
  ctx.fillStyle = `rgba(${CYAN}, 0.55)`;
  ctx.textAlign = "right";
  ctx.fillText(`SCROLL ${Math.round(p * 100).toString().padStart(3, "0")}%`, w - 32, h - 44);

  const vignette = ctx.createRadialGradient(
    w / 2,
    h / 2,
    Math.min(w, h) * 0.3,
    w / 2,
    h / 2,
    Math.max(w, h) * 0.75
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}
