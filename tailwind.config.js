const colors = require("./src/constants/tailwind/colors");
const backgroundColor = require("./src/constants/tailwind/backgroundColor");
const height = require("./src/constants/tailwind/height");
const width = require("./src/constants/tailwind/width");
const fontSize = require("./src/constants/tailwind/fontSize");
const margin = require("./src/constants/tailwind/margin");
const inset = require("./src/constants/tailwind/inset");
const minWidth = require("./src/constants/tailwind/minWidth")

module.exports = {
  important: true,
  content: ["./src/**/*.{html,js}"],
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      backgroundColor,
      height,
      width,
      fontSize,
      margin,
      inset,
      minWidth
    },
    gradientColorStops: theme => ({
      ...theme('colors'),
        colors
     })
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('daisyui')
  ],
}
