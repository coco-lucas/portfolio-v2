"use client";

import { useTranslations } from "next-intl";
import StackCard from "./card";
import Reveal from "@/components/reveal";
import { TECH_STACK } from "@/shared/mocks/tech-stack";

export default function TechStack() {
  const t = useTranslations();

  const stack = TECH_STACK.map((s) => ({
    ...s,
    stackName: t(s.stackName),
  }));

  return (
    <Reveal
      stagger
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center"
    >
      {stack.map((stack) => (
        <StackCard
          key={stack.type}
          icon={stack.icon}
          stackName={stack.stackName}
          techIcons={stack.techIcons}
        />
      ))}
    </Reveal>
  );
}
