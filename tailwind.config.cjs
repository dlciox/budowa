/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#ffc400', // Bright yellow for primary elements
          secondary: '#000000', // Black for contrast
          light: '#ffffff', // White for backgrounds
          'primary-dark': '#e0a800', // Darker yellow for hover states
        },
      },
    },
    plugins: [],
  } 