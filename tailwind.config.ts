import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#faf9f7',
        ink: '#1a1a1a',
        muted: '#888888',
        border: '#e0e0e0',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}

export default config
