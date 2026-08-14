"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Translate } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/config";

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

export default function LanguageChanger() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const handleChange = (lang: string) => {
    if (lang === currentLocale) return;
    // pathname here is locale-free, so this swaps the prefix and keeps the page
    startTransition(() => {
      router.replace(pathname, { locale: lang as Locale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          value={currentLocale}
          className="hover:bg-transparent dark:hover:bg-transparent aria-expanded:bg-transparent"
        >
          <Translate />
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
