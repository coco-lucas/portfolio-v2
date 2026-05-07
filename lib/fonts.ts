import { Geist, Geist_Mono, Inter, Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

export const fontsVariables = [
  nunitoSans.variable,
  geistSans.variable,
  geistMono.variable,
  inter.variable,
];
