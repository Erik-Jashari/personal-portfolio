@AGENTS.md

# Portfolio Progress

See `PLAN.md` for the original tech-stack/design plan.

## Done
- Next.js (App Router) + TypeScript + Tailwind scaffold, deployed target: Vercel.
- Cinematic scroll-scrubbed hero (`CinematicHero.tsx`, `usePinnedCanvasScrub.ts`, `heroFrame.ts`, `heroScroll.ts`) pinned via GSAP ScrollTrigger, with a reduced-motion fallback (`usePrefersReducedMotion.ts`).
- Global smooth/inertia scrolling via Lenis (`SmoothScrollProvider.tsx`), synced to GSAP's ticker and `ScrollTrigger.update`.
- Sticky `Nav` (`Nav.tsx`) that stays hidden over the hero and fades in once scrolled past it; nav links now smooth-scroll to sections using Lenis's built-in anchor handling (`anchors: { offset: -88 }` in `SmoothScrollProvider.tsx`) so the fixed nav bar doesn't cover the section heading on landing.
- Page sections wired up on `page.tsx`: About, Projects (via `ProjectsSection`/`ProjectGallery`, framer-motion image gallery), Skills, Experience, Contact — each wrapped in `Reveal.tsx` for scroll-in reveal animation.
- Real content filled in for About, Projects (2 case studies with repo links/images), Skills, Experience, Contact (email + LinkedIn).

## Next
- Swap the About section's placeholder avatar block for a real portrait image (`next/image`).
- Add `public/resume.pdf` — the "Download Resume" link in the Experience section currently points at a file that may not exist yet.
- Source/finalize the real hero frame sequence (currently a placeholder loop per `PLAN.md`) and confirm mobile fallback (shorter looping video or static hero) for the frame-sequence hero.
- Verify contrast/accessibility of the accent color against the dark background, and confirm keyboard navigation through nav + all section links.
- Optional: blog section (explicitly deferred in `PLAN.md`).
