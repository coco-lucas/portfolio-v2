import type { IProjectData } from "@/types/portfolio";

const generalUrl = process.env.NEXT_PUBLIC_ASSETS_URL + "projects/";

// Screenshots follow the numbered convention: <folder>/1.png, 2.png, ...
const backoffice = generalUrl + "financial-backoffice/";
const aval = generalUrl + "aval/";
const goatcom = generalUrl + "goatcom/";
const orange = generalUrl + "orange/";

export const PROJECTS_LIST: IProjectData[] = [
  {
    title: "Financial Backoffice",
    titleKey: "project.saq-digital.title",
    date: "10/2025",
    company: "SAQ Digital",
    isFinished: true,
    images: [backoffice + "1.png"],
    descriptionKey: "project.saq-digital.description",
    badge: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Tanstack Query",
      "React Hook Form",
      "Zod",
    ],
    deployURL: "https://saq.digital/",
  },
  {
    // ponytail: no public URL — internal university system
    title: "Avaliação Socioeconômica",
    titleKey: "project.avaliacao-socioeconomica.title",
    date: "02/2026",
    company: "PUC Rio",
    isFinished: true,
    images: [aval + "1.png"],
    descriptionKey: "project.avaliacao-socioeconomica.description",
    badge: ["Next.js", "Express.js", "TypeScript", "Zod"],
  },
  {
    title: "E-commerce 360",
    date: "11/2025",
    company: "Goatcom",
    isFinished: true,
    images: [goatcom + "1.png"],
    descriptionKey: "project.goatcom.description",
    badge: [
      "Angular",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
    ],
    deployURL: "https://www.goatcom.io/global",
  },
  {
    title: "The Orange Experience HUB Portal",
    date: "12/2024",
    company: "Orange",
    isFinished: true,
    // services.jpeg kept its original name in S3 — rename to 2.jpeg to match the convention
    images: [orange + "1.jpeg", orange + "services.jpeg"],
    descriptionKey: "project.orange-hub.description",
    badge: ["Java", "SpringBoot", "React", "TypeScript", "CSS"],
    deployURL:
      "https://www.linkedin.com/posts/elyn-beatriz-v-959381150_ontem-conclu%C3%ADmos-a-%C3%BAltima-etapa-da-resid%C3%AAncia-activity-7275949641450311680-zb16/",
  },
];
