import { Metadata } from "next";
import {
  OpenGraph,
  OpenGraphType,
} from "next/dist/lib/metadata/types/opengraph-types";

// Website base SEO config
export const websiteConfig = {
  name: "Lucas Coco",
  description: "My portfolio, showcasing my work and skills.",
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
export const defaultMetadata: Metadata = {
  title: {
    default: websiteConfig.name,
    template: `%s | ${websiteConfig.name}`,
  },
  description: websiteConfig.description,
  authors: websiteConfig.authors,
  creator: websiteConfig.creator,
  publisher: websiteConfig.publisher,
  metadataBase: new URL(websiteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: websiteConfig.type,
    locale: websiteConfig.locale,
    url: websiteConfig.url,
    title: `${websiteConfig.name} - Portfolio`,
    description: websiteConfig.description,
    siteName: websiteConfig.name,
    images: imageInfo(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${websiteConfig.name} - Portfolio`,
    description: websiteConfig.description,
    images: [websiteConfig.ogImage],
    creator: websiteConfig.creator,
  },
  robots: {
    index: true,
    follow: true,
  },
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
