"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "@/components/ui/image";
import { motion } from "motion/react";
import type { ProjectCarouselProps } from "@/types/portfolio";

export default function ProjectCarousel({
  pcImg = [],
  mobileImg = [],
  alt,
  type,
}: ProjectCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!api) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial state from embla, same as stock shadcn carousel
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      {pcImg.length === 1 || mobileImg.length === 1 ? (
        <Image
          src={type === "pc" ? pcImg[0] : mobileImg[0]}
          alt={alt}
          tabIndex={1}
        />
      ) : (
        <Carousel setApi={setApi}>
          <CarouselContent>
            {Array.from({
              length: type === "pc" ? pcImg.length : mobileImg.length,
            }).map((_, index) => (
              <CarouselItem key={index}>
                <motion.div
                  className="p-1 flex justify-center items-center text-center"
                  initial={{
                    opacity: 0,
                    x: type === "pc" ? 10 : -10,
                    filter: "blur(6px)",
                  }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                >
                  {type === "pc" ? (
                    <Image src={pcImg[index]} alt={alt} tabIndex={3} />
                  ) : (
                    <Image
                      src={mobileImg[index]}
                      alt={alt}
                      className="max-h-[560px] sm:max-h-96"
                      tabIndex={3}
                    />
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex flex-row items-center mt-3 sm:mt-5 justify-center sm:justify-between">
            <div className="flex items-center gap-2 justify-start">
              <CarouselPrevious className="hidden sm:block" />
              <CarouselNext className="hidden sm:block" />
            </div>
            <div className="flex gap-1 sm:self-start -mt-1.5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, delay: 0.3 }}
                className="flex gap-1"
              >
                {Array.from({ length: count }).map((_, idx) => (
                  <motion.button
                    key={idx}
                    type="button"
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-colors ${
                      current === idx ? "bg-primary/50" : "bg-muted"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => api?.scrollTo(idx)}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </Carousel>
      )}
    </>
  );
}
