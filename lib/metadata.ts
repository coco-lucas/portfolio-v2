import { Metadata } from "next";
import {
  OpenGraph,
  OpenGraphType,
} from "next/dist/lib/metadata/types/opengraph-types";
import { routing } from "@/i18n/routing";

// Website base SEO config
export const websiteConfig = {
  name: "Lucas Coco",
  role: "AI Product / Full Stack Engineer",
  description:
    "AI Product / Full Stack Engineer — TypeScript, Next.js, Node and Python, with AI built into the workflow. LLM agents, MCP servers, a financial backoffice at 10M+ PIX/day and 360° e-commerce platforms.",
  url: "https://lucascoco.com",
  type: "website" as OpenGraphType,
  locale: "en_US",
  ogImage: "https://lucascoco.com/og-image.png",
  authors: [{ name: "Lucas Coco" }],
  creator: "Lucas Coco",
  publisher: "Lucas Coco",
};

const imageInfo = (title?: string): OpenGraph["images"] => [
  {
    url: websiteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: title ?? websiteConfig.name,
  },
];

// Default website metatags
const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  pt: "pt_BR",
  es: "es_ES",
};

// defaultLocale sits at "/" (localePrefix: "as-needed"), the rest get a prefix
const path = (locale: string) =>
  locale === routing.defaultLocale ? "/" : `/${locale}`;

export const buildDefaultMetadata = (locale: string): Metadata => {
  const ogLocale = OG_LOCALES[locale] ?? websiteConfig.locale;
  return {
    title: {
      default: `${websiteConfig.name} - ${websiteConfig.role}`,
      template: `%s | ${websiteConfig.name}`,
    },
    description: websiteConfig.description,
    authors: websiteConfig.authors,
    creator: websiteConfig.creator,
    publisher: websiteConfig.publisher,
    metadataBase: new URL(websiteConfig.url),
    alternates: {
      canonical: path(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, path(l)])),
        "x-default": path(routing.defaultLocale),
      },
    },
    openGraph: {
      type: websiteConfig.type,
      locale: ogLocale,
      url: new URL(path(locale), websiteConfig.url).toString(),
      title: `${websiteConfig.name} - ${websiteConfig.role}`,
      description: websiteConfig.description,
      siteName: websiteConfig.name,
      images: imageInfo(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${websiteConfig.name} - ${websiteConfig.role}`,
      description: websiteConfig.description,
      images: [websiteConfig.ogImage],
      creator: websiteConfig.creator,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Gomes Coco da Silva",
  alternateName: websiteConfig.name,
  jobTitle: websiteConfig.role,
  description: websiteConfig.description,
  url: websiteConfig.url,
  image: websiteConfig.ogImage,
  email: "mailto:dev@lucascoco.com",
  nationality: "BR",
  knowsLanguage: ["pt-BR", "en", "es"],
  sameAs: [
    "https://github.com/coco-lucas",
    "https://www.linkedin.com/in/coco-lucas/",
    "https://www.instagram.com/lucas.coco_/",
  ],
  knowsAbout: [
    "AI Engineering",
    "LLM Agents",
    "Model Context Protocol",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "Java",
  ],
};

// Function to generate metatags for specific pages
type metadataConfig = {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  noIndex?: boolean;
};

export function createMetadata(config: metadataConfig): Metadata {
  const { title, description, keywords, path = "", noIndex = false } = config;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: `${path}`,
    },
    openGraph: {
      type: websiteConfig.type,
      locale: websiteConfig.locale,
      url: `${websiteConfig.url}${path}`,
      title,
      description,
      siteName: websiteConfig.name,
      images: imageInfo(title),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [websiteConfig.ogImage],
    },
    robots: {
      index: !noIndex,
      follow: true,
    },
  };
}
