"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Reveal from "@/components/reveal";
import { TECH_STACK } from "@/shared/mocks/tech-stack";
import { fade } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function TechStack() {
  const t = useTranslations();

  return (
    <Reveal stagger className="flex flex-col divide-y divide-border">
      {TECH_STACK.map((stack) => (
        <motion.div
          key={stack.type}
          variants={fade("up")}
          className="flex flex-col gap-2.5 py-5"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            {stack.icon}
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {t(stack.stackName)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t(stack.noteName)}
          </p>
          {/* The chip carries the name, so a square mark and a wide wordmark
              occupy the same shape — that is what gives the block its rhythm. */}
          <ul className="flex flex-wrap gap-1.5">
            {stack.techIcons.map((tech) => (
              <li
                key={tech.label}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 text-xs text-muted-foreground"
              >
                <span
                  className={cn(
                    "inline-flex",
                    tech.invertOnDark && "dark:invert",
                  )}
                >
                  {tech.icon}
                </span>
                {tech.label}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </Reveal>
  );
}
