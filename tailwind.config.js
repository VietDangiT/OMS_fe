/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "600px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        "primary": "#27447C",
        "primary-1": "#b4c5e7",
        "primary-2": "#f3f6fb",
        "secondary": "#FCA310",
        "third": "#E3964A",
        "forth": "#ED7D2D",
        "fifth": "#E05858",
        "errors": "#DD3B3B",
        "warning": "#EFB034",
        "success": "#1DD75B",
        "grayData": "#6C757D",
        "danger":"#DE3B3B"
      },
      width: {
        sidebarWidth: "50px",
        chartWidth: "32.5%",
      },
      maxWidth: {
        sidebarWidth: "50px",
      },
      padding: {
        18: "4.6rem",
        88: "22.2rem",
        81: "20.3rem",
      },
    },
  },
  plugins: [],
};