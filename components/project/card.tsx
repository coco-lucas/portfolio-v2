"use client";

import {
  BadgeCheckIcon,
  Calendar,
  ChevronDown,
  ChevronUp,
  CircleEllipsis,
  Github,
  Link,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLanguageColor } from "@/utils/language-colors";
import ProjectCarousel from "./carousel";
import Reveal from "@/components/reveal";
import type { IBadge, ProjectProps } from "@/types/portfolio";

export default function ProjectCard({
  isExpandedFromParent,
  title,
  date,
  isFinished,
  images,
  description,
  badge,
  deployURL,
  githubURL,
}: ProjectProps) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharacters = 150;
  const isTooLong = description.length > maxCharacters;

  // ponytail: window guard needed for Next SSR; v1 was CSR-only
  const isMobileViewport = () =>
    typeof window !== "undefined" && window.innerWidth < 640;

  const getBadgeClassName = (language: IBadge): string => {
    const color = getLanguageColor(language);
    return `${color} cursor-default`;
  };

  return (
    <Reveal className="w-full">
      <Card className="w-full">
        <CardHeader>
        {date && (
          <div className="flex items-center justify-start">
            <p
              className="flex gap-0.5 text-xs font-normal text-ring items-center"
              tabIndex={1}
            >
              <Calendar size={14} />
              {date}
            </p>
          </div>
        )}
        <div
          className="flex flex-row justify-between items-center"
          tabIndex={2}
        >
          <CardTitle className="flex flex-col">
            <h2 className="text-2xl font-extrabold">
              {isMobileViewport() &&
              (!isExpanded || !isExpandedFromParent) &&
              title.length > 15
                ? `${title.substring(0, 15)}...`
                : title}
            </h2>
          </CardTitle>
          {isFinished ? (
            <Badge className="bg-(--chart-2) pointer-events-none">
              <BadgeCheckIcon />
              {t("project.status.finished")}
            </Badge>
          ) : (
            <Badge className="bg-(--chart-3) pointer-events-none">
              <CircleEllipsis />
              {t("project.status.on-going")}
            </Badge>
          )}
        </div>
        {images.length > 0 && (
          <ProjectCarousel images={images} alt={`${title} Project Images`} />
        )}

        <h4>{t("project.stack")}:</h4>
        <div className="flex flex-wrap gap-2" tabIndex={6}>
          {badge.map((element, key) => (
            <Badge
              variant="secondary"
              className={getBadgeClassName(element)}
              key={key}
            >
              {element}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent tabIndex={5}>
        <CardDescription
          onClick={() => {
            if (isMobileViewport() && isExpanded) {
              setIsExpanded(!isExpanded);
            }
          }}
          className="text-base"
          tabIndex={4}
        >
          {isTooLong && !isExpanded
            ? description.substring(0, maxCharacters) + "..."
            : description}
          {isTooLong && (
            <Button
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-1 cursor-pointer h-0 text-primary underline sm:no-underline font-medium inline-flex items-center gap-0"
            >
              {isExpanded ? (
                <div className="hidden sm:flex flex-row text-ring">
                  {t("project.see-less")}{" "}
                  <ChevronUp className="size-4 mt-0.5" />
                </div>
              ) : (
                <>
                  {t("project.see-more")}{" "}
                  <ChevronDown className="size-4 mt-0.5" />
                </>
              )}
            </Button>
          )}
        </CardDescription>

        <div className="flex flex-row justify-end items-center">
          <CardAction
            className={`flex flex-row items-center self-end mt-1 ${deployURL && githubURL ? "gap-1 sm:gap-2" : ""}`}
          >
            <a href={deployURL} target="_blank" rel="noopener noreferrer">
              {deployURL && (
                <Button variant="outline" className="cursor-pointer rounded-xl">
                  <Link />
                </Button>
              )}
            </a>
            <a href={githubURL} target="_blank" rel="noopener noreferrer">
              {githubURL && (
                <Button variant="outline" className="cursor-pointer rounded-xl">
                  <Github />
                </Button>
              )}
            </a>
          </CardAction>
        </div>
      </CardContent>
      </Card>
    </Reveal>
  );
}
