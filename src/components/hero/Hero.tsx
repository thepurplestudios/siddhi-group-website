"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroText from "./HeroText";
import { heroStates } from "./heroData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const progress = useRef(0);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !image || !scrollIndicator) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {
          progress.current = self.progress;

          /*
           * Subtle cinematic movement.
           * The building stays recognizable and does not rotate.
           */
          gsap.set(image, {
            scale: 1 + self.progress * 0.055,
            yPercent: -self.progress * 2,
          });

          /*
           * Hide the scroll indicator as soon
           * as the user starts scrolling.
           */
          const scrollFade = gsap.utils.clamp(0, 1, self.progress / 0.035);

          gsap.set(scrollIndicator, {
            opacity: 1 - scrollFade,
            y: scrollFade * 10,
          });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[700vh] bg-black">
      {/* STICKY HERO */}
      <div className="sticky top-0 h-[100svh] min-h-[600px] w-full overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={imageRef}
            src="/images/hero/image-1.png"
            alt="Siddhi Group development in Rajkot"
            className="h-full w-full object-cover object-center will-change-transform"
          />
        </div>

        {/* VERY LIGHT IMAGE OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-black/[0.035]" />

        {/* STORY CONTENT */}
        <HeroText states={heroStates} progress={progress} />

        {/* LOCATION */}
        <div className="absolute bottom-7 left-6 z-40 sm:left-8 md:left-10 lg:left-14">
          <div className="font-ui text-[8px] uppercase leading-[1.6] tracking-[0.18em] text-white/70 sm:text-[9px]">
            Rajkot
            <br />
            Gujarat
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center will-change-transform"
        >
          <span className="mb-3 font-ui text-[8px] uppercase tracking-[0.25em] text-white/80 sm:text-[9px]">
            Scroll
          </span>

          <div className="relative h-10 w-5 rounded-full border border-white/60 sm:h-11">
            <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-[var(--siddhi-red)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
