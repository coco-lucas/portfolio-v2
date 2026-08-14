import { setRequestLocale } from "next-intl/server";
import Home from "./home";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Home />;
}
