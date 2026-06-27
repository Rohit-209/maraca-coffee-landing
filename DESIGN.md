# Maraca Landing — How it was built

A reference for the design choices, tools, and techniques used to build this sample
coffee-brand landing page. Mirrors what is actually in the repo so you can swap
things out without guessing.

---

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Bundler | **Vite 8** + `@vitejs/plugin-react` | Fast HMR, zero-config TS. Scaffolded with `npm create vite@latest -- --template react-ts`. |
| Framework | **React 19 + TypeScript** | Default for the Magic MCP output target anyway. |
| Styles | **Tailwind CSS v4** via `@tailwindcss/vite` | v4 ships a Vite plugin — no `postcss.config`, no `tailwind.config.ts`. Theme is declared in CSS with `@theme { … }`. |
| Animation | **motion** (formerly `framer-motion`) | All scroll-linked, in-view, and infinite animations. Free, no Motion+ token required. |
| Icons | **lucide-react** | Tree-shakeable SVG icons. Used `ShoppingBag`, `Search`, `ArrowRight`, `ArrowUpRight`. |
| Fonts | Google Fonts — **Fraunces** (display) + **Inter** (sans) | Loaded via `<link>` in `index.html`. |

What I deliberately did **not** use:
- shadcn/ui — wanted zero design system overhead for a sample.
- Any image assets — every illustration (mug, kettle, Chemex, beans) is inline SVG.
- The 21st.dev Magic MCP — the call returned a malformed `[object Object]` response on
  this run, so the actual code was hand-written. Magic is better fit for "explore me
  10 hero variants" than a tightly-specified brief like this one.

---

## 2. Design system

### Colors (declared in `src/index.css` via `@theme`)

| Token | Hex | Use |
|---|---|---|
| `cream` | `#f7f1e8` | Page background, primary light surface |
| `cream-light` | `#fbf6ee` | Card backgrounds, alternating sections |
| `cream-dark` | `#ede2cf` | Saucer / shadow blooms |
| `mocha` | `#6b3f1d` | Accent / italic display text |
| `mocha-light` | `#8a5a2e` | Bean highlights, kettle gradient |
| `mocha-dark` | `#4a2912` | Body text on light backgrounds |
| `espresso` | `#2a1810` | Headings, primary CTA, footer text |
| `crema` | `#c9a47a` | Trim, secondary accent on dark sections |

Picked from a "warm white + earthy brown" mood — no greys, no pure blacks. Every dark
value still has red/brown undertone so the page reads as warm even in the espresso section.

### Typography

- **Fraunces** for display (h1, h2, h3, brand mark, price tags) — a variable serif
  designed for editorial. Has tasteful italic and works at huge sizes.
- **Inter** for body and UI — neutral, doesn't fight the serif.
- Recurring detail: oversized headlines mix **roman + italic** for emphasis ("Single
  origin. *Seriously* good."). Borrowed from editorial layouts (NYT Magazine, Apple
  product pages). Cheap way to add hierarchy without weight changes.
- All-caps tracking: `tracking-[0.18em]` to `tracking-[0.25em]` for eyebrow labels.
  This is the "magazine" tell — section numbers like `02 — The Pour`.

### Texture

- `grain` utility — a 3px radial-dot pattern at 6% opacity laid over backgrounds.
  Sells the "paper" feel without an image. Defined in `index.css`:
  ```css
  .grain {
    background-image: radial-gradient(rgba(74, 41, 18, 0.06) 1px, transparent 1px);
    background-size: 3px 3px;
  }
  ```

---

## 3. Animation techniques (per section)

All from `motion/react`. The library is the same as Framer Motion; the import path
changed when the package was renamed.

### Hero — falling beans + parallax headline

```ts
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);
```

- `useScroll` + `useTransform` to parallax the headline and coffee cup at different
  rates as the hero scrolls out.
- Beans: an array of 14 `motion.div`s with randomized `left`, `delay`, `duration`,
  `drift`, and `rotate`. Each loops `y: 0 → 110vh` with `repeat: Infinity`.
  Randomness is generated **once at module scope** so it doesn't reshuffle on every
  render.

### Hero — steam

Three vertical `<motion.span>` columns rising with staggered `delay`, `easeOut`, and
`scaleY` growth. The trick is making them fade in and out at different times
(`opacity: [0, 0.55, 0]`) so they look natural, not metronomic.

### Pour — scroll-linked SVG fill

This is the section that does the most work.

```tsx
<section className="min-h-[180vh]">
  <div className="sticky top-0 h-screen">…</div>
</section>
```

- Outer section is **180vh tall**. Inner content is `sticky top-0`. As you scroll the
  180vh, the inner content stays pinned for ~80vh of scroll — that's the timeline
  the animations play on.
- A `<motion.div>` represents the water stream — its `height` is bound to a
  `useTransform` of `scrollYProgress`.
- The Chemex fills via a clipped `<motion.rect>` whose `height` and `y` both come
  from MotionValues. The clip path keeps the dark liquid inside the SVG flask shape.
- Ripples (two ellipses) fade in and scale up around the midpoint of the scroll
  using a `useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])` curve.

### Explosion — viewport-triggered burst

