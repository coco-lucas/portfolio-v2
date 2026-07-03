"use client";

import {
  BookOpenText,
  FolderOpen,
  EnvelopeOpen,
  UserCircle,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import LanguageChanger from "./language-changer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DOCK_DELAY, EASE_OUT } from "@/lib/animations";

const dockContainer: Variants = {
  hidden: { y: 96, scale: 0.9, opacity: 0 },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: DOCK_DELAY,
      type: "spring",
      bounce: 0.25,
      duration: 0.6,
      staggerChildren: 0.05,
      delayChildren: DOCK_DELAY + 0.15,
    },
  },
};

// blur here is fine perf-wise: tiny surfaces, and it masks the crossfade
const dockItem: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

export default function Dock() {
  const t = useTranslations();

  const dockItems = [
    {
      type: "nav",
      icon: <UserCircle />,
      key: "about-me",
      hover: t("dock.about-me"),
    },
    {
      type: "nav",
      icon: <FolderOpen />,
      key: "projects",
      hover: t("dock.projects"),
    },
    {
      type: "nav",
      icon: <BookOpenText />,
      key: "education",
      hover: t("dock.education"),
    },
    {
      type: "nav",
      icon: <EnvelopeOpen />,
      key: "contact",
      hover: t("dock.contact"),
    },
    { type: "separator", key: "separator" },
    { type: "component", component: <ThemeToggle />, key: "theme" },
    { type: "component", component: <LanguageChanger />, key: "language" },
  ];

  const renderItem = (item: (typeof dockItems)[0], idx: number) => {
    if (item.type === "separator") {
      return (
        <Separator key={item.key} orientation="vertical" className="mx-2" />
      );
    }

    const baseClassName = "active:scale-75 sm:active:scale-85";
    const navClassName =
      item.type === "nav" && idx < dockItems.length - 3 ? "mr-2" : "";

    return (
      <motion.li
        key={item.key}
        className={`${baseClassName} ${navClassName} ${item.type === "nav" ? "group/icon-dock transition-all duration-200" : ""}`}
        variants={dockItem}
      >
        {item.type === "nav" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={`#${item.key}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="dark:hover:bg-transparent hover:bg-transparent"
                >
                  {item.icon}
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent className="opacity-0 sm:opacity-100 transition-opacity duration-300 ease-in-out">
              <p>{item.hover}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          item.component
        )}
      </motion.li>
    );
  };

  return (
    <motion.div
      className="fixed bottom-3 left-1/2 z-50 transform -translate-x-1/2 backdrop-blur-md border border-solid border-(--border) p-3 sm:px-6 py-2 rounded-full"
      variants={dockContainer}
      initial="hidden"
      animate="visible"
    >
      <ul className="dock flex flex-row justify-center items-center list-none m-0 p-0 gap-0 sm:gap-2">
        {dockItems.map((item, idx) => renderItem(item, idx))}
      </ul>
    </motion.div>
  );
}
