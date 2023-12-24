import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'extra-small': '230px', // extra small
      'small': '340px',
      'sm': '540px',    // Small screens and up
      'md': '768px',    // Medium screens and up
      'lg': '1024px',   // Large screens and up
      'xl': '1280px',   // Extra-large screens and up
    },
    extend: {
      colors: {
        '#296999': "#296999",
        '#1b5887': "#1b5887",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