```tsx
const inView = useInView(ref, { once: true, amount: 0.4 });
```

- Pre-computed 36 beans on a circle: `angle = (i / 36) * 2π`, `dist = 280–540px`.
- Each bean animates from `{ x: 0, y: 0, scale: 0.3 }` to its final position when
  `inView` flips true.
- Easing: `[0.16, 1, 0.3, 1]` — a "dramatic ease-out" that snaps fast then lingers.
  Used throughout for the slow-luxury feel.
- A concentric `motion.div` ring expands to `scale: 6` and fades — the "shockwave".

### Origins cards

- `whileInView` with `viewport={{ once: true, amount: 0.3 }}` for staggered entrance
  (delay = `i * 0.12`).
- `whileHover={{ y: -6 }}` for the lift.
- The colored blur disc behind each card uses an inline style:
  `background: o.accent` with `blur-3xl` and `opacity-40`. Cheap way to tint a card
  without committing to a full themed variant.

### CTA — floating beans

Eight beans with infinite `y: [0, -20, 0]` and `rotate: [0, 25, 0]` — different
durations so they never sync. Easy "ambient motion".

---

## 4. Illustration approach

Every visual is inline SVG. Three reasons:
1. **No asset pipeline** — nothing to fetch, no images to lose between branches.
2. **Tintable** — every fill is a Tailwind token or gradient stop, so theme tweaks
   propagate.
3. **Animatable** — `motion.rect`, `motion.ellipse`, `motion.g` accept MotionValues
   directly.

### The bean (`Bean.tsx`)

An ellipse with a radial gradient (`#8a5a2e → #4a2912 → #2a1810`) plus a curved
center line and a small highlight ellipse. Takes a `size` and `rotate` prop so it
can be reused everywhere — the falling beans, the explosion, the CTA float, future
illustrations.

### The coffee cup (`Hero.tsx → CoffeeCup`)

Hand-drawn paths for the mug body and handle, with a flat brown ellipse for the
surface of the coffee. Two darker ellipses layered on top for depth + a cream
highlight for the foam reflection.

### The Chemex (`Pour.tsx`)

A diamond/hourglass shape via `<path>`. The waist is a brown `<rect>` — the wood
collar. The fill animation is a `<motion.rect>` clipped to the Chemex outline.

---

## 5. Layout patterns

- **Container**: `max-w-7xl mx-auto px-6 lg:px-10` everywhere. Consistent
  rhythm between sections.
- **Section eyebrows**: `01 — The Roast`, `02 — The Pour`. Pure typography
  hierarchy; no boxes, no chips beyond the hero's spring-harvest pill.
- **Vertical breathing**: sections are `py-32 lg:py-44`. Generous. Editorial sites
  reward whitespace.
- **CTA shapes**: pill buttons (`rounded-full`), tight letter spacing on dark
  variants, animated arrow icons (`group-hover:translate-x-0.5`). Standard but
  reliable.

---

## 6. References (honest)

I didn't browse anything during the build; these are patterns drawn from training
data. If you want to study the live versions:

- **Onyx Coffee Lab** — the gold standard for luxury coffee e-comm. The eyebrow
  numbering, big serif, and sparse layout are heavily influenced by their aesthetic.
- **Blue Bottle Coffee** — minimalism, generous whitespace.
- **Verve Coffee** — color palette in this range (cream + brown + crema).
- **La Colombe** — strong product cards on cream backgrounds.
- **NYT Magazine / Apple product pages** — the roman + italic display headline
  pattern.

Animation:
- **motion.dev** docs — `useScroll`, `useTransform`, `useInView` are the three hooks
  used. https://motion.dev/docs/react-scroll-animations
- **Awwwards / Cofolios** for the "sticky section + scroll-linked fill" pattern.

---

## 7. What I'd improve next pass

Being honest about the rough edges:

1. **No real product photography.** A landing page like this lives or dies on a
   single hero image. The animated SVG mug is charming but a real shot would land
   harder. Add a `/public/hero.jpg` and adjust.
2. **Accessibility pass missing.** Beans loop forever — should respect
   `prefers-reduced-motion`. Add a `useReducedMotion()` guard around the infinite
   loops.
3. **No real responsive review.** Layouts look fine on desktop and probably OK on
   mobile, but the hero's `lg:grid-cols-[1.1fr_1fr]` will collapse to one column on
   mobile and the coffee-cup SVG will dominate. Test and tune.
4. **No SEO / meta.** Title is set, but no description, OG image, canonical, etc.
5. **Form is non-functional.** The CTA email input just `preventDefault`s.

---

## 8. File map

```
src/
├── index.css            ← Tailwind v4 theme + grain util
├── App.tsx              ← composes the page
├── main.tsx             ← React root
└── components/
    ├── Nav.tsx          ← sticky blurred top bar
    ├── Hero.tsx         ← headline + cup + falling beans
    ├── Pour.tsx         ← sticky scroll-linked Chemex fill
    ├── Explosion.tsx    ← in-view bean burst on dark bg
    ├── Origins.tsx      ← three product cards
    ├── CTA.tsx          ← subscription form on mocha
    ├── Footer.tsx       ← columns + socials
    └── Bean.tsx         ← reusable SVG bean
```
