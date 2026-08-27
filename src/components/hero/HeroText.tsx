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
  const ctaRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const updateText = () => {
      const scrollProgress = Math.max(0, Math.min(0.9999, progress.current));

      const position = scrollProgress * states.length;

      const currentIndex = Math.min(states.length - 1, Math.floor(position));

      const localProgress = position - currentIndex;

      const nextIndex = Math.min(currentIndex + 1, states.length - 1);

      // LEFT
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

      // RIGHT
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

      // CTA
      ctaRefs.current.forEach((element, index) => {
        if (!element) return;

        if (index === currentIndex && states[index]?.showCTA) {
          gsap.set(element, {
            opacity: 1,
            y: 0,
          });
        } else {
          gsap.set(element, {
            opacity: 0,
            y: 20,
          });
        }
      });
    };

    gsap.ticker.add(updateText);

    return () => {
      gsap.ticker.remove(updateText);
    };
  }, [progress, states]);

  return (
    <>
      {/* LEFT SIDE */}
      <div className="absolute left-7 top-[46%] z-30 w-[30%] -translate-y-1/2 md:left-10 lg:left-14">
        <div className="relative min-h-[200px]">
          {states.map((state, index) => (
            <div
              key={`left-${state.id}`}
              ref={(element) => {
                leftRefs.current[index] = element;
              }}
              className="absolute left-0 top-0 w-full will-change-transform"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-7 bg-[var(--siddhi-red)]" />

                <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-white/75">
                  {state.leftEyebrow}
                </span>
              </div>

              <h1 className="font-display max-w-[330px] text-[clamp(38px,4vw,62px)] font-medium leading-[0.88] tracking-[-0.045em] text-white">
                {state.leftEnglish}
              </h1>

              <p className="font-gujarati mt-4 text-[clamp(17px,1.6vw,24px)] leading-none text-white/75">
                {state.leftGujarati}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="absolute right-7 top-[54%] z-30 w-[28%] -translate-y-1/2 text-right md:right-10 lg:right-14">
        <div className="relative min-h-[200px]">
          {states.map((state, index) => (
            <div
              key={`right-${state.id}`}
              ref={(element) => {
                rightRefs.current[index] = element;
              }}
              className="absolute right-0 top-0 w-full will-change-transform"
            >
              <div className="mb-5 flex items-center justify-end gap-3">
                <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-white/75">
                  {state.rightEyebrow}
                </span>

                <span className="h-px w-7 bg-[var(--siddhi-red)]" />
              </div>

              <h2 className="font-display ml-auto max-w-[350px] text-[clamp(38px,4vw,62px)] font-medium leading-[0.88] tracking-[-0.045em] text-white">
                {state.rightEnglish}
              </h2>

              <p className="font-gujarati mt-4 text-[clamp(17px,1.6vw,24px)] leading-none text-white/75">
                {state.rightGujarati}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="absolute bottom-[14%] left-1/2 z-40 -translate-x-1/2 text-center">
        {states.map((state, index) => (
          <div
            key={`cta-${state.id}`}
            ref={(element) => {
              ctaRefs.current[index] = element;
            }}
            className="absolute bottom-0 left-1/2 w-[260px] -translate-x-1/2"
          >
            {state.showCTA && (
              <>
                <p className="font-gujarati mb-4 text-lg text-white/80">
                  વધુ જાણો
                </p>

                <a
                  href="/projects"
                  className="group inline-flex items-center gap-4 border-b border-white/70 pb-2 font-ui text-[10px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[var(--siddhi-red)]"
                >
                  Explore Projects
                  <span className="text-[var(--siddhi-red)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
