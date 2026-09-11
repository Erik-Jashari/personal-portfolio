"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { drawFrame } from "./heroFrame";
import { HERO_PIN_END } from "./heroScroll";
import { usePinnedCanvasScrub } from "./usePinnedCanvasScrub";

const TITLE_FADE_END = 0.4;

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((progress: number) => {
    const title = titleRef.current;
    if (!title) return;
    const textProgress = Math.min(progress / TITLE_FADE_END, 1);
    gsap.set(title, {
      opacity: 1 - textProgress,
      y: -60 * textProgress,
      scale: 1 - 0.08 * textProgress,
    });
  }, []);

  const reducedMotion = usePinnedCanvasScrub({
    sectionRef,
    canvasRef,
    pinEnd: HERO_PIN_END,
    draw: drawFrame,
    onProgress,
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/40" />

      <div className="absolute left-6 top-6 z-10 font-display text-sm tracking-[0.3em] text-white/80">
        EJ
      </div>

      <div
        ref={titleRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="font-display text-[15vw] leading-[0.85] text-white sm:text-[10vw] md:text-[7rem]">
          ERIK JASHARI
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.35em] text-white/70 sm:text-base">
          Software Engineer &mdash; Building things that work
        </p>
      </div>

      {!reducedMotion && (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-pulse text-xs uppercase tracking-[0.3em] text-white/50">
          Scroll
        </div>
      )}
    </section>
  );
}
