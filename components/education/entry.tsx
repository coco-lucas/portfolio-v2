"use client";

import { Link } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

type typeProps = "university" | "certification";

interface EntryProps {
  title: string;
  corporation: string;
  corporationURL?: string;
  type: typeProps;
  hours?: string;
  year: number;
  credentialURL?: string;
}

export default function EducationEntry({
  title,
  corporation,
  corporationURL,
  type,
  hours,
  year,
  credentialURL,
}: EntryProps) {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-col gap-0.5 py-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-semibold">{title}</p>
        <p className="shrink-0 text-sm text-muted-foreground">
          {hours && (
            <span className="mr-2 text-[11px] font-semibold text-ring">
              {hours}
            </span>
          )}
          {type === "university" && `${t("education.graduation.year")}: `}
          {year}
        </p>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <a
          href={corporationURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {corporation}
        </a>
        {credentialURL && (
          <a
            href={credentialURL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex shrink-0 items-center text-sm font-semibold text-chart-2 underline underline-offset-2"
          >
            {/* text slides left on hover to make room for the icon sliding in */}
            <span className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-4">
              {t("education.certificate.credential")}
            </span>
            <Link className="absolute right-0 size-3.5 translate-x-1.5 opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0 group-hover:opacity-100" />
          </a>
        )}
      </div>
    </div>
  );
}
