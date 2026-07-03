export type Locale = (typeof locales)[number];

export const locales = ["en", "pt", "es"] as const;
export const defaultLocale: Locale = "en";
