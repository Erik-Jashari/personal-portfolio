"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { drawFrame } from "./coffeeFrame";
import { usePinnedCanvasScrub } from "./usePinnedCanvasScrub";

const COFFEE_PIN_END = "+=200%";
const TEXT_REVEAL_START = 0.72;

export default function CoffeeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const onProgress = useCallback((progress: number) => {
    const text = textRef.current;
    if (!text) return;
    const textProgress = Math.min(
      Math.max((progress - TEXT_REVEAL_START) / (1 - TEXT_REVEAL_START), 0),
      1
    );
    gsap.set(text, {
      opacity: textProgress,
      y: 24 * (1 - textProgress),
    });
  }, []);

  const reducedMotion = usePinnedCanvasScrub({
    sectionRef,
    canvasRef,
    pinEnd: COFFEE_PIN_END,
    draw: drawFrame,
    onProgress,
    staticProgress: 0.9,
  });

  return (
    <section
      id="coffee"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />

      <div
        ref={textRef}
        className={`absolute inset-x-0 bottom-20 z-10 flex flex-col items-center px-6 text-center ${
          reducedMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="font-display text-4xl text-white sm:text-6xl">
          BEHIND THE BAR
        </h2>
        <p className="mt-4 text-sm uppercase tracking-[0.35em] text-white/70 sm:text-base">
          Barista &amp; waiter &mdash; pulling shots between pull requests
        </p>
      </div>
    </section>
  );
}
