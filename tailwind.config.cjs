const defaulTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './content/blog/**/*.mdx',
    './content/blog/**/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Mono Lisa', ...defaulTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
