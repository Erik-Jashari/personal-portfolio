# Portfolio Website — Project Plan

## Tech Stack
- Framework: Next.js (App Router). Reasoning: file-based routing, built-in image optimization, easy static export or ISR if a blog gets added later, and it pairs cleanly with Vercel for zero-config deploys. Astro is a solid alternative for near-zero JS, but the scroll-driven cinematic hero needs heavy client-side JS (GSAP + canvas) regardless, so React's ecosystem is the better fit here.
- Styling: Tailwind CSS for layout, spacing, and typography utilities, plus one hand-written CSS module for the cinematic scroll sequence (canvas positioning, pinned viewport) since that part needs precise control Tailwind isn't built for.
- Animation/scroll: GSAP + ScrollTrigger to drive scroll-scrubbing — pin the hero section and tie a frame-by-frame canvas draw to scroll progress (export the "video" as a sequence of JPG/WebP frames and draw them to a <canvas> as the user scrolls, since real <video> elements can't be scrubbed frame-accurately). Lenis (or Locomotive Scroll) on top for smooth/inertia scrolling so the scrubbing feels cinematic, not jumpy.
- Hosting: Vercel — first-class Next.js support, generous free tier for a personal site, automatic preview deploys per branch/PR.
- Other: TypeScript, next/image (or a custom loader for the frame sequence), Framer Motion optionally for simpler fade/text reveals outside the hero.

## Site Structure
1. Hero / cinematic intro — full-bleed canvas frame sequence scrubbed by scroll; name + one-line tagline overlaid; minimal chrome (small logo top-left, nav revealed after scrolling past hero).
2. About — short bio, photo/portrait, what you do and care about.
3. Projects / work — one large panel per project with bold imagery, links to live demo/repo.
4. Skills — a concise tech strip rather than a grid.
5. Experience — brief timeline of roles/education (resume link covers detail).
6. Resume — direct PDF download/link.
7. Contact — email, socials, simple mailto or contact form.
8. Blog — optional, skip for v1 unless you already write regularly.

## Design Direction — "GTA6 trailer" style
- Overall feel: cinematic, full-bleed, high contrast, minimal UI chrome — content and imagery breathe, nav/buttons stay small and out of the way until needed.
- Scroll = timeline: hero pins in the viewport while scroll position drives a pre-rendered frame sequence on a <canvas> (frames exported from an edited video or a Spline/Three.js scene). GSAP ScrollTrigger's scrub option ties scroll position directly to frame index; Lenis smooths the underlying scroll so it doesn't feel janky on trackpads/mice.
- Typography: one bold, oversized display face for hero/section titles (condensed grotesk — e.g. Neue Machina, General Sans, or Clash Display), a clean neutral sans (Inter/Satoshi) for body copy. Big type, generous negative space.
- Color: near-black dark base with a single accent color (electric pink/cyan/yellow — pick one matching your personal brand) used sparingly for links/CTAs so it pops against the imagery.
- Section transitions: each major section reveals full-viewport as you scroll into it (fade/slide/mask-in), not a static stack of divs.
- Responsiveness: the canvas frame-sequence hero is the trickiest part on mobile (asset weight + scroll behavior) — fall back to a shorter looping video or a simpler static hero with subtle parallax on small screens/reduced-motion.
- Accessibility: honor prefers-reduced-motion (disable scroll-scrubbing, show a static hero image instead), keep sufficient contrast for the accent color on dark background, keep nav/links keyboard-navigable, alt text on all project imagery.

## Next Steps
1. npx create-next-app@latest — TypeScript + Tailwind, in this folder.
2. Install gsap and lenis.
3. Source or render the hero frame sequence (start with a placeholder loop, swap later).
4. Build the hero scroll-scrub as a proof of concept before other sections.
5. Fill in real project/work content, deploy to Vercel.
