"use client";

import { Certificate, GraduationCap } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import EducationEntry from "./entry";
import Reveal from "@/components/reveal";

export default function Education() {
  const t = useTranslations();
  return (
    <div className="items-center">
      <div className="mt-15 flex flex-row items-center justify-start gap-1">
        <h3 className="flex items-center">{t("education.graduation.title")}</h3>
        <GraduationCap size={30} />
      </div>
      <Reveal from="left" className="flex flex-col divide-y divide-border">
        <EducationEntry
          title={t("education.graduation.1")}
          corporation="UNIFESO - Centro Universitário Serra dos Órgãos"
          corporationURL="https://www.unifeso.edu.br/"
          type="university"
          year="2024 – 2028"
        />
      </Reveal>

      <div className="mt-15 flex flex-row gap-1 items-center justify-start w-full">
        <h3>{t("education.certificate.title")}</h3>
        <Certificate size={30} />
      </div>
      <Reveal from="right" className="flex flex-col divide-y divide-border">
        <EducationEntry
          title={t("education.certificate.1")}
          corporation="SERRATEC - Parque Tecnológico da Região Serrana"
          corporationURL="https://serratec.org/"
          type="certification"
          hours="770h"
          year={2024}
          credentialURL="https://view.pok.tech/c/6791eff0-1b09-416b-8324-33fa08343c51"
        />
        <EducationEntry
          title={t("education.certificate.3")}
          corporation="EF SET"
          corporationURL="https://www.efset.org/"
          type="certification"
          year={2025}
          credentialURL="https://cert.efset.org/mWdqkq"
        />
      </Reveal>
    </div>
  );
}
