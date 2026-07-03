"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  fade,
  staggerContainer,
  type FadeDirection,
} from "@/lib/animations";

const tags = {
  div: motion.div,
  section: motion.section,
  nav: motion.nav,
  footer: motion.footer,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: keyof typeof tags;
  from?: FadeDirection;
  /** Stagger direct motion children instead of fading the block as one */
  stagger?: boolean;
}

// Scroll reveal: fades/blurs content in once, when it enters the viewport.
export default function Reveal({
  children,
  className,
  id,
  as = "div",
  from = "up",
  stagger = false,
}: RevealProps) {
  const Tag = tags[as];

  return (
    <Tag
      id={id}
      className={className}
      variants={stagger ? staggerContainer() : fade(from)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </Tag>
  );
}
