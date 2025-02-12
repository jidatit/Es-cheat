/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ["Inter", "sans-serif"],
          poppins: ["Poppins", "sans-serif"],
        },
      },
    },
    plugins: [],
  };