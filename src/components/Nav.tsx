import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = ["Shop", "Subscribe", "Journal", "About"];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-cream/70 border-b border-mocha/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-mocha-dark font-display text-xl sm:text-2xl tracking-tight font-semibold">
              Maraca
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-mocha/60 pt-1">
              est. 2019
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-9 text-sm text-mocha-dark">
            {LINKS.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="relative py-2 hover:text-espresso transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-espresso after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 sm:gap-3 text-mocha-dark">
            <button
              className="hidden sm:inline-flex p-2 hover:text-espresso transition"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.6} />
            </button>
            <button
              className="p-2 hover:text-espresso transition relative"
              aria-label="Bag"
            >
              <ShoppingBag size={18} strokeWidth={1.6} />
              <span className="absolute -top-0.5 -right-0.5 bg-mocha-dark text-cream text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                2
              </span>
            </button>
            <button
              className="md:hidden p-2 hover:text-espresso transition"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-espresso/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-[78%] max-w-sm bg-cream-light grain shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-14">
                <span className="font-display text-2xl text-espresso font-semibold">
                  Maraca
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-mocha-dark hover:text-espresso"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>
              <ul className="flex-1 flex flex-col px-6 mt-8 space-y-1">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                  >
                    <a
                      href="#"
                      onClick={() => setOpen(false)}
                      className="block font-display text-3xl text-espresso py-3 border-b border-mocha/10"
                    >
                      {l}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="px-6 pb-8 text-xs uppercase tracking-[0.2em] text-mocha-dark/60">
                est. 2019 · Portland, OR
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
