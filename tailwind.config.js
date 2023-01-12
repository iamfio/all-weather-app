/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668a',
        'weather-secondary': '#004e71',
      },
    },
    fontFamily: {
      Poppins: ['Poppins, sans-serif'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
  },
  plugins: [],
}
