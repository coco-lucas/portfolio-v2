"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  type PanInfo,
  type Transition,
} from "motion/react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getLanguageColor } from "@/utils/language-colors";
import type { IBadge } from "@/types/portfolio";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
  company?: string;
  badges?: string[];
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  exploreLabel?: string;
  seeMoreLabel?: string;
  seeLessLabel?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Base spring for spatial movement (x/z)
 */
const BASE_SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Scale Spring
 * Bouncier spring specifically for the visual "Click/Tap" feedback on the center card
 */
const TAP_SPRING: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 18, // Lower damping = subtle overshoot/wobble "tap"
  mass: 1,
};

function RailDescription({
  text,
  seeMore,
  seeLess,
}: {
  text: string;
  seeMore: string;
  seeLess: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const maxCharacters = 150;
  const isTooLong = text.length > maxCharacters;

  return (
    <p className="text-neutral-400">
      {isTooLong && !expanded ? text.substring(0, maxCharacters) + "..." : text}
      {isTooLong && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="ml-1 inline-flex items-center gap-0.5 align-baseline text-sm font-medium text-white/80 underline transition-colors hover:text-white cursor-pointer"
        >
          {expanded ? seeLess : seeMore}
          {expanded ? (
            <ChevronUp className="size-4 mt-0.5" />
          ) : (
            <ChevronDown className="size-4 mt-0.5" />
          )}
        </button>
      )}
    </p>
  );
}

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
  exploreLabel = "Explore",
  seeMoreLabel = "See more",
  seeLessLabel = "See less",
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);
  // Blocks the zoom from opening on the click browsers fire after a swipe
  const wasDragged = React.useRef(false);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- MOUSE WHEEL / TRACKPAD LOGIC ---
  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
      if (now - lastWheelTime.current < 400) return;

      // Horizontal scroll navigates; vertical only when shift is held so the
      // rail never hijacks normal page scrolling
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.shiftKey ? e.deltaY : 0;

      // Threshold to avoid accidental micro-scrolls
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev],
  );

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
    setTimeout(() => {
      wasDragged.current = false;
    }, 0);
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex min-h-[600px] w-full flex-col overflow-hidden bg-neutral-950 text-white outline-none select-none overflow-x-hidden",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative blurred backdrop, optimization wasted on it */}
            <img
              src={activeItem.imageSrc}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-8 md:px-8">
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[360px] w-full max-w-6xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            wasDragged.current = true;
          }}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Dynamic transforms
            const xOffset = offset * 380;
            const zOffset = -dist * 180;
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.1, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.5;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  // landscape aspect — project screenshots are PC captures
                  "absolute aspect-[4/3] w-[320px] md:w-[460px] rounded-2xl border-t border-white/20 bg-neutral-900 shadow-2xl transition-shadow duration-300",
                  isCenter ? "z-20 shadow-white/10" : "z-10",
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                // Bouncier spring on scale creates the "tap" effect
                transition={{ default: BASE_SPRING, scale: TAP_SPRING }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                {isCenter ? (
                  <div
                    className="h-full w-full"
                    onClickCapture={(e) => {
                      if (wasDragged.current) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <Zoom zoomMargin={10} classDialog="custom-zoom">
                      {/* eslint-disable-next-line @next/next/no-img-element -- remote CDN screenshot inside a transformed card */}
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full rounded-2xl object-cover"
                      />
                    </Zoom>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- remote CDN screenshot inside a transformed card
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-full w-full rounded-2xl object-cover pointer-events-none"
                  />
                )}

                {/* Lighting layers */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-black/10 pointer-events-none mix-blend-multiply" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls */}
        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-3 pointer-events-auto">
          {/* Top row is fixed height — expanding the description below never moves it */}
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={`meta-${activeItem.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 text-xs text-neutral-400"
              >
                {activeItem.meta && (
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {activeItem.meta}
                  </span>
                )}
                {activeItem.company && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-neutral-300">
                      {activeItem.company}
                    </span>
                  </>
                )}
              </motion.span>
            </AnimatePresence>

            <div className="flex items-center gap-2">
              {activeItem.href && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs cursor-pointer"
                >
                  <Link
                    href={activeItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {exploreLabel}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>
              )}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrev}
                  aria-label="Previous"
                  className="size-8 rounded-full active:scale-90 cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="min-w-9 text-center text-xs font-mono text-neutral-400">
                  {activeIndex + 1} / {count}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next"
                  className="size-8 rounded-full active:scale-90 cursor-pointer"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Title + description */}
          <div className="flex min-h-28 flex-col items-center text-center md:items-start md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
                  {activeItem.title}
                </h2>
                {activeItem.badges && activeItem.badges.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    {activeItem.badges.map((badge) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className={cn(
                          getLanguageColor(badge as IBadge),
                          "cursor-default",
                        )}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
                {activeItem.description && (
                  <RailDescription
                    text={activeItem.description}
                    seeMore={seeMoreLabel}
                    seeLess={seeLessLabel}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
