/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'galaxy': "url('/src/assets/images/Galaxy.jpg')",
        'logo': "url('/src/assets/images/logo.png')",
      }
    },
  },
  plugins: [],
}