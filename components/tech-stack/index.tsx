"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";
import Reveal from "@/components/reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TECH_STACK } from "@/shared/mocks/tech-stack";
import { EASE_OUT, fade, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const iconIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export default function TechStack() {
  const t = useTranslations();

  return (
    <Reveal stagger className="flex flex-col divide-y divide-border">
      {TECH_STACK.map((stack) => (
        <motion.div
          key={stack.type}
          variants={fade("up")}
          className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            {stack.icon}
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {t(stack.stackName)}
            </span>
          </div>
          <motion.div
            variants={staggerContainer(0.05)}
            className="flex flex-wrap items-center gap-3"
          >
            {stack.techIcons.map((tech) => (
              <Tooltip key={tech.label}>
                <TooltipTrigger>
                  <motion.span
                    variants={iconIn}
                    className={cn(
                      "inline-flex",
                      tech.invertOnDark && "dark:invert",
                    )}
                  >
                    {tech.icon}
                  </motion.span>
                </TooltipTrigger>
                <TooltipContent>{tech.label}</TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </Reveal>
  );
}
