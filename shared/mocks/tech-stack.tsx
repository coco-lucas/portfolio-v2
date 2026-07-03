import { Code, Database, Server, ToolCase } from "lucide-react";
import type { ITechStack } from "@/types/portfolio";

export const TECH_STACK: ITechStack[] = [
  {
    type: "front",
    icon: <Code />,
    stackName: "stack_front",
    techIcons: [
      "devicon-javascript-plain colored",
      "devicon-typescript-plain colored",
      "devicon-html5-plain colored",
      "devicon-css3-plain colored",
      "devicon-react-original colored",
      "devicon-nextjs-plain dark:colored",
      "devicon-tailwindcss-original colored",
      "devicon-vitejs-plain colored",
      "devicon-zustand-plain colored",
      "devicon-bun-plain",
      "devicon-framermotion-original",
    ],
  },
  {
    type: "back",
    icon: <Server />,
    stackName: "stack_back",
    techIcons: [
      "devicon-java-plain colored",
      "devicon-spring-original colored",
      "devicon-nodejs-plain colored",
      "devicon-python-plain",
    ],
  },
  {
    type: "db",
    icon: <Database />,
    stackName: "stack_db",
    techIcons: [
      "devicon-postgresql-plain colored",
      "devicon-mongodb-plain-wordmark colored",
      "devicon-mariadb-original light:colored",
    ],
  },
  {
    type: "tools",
    icon: <ToolCase />,
    stackName: "stack_tools",
    techIcons: [
      "devicon-git-plain colored",
      "devicon-amazonwebservices-plain-wordmark colored",
      "devicon-azure-plain colored",
      "devicon-docker-plain colored",
      "devicon-rabbitmq-original colored",
    ],
  },
];
