import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Bean from "./Bean";

const BURST = Array.from({ length: 36 }).map((_, i) => {
  const angle = (i / 36) * Math.PI * 2 + Math.random() * 0.4;
  const dist = 280 + Math.random() * 260;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: Math.random() * 720 - 360,
    size: 16 + Math.random() * 22,
    delay: Math.random() * 0.25,
  };
});

export default function Explosion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative bg-espresso text-cream overflow-hidden py-32 lg:py-44"
    >
      <div className="absolute inset-0 grain opacity-30" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {BURST.map((b) => (
          <motion.div
            key={b.id}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.3 }}
            animate={
              inView
                ? {
                    x: b.x,
                    y: b.y,
                    opacity: [0, 1, 1, 0],
                    rotate: b.rotate,
                    scale: [0.3, 1, 1, 0.6],
                  }
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
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: [0, 4, 6], opacity: [0, 0.6, 0] } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="w-32 h-32 rounded-full border border-crema"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-block text-xs uppercase tracking-[0.25em] text-crema/80 mb-8"
        >
          03 — The Spark
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-display text-5xl lg:text-7xl leading-[1.05] tracking-tight text-balance font-medium"
        >
          The moment a bean <br />
          <span className="italic text-crema">becomes a memory.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-8 text-cream/80 max-w-xl mx-auto leading-relaxed"
        >
          Heat. Pressure. Caramelisation. Forty-two minutes inside a 1962
          Probat drum and a green pod becomes the soul of your morning.
        </motion.p>
      </div>
    </section>
  );
}
