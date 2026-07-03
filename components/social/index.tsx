"use client";

import type { JSX } from "react";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Contact from "@/components/contact";

interface SocialCardProps {
  items: { icon: JSX.Element; name: string; link: string }[];
}

export default function SocialCard({ items }: SocialCardProps) {
  const t = useTranslations();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="items-center w-full text-lg sm:text-xl h-10 sm:h-12 mb-1 sm:mb-2 justify-center rounded-md cursor-pointer"
          >
            <Mail className="size-6" /> {t("contact.button")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{t("contact.form.title")}!</DialogTitle>
          <DialogDescription>{t("contact.form.desc")}.</DialogDescription>
          <Contact />
        </DialogContent>
      </Dialog>
      <h3 className="text-base sm:text-lg font-normal -mb-2 mt-2 text-center">
        {t("contact.social")}
      </h3>
      <div className="grid grid-cols-2 w-full mt-1 gap-2">
        {items.map((item) => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={item.name}
            className="col-span-1"
          >
            <Button
              className="items-center text-sm sm:text-base w-full sm:min-w-45 h-8 sm:h-10 rounded-sm cursor-pointer"
              variant="secondary"
            >
              {item.icon}
              {item.name}
            </Button>
          </a>
        ))}
      </div>
    </>
  );
}
