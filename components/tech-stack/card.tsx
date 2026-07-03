"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, fade, staggerContainer } from "@/lib/animations";

interface CardProps {
  icon: ReactNode;
  stackName: string;
  techIcons: string[];
}

const iconIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

export default function StackCard({ icon, stackName, techIcons }: CardProps) {
  return (
    <motion.div variants={fade("up")} className="w-full flex justify-center">
      <Card className="sm:min-w-[375px] min-h-[160px] max-w-[350px]">
        <CardHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <CardTitle className="font-bold text-lg tracking-tight">
              {stackName}
            </CardTitle>
            <div className="flex items-center justify-center bg-(--muted) min-h-12 min-w-12 w-fit rounded-full">
              {icon}
            </div>
          </div>
          <hr className="border-1 border-(--border) w-full rounded-full" />
        </CardHeader>
        <CardContent className="w-full flex justify-baseline mb-2">
          <motion.div
            variants={staggerContainer(0.05)}
            className="grid grid-cols-9 justify-baseline gap-2 sm:gap-4 text-2xl sm:text-3xl"
          >
            {techIcons.map((iconClass, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger>
                  <motion.i className={iconClass} variants={iconIn}></motion.i>
                </TooltipTrigger>
                <TooltipContent>
                  {iconClass.match(/amazonwebservices/)
                    ? "AWS"
                    : iconClass
                        .match(/devicon-([^-]+)/)?.[1]
                        .split(" ")[0]
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
