import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#060606',
          deep: '#030303',
          surface: '#0B0B0C',
        },
        charcoal: {
          DEFAULT: '#0F0F10',
          elevated: '#151517',
          border: '#1F1F22',
        },
        gold: {
          primary: '#D4AF37',
          light: '#F3E5AB',
          muted: 'rgba(212, 175, 55, 0.22)',
          deep: '#AA820A',
          glow: 'rgba(212, 175, 55, 0.45)',
        },
        ivory: {
          DEFAULT: '#FAF9F6',
          soft: '#EBE9E1',
          muted: '#C4C0B5',
        },
        taupe: {
          DEFAULT: '#A39E93',
          light: '#BCB8AE',
          dark: '#68645C',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#20BA5A',
          dark: '#128C7E',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.22em',
        luxury: '0.18em',
      },
      boxShadow: {
        glass: '0 24px 60px rgba(0, 0, 0, 0.65)',
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.25)',
        'gold-subtle': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-hover': '0 8px 32px rgba(212, 175, 55, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'sparkle-float': 'sparkleFloat 6s ease-in-out infinite',
        'shimmer-sweep': 'shimmerSweep 2.5s infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        sparkleFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(180deg)' },
        },
        shimmerSweep: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
