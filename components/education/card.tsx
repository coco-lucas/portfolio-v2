"use client";

import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type typeProps = "university" | "certification";

interface CardProps {
  title: string;
  corporation: string;
  corporationURL?: string;
  type: typeProps;
  hours?: string;
  year: number;
  credentialURL?: string;
}

export default function EducationCard({
  title,
  corporation,
  corporationURL,
  type,
  hours,
  year,
  credentialURL,
}: CardProps) {
  const t = useTranslations();

  return (
    <Card className="min-h-[172px] max-h-[172px]">
      <CardHeader>
        <CardTitle className="font-semibold">{title}</CardTitle>
        <a href={corporationURL} target="_blank" rel="noopener noreferrer">
          <p className="font-normal text-muted-foreground text-sm">
            {corporation}
          </p>
        </a>
      </CardHeader>

      <div className="flex flex-1 flex-col justify-end" />
      <CardContent className="flex flex-row-reverse justify-between items-end h-0">
        <div className="flex flex-col-reverse items-end">
          <p className="text-sm font-normal text-muted-foreground">
            {type === "university" ? `${t("education.graduation.year")}:` : ""}{" "}
            {year}
          </p>
          {type === "certification" && (
            <div style={{ position: "relative", width: "100%" }}>
              <p className="absolute top-[-12px] right-0 text-[11px] font-semibold text-ring">
                {hours}
              </p>
            </div>
          )}
        </div>
        {credentialURL && (
          <a href={credentialURL} target="_blank" rel="noopener noreferrer">
            <Button
              variant="link"
              className="text-s text-chart-2 font-semibold underline cursor-pointer p-0 h-auto group flex items-center gap-1"
            >
              {t("education.certificate.credential")}
              <span className="transition-opacity sm:opacity-0 group-hover:opacity-100">
                <Link className="size-3 sm:size-4" />
              </span>
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
