import type { ReactNode } from "react";
import {
  AwsCloudfront,
  AwsCloudwatch,
  AwsElasticache,
  AwsS3,
  AwsSes,
  Bun,
  ClaudeCode,
  GoogleAnalytics,
  Langchain,
  MariadbIcon,
  NodejsIcon,
  Python,
  Vite,
} from "@dev.icons/react";
import {
  DrizzleOrm as DrizzleOrmMono,
  McpIcon as McpMono,
  OpenaiIcon as OpenaiMono,
} from "@dev.icons/react/mono";
import { cn } from "@/lib/utils";

// Icons resolved from @dev.icons/react instead of the classic devicon font.
// Moving an icon between sources = adding/removing an entry here.
// Mono variants follow the current text color.
const DEV_ICONS = {
  "claude-code": ClaudeCode,
  "aws-s3": AwsS3,
  "aws-elasticache": AwsElasticache,
  "aws-cloudwatch": AwsCloudwatch,
  "aws-cloudfront": AwsCloudfront,
  "aws-ses": AwsSes,
  "google-analytics": GoogleAnalytics,
  langchain: Langchain,
  bun: Bun,
  mariadb: MariadbIcon,
  nodejs: NodejsIcon,
  python: Python,
  vite: Vite,
  mcp: McpMono,
  drizzle: DrizzleOrmMono,
  openai: OpenaiMono,
} as const;

interface TechIconProps {
  /** devicon class body (e.g. "javascript-plain colored") or a DEV_ICONS key */
  name?: string;
  /** escape hatch: render any element/svg directly */
  svg?: ReactNode;
  size?: number;
  className?: string;
}

export default function TechIcon({
  name,
  svg,
  // Chip-sized. Font icons get this as an inline fontSize, which beats any
  // class, so the size has to be settled here — not overridden in CSS.
  size = 18,
  className,
}: TechIconProps) {
  if (svg) {
    return <span className={cn("inline-flex", className)}>{svg}</span>;
  }
  if (!name) return null;

  const DevIcon = DEV_ICONS[name as keyof typeof DEV_ICONS];
  if (DevIcon) {
    return <DevIcon size={size} className={className} />;
  }

  return (
    <i
      className={cn(`devicon-${name}`, className)}
      style={{ fontSize: size }}
    />
  );
}
