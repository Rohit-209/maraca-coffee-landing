import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

export default function Pour() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const streamHeight = useTransform(scrollYProgress, [0.15, 0.5], [0, 220]);
  const fillHeight = useTransform(scrollYProgress, [0.3, 0.7], [0, 70]);
  const fillY = useTransform(fillHeight, (v) => 300 - v);
  const fillOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const ripple = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const rippleOuter = useTransform(ripple, [0, 1], [0.5, 1.4]);
  const rippleInner = useTransform(ripple, [0, 1], [0.3, 1.2]);
  const headlineX = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={ref}
      className="relative min-h-[160vh] lg:min-h-[180vh] bg-cream-light grain overflow-hidden"
      id="story"
    >
      <div className="sticky top-0 min-h-screen h-dvh flex items-center py-12 lg:py-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            style={reduce ? undefined : { x: headlineX }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-mocha-dark/70 mb-4 sm:mb-6">
              02 — The Pour
            </span>
            <h2 className="font-display text-[clamp(2.5rem,9vw,4rem)] lg:text-7xl leading-[1.02] tracking-tight text-espresso font-medium text-balance">
              A ritual, <br />
              <span className="italic text-mocha">not a routine.</span>
            </h2>
            <p className="mt-5 sm:mt-8 text-base sm:text-lg text-mocha-dark/80 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Bloom for forty-five seconds. Pour in slow concentric circles. Let
              the grounds breathe before the second pour.
            </p>

            <ul className="hidden lg:block mt-10 space-y-3 text-mocha-dark">
              {[
                ["1.", "Bloom — 45s, 60g water"],
                ["2.", "First pour — center out"],
                ["3.", "Rest — 30s breathe"],
                ["4.", "Final pour — to the brim"],
              ].map(([n, t]) => (
                <li key={n} className="flex gap-4 items-baseline">
                  <span className="font-display text-mocha/60 w-6">{n}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="relative h-[340px] sm:h-[440px] lg:h-[600px] flex items-end justify-center order-1 lg:order-2">
            <svg
              viewBox="0 0 320 120"
              className="absolute top-2 sm:top-6 lg:top-20 left-1/2 -translate-x-1/2 w-[180px] sm:w-[240px] lg:w-[320px]"
            >
              <defs>
                <linearGradient id="kettle-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a5a2e" />
                  <stop offset="100%" stopColor="#4a2912" />
                </linearGradient>
              </defs>
              <path
                d="M 80 30 L 60 30 Q 50 30 50 40 L 50 90 Q 50 110 70 110 L 210 110 Q 230 110 230 90 L 230 60 L 280 80 L 280 50 L 230 40 L 230 40 Q 230 30 220 30 Z"
                fill="url(#kettle-g)"
                stroke="#2a1810"
                strokeWidth="1.5"
              />
              <ellipse cx="65" cy="34" rx="18" ry="4" fill="#2a1810" />
              <path
                d="M 120 20 Q 140 0 160 20"
                fill="none"
                stroke="#2a1810"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <motion.div
              className="absolute top-[80px] sm:top-[100px] lg:top-[140px] left-1/2 -translate-x-1/2 w-[2.5px] sm:w-[3px] bg-gradient-to-b from-mocha to-espresso rounded-full origin-top"
              style={{ height: streamHeight }}
            />

            <div className="relative">
              <svg
                viewBox="0 0 280 320"
                className="w-[180px] sm:w-[230px] lg:w-[280px] h-auto"
              >
                <defs>
                  <linearGradient id="chemex-g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbf6ee" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#ede2cf" stopOpacity="0.9" />
                  </linearGradient>
                  <clipPath id="chemex-clip">
                    <path d="M 100 30 L 100 130 L 40 280 Q 40 300 60 300 L 220 300 Q 240 300 240 280 L 180 130 L 180 30 Z" />
                  </clipPath>
                </defs>

                <path
                  d="M 100 30 L 100 130 L 40 280 Q 40 300 60 300 L 220 300 Q 240 300 240 280 L 180 130 L 180 30 Z"
                  fill="url(#chemex-g)"
                  stroke="#c9a47a"
                  strokeWidth="2"
                />

                <rect x="95" y="125" width="90" height="20" fill="#8a5a2e" rx="3" />

                <motion.g
                  style={{ opacity: fillOpacity }}
                  clipPath="url(#chemex-clip)"
                >
                  <motion.rect
                    x="0"
                    y="300"
                    width="280"
                    height={fillHeight}
                    fill="#3a2415"
                    style={{ y: fillY }}
                  />
                </motion.g>

                <motion.ellipse
                  cx="140"
                  cy="280"
                  rx="50"
                  ry="6"
                  fill="none"
                  stroke="#6b3f1d"
                  strokeWidth="1.5"
                  style={{ opacity: ripple, scale: rippleOuter }}
                />
                <motion.ellipse
                  cx="140"
                  cy="280"
                  rx="30"
                  ry="4"
                  fill="none"
                  stroke="#6b3f1d"
                  strokeWidth="1"
                  style={{ opacity: ripple, scale: rippleInner }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
