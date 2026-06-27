import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import Bean from "./Bean";

const BURST = Array.from({ length: 32 }).map((_, i) => {
  const angle = (i / 32) * Math.PI * 2 + Math.random() * 0.4;
  return {
    id: i,
    angle,
    rotate: Math.random() * 720 - 360,
    size: 14 + Math.random() * 18,
    delay: Math.random() * 0.25,
    distFactor: 0.85 + Math.random() * 0.45,
  };
});

export default function Explosion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative bg-espresso text-cream overflow-hidden py-24 sm:py-32 lg:py-44"
    >
      <div className="absolute inset-0 grain opacity-30" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {BURST.map((b) => {
          const dist =
            (typeof window !== "undefined" && window.innerWidth < 640 ? 180 : 320) *
            b.distFactor;
          return (
            <motion.div
              key={b.id}
              className="absolute"
              initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.3 }}
              animate={
                inView && !reduce
                  ? {
                      x: Math.cos(b.angle) * dist,
                      y: Math.sin(b.angle) * dist,
                      opacity: [0, 1, 1, 0],
                      rotate: b.rotate,
                      scale: [0.3, 1, 1, 0.6],
                    }
                  : reduce && inView
                    ? { opacity: 0.4 }
                    : {}
              }
              transition={{
                duration: 1.6,
                delay: b.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Bean size={b.size} />
            </motion.div>
          );
        })}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView && !reduce ? { scale: [0, 4, 6], opacity: [0, 0.6, 0] } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border border-crema"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-crema/80 mb-6 sm:mb-8"
        >
          03 — The Spark
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-display text-[clamp(2.25rem,8.5vw,3.5rem)] lg:text-7xl leading-[1.05] tracking-tight text-balance font-medium"
        >
          The moment a bean <br />
          <span className="italic text-crema">becomes a memory.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-6 sm:mt-8 text-sm sm:text-base text-cream/80 max-w-xl mx-auto leading-relaxed"
        >
          Heat. Pressure. Caramelisation. Forty-two minutes inside a 1962
          Probat drum and a green pod becomes the soul of your morning.
        </motion.p>
      </div>
    </section>
  );
}
