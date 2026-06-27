import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ORIGINS = [
  {
    name: "Yirgacheffe",
    country: "Ethiopia",
    notes: ["Jasmine", "Bergamot", "Honey"],
    altitude: "1,950m",
    process: "Washed",
    price: "$24",
    accent: "#c9a47a",
  },
  {
    name: "Geisha",
    country: "Panama",
    notes: ["Peach", "White tea", "Cocoa nib"],
    altitude: "1,700m",
    process: "Natural",
    price: "$38",
    accent: "#8a5a2e",
  },
  {
    name: "Huehuetenango",
    country: "Guatemala",
    notes: ["Dark cherry", "Brown sugar", "Walnut"],
    altitude: "1,600m",
    process: "Honey",
    price: "$22",
    accent: "#6b3f1d",
  },
];

export default function Origins() {
  return (
    <section
      id="origins"
      className="relative bg-cream py-32 lg:py-44 grain overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-mocha-dark/70">
              04 — Origins
            </span>
            <h2 className="font-display text-5xl lg:text-6xl text-espresso mt-4 leading-[1.02] font-medium tracking-tight">
              This season's <br /> <span className="italic text-mocha">picks.</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-mocha-dark hover:text-espresso transition text-sm uppercase tracking-[0.18em]"
          >
            All origins
            <ArrowUpRight size={16} strokeWidth={1.6} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ORIGINS.map((o, i) => (
            <motion.article
              key={o.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative bg-cream-light border border-mocha/10 rounded-3xl p-8 overflow-hidden cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-mocha/10"
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-40 -translate-y-12 translate-x-12 group-hover:opacity-70 transition-opacity"
                style={{ background: o.accent }}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-12">
                  <span className="text-xs uppercase tracking-[0.2em] text-mocha-dark/60">
                    {o.country}
                  </span>
                  <span className="font-display text-2xl text-espresso">
                    {o.price}
                  </span>
                </div>

                <h3 className="font-display text-4xl text-espresso leading-none">
                  {o.name}
                </h3>

                <div className="my-10 h-px bg-mocha/10" />

                <div className="space-y-3 text-sm text-mocha-dark">
                  <div className="flex justify-between">
                    <span className="text-mocha-dark/60">Notes</span>
                    <span className="text-right">{o.notes.join(" · ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mocha-dark/60">Altitude</span>
                    <span>{o.altitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mocha-dark/60">Process</span>
                    <span>{o.process}</span>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-mocha-dark group-hover:text-espresso transition">
                    Add to bag
                  </span>
                  <span className="w-10 h-10 rounded-full bg-espresso text-cream flex items-center justify-center group-hover:bg-mocha-dark transition">
                    <ArrowUpRight size={16} strokeWidth={1.8} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
