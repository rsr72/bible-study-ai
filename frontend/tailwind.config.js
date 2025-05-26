/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html" // ✅ Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
