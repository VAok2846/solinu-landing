# Solinu Landing (current production snapshot)

Landing page for **SOLINU Exchange** — a Solana-native perpetual futures exchange with built-in copy-trading of top perp leaders. Self-custody: the user's wallet signs every order.

This repo is a **standalone extract** of the current production landing, bundled for design iteration in tools like [v0.dev](https://v0.dev) or Framer. No backend, no wallet SDKs, no trading logic — pure marketing frontend.

## Stack

- React 18 + Vite 5
- React Router 6 (single-page)
- Tailwind CSS 3
- GSAP 3 + ScrollTrigger (scroll-driven reveals)
- Framer Motion (nav, FAQ, Markets animations)
- Lenis (smooth scroll)
- Lucide React (icons)

## Run

```bash
npm install
npm run dev
```

## Structure

```
src/
  pages/Landing.jsx                # Page root — composes sections top to bottom
  App.jsx                          # Router
  main.jsx                         # Entry
  index.css                        # Tailwind directives + custom utility classes
  components/
    Navbar.jsx                     # Fixed top nav with mobile drawer
    Hero.jsx                       # Hero with live Binance price ticker
    HeroBg.jsx                     # Hero background visuals
    Infrastructure.jsx             # Infrastructure / stack feature section
    Markets.jsx                    # Markets showcase
    Security.jsx                   # Security / self-custody story
    TokenEarn.jsx                  # $SOLINU token section
    FAQ.jsx                        # FAQ accordion
    CTA.jsx                        # Primary CTA section
    Footer.jsx                     # Footer with social links
    SectionBg.jsx                  # Decorative section backgrounds
    SmoothScroll.jsx               # Lenis + GSAP ScrollTrigger bridge
  lib/solinuToken.js               # $SOLINU SPL mint address constants
```

## Brand tokens (in `tailwind.config.js`)

- `dark` `#06060a` — page background
- `dark-card` `#0c0c14` — raised panel
- `gold` `#FFD700` — brand accent
- `purple` `#9945FF`, `cyan` `#14F195`, `red` `#FF3B6B` — secondary accents
- Fonts: Space Grotesk (heading), Inter (body), JetBrains Mono (numerics)

## Socials

- X / Twitter: [@SolinuExchange](https://x.com/SolinuExchange)
- Telegram: [@SolinuExchange](https://t.me/SolinuExchange)

## License

Private / proprietary. All rights reserved.
