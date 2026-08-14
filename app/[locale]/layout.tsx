import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/devicon.css";
import { buildDefaultMetadata, personJsonLd } from "@/lib/metadata";
import { ReactNode } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import QueryProvider from "./query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { fontsVariables } from "@/lib/fonts";
import { routing } from "@/i18n/routing";

const GA_ID = "G-336YYBCGDG";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildDefaultMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opts this layout into static rendering — without it every page turns
  // dynamic the moment a translation is read.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={cn(fontsVariables.join(" "))}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <QueryProvider>
          <Toaster />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
