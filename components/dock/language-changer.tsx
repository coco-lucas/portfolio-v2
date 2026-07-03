"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { setUserLocale } from "@/service/locale";
import type { Locale } from "@/i18n/config";

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

export default function LanguageChanger() {
  const currentLocale = useLocale();
  const [, startTransition] = useTransition();

  const handleChange = (lang: string) => {
    if (lang === currentLocale) return;
    startTransition(() => {
      setUserLocale(lang as Locale);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" value={currentLocale}>
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={handleChange}
        >
          {(Object.keys(LANGUAGE_LABELS) as Locale[]).map((lang) => (
            <DropdownMenuRadioItem key={lang} value={lang}>
              {LANGUAGE_LABELS[lang]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
