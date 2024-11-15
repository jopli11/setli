/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans your files in `src` for classes
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        slateBlue: '#4A5A77',
        teal: '#6BA39D',
        tan: '#D8BFA4',
        lightGrey: '#E6E9EE',
        offWhite: '#F9F9F9',
        highlight: '#E5733F',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'], // Optional alternative
      nunito: ['Nunito', 'sans-serif'],   // Optional alternative
    },
  },
  plugins: [],
};
