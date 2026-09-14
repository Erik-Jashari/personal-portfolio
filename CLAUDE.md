@AGENTS.md

# Portfolio Progress

See `PLAN.md` for the original tech-stack/design plan.

## Done
- Next.js (App Router) + TypeScript + Tailwind scaffold, deployed target: Vercel.
- Cinematic scroll-scrubbed hero (`CinematicHero.tsx`, `usePinnedCanvasScrub.ts`, `heroFrame.ts`, `heroScroll.ts`) pinned via GSAP ScrollTrigger, with a reduced-motion fallback (`usePrefersReducedMotion.ts`).
- Global smooth/inertia scrolling via Lenis (`SmoothScrollProvider.tsx`), synced to GSAP's ticker and `ScrollTrigger.update`.
- Sticky `Nav` (`Nav.tsx`) that stays hidden over the hero and fades in once scrolled past it; nav links smooth-scroll to sections via a shared Lenis instance exposed through a `useLenis()` context (`SmoothScrollProvider.tsx`) — links call `e.preventDefault()` and `lenis.scrollTo(href, { offset: -88 })` themselves (Lenis's built-in `anchors` option doesn't call `preventDefault`, so the browser's native instant hash-jump would otherwise beat the smooth animation to the target).
- Page sections wired up on `page.tsx`: About, Projects (via `ProjectsSection`/`ProjectGallery`, framer-motion image gallery), Skills, Experience, Contact — each wrapped in `Reveal.tsx` for scroll-in reveal animation.
- Real content filled in for About, Projects (2 case studies with repo links/images), Skills, Experience, Contact (email + LinkedIn).
- About section portrait: real photo (`public/IMG_6935.jpeg`) via `next/image`, replacing the placeholder "EJ" avatar block.
- `public/resume.pdf` added — Experience section's "Download Resume" link now resolves.

## Next
- Source/finalize the real hero frame sequence (currently a placeholder loop per `PLAN.md`) and confirm mobile fallback (shorter looping video or static hero) for the frame-sequence hero.
- Verify contrast/accessibility of the accent color against the dark background, and confirm keyboard navigation through nav + all section links.
- Optional: blog section (explicitly deferred in `PLAN.md`).
