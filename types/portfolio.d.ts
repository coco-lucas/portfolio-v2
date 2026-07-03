import type { ReactNode } from "react";

export type IBadge =
  | "SSG"
  | "SSR"
  | "CSR"
  | "Angular"
  | "Next.js"
  | "Node.js"
  | "Express.js"
  | "React"
  | "TypeScript"
  | "Tailwind"
  | "Framer Motion"
  | "Java"
  | "SpringBoot"
  | "JavaScript"
  | "HTML"
  | "CSS"
  | "JSON-Server"
  | "PostgreSQL"
  | "MongoDB"
  | "Docker"
  | "Git"
  | "RabbitMQ"
  | "Tanstack Query"
  | "React Hook Form"
  | "Zod"
  | "AWS";

export type ITechType = "front" | "back" | "db" | "tools";

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
};
