import type { Metadata } from "next";
import "./styles/globals.css";
import "devicon/devicon.min.css";
import { defaultMetadata } from "@/lib/metadata";
import { ReactNode } from "react";
import Script from "next/script";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import QueryProvider from "./query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { fontsVariables } from "@/lib/fonts";

export const metadata: Metadata = defaultMetadata;

const GA_ID = "G-336YYBCGDG";

export type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn(fontsVariables.join(" "))}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <QueryProvider>
          <Toaster />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
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
