import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        /* Strict Design Tokens — Modern Blue + Cyan / Teal Palette */
        primary: {
          bg: '#EAF3FF',
          light: '#EAF3FF',
          DEFAULT: '#0062E3',
          hover: '#0052C7',
          pressed: '#003F9E',
          foreground: '#FFFFFF',
        },
        accent: {
          bg: '#EAF3FF',
          DEFAULT: '#00B2D6',
          cyan: '#00B2D6',
          teal: '#00A698',
          hover: '#009BBF',
          pressed: '#0084A3',
          foreground: '#FFFFFF',
        },
        dark: {
          DEFAULT: '#111236',
          foreground: '#FFFFFF',
        },
        success: {
          bg: '#E6F8F6',
          DEFAULT: '#00A698',
          hover: '#008F83',
          pressed: '#00786E',
          foreground: '#FFFFFF',
        },
        warning: {
          bg: '#FFF5E6',
          DEFAULT: '#FF9400',
          hover: '#E68500',
          pressed: '#CC7600',
          foreground: '#FFFFFF',
        },
        error: {
          bg: '#FCECEF',
          DEFAULT: '#D1435B',
          hover: '#BA384E',
          pressed: '#A12D41',
          foreground: '#FFFFFF',
        },
        info: {
          bg: '#EAF3FF',
          DEFAULT: '#0062E3',
          hover: '#0052C7',
          pressed: '#003F9E',
          foreground: '#FFFFFF',
        },
        neutral: {
          page: '#F7F9FC',
          text: '#111236',
          muted: '#68697F',
          line: '#68697F',
          subtle: '#D9E0E7',
        },

        /* Shadcn & Semantic compatibility */
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: '#D1435B',
          hover: '#BA384E',
          pressed: '#A12D41',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
