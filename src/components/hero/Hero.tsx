"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroText from "./HeroText";
import { heroStates } from "./heroData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useRef(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[600vh] bg-[var(--siddhi-black)]"
    >
      {/* STICKY HERO */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* HERO IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/image-1.png"
            alt="Siddhi Group architectural development"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* SUBTLE CENTER FRAME */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[72vh] w-[38vw] -translate-x-1/2 -translate-y-1/2 border border-white/15" />

        {/* TOP CENTER LABEL */}
        <div className="absolute left-1/2 top-[118px] z-30 -translate-x-1/2 text-center">
          <div className="font-ui text-[9px] uppercase tracking-[0.3em] text-white/75">
            Siddhi Group
          </div>

          <div className="font-gujarati mt-2 text-sm text-white/80">
            સિદ્ધિ ગ્રુપ
          </div>
        </div>

        {/* STORY TEXT */}
        <HeroText states={heroStates} progress={progress} />

        {/* BOTTOM LEFT */}
        <div className="absolute bottom-8 left-7 z-40 font-ui text-[9px] uppercase leading-[1.5] tracking-[0.18em] text-white/75 md:left-10 lg:left-14">
          Rajkot
          <br />
          Gujarat
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-7 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center">
          <span className="mb-3 font-ui text-[9px] uppercase tracking-[0.25em] text-white/85">
            Scroll
          </span>

          <div className="relative h-12 w-6 rounded-full border border-white/70">
            <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
