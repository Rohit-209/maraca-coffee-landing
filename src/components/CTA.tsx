import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Bean from "./Bean";

export default function CTA() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-mocha-dark text-cream py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 grain opacity-20" />

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 11}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={
              reduce
                ? { opacity: 0.3 }
                : {
                    y: [0, -20, 0],
                    rotate: [0, 25, 0],
                  }
            }
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Bean size={16 + (i % 3) * 6} />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-crema/80">
          The Subscription
        </span>
        <h2 className="font-display text-[clamp(2.25rem,8vw,3.75rem)] lg:text-7xl mt-4 sm:mt-6 leading-[1.02] tracking-tight font-medium text-balance">
          A fresh bag, <br />
          <span className="italic text-crema">on your doorstep.</span>
        </h2>
        <p className="mt-5 sm:mt-6 text-sm sm:text-base text-cream/80 max-w-md mx-auto leading-relaxed">
          Choose your roast level, pick a cadence, skip or pause anytime.
          We'll roast the day before we ship.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="you@goodmornings.com"
            className="flex-1 min-w-0 bg-cream/10 border border-cream/20 rounded-full px-5 sm:px-6 py-3.5 sm:py-4 text-cream placeholder:text-cream/50 focus:outline-none focus:border-crema text-sm"
          />
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 bg-cream text-espresso px-6 py-3.5 sm:py-4 rounded-full text-sm font-medium hover:gap-3 transition-all"
          >
            Start
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </form>

        <p className="mt-5 sm:mt-6 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cream/40">
          Free shipping over $30 · Cancel anytime
        </p>
      </div>
    </section>
  );
}
