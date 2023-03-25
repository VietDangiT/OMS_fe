/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary : "#27447C",
        secondary : "#FCA310",
        success:"#1DD75B",
        grayData:"#6C757D",
        third:"#ED7D2D"
      },
      width: {
        sidebarWidth : "50px"
      },
      maxWidth :{
        sidebarWidth : "50px"
      },
      padding:{
        18: "4.6rem",
        88:"22.2rem"
      }
    },
  },
  plugins: [],
}