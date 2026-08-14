"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { motion, MotionConfig, type Variants } from "motion/react";
import AI from "@/components/ai";
import Dock from "@/components/dock";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Projects from "@/components/project";
import TechStack from "@/components/tech-stack";
import SocialCard from "@/components/social";
import Reveal from "@/components/reveal";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  EASE_IN_OUT,
  INTRO_BEAT,
  NAME_FLIP,
  SHIMMER,
  SHIMMER_CLASS,
  TYPE_STAGGER,
  fade,
  staggerContainer,
} from "@/lib/animations";

const NAME = "Lucas Coco";

const typeChar: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

// Intro phases: the name types itself center screen, glides into the header
// (shared layoutId), and only then does the rest of the page mount — keeping
// the main thread free while the name is in flight.
type IntroPhase = "typing" | "landing" | "done";

export default function Home() {
  const t = useTranslations();
  const generalUrl = process.env.NEXT_PUBLIC_ASSETS_URL;
  const [phase, setPhase] = useState<IntroPhase>("typing");

  useEffect(() => {
    const landAt = (NAME.length * TYPE_STAGGER + INTRO_BEAT) * 1000;
    const landing = setTimeout(() => setPhase("landing"), landAt);
    const done = setTimeout(
      () => setPhase("done"),
      landAt + (NAME_FLIP + 0.1) * 1000,
    );
    return () => {
      clearTimeout(landing);
      clearTimeout(done);
    };
  }, []);

  const getAge = () => {
    const currentDate = new Date();
    const birthDate = new Date("2005-09-26");
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const socialItems = [
    {
      icon: <LinkedinLogo className="size-4 sm:size-5" />,
      name: "Linkedin",
      link: "https://www.linkedin.com/in/coco-lucas/",
    },
    {
      icon: <InstagramLogo className="size-4 sm:size-5" />,
      name: "Instagram",
      link: "https://www.instagram.com/lucas.coco_/",
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="max-w-[calc(100%-2rem)] sm:max-w-3xl mx-auto mt-15 sm:mt-30">
        {phase === "typing" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.h1
              layoutId="hero-name"
              aria-label={NAME}
              className="font-garamond text-6xl sm:text-9xl font-bold tracking-tighter"
              variants={staggerContainer(TYPE_STAGGER)}
              initial="hidden"
              animate="visible"
            >
              {NAME.split("").map((char, i) => (
                <motion.span key={i} aria-hidden variants={typeChar}>
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
        )}
        <motion.header
          className="flex flex-row justify-center"
          variants={staggerContainer()}
          initial="hidden"
          animate={phase === "done" ? "visible" : "hidden"}
        >
          <div className="sm:mr-10 flex-1">
            <nav id="about-me" className="mt-0">
              <div className="flex flex-col-reverse sm:flex-row justify-center items-center sm:justify-between">
                <div className="flex flex-col self-center items-center sm:items-start justify-center sm:justify-start">
                  {phase !== "typing" && (
                    <motion.h1
                      layoutId="hero-name"
                      id="header"
                      transition={{ duration: NAME_FLIP, ease: EASE_IN_OUT }}
                      className="font-garamond text-5xl sm:text-8xl font-bold tracking-tighter text-center sm:text-start -ml-1 sm:-ml-2"
                    >
                      <TextShimmer as="span" {...SHIMMER} className={SHIMMER_CLASS}>
                        {NAME}
                      </TextShimmer>
                    </motion.h1>
                  )}
                  <motion.h2
                    className="text-sm tracking-tighter text-center sm:text-start font-normal text-muted-foreground"
                    variants={fade("up")}
                  >
                    {t("role-tagline")}
                  </motion.h2>
                </div>
                <motion.div variants={fade("down")}>
                  <Image
                    src={generalUrl + "selfie-photo.jpeg"}
                    alt="Lucas Coco"
                    width={144}
                    height={144}
                    priority
                    className="rounded-lg w-24 h-24 md:w-36 md:h-36 object-cover"
                  />
                </motion.div>
              </div>
            </nav>
            <motion.p
              className="mt-4 text-base max-w-prose font-semibold text-start text-muted-foreground"
              variants={fade("up")}
            >
              {t("about-me", { age: getAge() })}
            </motion.p>
          </div>
        </motion.header>
        {phase === "done" && (
          <>
            <main>
              <Reveal as="nav">
                <h3 id="my-stack">{t("stack")}:</h3>
                <TechStack />
              </Reveal>
              <AI />
              <Reveal as="nav">
                <h3 id="projects">{t("project.title")}:</h3>
              </Reveal>
              <Reveal
                as="section"
                className="flex flex-col justify-center items-center gap-5"
              >
                <div className="flex flex-row items-center justify-center sm:w-fit">
                  <GithubLogo size={30} />
                  <div className="flex flex-col justify-between h-full sm:ml-2 font-semibold text-center">
                    <p>GitHub</p>
                    <a
                      href="https://github.com/coco-lucas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-(--muted-foreground) hover:text-(--primary)"
                    >
                      @coco-lucas
                    </a>
                  </div>
                </div>
                <Projects />
              </Reveal>

              <div id="experience">
                <Experience />
              </div>

              <div id="education">
                <Education />
              </div>

              <Reveal
                as="nav"
                id="contact"
                className="flex flex-col items-center justify-center sm:mt-30 mb-10"
              >
                {/* The big garamond line is the heading; the question above it
                    is supporting copy, so the tags follow the visual weight. */}
                <p className="w-70 sm:w-fit text-xl sm:text-2xl text-center sm:text-start font-medium text-muted-foreground">
                  {t("contact.subtext")}?
                </p>
                <h3 className="mt-1 my-0 font-garamond font-bold text-2xl sm:text-3xl">
                  {t("contact.title")}!
                </h3>
                <div className="mt-4 flex w-full flex-col items-center gap-2 sm:w-150">
                  <SocialCard items={socialItems} />
                </div>
              </Reveal>
            </main>
            <footer className="text-sm text-muted-foreground border-t border-muted py-4 mb-15 sm:mb-5">
              <div className="flex flex-row justify-between items-center">
                <Reveal
                  from="left"
                  className="flex flex-row gap-2 font-garamond text-foreground"
                >
                  <p>Lucas Coco©</p>
                  <p>•</p>
                  <p>2026</p>
                </Reveal>
                <Reveal
                  from="right"
                  className="flex flex-row justify-evenly gap-4"
                >
                  <a
                    href="https://www.github.com/coco-lucas/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </Reveal>
              </div>
            </footer>
            <Dock />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
