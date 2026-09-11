"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_PIN_END } from "./heroScroll";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#coffee", label: "Coffee" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const reducedMotion = usePrefersReducedMotion();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const hero = document.querySelector("#hero");
    if (!hero) return;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: HERO_PIN_END,
      onLeave: () => setScrolledPastHero(true),
      onEnterBack: () => setScrolledPastHero(false),
    });

    return () => st.kill();
  }, [reducedMotion]);

  const visible = reducedMotion || scrolledPastHero;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-black/40 px-6 py-4 backdrop-blur-md transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <a href="#hero" className="font-display text-sm tracking-[0.3em] text-white">
        EJ
      </a>
      <ul className="flex gap-6 text-xs uppercase tracking-[0.25em] text-white/80">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
