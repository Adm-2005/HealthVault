/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '610px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        'primary': '#009BDA',
        'primary-dark': '#0159AB',
        'secondary': '#EEF5FB', // '#D1E9EA'
        'accent-green': '#61E09E',
        'accent-blue': '#82D4F7'
      },
      fontFamily: {
        "open-sans": ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

