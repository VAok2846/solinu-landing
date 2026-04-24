// Central copy bank. All SOLINU-facing strings route through here.
//
// Voice rules — benchmarked against variational.io, lighter.xyz, paradex.trade,
// extended.exchange (Phil-approved references 2026-04-24):
//   1. Technical, declarative. "Perpetuals on Solana" not "Your instrument for trading".
//   2. Dense sub — two sentences of real product description, not poetry.
//   3. Numerals for counts ("60 markets" not "sixty markets").
//   4. No Orderly mention anywhere user-facing.
//   5. No editorial decorations: Roman years, "Est.", "Volumen", "Index", numbered
//      section markers, "§" chapter tags, "MMXXVI".
//   6. No AI tells: "revolutionary", "seamless", "cutting-edge", "the instrument",
//      "precision", "craftsmanship", "weight", "refined".
//   7. No exclamation marks.
//   8. Custody phrased as "signed by your wallet".

export const brand = {
  name: 'Solinu',
  wordmark: 'SOLINU',
  full: 'Solinu Exchange',
  shortDesc: 'Perpetual exchange on Solana with built-in copy-trading.',
}

export const socials = {
  x:         'https://x.com/SolinuExchange',
  telegram:  'https://t.me/SolinuExchange',
  docs:      '/docs',
}

export const hero = {
  eyebrow: '// Perpetual exchange on Solana',
  headline: 'Perpetual futures with copy-trading built in.',
  sub: 'Solinu runs on Solana with a shared omnichain order book, unified margin across 60 perpetual markets, and real-time mirroring of top leaders. Your wallet signs every order.',
  ctaPrimary: 'Launch exchange',
  ctaSecondary: 'Read the docs',
}

export const features = [
  {
    label: 'Perpetuals',
    head: '60 markets. One shared book.',
    body: 'Trade omnichain perpetuals on BTC, ETH, SOL and 57 others. A single routed book means your fills land where depth is — not where a silo keeps you.',
  },
  {
    label: 'Copy-trading',
    head: 'Mirror top leaders in real time.',
    body: 'Follow curated operators on BTC, ETH, SOL and HYPE. You set the size cap. You set the risk rails. Pause in one click.',
  },
  {
    label: 'Self-custody',
    head: 'Your wallet signs every order.',
    body: 'Collateral never moves to a Solinu balance. No deposits held. No withdrawal gates. No custodian between you and your PnL.',
  },
  {
    label: 'Solana-native',
    head: 'Sub-second finality.',
    body: 'Margin in, PnL out — on Solana. No L2 bridge, no synthetic hop, no waiting. Connect any Solana wallet and start trading.',
  },
]

export const instrument = [
  {
    label: 'Connect',
    head: 'Plug in your Solana wallet.',
    body: 'Privy, Phantom, Backpack or any Wallet Standard connector. Email sign-in via Privy if you prefer.',
    meta: [
      ['Wallets', 'Privy · Phantom · Backpack'],
      ['Email',   'via Privy'],
      ['Chain',   'Solana'],
      ['Custody', 'Self'],
    ],
  },
  {
    label: 'Fund',
    head: 'Deposit USDC on Solana.',
    body: 'USDC stays in a smart account your wallet controls. Withdraw any time — no review, no queue, no hold.',
    meta: [
      ['Asset',     'USDC'],
      ['Chain',     'Solana'],
      ['Withdraws', 'Instant'],
      ['Gates',     'None'],
    ],
  },
  {
    label: 'Trade',
    head: 'Place an order, or mirror a leader.',
    body: 'Market, limit, and TP/SL on 60 perpetual markets. Or mirror a curated leader with your own size cap and risk rails.',
    meta: [
      ['Markets',  '60 perpetuals'],
      ['Types',    'Market · Limit · TP/SL'],
      ['Copy',     'BTC · ETH · SOL · HYPE'],
      ['Leverage', 'Up to 20x'],
    ],
  },
  {
    label: 'Settle',
    head: 'Close, withdraw, repeat.',
    body: 'Close a position, mirror a different leader, or withdraw to your wallet. Every step on-chain and auditable.',
    meta: [
      ['Finality', 'Sub-second'],
      ['Audit',    'On-chain'],
      ['Fees',     'Flat'],
      ['Gates',    'None'],
    ],
  },
]

export const leaders = {
  title: 'Curated operators. Not leaderboard noise.',
  sub:   'Hand-picked perp leaders with a track record — not the top of a volume table. Mirror with a size cap you set.',
  cta:   'Mirror',
  allLink: 'See all leaders',
}

export const partners = {
  eyebrow: 'Ecosystem',
  items: [
    { name: 'Solana',   label: 'Chain' },
    { name: 'Privy',    label: 'Auth' },
    { name: 'Phantom',  label: 'Wallet' },
    { name: 'Backpack', label: 'Wallet' },
  ],
}

export const closing = {
  title: 'Start trading.',
  sub:   '60 perpetual markets. Real-time copy of top leaders. Self-custody on Solana.',
  cta:   'Launch exchange',
}

export const footer = {
  tagline:   'Perpetual exchange on Solana.',
  copyright: '© 2026 Solinu Exchange',
  disclaimer: 'Perpetual futures carry risk. This is not investment advice.',
  links: [
    { label: 'Docs',     href: '/docs' },
    { label: 'Legal',    href: '/legal' },
    { label: 'X',        href: socials.x,        external: true },
    { label: 'Telegram', href: socials.telegram, external: true },
  ],
}

export const cockpit = {
  connect: {
    title: 'Connect a wallet to trade',
    body:  'Solinu signs orders from your wallet. Nothing custodial.',
    cta:   'Connect',
  },
  emptyPositions: {
    title: 'No open positions',
    body:  'Your positions appear here once you place a trade.',
  },
  emptyOrders: {
    title: 'No open orders',
    body:  'Resting limit, stop, and TP/SL orders show up here.',
  },
  emptyHistory: {
    title: 'No trade history yet',
    body:  'Once you place a trade, every fill shows up here.',
  },
  orderSubmitted: 'Order submitted',
  orderCanceled:  'Order canceled',
  positionClosed: 'Position closed',
}

export const errors = {
  leverageReject:    'Leverage could not be set. Try again in a moment.',
  orderReject:       'Order rejected. Check size, price, and free collateral.',
  marginModeBlocked: 'Isolated margin is not enabled for this broker. Use Cross, or contact support.',
  network:           'Network is unreachable. Your last update may be stale.',
}
