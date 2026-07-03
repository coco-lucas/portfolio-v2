"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CircleMinus, CirclePlus } from "lucide-react";
import ProjectCard from "./card";
import { Button } from "@/components/ui/button";
import { PROJECTS_LIST } from "@/shared/mocks/projects";

export default function Projects() {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const projects = PROJECTS_LIST.map((p) => ({
    ...p,
    description: t(p.descriptionKey),
  }));

  const [firstProject, ...remainingProjects] = projects;
  const hasMore = remainingProjects.length > 0;

  return (
    <div className="flex flex-col gap-4 w-full items-center sm:items-start justify-center sm:justify-start">
      {firstProject && <ProjectCard {...firstProject} />}

      {hasMore && (
        <div className="w-full mb-10 relative">
          <div
            className={`flex flex-col gap-4 transition-all duration-500 ease-in-out ${!isExpanded ? "max-h-54 overflow-hidden" : ""}`}
          >
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-54 bg-gradient-to-t from-background to-transparent z-10" />
            )}
            {remainingProjects
              .sort((a, b) => {
                const dateA = new Date(a.date || "01/1900").getTime();
                const dateB = new Date(b.date || "01/1900").getTime();
                return dateB - dateA;
              })
              .map((project) => (
                <ProjectCard
                  key={project.title}
                  isExpandedFromParent={isExpanded}
                  {...project}
                />
              ))}
          </div>

          {!isExpanded && (
            <div className="absolute mt-5 left-0 right-0 flex justify-center pb-2 z-20">
              <Button
                variant="outline"
                onClick={() => toggleExpanded(true)}
                className="cursor-pointer font-normal text-sm sm:text-base"
              >
                <CirclePlus />
                {t("project.view-more")}
              </Button>
            </div>
          )}
        </div>
      )}

      {isExpanded && (
        <Button
          variant="outline"
          onClick={() => toggleExpanded(false)}
          className="-mt-5 cursor-pointer self-center font-normal text-sm sm:text-base"
        >
          <CircleMinus />
          {t("project.view-less")}
        </Button>
      )}
    </div>
  );
}
