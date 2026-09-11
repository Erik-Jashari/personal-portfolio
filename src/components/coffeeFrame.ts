/**
 * Placeholder "frame sequence" renderer for the coffee section: a cup of
 * coffee poured top-down, with the milk stream blooming into a heart
 * (latte art) as scroll progress advances. Same swap-to-real-frames note
 * as heroFrame.ts applies here.
 */

const CREAM = "250, 240, 225";
const ESPRESSO = "58, 30, 18";

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function heartPoint(t: number, size: number) {
  const x = Math.pow(Math.sin(t), 3);
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  );
  return { x: x * size, y: (y / 17) * size };
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number
) {
  const p = clamp01(progress);

  const bg = ctx.createRadialGradient(
    w / 2,
    h * 0.4,
    h * 0.1,
    w / 2,
    h * 0.5,
    Math.max(w, h) * 0.8
  );
  bg.addColorStop(0, "#2b1710");
  bg.addColorStop(1, "#120804");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h * 0.56;
  const cupR = Math.min(w, h) * 0.26;

  ctx.beginPath();
  ctx.ellipse(cx, cy + cupR * 0.85, cupR * 1.15, cupR * 0.28, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(cx, cy, cupR, cupR * 0.92, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${ESPRESSO}, 1)`;
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(250,235,215,0.15)";
  ctx.stroke();

  const crema = ctx.createRadialGradient(
    cx,
    cy - cupR * 0.15,
    cupR * 0.1,
    cx,
    cy,
    cupR * 0.95
  );
  crema.addColorStop(0, "#5a3420");
  crema.addColorStop(1, "#2c1810");
  ctx.beginPath();
  ctx.ellipse(cx, cy, cupR * 0.92, cupR * 0.84, 0, 0, Math.PI * 2);
  ctx.fillStyle = crema;
  ctx.fill();

  const streamProgress = clamp01((p - 0.03) / 0.5);
  if (streamProgress > 0 && streamProgress < 1) {
    const streamTopY = 0;
    const streamBottomY = cy - cupR * 0.1;
    const sway = Math.sin(p * 40) * 4;
    ctx.beginPath();
    ctx.moveTo(cx + sway * 0.3, streamTopY);
    ctx.quadraticCurveTo(cx + sway, (streamTopY + streamBottomY) / 2, cx, streamBottomY);
    ctx.lineWidth = 5;
    ctx.strokeStyle = `rgba(${CREAM}, 0.9)`;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  const heartProgress = clamp01((p - 0.15) / 0.65);
  if (heartProgress > 0) {
    const scale = easeOutCubic(heartProgress) * cupR * 0.62;
    ctx.save();
    ctx.translate(cx, cy + cupR * 0.06);

    ctx.beginPath();
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const pt = heartPoint(t, scale);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();

    const heartGrad = ctx.createRadialGradient(
      0,
      -scale * 0.2,
      scale * 0.1,
      0,
      0,
      scale * 1.1
    );
    heartGrad.addColorStop(0, "rgba(255,248,235,0.98)");
    heartGrad.addColorStop(1, "rgba(235,210,175,0.85)");
    ctx.fillStyle = heartGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(-scale * 0.18, -scale * 0.28, scale * 0.22, scale * 0.12, -0.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fill();

    ctx.restore();
  }

  ctx.beginPath();
  ctx.ellipse(cx, cy, cupR, cupR * 0.92, 0, Math.PI * 1.1, Math.PI * 1.5);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 3;
  ctx.stroke();

  const steamAlpha = clamp01((p - 0.7) / 0.3) * 0.4;
  if (steamAlpha > 0) {
    ctx.strokeStyle = `rgba(255,255,255,${steamAlpha})`;
    ctx.lineWidth = 2;
    [-cupR * 0.3, 0, cupR * 0.3].forEach((offsetX, i) => {
      const baseX = cx + offsetX;
      const baseY = cy - cupR * 0.9;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      for (let s = 1; s <= 5; s++) {
        const yy = baseY - s * 14;
        const xx = baseX + Math.sin(s * 1.3 + i + p * 6) * 8;
        ctx.lineTo(xx, yy);
      }
      ctx.stroke();
    });
  }

  const vignette = ctx.createRadialGradient(
    w / 2,
    h / 2,
    Math.min(w, h) * 0.3,
    w / 2,
    h / 2,
    Math.max(w, h) * 0.75
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}
