# Solinu Landing

Landing page for **Solinu Exchange** — a Solana-native perpetual futures exchange with built-in copy-trading of top perp leaders. Self-custody: the user's wallet signs every order.

This repo is a **standalone extract** of the landing, bundled for design iteration. Inspired by the structure of top perp-DEX landings (variational.io, lighter.xyz, paradex.trade, extended.exchange) and the LanX Framer template (progressive blur, scroll reveals, inline-style Framer patterns).

## Stack

- React 18 + Vite 5
- React Router 6
- **Framer Motion** (scroll-driven reveals + micro-interactions)
- **Lucide React** (icons)
- Inter font via Google Fonts
- Inline CSS + CSS custom properties (no Tailwind, no shadcn — Framer-style)

## Run

```bash
npm install
npm run dev
```

## Structure

```
src/
  pages/Landing.jsx                # Composes sections top-to-bottom
  App.jsx                          # Router
  main.jsx                         # Entry
  index.css                        # Global reset + body defaults
  design/
    tokens.css                     # CSS variables — colors, spacing, type, motion
    copy.js                        # All user-facing strings
    format.js                      # Intl helpers
  components/
    Nav.jsx                        # Fixed top nav with scroll-blur background
    Hero.jsx                       # Eyebrow pill + headline + sub + dual CTA + live stats
    Integrations.jsx               # Ecosystem strip (Solana / Privy / Phantom / Backpack / Solflare)
    Features.jsx                   # 4 product cards with gold glow on hover
    HowItWorks.jsx                 # 4-step flow (Connect → Fund → Trade → Settle)
    Leaders.jsx                    # Curated leader table with sparklines
    FAQ.jsx                        # Collapsible Q&A
    Closing.jsx                    # Final CTA section
    Footer.jsx                     # Brand + 3 link columns + copyright
    Sparkline.jsx                  # SVG mini-chart primitive
    Reveal.jsx                     # framer-motion scroll-reveal wrapper
    ProgressiveBlur.jsx            # 8-layer tiered glass blur (LanX technique)
```

## Brand tokens (in `design/tokens.css`)

- Bg: `#06060c`
- Ink 100 → 03 (white opacity scale)
- Gold 100 → 800 (#FFF7D1 → #8A6400, brand accent)
- P/L: `#0ECB81` up · `#F6465D` down

## Hero live numbers

Hero fetches `https://api-evm.orderly.network/v1/public/futures` and computes Markets count, 24h volume sum, open interest. Baseline fallback when offline.

## Leaders data

Currently stubbed with 4 mock rows (KEVALDO + 3 generic). Re-wire to a real `/api/copy/traders/featured` endpoint when re-integrating with the backend.

## Socials

- X:        https://x.com/SolinuExchange
- Telegram: https://t.me/SolinuExchange

## License

Private / proprietary. All rights reserved.
