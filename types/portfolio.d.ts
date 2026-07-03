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

export type ITechStack = {
  type: ITechType;
  icon: ReactNode;
  stackName: string;
  techIcons: string[];
};

export interface ProjectCarouselProps {
  pcImg?: string | string[];
  mobileImg?: string | string[];
  alt: string;
  type?: "pc" | "mobile";
}

export interface ProjectProps {
  isExpandedFromParent?: boolean;
  title: string;
  date?: string;
  isFinished: boolean;
  pcImg: ProjectCarouselProps["pcImg"];
  mobileImg?: ProjectCarouselProps["mobileImg"];
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
};
