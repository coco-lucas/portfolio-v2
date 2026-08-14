import type { ReactNode } from "react";

// Open on purpose: a new tech should cost one entry in the project mock,
// not a union edit too. Unmapped badges just render without a hover color.
export type IBadge = string;

export type ITechType = "front" | "back" | "db" | "obs" | "tools";

export type ITechIcon = {
  label: string;
  icon: ReactNode;
  /** brand mark is near-black — invert it in dark mode */
  invertOnDark?: boolean;
};

export type ITechStack = {
  type: ITechType;
  icon: ReactNode;
  stackName: string;
  /** next-intl key — practices and tools that have no icon */
  noteName: string;
  techIcons: ITechIcon[];
};

export interface ProjectCarouselProps {
  images: string[];
  alt: string;
}

export interface ProjectProps {
  isExpandedFromParent?: boolean;
  title: string;
  date?: string;
  company?: string;
  isFinished: boolean;
  images: string[];
  description: string;
  badge: IBadge[];
  badgeClassname?: string;
  deployURL?: string;
  githubURL?: string;
}

export type IProjectData = Omit<
  ProjectProps,
  "isExpandedFromParent" | "description"
> & {
  descriptionKey: string;
  /** next-intl key — when set, overrides `title` for display */
  titleKey?: string;
  /** next-intl key holding a string[] of headline numbers */
  metricsKey?: string;
};
