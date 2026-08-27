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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {
          progress.current = self.progress;

          /*
           * Very subtle cinematic movement.
           * The building itself does not rotate.
           */
          gsap.set(image, {
            scale: 1 + self.progress * 0.055,
            yPercent: -self.progress * 2,
          });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[600vh] bg-black">
      {/* PINNED HERO */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={imageRef}
            src="/images/hero/image-1.png"
            alt="Siddhi Group development"
            className="h-full w-full object-cover object-center will-change-transform"
          />
        </div>

        {/* VERY LIGHT READABILITY */}
        <div className="pointer-events-none absolute inset-0 bg-black/[0.04]" />

        {/* NAV / CONTENT SPACE */}
        <div className="pointer-events-none absolute inset-0">
          {/* small architectural marker */}
          <div className="absolute left-1/2 top-[88px] hidden h-8 w-px bg-white/30 md:block" />

          {/* Hero text is interactive */}
          <div className="pointer-events-auto">
            <HeroText states={heroStates} progress={progress} />
          </div>
        </div>

        {/* BOTTOM LEFT */}
        <div className="absolute bottom-8 left-7 z-40 md:left-10 lg:left-14">
          <div className="font-ui text-[9px] uppercase leading-[1.5] tracking-[0.18em] text-white/70">
            Rajkot
            <br />
            Gujarat
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center">
          <span className="mb-3 font-ui text-[9px] uppercase tracking-[0.25em] text-white/80">
            Scroll
          </span>

          <div className="relative h-11 w-5 rounded-full border border-white/60">
            <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-[var(--siddhi-red)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
