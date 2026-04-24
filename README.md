# Solinu Landing (standalone)

Landing page for **Solinu Exchange** — a Solana-native perpetual futures exchange with built-in copy-trading of top perp leaders. Users keep self-custody; their wallet signs every order.

This repo is a **standalone extract** of the landing from the main `solinu-exchange` project, bundled for design iteration in tools like [v0.dev](https://v0.dev) or Framer. No backend, no wallet SDKs, no trading logic — pure marketing frontend.

## Stack

- React 18 + Vite 5
- React Router 6 (single-page, routes stubbed for in-preview navigation)
- GSAP 3 + ScrollTrigger (scroll-driven reveals, horizontal pinning)
- Lenis (smooth scroll — disabled on mobile + reduced-motion)
- No Tailwind — design tokens live in `src/design/tokens.css` as CSS custom properties
- No shadcn — we have our own primitives in `src/design/primitives/`

## Run

```bash
npm install
npm run dev
```

## Structure

```
src/
  Landing.jsx                      # Page root — composes all sections
  App.jsx                          # Router
  main.jsx                         # Entry
  index.css                        # Global reset + body defaults
  design/
    tokens.css                     # CSS variables: colors, space, type, motion
    voice.js                       # Copy bank — all strings in one place
    format.js                      # Intl helpers (price, percent, compact)
    primitives/                    # Panel / Button / Eyebrow / Sparkline / ...
  components/landing/
    SmoothScroll.jsx               # Lenis + GSAP ScrollTrigger bridge
    InstrumentNav.jsx              # Fixed top nav with slide-underline hover
    NewHero.jsx                    # Hero: eyebrow + headline + sub + CTAs + stats
    BuiltOnStrip.jsx               # Ecosystem strip (Solana/Privy/Phantom/Backpack)
    FeatureGrid.jsx                # 4 product cards
    HorizontalMechanics.jsx        # Pinned horizontal 4-step flow
    LeadersSpotlight.jsx           # Curated leaders list + sparklines (stubbed)
    ClosingSection.jsx             # Final CTA
    MinimalFooter.jsx              # Brand + links + disclaimer
```

## Design tokens

All styling routes through CSS custom properties in `src/design/tokens.css`:

- `--s-ink-stage` (#06060c) — page background
- `--s-gold-500` (#FFD700) — brand accent
- `--s-font-display` (Geist) — all headings + UI
- `--s-font-body` (Geist)
- `--s-font-mono` (Geist Mono) — numerics only

## Copy

All user-facing strings live in `src/design/voice.js`. Edit there, don't hardcode strings in components.

Voice rules (why they exist, from product feedback):

1. Short, declarative, technical.
2. No Orderly / broker mentions anywhere user-facing.
3. No editorial ornaments: Roman numerals, "§", "Est.", "Volumen", "Index 01/02/03".
4. No italic anywhere in chrome.
5. No AI tells: "seamless", "revolutionary", "cutting-edge", "the instrument", "precision", "refined".
6. Custody phrased as "signed by your wallet", not "secure".

## License

Private / proprietary. All rights reserved.
