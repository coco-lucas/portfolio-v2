"use client";

import { ArrowUpRight, Briefcase } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/reveal";

const HIGHLIGHT_KEYS = ["1", "2", "3", "4"] as const;

export default function Experience() {
  const t = useTranslations();

  return (
    <div className="items-center">
      <div className="mt-15 flex flex-row items-center justify-start gap-1">
        <h3 className="flex items-center">{t("experience.title")}</h3>
        <Briefcase size={30} />
      </div>
      <Reveal from="left" className="flex flex-col divide-y divide-border">
        <div className="flex w-full flex-col gap-0.5 py-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-semibold">{t("experience.noclaf.role")}</p>
            <p className="shrink-0 text-sm text-muted-foreground">
              {t("experience.noclaf.period")}
            </p>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <a
              href="https://www.noclaftech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              NOCLAF
              <ArrowUpRight className="size-3.5 transition-[translate] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span className="shrink-0 text-sm font-semibold text-chart-2">
              {t("experience.noclaf.delivered")}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-muted-foreground">
            {HIGHLIGHT_KEYS.map((key, idx) => (
              <span key={key} className="flex items-baseline gap-2">
                {idx > 0 && <span className="text-ring">•</span>}
                {t(`experience.noclaf.highlights.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
