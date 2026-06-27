export default function Footer() {
  return (
    <footer className="bg-cream text-mocha-dark border-t border-mocha/10 py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-display text-3xl text-espresso font-semibold">
              Maraca
            </div>
            <p className="text-sm mt-3 text-mocha-dark/70 max-w-xs">
              Slow-roasted, single-origin coffee from farms we know by name.
            </p>
          </div>

          {[
            ["Shop", ["Single Origins", "Subscriptions", "Gift Cards", "Brewing Gear"]],
            ["Learn", ["Brew Guides", "Journal", "Origins Map", "FAQ"]],
            ["Company", ["Our Story", "Sustainability", "Wholesale", "Contact"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-espresso mb-5">
                {title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {(items as string[]).map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-espresso transition-colors"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-mocha/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-mocha-dark/60">
          <span>© 2026 Maraca Coffee Roasters · Portland, OR</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-espresso">Instagram</a>
            <a href="#" className="hover:text-espresso">Twitter</a>
            <a href="#" className="hover:text-espresso">Substack</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
