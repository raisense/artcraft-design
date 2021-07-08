module.exports = {
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "2xl": "1280px"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-multi-column")()
  ]
};
