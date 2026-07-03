import type { IProjectData } from "@/types/portfolio";

const generalUrl = process.env.NEXT_PUBLIC_ASSETS_URL + "projects/";

const tereVerde = generalUrl + "tere-verde/";
const orange = generalUrl + "orange/";

export const PROJECTS_LIST: IProjectData[] = [
  {
    title: "SaQ Digital",
    date: "10/2025",
    isFinished: true,
    pcImg: [],
    mobileImg: [],
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
    date: "02/2026",
    isFinished: true,
    pcImg: [],
    mobileImg: [],
    descriptionKey: "project.avaliacao-socioeconomica.description",
    badge: ["Next.js", "Express.js", "TypeScript", "Zod"],
  },
  {
    title: "Goatcom",
    date: "11/2025",
    isFinished: true,
    pcImg: [],
    mobileImg: [],
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
    title: "Terê Verde",
    date: "06/2025",
    isFinished: true,
    pcImg: [
      tereVerde + "pc/home.png",
      tereVerde + "pc/vlibras-home.png",
      tereVerde + "pc/eventos.png",
      tereVerde + "pc/saiba-mais-trilhas.png",
      tereVerde + "pc/trilhas.png",
      tereVerde + "pc/filtro-bio.png",
    ],
    mobileImg: [
      tereVerde + "mobile/home.png",
      tereVerde + "mobile/navbar.png",
      tereVerde + "mobile/eventos.png",
    ],
    descriptionKey: "project.tere-verde.description",
    badge: ["React", "JavaScript", "HTML", "CSS", "JSON-Server"],
    githubURL: "https://github.com/miguelMFR/tere-verde",
  },
  {
    title: "The Orange Experience HUB Portal",
    date: "12/2024",
    isFinished: true,
    pcImg: [
      orange + "home.jpeg",
      orange + "svps.jpeg",
      orange + "services.jpeg",
    ],
    descriptionKey: "project.orange-hub.description",
    badge: ["Java", "SpringBoot", "React", "TypeScript", "CSS"],
    deployURL:
      "https://www.linkedin.com/posts/elyn-beatriz-v-959381150_ontem-conclu%C3%ADmos-a-%C3%BAltima-etapa-da-resid%C3%AAncia-activity-7275949641450311680-zb16/",
  },
];
