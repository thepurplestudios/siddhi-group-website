"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { HeroState } from "./heroData";

type HeroTextProps = {
  states: HeroState[];
  progress: React.MutableRefObject<number>;
};

export default function HeroText({ states, progress }: HeroTextProps) {
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const updateText = () => {
      const scrollProgress = Math.max(0, Math.min(0.9999, progress.current));

      const position = scrollProgress * states.length;

      const currentIndex = Math.min(states.length - 1, Math.floor(position));

      const localProgress = position - currentIndex;

      const nextIndex = Math.min(currentIndex + 1, states.length - 1);

      /* ================================
         LEFT STORY
      ================================= */

      leftRefs.current.forEach((element, index) => {
        if (!element) return;

        if (index === currentIndex) {
          gsap.set(element, {
            opacity: 1 - localProgress,
            y: -localProgress * 28,
            scale: 1 - localProgress * 0.015,
          });
        } else if (index === nextIndex && currentIndex !== states.length - 1) {
          gsap.set(element, {
            opacity: localProgress,
            y: 28 - localProgress * 28,
            scale: 0.985 + localProgress * 0.015,
          });
        } else {
          gsap.set(element, {
            opacity: 0,
            y: 28,
            scale: 0.985,
          });
        }
      });

      /* ================================
         RIGHT STORY
      ================================= */

      rightRefs.current.forEach((element, index) => {
        if (!element) return;

        if (index === currentIndex) {
          gsap.set(element, {
            opacity: 1 - localProgress,
            y: localProgress * 28,
            scale: 1 - localProgress * 0.015,
          });
        } else if (index === nextIndex && currentIndex !== states.length - 1) {
          gsap.set(element, {
            opacity: localProgress,
            y: -28 + localProgress * 28,
            scale: 0.985 + localProgress * 0.015,
          });
        } else {
          gsap.set(element, {
            opacity: 0,
            y: -28,
            scale: 0.985,
          });
        }
      });

      /* ================================
         FINAL CTA
      ================================= */

      if (ctaRef.current) {
        /*
         * Keep CTA completely hidden through
         * most of the story.
         *
         * It begins appearing around 84%.
         */
        const ctaProgress = gsap.utils.clamp(
          0,
          1,
          (scrollProgress - 0.84) / 0.16,
        );

        gsap.set(ctaRef.current, {
          opacity: ctaProgress,
          y: 30 - ctaProgress * 30,
          scale: 0.96 + ctaProgress * 0.04,
          pointerEvents: ctaProgress > 0.8 ? "auto" : "none",
        });
      }
    };

    gsap.ticker.add(updateText);

    return () => {
      gsap.ticker.remove(updateText);
    };
  }, [progress, states.length]);

  return (
    <>
      {/* =================================
          LEFT STORY
      ================================= */}

      <div
        className="
          absolute
          left-6
          top-[37%]
          z-30
          w-[72%]
          -translate-y-1/2

          sm:left-8
          sm:w-[62%]

          md:left-10
          md:top-[46%]
          md:w-[30%]

          lg:left-14
        "
      >
        <div className="relative min-h-[150px] sm:min-h-[180px] md:min-h-[200px]">
          {states.map((state, index) => (
            <div
              key={`left-${state.id}`}
              ref={(element) => {
                leftRefs.current[index] = element;
              }}
              className="absolute left-0 top-0 w-full will-change-transform"
            >
              <div className="mb-4 flex items-center gap-3 sm:mb-5">
                <span className="h-px w-6 bg-[var(--siddhi-red)] sm:w-7" />

                <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-white/75 sm:text-[9px]">
                  {state.leftEyebrow}
                </span>
              </div>

              <h1
                className="
                  font-display
                  max-w-[330px]
                  text-[clamp(34px,9vw,62px)]
                  font-medium
                  leading-[0.88]
                  tracking-[-0.045em]
                  text-white

                  sm:text-[clamp(38px,7vw,62px)]

                  md:text-[clamp(38px,4vw,62px)]
                "
              >
                {state.leftEnglish}
              </h1>

              <p
                className="
                  font-gujarati
                  mt-3
                  max-w-[320px]
                  text-[clamp(17px,4.5vw,24px)]
                  leading-[1.05]
                  text-white/80

                  sm:mt-4
                "
              >
                {state.leftGujarati}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =================================
          RIGHT STORY
      ================================= */}

      <div
        className="
          absolute
          bottom-[23%]
          right-6
          z-30
          w-[72%]
          text-right

          sm:right-8
          sm:w-[62%]

          md:bottom-auto
          md:right-10
          md:top-[54%]
          md:w-[28%]
          md:-translate-y-1/2

          lg:right-14
        "
      >
        <div className="relative min-h-[150px] sm:min-h-[180px] md:min-h-[200px]">
          {states.map((state, index) => (
            <div
              key={`right-${state.id}`}
              ref={(element) => {
                rightRefs.current[index] = element;
              }}
              className="absolute right-0 top-0 w-full will-change-transform"
            >
              <div className="mb-4 flex items-center justify-end gap-3 sm:mb-5">
                <span className="font-ui text-[8px] uppercase tracking-[0.2em] text-white/75 sm:text-[9px]">
                  {state.rightEyebrow}
                </span>

                <span className="h-px w-6 bg-[var(--siddhi-red)] sm:w-7" />
              </div>

              <h2
                className="
                  font-display
                  ml-auto
                  max-w-[350px]
                  text-[clamp(34px,9vw,62px)]
                  font-medium
                  leading-[0.88]
                  tracking-[-0.045em]
                  text-white

                  sm:text-[clamp(38px,7vw,62px)]

                  md:text-[clamp(38px,4vw,62px)]
                "
              >
                {state.rightEnglish}
              </h2>

              <p
                className="
                  font-gujarati
                  mt-3
                  text-[clamp(17px,4.5vw,24px)]
                  leading-[1.05]
                  text-white/80

                  sm:mt-4
                "
              >
                {state.rightGujarati}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =================================
    FINAL CTA
================================= */}

      <div
        ref={ctaRef}
        className="
    pointer-events-none
    absolute
    bottom-[12%]
    left-1/2
    z-50
    -translate-x-1/2
    text-center
    opacity-0
    will-change-transform

    sm:bottom-[11%]
  "
      >
        {/* Gujarati */}
        <p
          className="
      font-gujarati
      mb-4
      text-[16px]
      leading-none
      !text-white
      opacity-90

      sm:text-[18px]
    "
        >
          વધુ જાણો
        </p>

        {/* GLASS CTA */}
        <a
          href="/projects"
          className="
      group
      inline-flex
      min-h-[52px]
      items-center
      justify-center
      gap-7
      whitespace-nowrap
      rounded-[4px]
      border
      border-white/45
      bg-white/[0.10]
      px-7
      py-3

      font-ui
      text-[9px]
      font-medium
      uppercase
      tracking-[0.22em]

      !text-white

      backdrop-blur-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]

      transition-all
      duration-500
      ease-out

      hover:border-white/70
      hover:bg-white/[0.17]
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]

      sm:min-h-[54px]
      sm:px-8
      sm:text-[10px]
    "
        >
          <span className="!text-white">Explore Projects</span>

          <span
            className="
        !text-white
        transition-all
        duration-300
        group-hover:translate-x-1
        group-hover:!text-[var(--siddhi-red)]
      "
          >
            →
          </span>
        </a>
      </div>
    </>
  );
}
