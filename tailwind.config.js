// tailwind.config.js
const {nextui} = require("@nextui-org/react");
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem',
        's' : '0.8rem'
      },
      screens: {
        'xs': '400px',
        ...defaultTheme.screens,
      },
      textColor:{
        'primary' : '#55efc4',
        'red' : '#f6465d',
        'secondary' : '#f6465d',
      },
      colors:{
        'primary' : '#55efc4',
        'secondary' : '#f6465d',
      },
      backgroundColor : {
        'primary' : '#55efc4',
        'secondary' : '#f6465d',
        'red' : '#f6465d',
        'black' : '#333'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};