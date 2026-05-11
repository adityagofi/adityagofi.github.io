// Shared animation presets — keep entrance and scroll motion consistent
// across every page. Tweak the constants below to adjust the feel globally.

// Cinematic ease-out (close to easeOutExpo) — slow start cushioned at the tail.
const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HERO_DURATION = 1.05;
const SCROLL_DURATION = 0.8;
const VIEWPORT_AMOUNT = 0.2;

// First-load entrance for the page hero. Combines a soft blur "rack focus",
// a tiny scale-up, and a fade-up for a smooth cinematic reveal.
export const heroEnter = {
  initial: { opacity: 0, y: 32, scale: 0.97, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: { duration: HERO_DURATION, ease: SMOOTH_EASE },
};

// Delayed sub-entrance for elements after the hero block (CTA, scroll cue).
// Lighter blur and travel so it doesn't compete with the headline reveal.
export const heroEnterDelay = (delay: number) => ({
  initial: { opacity: 0, y: 22, scale: 0.985, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: { duration: 0.85, delay, ease: SMOOTH_EASE },
});

// Stagger container for grouped hero elements (heading + subtitle + CTA).
// Wrap children with `heroStaggerChild` and they'll cascade in automatically.
export const heroStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const heroStaggerChild = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: SMOOTH_EASE },
  },
};

// Scroll-triggered fade-up, used for intro paragraphs and section headings.
export const scrollFadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: VIEWPORT_AMOUNT },
  transition: { duration: SCROLL_DURATION, ease: SMOOTH_EASE },
};

export const scrollFadeUpDelay = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: VIEWPORT_AMOUNT },
  transition: { duration: SCROLL_DURATION, delay, ease: SMOOTH_EASE },
});

// Subtle scale-in for cards or images that appear on scroll.
export const scrollScaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: VIEWPORT_AMOUNT },
  transition: { duration: SCROLL_DURATION, ease: SMOOTH_EASE },
};

// Soft card entrance — small y travel + subtle scale, used for grid cards.
// The delay arg lets callers stagger a list (e.g. cardIn(i * 0.08)).
export const cardIn = (delay: number) => ({
  initial: { opacity: 0, y: 24, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: VIEWPORT_AMOUNT },
  transition: { duration: 0.75, delay, ease: SMOOTH_EASE },
});

// Slide-in from a horizontal offset — used for alternating left/right rows.
// e.g. scrollSlideIn(i % 2 === 0 ? -30 : 30) for zigzag project lists.
export const scrollSlideIn = (fromX: number, delay = 0) => ({
  initial: { opacity: 0, x: fromX },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: VIEWPORT_AMOUNT },
  transition: { duration: SCROLL_DURATION, delay, ease: SMOOTH_EASE },
});
