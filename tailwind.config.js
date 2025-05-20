/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        blue: {
          50: 'rgb(var(--primary-light) / <alpha-value>)',
          500: 'rgb(var(--primary) / <alpha-value>)',
          600: 'rgb(var(--primary-dark) / <alpha-value>)',
        },
        teal: {
          500: 'rgb(var(--secondary) / <alpha-value>)',
        },
        purple: {
          500: 'rgb(var(--accent) / <alpha-value>)',
        },
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};