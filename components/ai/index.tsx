"use client";

import { Sparkle } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/reveal";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { SHIMMER, SHIMMER_CLASS } from "@/lib/animations";

export default function AI() {
  const t = useTranslations();
  const items = t.raw("ai.items") as string[];

  return (
    <div className="items-center">
      <div className="mt-15 flex flex-row items-center justify-start gap-1">
        <h3 className="flex items-center">
          <TextShimmer as="span" {...SHIMMER} className={SHIMMER_CLASS}>
            {t("ai.title")}
          </TextShimmer>
        </h3>
        <span className="icon-twinkle inline-flex">
          <Sparkle size={30} />
        </span>
      </div>
      <Reveal from="left" className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 py-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-chart-2" />
            <p className="text-sm text-foreground">{item}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
