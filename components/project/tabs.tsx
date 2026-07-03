"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCarousel from "./carousel";
import { motion, LayoutGroup } from "motion/react";
import type { ProjectCarouselProps } from "@/types/portfolio";

export default function ProjectTabs({
  pcImg = [],
  mobileImg = [],
  alt,
}: ProjectCarouselProps) {
  const mobileDisabled = mobileImg.length === 0;
  const pcDisabled = pcImg.length === 0;
  const defaultTab = pcDisabled ? "mobile" : "pc";
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <LayoutGroup id={`project-tabs-${alt}`}>
        <TabsList className="relative">
          <TabsTrigger
            disabled={pcDisabled}
            value="pc"
            className="relative z-10"
          >
            {activeTab === "pc" && (
              <motion.span
                layoutId={`tab-indicator-${alt}`}
                className="absolute inset-0 rounded-md border border-input bg-[--tabs-active-bg] shadow-sm"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.4,
                }}
              />
            )}
            <span className="relative z-10">PC</span>
          </TabsTrigger>
          <TabsTrigger
            disabled={mobileDisabled}
            value="mobile"
            className="relative z-10"
          >
            {activeTab === "mobile" && (
              <motion.span
                layoutId={`tab-indicator-${alt}`}
                className="absolute inset-0 rounded-md border border-input bg-[--tabs-active-bg] shadow-sm"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.4,
                }}
              />
            )}
            <span className="relative z-10">Mobile</span>
          </TabsTrigger>
        </TabsList>
      </LayoutGroup>

      <TabsContent value="pc" className="mt-0">
        <ProjectCarousel pcImg={pcImg} alt={alt} type="pc" />
      </TabsContent>
      <TabsContent value="mobile" className="mt-0">
        <ProjectCarousel mobileImg={mobileImg} alt={alt} type="mobile" />
      </TabsContent>
    </Tabs>
  );
}
