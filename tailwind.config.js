import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      // ─── Palette ──────────────────────────────────────────────────────────
      colors: {
        // ── Semantic tokens (CSS-variable-backed) ──────────────────────────
        background:  'hsl(var(--background) / <alpha-value>)',
        foreground:  'hsl(var(--foreground) / <alpha-value>)',
        border:      'hsl(var(--border)     / <alpha-value>)',
        input:       'hsl(var(--input)      / <alpha-value>)',
        ring:        'hsl(var(--ring)       / <alpha-value>)',

        primary: {
          DEFAULT:    'hsl(var(--primary)            / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary)            / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted)            / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent)            / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive)            / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover)            / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT:    'hsl(var(--card)            / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },

        // ── Named palette ──────────────────────────────────────────────────
        // Dark earth base
        ground:   '#1A1814',
        // Light warm neutral
        parchment:'#F2EDDF',
        // Teal family
        tide: {
          DEFAULT: '#3D6B65',
          muted:   '#2A4A46',
          pale:    '#E8F0EE',
        },
        // Terracotta
        resin:  '#6B3D2E',
        // Warm mid-grey
        drift:  '#9A9488',
        // Amber highlight
        ember:  '#C4882A',
        // Logo accent dots — refined system
        mark: {
          top:    '#E8E0D0',
          mid:    '#C05A2E',
          bot:    '#7A9AAD',
        },
        // Status — over-budget / over-target
        over: {
          r: '#C45050',
          g: '#4A8C6A',
        },
        // Tier backgrounds (light surfaces)
        tier: {
          '01': '#F5EDED',
          '02': '#FBF4E8',
          '03': '#EBF4EF',
        },
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        dm:        ['"DM Sans"', 'Arial', 'sans-serif'],
      },

      // ─── Radius ───────────────────────────────────────────────────────────
      // All values derive from --radius so a single token change
      // cascades across the whole scale.
      borderRadius: {
        xs: 'calc(var(--radius) - 6px)',
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
      },

      // ─── Keyframes ────────────────────────────────────────────────────────
      keyframes: {
        // Radix accordion
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },

        // Gradient sweep (background-size must be > 100% to show movement)
        sweep: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },

        // Particle / debris fall
        fall: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0.3' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },

        // Soft focus-in reveal
        'blur-reveal': {
          '0%':   { opacity: '0', filter: 'blur(12px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },

        // Slide-in from below (pairs well with blur-reveal)
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        // Gentle pulse for loading / skeleton states
        shimmer: {
          '0%':   { opacity: '0.4' },
          '50%':  { opacity: '1'   },
          '100%': { opacity: '0.4' },
        },
      },

      // ─── Animation shorthands ─────────────────────────────────────────────
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up   0.2s ease-out',
        'sweep':          'sweep          4s  ease-in-out infinite',
        'fall':           'fall           4s  ease-in    forwards',
        'blur-reveal':    'blur-reveal    0.5s ease       forwards',
        'slide-up':       'slide-up       0.4s ease       forwards',
        'shimmer':        'shimmer        1.6s ease-in-out infinite',
      },
    },
  },

  plugins: [tailwindcssAnimate],
};