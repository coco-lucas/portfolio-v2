"use client";

import { useTranslations } from "next-intl";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { PROJECTS_LIST } from "@/shared/mocks/projects";

export default function Projects() {
  const t = useTranslations();

  const items: FocusRailItem[] = PROJECTS_LIST.map((project) => ({
    id: project.title,
    title: project.titleKey ? t(project.titleKey) : project.title,
    description: t(project.descriptionKey),
    metrics: project.metricsKey
      ? (t.raw(project.metricsKey) as string[])
      : undefined,
    imageSrc: project.images[0],
    href: project.deployURL ?? project.githubURL,
    company: project.company,
    badges: project.badge,
  }));

  return (
    <FocusRail
      items={items}
      loop
      className="rounded-lg"
      exploreLabel={t("project.explore")}
      seeMoreLabel={t("project.see-more")}
      seeLessLabel={t("project.see-less")}
    />
  );
}
