/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "carmine":"var(--carmine)",
        "black":"var(--black)",
        "night": "var(--night)",
        "white": "var(--white)",
        "timberwolf": "var(--timberwolf)",
      }
    },
  },
  plugins: [],
}
