/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      colors: {
        gold: '#FFD700',
        'gold-dark': '#B8860B',
        'gold-light': '#FFE55C',
        purple: '#9945FF',
        'purple-light': '#c77dff',
        magenta: '#E040FB',
        cyan: '#14F195',
        red: '#FF3B6B',
        dark: '#06060a',
        'dark-card': '#0c0c14',
        'dark-surface': '#12121e',
        'dark-border': '#1c1c30',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'shine': 'shine 3s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(153,69,255,0.2), 0 0 40px rgba(224,64,251,0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(153,69,255,0.4), 0 0 80px rgba(224,64,251,0.15)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
