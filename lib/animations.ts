import type { Transition, Variants } from "motion/react";

// Central animation vocabulary — the whole site's flow is tuned from here.
// Curves and timings follow Emil Kowalski's framework: strong ease-out for
// entrances, ease-in-out for on-screen movement, durations near 300ms,
// staggers of 30-80ms, and transform/opacity only (no blur on big surfaces).
export const EASE_OUT: Transition["ease"] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: Transition["ease"] = [0.77, 0, 0.175, 1];

export const DURATION = 0.4;
// Gap between siblings while a block paints top-down
export const STAGGER = 0.06;

// Intro timeline: type the name → beat → glide it into the header → paint rest
export const TYPE_STAGGER = 0.07;
export const INTRO_BEAT = 0.5;
export const NAME_FLIP = 0.7;
// The dock is the last thing to enter, once the page content is painting
export const DOCK_DELAY = 0.4;

// Shimmer sweep — the site's one emphasis idiom, on the hero name and the AI
// section title. Shared so both stay on the same beat when it gets retuned.
export const SHIMMER = { duration: 0.35, repeatDelay: 3, spread: 8 } as const;
// Keeps the text in its normal color and sweeps a dimmed band across it; the
// negative margin cancels the padding the gradient needs to not clip glyphs.
export const SHIMMER_CLASS =
  "p-[0.15em] -m-[0.15em] [--base-color:var(--foreground)] [--base-gradient-color:#a1a1aa] dark:[--base-color:var(--foreground)] dark:[--base-gradient-color:#a1a1aa]";

const offsets = {
  up: { y: 12 },
  down: { y: -12 },
  left: { x: -12 },
  right: { x: 12 },
  none: {},
} as const;

export type FadeDirection = keyof typeof offsets;

export const fade = (from: FadeDirection = "up"): Variants => ({
  hidden: { opacity: 0, ...offsets[from] },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: DURATION, ease: EASE_OUT },
  },
});

export const staggerContainer = (stagger = STAGGER, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});
