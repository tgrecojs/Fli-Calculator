
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './source/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['"Aeonik",sans-serif']
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.trueGray,
        red: colors.red,
        blue: colors.sky,
        yellow: colors.amber,
        index: {
          DEFAULT: '#F7F3F5',
          },
        index3: {
          DEFAULT: '#F3EDF0',
          },
        index2: {
          DEFAULT: '#f0e7ea',
        },
        bubble: {
          DEFAULT:'#8D7C86'},
        grape: {
            DEFAULT: '#3340fa'
          },
        },
    },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
  }
}
