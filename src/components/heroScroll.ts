/**
 * Scroll distance the hero pins for, shared between CinematicHero (which
 * creates the pin) and Nav (which needs to know exactly when the pin ends
 * to reveal itself). Referencing a pinned trigger's "bottom" from a second,
 * independent ScrollTrigger resolves against the element's un-pinned
 * natural height rather than the full pinned scroll distance — using the
 * same explicit "+=200%" end on both keeps them in sync.
 */
export const HERO_PIN_END = "+=200%";
