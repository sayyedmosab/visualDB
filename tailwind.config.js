/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,hooks,services,types}/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}