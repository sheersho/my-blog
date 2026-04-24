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
          50:  '#f7f6f3',
          100: '#eeece6',
          200: '#d8d4ca',
          300: '#b8b2a5',
          400: '#948d7e',
          500: '#766f62',
          600: '#5e5850',
          700: '#4c4740',
          800: '#403c37',
          900: '#37332f',
          950: '#1e1c19',
        },
        accent: {
          50:  '#fdf8ef',
          100: '#faefd9',
          200: '#f4dcb2',
          300: '#edc281',
          400: '#e5a04e',
          500: '#de872c',
          600: '#cf6e21',
          700: '#ac541d',
          800: '#89431e',
          900: '#6f381b',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.800'),
            '--tw-prose-headings': theme('colors.ink.950'),
            '--tw-prose-links': theme('colors.accent.700'),
            maxWidth: '68ch',
          },
        },
      }),
    },
  },
  plugins: [],
}
