import type { Metadata } from "next";
import "./styles/globals.css";
import { defaultMetadata } from "@/lib/metadata";
import { ReactNode } from "react";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import QueryProvider from "./query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { fontsVariables } from "@/lib/fonts";

export const metadata: Metadata = defaultMetadata;

export type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn(fontsVariables.join(" "))}>
      <body className="antialiased">
        <QueryProvider>
          <Toaster />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
