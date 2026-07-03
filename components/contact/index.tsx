"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCheckIcon } from "lucide-react";
import ContactForm from "./form";

export default function Contact() {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      {isSubmitted && (
        <div className="flex flex-col text-center rounded-xl absolute inset-0 z-10 items-center justify-center bg-background/90 backdrop-blur-xs">
          <CheckCheckIcon className="size-12 text-green-500" />
          <h3 className="text-lg sm:text-xl font-semibold mb-1">
            {t("contact.form.submit.success")}!
          </h3>
          <p className="text-sm sm:text-md max-w-80 sm:max-w-none text-muted-foreground">
            {t("contact.form.submit.thanks")}.
          </p>
        </div>
      )}
      <ContactForm isSubmitted={setIsSubmitted} />
    </>
  );
}
