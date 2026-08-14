import { EB_Garamond, Nunito_Sans } from "next/font/google";

// Two families only: Garamond for display (font-garamond), Nunito for body
// (it owns --font-sans, so it is Tailwind's default sans).
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const fontsVariables = [ebGaramond.variable, nunitoSans.variable];
