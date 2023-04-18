/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
      './main.js',
    './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: "#ffcc00"
      }
    },
  },
  plugins: [],
};
