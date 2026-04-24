/**
 * Canonical $SOLINU SPL mint on Solana. Override for staging via VITE_SOLINU_MINT.
 * Primary pool page (“Pair” on swap activity; default GeckoTerminal). Override with VITE_SOLINU_PAIR_URL.
 */
export const SOLINU_MINT =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOLINU_MINT?.trim?.()) ||
  'DUr5rZAfYduvihaiyMnfqgnhqYWbPWJXvK954qyTpump'

export const SOLINU_PAIR_PAGE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SOLINU_PAIR_URL?.trim?.()) ||
  'https://www.geckoterminal.com/solana/pools/5LK8kJ9yjx15M7oYzfmcwAvakAjhkHdkHLCwjsf145ih'

/** Wrapped SOL */
export const WSOL_MINT = 'So11111111111111111111111111111111111111112'

/** Mainnet USDC */
export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

export const SOL_DECIMALS = 9
export const USDC_DECIMALS = 6
