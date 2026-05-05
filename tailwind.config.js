/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f8fafc',
          100: '#eef2f7',
          200: '#d9e2ee',
          300: '#b8c6d8',
          400: '#8a98ad',
          500: '#647089',
          600: '#4b556b',
          700: '#394257',
          800: '#242b3d',
          900: '#151a27',
          950: '#0b1020',
        },
        accent: {
          50:  '#eef7ff',
          100: '#d9edff',
          200: '#b4daff',
          300: '#84c4ff',
          400: '#54a6ff',
          500: '#2e88ff',
          600: '#1d6bef',
          700: '#1857c1',
          800: '#194894',
          900: '#183f78',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.800'),
            '--tw-prose-headings': theme('colors.ink.950'),
            '--tw-prose-links': theme('colors.accent.700'),
            '--tw-prose-bold': theme('colors.ink.950'),
            maxWidth: '68ch',
          },
        },
      }),
      boxShadow: {
        soft: '0 18px 50px rgba(11, 16, 32, 0.08)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
