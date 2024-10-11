// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './contexts/**/*.{js,jsx}',
    './utils/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00695c',
        secondary: '#004d40',
        accent: '#a5d6a7',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};