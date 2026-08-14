import type { MetadataRoute } from "next";
import { websiteConfig } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

const href = (locale: string) =>
  locale === routing.defaultLocale
    ? websiteConfig.url
    : `${websiteConfig.url}/${locale}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: href(locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, href(l)]),
      ),
    },
  }));
}
