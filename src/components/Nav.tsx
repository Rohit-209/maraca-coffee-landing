import { ShoppingBag, Search } from "lucide-react";

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-cream/70 border-b border-mocha/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-mocha-dark font-display text-2xl tracking-tight font-semibold">
            Maraca
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-mocha/60 pt-1">
            est. 2019
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-9 text-sm text-mocha-dark">
          {["Shop", "Subscribe", "Journal", "About"].map((l) => (
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

        <div className="flex items-center gap-4 text-mocha-dark">
          <button className="p-2 hover:text-espresso transition" aria-label="Search">
            <Search size={18} strokeWidth={1.6} />
          </button>
          <button className="p-2 hover:text-espresso transition relative" aria-label="Bag">
            <ShoppingBag size={18} strokeWidth={1.6} />
            <span className="absolute -top-0.5 -right-0.5 bg-mocha-dark text-cream text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
              2
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
