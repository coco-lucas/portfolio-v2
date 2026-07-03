import type { IBadge } from "@/types/portfolio";

export const languageColors: Partial<Record<IBadge, string>> = {
  // Frontend
  JavaScript: "hover:bg-yellow-600",
  Angular: "hover:bg-red-600",
  TypeScript: "hover:bg-blue-600",
  React: "hover:bg-cyan-400",
  "Next.js": "hover:bg-black",
  HTML: "hover:bg-orange-500",
  CSS: "hover:bg-blue-500",
  Tailwind: "hover:bg-cyan-500",
  "Framer Motion": "hover:bg-pink-500",

  // Backend
  "Node.js": "hover:bg-green-600",
  Java: "hover:bg-orange-600",
  SpringBoot: "hover:bg-green-600",

  // Databases
  PostgreSQL: "hover:bg-blue-700",
  MongoDB: "hover:bg-green-700",

  // Tools
  Docker: "hover:bg-blue-600",
  Git: "hover:bg-orange-600",
  RabbitMQ: "hover:bg-orange-600",
  "JSON-Server": "hover:bg-gray-600",
};

export function getLanguageColor(language: IBadge): string | null {
  if (languageColors[language]) {
    return `${languageColors[language]} hover:text-white transition-colors duration-300`;
  }
  return null;
}
