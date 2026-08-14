"use client";

import { ArrowUpRight, Briefcase } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/reveal";

export default function Experience() {
  const t = useTranslations();
  const highlights = t.raw("experience.noclaf.highlights") as string[];

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
          {/* Software-house context — without it, 2 years against these numbers
              reads as inflated rather than as many products in parallel. */}
          <p className="mt-1 text-xs text-muted-foreground">
            {t("experience.noclaf.context")}
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ring" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
