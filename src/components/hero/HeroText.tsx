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

  useLayoutEffect(() => {
    const updateText = () => {
      const scrollProgress = Math.max(0, Math.min(0.9999, progress.current));

      const position = scrollProgress * states.length;

      const currentIndex = Math.min(states.length - 1, Math.floor(position));

      const localProgress = position - currentIndex;

      const nextIndex = Math.min(currentIndex + 1, states.length - 1);

      // LEFT STORY
      leftRefs.current.forEach((element, index) => {
        if (!element) return;

        if (index === currentIndex) {
          gsap.set(element, {
            opacity: 1 - localProgress,
            y: -localProgress * 35,
            scale: 1 - localProgress * 0.02,
          });
        } else if (index === nextIndex && currentIndex !== states.length - 1) {
          gsap.set(element, {
            opacity: localProgress,
            y: 35 - localProgress * 35,
            scale: 0.98 + localProgress * 0.02,
          });
        } else {
          gsap.set(element, {
            opacity: 0,
            y: 35,
            scale: 0.98,
          });
        }
      });

      // RIGHT STORY
      rightRefs.current.forEach((element, index) => {
        if (!element) return;

        if (index === currentIndex) {
          gsap.set(element, {
            opacity: 1 - localProgress,
            y: localProgress * 35,
            scale: 1 - localProgress * 0.02,
          });
        } else if (index === nextIndex && currentIndex !== states.length - 1) {
          gsap.set(element, {
            opacity: localProgress,
            y: -35 + localProgress * 35,
            scale: 0.98 + localProgress * 0.02,
          });
        } else {
          gsap.set(element, {
            opacity: 0,
            y: -35,
            scale: 0.98,
          });
        }
      });
    };

    gsap.ticker.add(updateText);

    return () => {
      gsap.ticker.remove(updateText);
    };
  }, [progress, states.length]);

  return (
    <>
      {/* LEFT STORY */}
      <div className="absolute left-7 top-1/2 z-30 w-[27%] -translate-y-1/2 md:left-10 lg:left-14">
        <div className="relative min-h-[190px]">
          {states.map((state, index) => (
            <div
              key={`left-${state.id}`}
              ref={(element) => {
                leftRefs.current[index] = element;
              }}
              className="absolute left-0 top-0 w-full will-change-transform"
            >
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--siddhi-red)]" />

                <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-white/80">
                  {state.leftEyebrow}
                </span>
              </div>

              {/* English heading */}
              <h1 className="font-display max-w-[330px] text-[clamp(38px,4.2vw,68px)] font-medium uppercase leading-[0.86] tracking-[-0.045em] text-white">
                {state.leftEnglish}
              </h1>

              {/* Gujarati */}
              <p className="font-gujarati mt-4 text-[clamp(18px,1.8vw,28px)] leading-none text-white/85">
                {state.leftGujarati}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT STORY */}
      <div className="absolute right-7 top-1/2 z-30 w-[27%] -translate-y-1/2 text-right md:right-10 lg:right-14">
        <div className="relative min-h-[190px]">
          {states.map((state, index) => (
            <div
              key={`right-${state.id}`}
              ref={(element) => {
                rightRefs.current[index] = element;
              }}
              className="absolute right-0 top-0 w-full will-change-transform"
            >
              {/* Eyebrow */}
              <div className="mb-4 flex items-center justify-end gap-3">
                <span className="font-ui text-[9px] uppercase tracking-[0.22em] text-white/80">
                  {state.rightEyebrow}
                </span>

                <span className="h-px w-8 bg-[var(--siddhi-red)]" />
              </div>

              {/* English heading */}
              <h2 className="font-display ml-auto max-w-[360px] text-[clamp(38px,4.2vw,68px)] font-medium uppercase leading-[0.86] tracking-[-0.045em] text-white">
                {state.rightEnglish}
              </h2>

              {/* Gujarati */}
              <p className="font-gujarati mt-4 text-[clamp(18px,1.8vw,28px)] leading-none text-white/85">
                {state.rightGujarati}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
