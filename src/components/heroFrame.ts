/**
 * Procedurally drawn blueprint/schematic scene for the cinematic hero,
 * parameterized by scroll progress (0..1). This is the deliberate visual
 * style for the hero, not a stand-in for photography.
 *
 * To swap in a real frame sequence later: preload an array of
 * HTMLImageElement/ImageBitmap (e.g. /public/frames/0001.webp..NNNN.webp),
 * then replace the body of drawFrame with
 * `ctx.drawImage(frames[Math.round(progress * (frames.length - 1))], 0, 0, w, h)`.
 * The caller already recomputes on every scroll update and on resize, so
 * no other wiring changes.
 */

const CYAN = "110, 231, 255";

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

// Deterministic pseudo-random in [0, 1), seeded so particles/dust stay
// stable across frames instead of jittering every redraw.
function hashRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number
) {
  const count = 60;
  for (let i = 0; i < count; i++) {
    const seedX = hashRandom(i * 7.13);
    const seedY = hashRandom(i * 3.71 + 1);
    const speed = 0.15 + hashRandom(i * 5.9 + 2) * 0.35;
    const x = seedX * w;
    const y = (seedY * h - progress * h * speed) % h;
    const wrappedY = y < 0 ? y + h : y;
    const size = 0.6 + hashRandom(i * 2.3 + 3) * 1.4;
    const alpha = 0.15 + hashRandom(i * 4.1 + 4) * 0.35;

    ctx.beginPath();
    ctx.arc(x, wrappedY, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CYAN}, ${alpha})`;
    ctx.fill();
  }
}

function drawGlow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  alpha: number
) {
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  glow.addColorStop(0, `rgba(${CYAN}, ${alpha})`);
  glow.addColorStop(1, `rgba(${CYAN}, 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
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

  const cx = w / 2;
  const cy = h / 2;

  drawGlow(ctx, cx, cy, Math.max(w, h) * 0.55, 0.08);
  drawGrid(ctx, w, h);
  drawParticles(ctx, w, h, p);

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
