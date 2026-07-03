import { Code, Database, HardDrives, Toolbox } from "@phosphor-icons/react";
import TechIcon from "@/components/tech-icon";
import type { ITechStack } from "@/types/portfolio";

export const TECH_STACK: ITechStack[] = [
  {
    type: "front",
    icon: <Code size={24} />,
    stackName: "stack_front",
    techIcons: [
      { label: "JavaScript", icon: <TechIcon name="javascript-plain colored" /> },
      { label: "TypeScript", icon: <TechIcon name="typescript-plain colored" /> },
      { label: "HTML5", icon: <TechIcon name="html5-plain colored" /> },
      { label: "CSS3", icon: <TechIcon name="css3-plain colored" /> },
      { label: "React", icon: <TechIcon name="react-original colored" /> },
      { label: "Next.js", icon: <TechIcon name="nextjs-plain" /> },
      { label: "Angular", icon: <TechIcon name="angularjs-plain colored" /> },
      { label: "Tailwind CSS", icon: <TechIcon name="tailwindcss-original colored" /> },
      { label: "Zustand", icon: <TechIcon name="zustand-plain colored" /> },
      { label: "Framer Motion", icon: <TechIcon name="framermotion-original" /> },
      { label: "Vite", icon: <TechIcon name="vite" /> },
      { label: "Bun", icon: <TechIcon name="bun" /> },
      { label: "Lovable", icon: <TechIcon name="lovable" /> },
    ],
  },
  {
    type: "back",
    icon: <HardDrives size={24} />,
    stackName: "stack_back",
    techIcons: [
      { label: "Java", icon: <TechIcon name="java-plain colored" /> },
      { label: "TypeScript", icon: <TechIcon name="typescript-plain colored" /> },
      { label: "Python", icon: <TechIcon name="python" /> },
      { label: "Node.js", icon: <TechIcon name="nodejs" /> },
      { label: "Spring", icon: <TechIcon name="spring-original colored" /> },
      { label: "NestJS", icon: <TechIcon name="nestjs-original colored" /> },
      { label: "Express.js", icon: <TechIcon name="express-original" /> },
      { label: "Django", icon: <TechIcon name="django-plain" /> },
    ],
  },
  {
    type: "db",
    icon: <Database size={24} />,
    stackName: "stack_db",
    techIcons: [
      { label: "PostgreSQL", icon: <TechIcon name="postgresql-plain colored" /> },
      { label: "MySQL", icon: <TechIcon name="mysql-original colored" /> },
      { label: "MariaDB", icon: <TechIcon name="mariadb" /> },
      { label: "MongoDB", icon: <TechIcon name="mongodb-plain-wordmark colored" /> },
      { label: "IBM", icon: <TechIcon name="ibm" /> },
      { label: "Prisma", icon: <TechIcon name="prisma-original" /> },
      { label: "Drizzle", icon: <TechIcon name="drizzle" /> },
    ],
  },
  {
    type: "tools",
    icon: <Toolbox size={24} />,
    stackName: "stack_tools",
    techIcons: [
      { label: "Claude Code", icon: <TechIcon name="claude-code" /> },
      { label: "MCP", icon: <TechIcon name="mcp" /> },
      { label: "OpenAI", icon: <TechIcon name="openai" /> },
      {
        label: "LangChain",
        icon: <TechIcon name="langchain" />,
        invertOnDark: true,
      },
      { label: "Git", icon: <TechIcon name="git-plain colored" /> },
      {
        label: "AWS",
        icon: <TechIcon name="amazonwebservices-plain-wordmark colored" />,
      },
      { label: "Azure", icon: <TechIcon name="azure-plain colored" /> },
      { label: "Docker", icon: <TechIcon name="docker-plain colored" /> },
      { label: "RabbitMQ", icon: <TechIcon name="rabbitmq-original colored" /> },
      { label: "Vim", icon: <TechIcon name="vim-plain colored" /> },
    ],
  },
];
