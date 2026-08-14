import {
  Code,
  Database,
  HardDrives,
  Pulse,
  Toolbox,
} from "@phosphor-icons/react";
import TechIcon from "@/components/tech-icon";
import type { ITechStack } from "@/types/portfolio";

export const TECH_STACK: ITechStack[] = [
  {
    type: "front",
    icon: <Code size={24} />,
    stackName: "stack_front",
    noteName: "stack_front_note",
    techIcons: [
      {
        label: "JavaScript",
        icon: <TechIcon name="javascript-plain colored" />,
      },
      {
        label: "TypeScript",
        icon: <TechIcon name="typescript-plain colored" />,
      },
      { label: "React", icon: <TechIcon name="react-original colored" /> },
      { label: "Next.js", icon: <TechIcon name="nextjs-plain" /> },
      { label: "Angular", icon: <TechIcon name="angularjs-plain colored" /> },
      {
        label: "Tailwind CSS",
        icon: <TechIcon name="tailwindcss-original colored" />,
      },
      { label: "Zustand", icon: <TechIcon name="zustand-plain colored" /> },
      {
        label: "Framer Motion",
        icon: <TechIcon name="framermotion-original" />,
      },
      { label: "Sass", icon: <TechIcon name="sass-original colored" /> },
      { label: "Vite", icon: <TechIcon name="vite" /> },
      { label: "Bun", icon: <TechIcon name="bun" /> },
    ],
  },
  {
    type: "back",
    icon: <HardDrives size={24} />,
    stackName: "stack_back",
    noteName: "stack_back_note",
    techIcons: [
      { label: "Java", icon: <TechIcon name="java-plain colored" /> },
      { label: "Python", icon: <TechIcon name="python" /> },
      { label: "Node.js", icon: <TechIcon name="nodejs" /> },
      { label: "Spring", icon: <TechIcon name="spring-original colored" /> },
      { label: "NestJS", icon: <TechIcon name="nestjs-original colored" /> },
      { label: "Express.js", icon: <TechIcon name="express-original" /> },
      { label: "Django", icon: <TechIcon name="django-plain" /> },
      { label: "FastAPI", icon: <TechIcon name="fastapi-plain colored" /> },
      { label: "Socket.IO", icon: <TechIcon name="socketio-original" /> },
      { label: "gRPC", icon: <TechIcon name="grpc-plain colored" /> },
    ],
  },
  {
    type: "db",
    icon: <Database size={24} />,
    stackName: "stack_db",
    noteName: "stack_db_note",
    techIcons: [
      {
        label: "PostgreSQL",
        icon: <TechIcon name="postgresql-plain colored" />,
      },
      { label: "MySQL", icon: <TechIcon name="mysql-original colored" /> },
      { label: "MariaDB", icon: <TechIcon name="mariadb" /> },
      {
        label: "MongoDB",
        icon: <TechIcon name="mongodb-plain-wordmark colored" />,
      },
      { label: "Prisma", icon: <TechIcon name="prisma-original" /> },
      { label: "Drizzle", icon: <TechIcon name="drizzle" /> },
      { label: "Amazon S3", icon: <TechIcon name="aws-s3" /> },
      { label: "DynamoDB", icon: <TechIcon name="dynamodb-plain colored" /> },
      { label: "ElastiCache", icon: <TechIcon name="aws-elasticache" /> },
      { label: "Supabase", icon: <TechIcon name="supabase-plain colored" /> },
      { label: "Firebase", icon: <TechIcon name="firebase-plain colored" /> },
    ],
  },
  {
    type: "obs",
    icon: <Pulse size={24} />,
    stackName: "stack_obs",
    noteName: "stack_obs_note",
    techIcons: [
      {
        label: "OpenTelemetry",
        icon: <TechIcon name="opentelemetry-plain colored" />,
      },
      { label: "Grafana", icon: <TechIcon name="grafana-plain colored" /> },
      { label: "CloudWatch", icon: <TechIcon name="aws-cloudwatch" /> },
      { label: "Google Analytics", icon: <TechIcon name="google-analytics" /> },
    ],
  },
  {
    type: "tools",
    icon: <Toolbox size={24} />,
    stackName: "stack_tools",
    noteName: "stack_tools_note",
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
      { label: "Azure", icon: <TechIcon name="azure-plain colored" /> },
      { label: "Docker", icon: <TechIcon name="docker-plain colored" /> },
      {
        label: "RabbitMQ",
        icon: <TechIcon name="rabbitmq-original colored" />,
      },
      { label: "Bash", icon: <TechIcon name="bash-plain" /> },
      { label: "Nginx", icon: <TechIcon name="nginx-original colored" /> },
      { label: "CloudFront", icon: <TechIcon name="aws-cloudfront" /> },
      { label: "Amazon SES", icon: <TechIcon name="aws-ses" /> },
      {
        label: "GitHub Actions",
        icon: <TechIcon name="githubactions-plain colored" />,
      },
      { label: "Vercel", icon: <TechIcon name="vercel-original" /> },
      { label: "Jest", icon: <TechIcon name="jest-plain colored" /> },
    ],
  },
];
