"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectGalleryHandle = {
  open: () => void;
};

const ZOOM_SCALE = 2.2;

const ProjectGallery = forwardRef<
  ProjectGalleryHandle,
  { projectName: string; images: string[] }
>(function ProjectGallery({ projectName, images }, ref) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  // createPortal needs `document`, which doesn't exist during SSR.
  useEffect(() => setMounted(true), []);

  // Warm the browser's cache for every screenshot as soon as the card
  // mounts, so stepping through the lightbox never waits on the network.
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIndex(0);
      setZoomed(false);
      setOpen(true);
    },
  }));

  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
  }, []);
  const prev = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);
  const next = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && !zoomed) prev();
      if (e.key === "ArrowRight" && !zoomed) next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next, zoomed]);

  if (!mounted) return null;

  return createPortal(
    // React portals bubble synthetic events through the *React* tree, not
    // the DOM tree — this modal is logically nested inside the clickable
    // project card, so every click here must stop propagation or it
    // re-triggers the card's onClick (which reopens the gallery) in the
    // same event.
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/90 px-4 py-8"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute right-6 top-6 text-3xl text-white/70 transition-colors hover:text-accent"
          >
            &times;
          </button>

          <p className="absolute left-6 top-7 text-xs uppercase tracking-[0.2em] text-white/50">
            {projectName} &mdash; {index + 1} / {images.length}
          </p>

          <div
            className="relative flex w-full max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-0 z-10 -translate-x-2 rounded-full border border-white/15 bg-black/50 p-3 text-white transition-colors hover:border-accent hover:text-accent sm:-translate-x-14"
            >
              &larr;
            </button>

            <div
              className={`relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setOrigin(`${x}% ${y}%`);
                setZoomed((z) => !z);
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt={`${projectName} screenshot ${index + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: zoomed ? ZOOM_SCALE : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ transformOrigin: origin }}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-0 z-10 translate-x-2 rounded-full border border-white/15 bg-black/50 p-3 text-white transition-colors hover:border-accent hover:text-accent sm:translate-x-14"
            >
              &rarr;
            </button>
          </div>

          <p className="mt-3 text-xs uppercase tracking-widest text-white/40">
            Click image to zoom
          </p>

          <div
            className="mt-4 flex max-w-full gap-2 overflow-x-auto px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed(false);
                  setIndex(i);
                }}
                className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-md border transition-colors ${
                  i === index
                    ? "border-accent"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
});

export default ProjectGallery;
