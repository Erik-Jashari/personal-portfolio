"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type DrawFrame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) => void;

/**
 * Pins `sectionRef` for `pinEnd` of scroll and scrubs `draw` against scroll
 * progress (0..1) on `canvasRef`. Optional `onProgress` lets the caller
 * drive its own overlay tweens off the exact same progress value used for
 * the canvas draw, in the same onUpdate tick — a second, independent
 * ScrollTrigger on a pinned trigger resolves its start/end against the
 * element's un-pinned natural height, not the pinned scroll distance, so
 * overlay timing must not be wired up that way.
 *
 * Respects prefers-reduced-motion: skips the pin/scrub entirely and draws
 * a single static frame at `staticProgress` instead.
 */
export function usePinnedCanvasScrub({
  sectionRef,
  canvasRef,
  pinEnd,
  draw,
  onProgress,
  staticProgress = 0.5,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  pinEnd: string;
  draw: DrawFrame;
  onProgress?: (progress: number) => void;
  staticProgress?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let progress = reducedMotion ? staticProgress : 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, width, height, progress);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      // No onProgress call here: overlays should render in their default,
      // fully-visible DOM state under reduced motion rather than being
      // pushed through fade math meant for the scroll-driven case.
      return () => window.removeEventListener("resize", resize);
    }

    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: pinEnd,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        progress = self.progress;
        draw(ctx, window.innerWidth, window.innerHeight, progress);
        onProgress?.(progress);
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      pin.kill();
    };
  }, [reducedMotion, draw, pinEnd, onProgress, staticProgress, sectionRef, canvasRef]);

  return reducedMotion;
}
