/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'm3-primary': '#6750A4',
        'm3-on-primary': '#FFFFFF',
        'm3-secondary': '#625B71',
        'm3-background': '#FFFBFE',
        'm3-surface': '#FFFBFE',
      }
    },
  },
  plugins: [],
}
