import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // "as-needed": the default locale stays on "/" so the already-indexed
  // lucascoco.com keeps working; pt and es get /pt and /es.
  localePrefix: "as-needed",
});
