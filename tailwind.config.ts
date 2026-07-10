import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          cyan: 'rgb(var(--accent-cyan-rgb) / <alpha-value>)',
          purple: 'rgb(var(--accent-purple-rgb) / <alpha-value>)',
          pink: 'rgb(var(--accent-pink-rgb) / <alpha-value>)',
        },
        success: 'var(--color-success)',
        udemy: 'var(--color-udemy)',
        ibm: 'var(--color-ibm)',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #00d4ff, #7b2fff)',
      },
    },
  },
  plugins: [],
}

export default config
