import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Bean from "./Bean";

const FALLING_BEANS = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: 10 + Math.random() * 80,
  delay: Math.random() * 4,
  duration: 6 + Math.random() * 5,
  size: 18 + Math.random() * 16,
  rotate: Math.random() * 360,
  drift: (Math.random() - 0.5) * 80,
}));

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cupY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const cupRotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden grain pt-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        {FALLING_BEANS.map((b) => (
          <motion.div
            key={b.id}
            className="absolute -top-20"
            style={{ left: `${b.left}%` }}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, b.drift],
              opacity: [0, 0.8, 0.8, 0],
              rotate: [b.rotate, b.rotate + 540],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Bean size={b.size} />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center min-h-[calc(100vh-4rem)]">
        <motion.div style={{ y: headlineY }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mocha/20 text-mocha-dark text-xs uppercase tracking-[0.18em] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-mocha-dark" />
            Spring harvest · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-display text-[12vw] sm:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-balance text-espresso font-medium"
          >
            Slow-roasted.
            <br />
            <span className="italic text-mocha">Single origin.</span>
            <br />
            Seriously good.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 text-lg text-mocha-dark/80 max-w-md leading-relaxed"
          >
            Beans we'd happily drink black. Sourced from farms we visit,
            roasted in small batches the day before they ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#origins"
              className="group inline-flex items-center gap-2 bg-espresso hover:bg-mocha-dark text-cream px-7 py-4 rounded-full text-sm font-medium tracking-wide transition-all hover:gap-3"
            >
              Shop Single Origins
              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 text-mocha-dark hover:text-espresso text-sm font-medium underline underline-offset-4 decoration-mocha/30 hover:decoration-espresso transition-colors px-2 py-4"
            >
              Our Story
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-14 flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-mocha-dark/60"
          >
            <span>★ 4.9 from 2,300 cups</span>
            <span className="hidden sm:inline">Carbon-neutral shipping</span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: cupY, rotate: cupRotate }}
          className="relative h-[520px] lg:h-[600px] flex items-center justify-center"
        >
          <CoffeeCup />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mocha-dark/60 text-xs uppercase tracking-[0.3em] flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-mocha-dark/40"
        />
      </motion.div>
    </section>
  );
}

function CoffeeCup() {
  return (
    <div className="relative">
      <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-cream-dark/60 to-transparent blur-3xl" />

      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 bottom-0 w-1 rounded-full bg-mocha/20"
            style={{ marginLeft: -2 + (i - 1) * 18 }}
            animate={{
              y: [-10, -100],
              opacity: [0, 0.55, 0],
              scaleY: [1, 1.6],
            }}
            transition={{
              duration: 3 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <svg width="380" height="380" viewBox="0 0 380 380" className="relative drop-shadow-2xl">
        <defs>
          <radialGradient id="saucer-g" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fbf6ee" />
            <stop offset="100%" stopColor="#ede2cf" />
          </radialGradient>
          <linearGradient id="cup-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbf6ee" />
            <stop offset="100%" stopColor="#ddd0b9" />
          </linearGradient>
          <radialGradient id="coffee-g" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#6b3f1d" />
            <stop offset="80%" stopColor="#2a1810" />
          </radialGradient>
        </defs>

        <ellipse cx="190" cy="310" rx="150" ry="22" fill="url(#saucer-g)" />
        <ellipse cx="190" cy="305" rx="150" ry="22" fill="none" stroke="#c9a47a" strokeWidth="1" opacity="0.4" />

        <path
          d="M 80 150 Q 80 290 130 300 L 250 300 Q 300 290 300 150 Z"
          fill="url(#cup-g)"
          stroke="#c9a47a"
          strokeWidth="1.5"
        />

        <path
          d="M 300 170 Q 350 170 350 220 Q 350 270 300 270"
          fill="none"
          stroke="#c9a47a"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <ellipse cx="190" cy="150" rx="110" ry="22" fill="url(#coffee-g)" />
        <ellipse cx="190" cy="148" rx="95" ry="14" fill="#4a2912" opacity="0.4" />
        <ellipse cx="170" cy="142" rx="40" ry="6" fill="#c9a47a" opacity="0.25" />
      </svg>
    </div>
  );
}
