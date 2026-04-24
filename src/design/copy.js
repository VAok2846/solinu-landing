export const brand = {
  name: 'Solinu',
  wordmark: 'SOLINU',
  full: 'Solinu Exchange',
}

export const socials = {
  x:        'https://x.com/SolinuExchange',
  telegram: 'https://t.me/SolinuExchange',
  docs:     '/docs',
}

export const nav = {
  links: [
    { label: 'Trade',    href: '/trade' },
    { label: 'Copy',     href: '/copytrade' },
    { label: 'Markets',  href: '/markets' },
    { label: 'Docs',     href: '/docs' },
  ],
  cta: 'Launch',
}

export const hero = {
  eyebrow: 'Perpetual exchange on Solana',
  headline: 'Perpetual futures with copy-trading built in.',
  sub: 'Solinu runs on Solana with a shared omnichain order book, unified margin across 60 perpetual markets, and real-time mirroring of top leaders. Your wallet signs every order — nothing custodial.',
  ctaPrimary: 'Launch exchange',
  ctaSecondary: 'Read the docs',
}

export const integrations = {
  eyebrow: 'Ecosystem',
  items: [
    { name: 'Solana',   role: 'Chain' },
    { name: 'Privy',    role: 'Auth' },
    { name: 'Phantom',  role: 'Wallet' },
    { name: 'Backpack', role: 'Wallet' },
    { name: 'Solflare', role: 'Wallet' },
  ],
}

export const features = {
  eyebrow: 'Why Solinu',
  title: 'Built for self-custodial perp trading.',
  sub:  'Sixty omnichain markets, real-time copy-trading, and on-chain settlement — with nothing held by us.',
  items: [
    {
      tag: 'Perpetuals',
      head: '60 markets. One shared book.',
      body: 'Trade omnichain perpetuals on BTC, ETH, SOL and 57 others. A single routed book means fills land where depth is — not where a silo keeps you.',
    },
    {
      tag: 'Copy-trading',
      head: 'Mirror top leaders in real time.',
      body: 'Follow curated operators on BTC, ETH, SOL and HYPE. You set the size cap. You set the risk rails. Pause in one click.',
    },
    {
      tag: 'Self-custody',
      head: 'Your wallet signs every order.',
      body: 'Collateral never moves to a Solinu balance. No deposits held. No withdrawal gates. No custodian between you and your PnL.',
    },
    {
      tag: 'Solana-native',
      head: 'Sub-second finality.',
      body: 'Margin in, PnL out — on Solana. No L2 bridge, no synthetic hop, no waiting. Connect any Solana wallet and trade.',
    },
  ],
}

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'From wallet to position in under a minute.',
  steps: [
    { n: '01', head: 'Connect',  body: 'Plug in Phantom, Backpack, Solflare, or sign in by email via Privy.' },
    { n: '02', head: 'Fund',     body: 'Deposit USDC on Solana into a smart account your wallet controls.' },
    { n: '03', head: 'Trade',    body: 'Place market/limit/TP-SL on 60 markets — or mirror a curated leader.' },
    { n: '04', head: 'Settle',   body: 'Close a position, mirror someone else, or withdraw. On-chain, any time.' },
  ],
}

export const leaders = {
  eyebrow: 'Leaders',
  title: 'Curated operators. Not leaderboard noise.',
  sub:   'Hand-picked perp leaders with a track record — not the top of a volume table. Mirror with a size cap you set.',
  cta:   'Mirror',
  allLink: 'Browse all leaders',
}

export const numbers = {
  eyebrow: 'Scale',
  title: 'A live book, a live leaderboard.',
}

export const faq = {
  eyebrow: 'FAQ',
  title: 'The basics, answered.',
  items: [
    {
      q: 'Does Solinu hold my funds?',
      a: 'No. Collateral stays in a smart account that your wallet signs for. We never custody your USDC, and there are no withdrawal gates.',
    },
    {
      q: 'Which markets can I trade?',
      a: '60 perpetual markets, including BTC, ETH, SOL, HYPE and the long tail. Copy-trading currently covers BTC, ETH, SOL, and HYPE.',
    },
    {
      q: 'What leverage is supported?',
      a: 'Up to 20x on majors, with per-market caps aligned to liquidity. Margin mode is configurable (cross or isolated).',
    },
    {
      q: 'What does copy-trading cost?',
      a: 'Standard taker/maker fees on your own orders when a leader is mirrored. No subscription. No hidden spread.',
    },
    {
      q: 'Which wallets are supported?',
      a: 'Phantom, Backpack, Solflare, and any Wallet Standard-compatible Solana wallet. Email sign-in via Privy is also available.',
    },
    {
      q: 'Is it safe?',
      a: 'All orders are signed by your wallet. Solinu cannot move your collateral, reject withdrawals, or front-run you. The book settles on-chain.',
    },
  ],
}

export const closing = {
  title: 'Start trading.',
  sub:   '60 perpetual markets. Real-time copy of top leaders. Self-custody on Solana.',
  ctaPrimary: 'Launch exchange',
  ctaSecondary: 'Read the docs',
}

export const footer = {
  tagline: 'Perpetual exchange on Solana.',
  copyright: '© 2026 Solinu Exchange',
  disclaimer: 'Perpetual futures carry risk. This is not investment advice.',
  columns: [
    {
      head: 'Product',
      links: [
        { label: 'Trade',      href: '/trade' },
        { label: 'Copy-trade', href: '/copytrade' },
        { label: 'Markets',    href: '/markets' },
        { label: 'Leaders',    href: '/leaderboard' },
      ],
    },
    {
      head: 'Resources',
      links: [
        { label: 'Docs',   href: '/docs' },
        { label: 'Legal',  href: '/legal' },
      ],
    },
    {
      head: 'Community',
      links: [
        { label: 'X',        href: socials.x,        external: true },
        { label: 'Telegram', href: socials.telegram, external: true },
      ],
    },
  ],
}
