module.exports = {
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "2xl": "1280px"
      },
      spacing: {
        "30": "7.5rem"
      },
      lineHeight: {
        "more-relaxed": "1.7"
      },
      inset: {
        "section-title": "1.8rem"
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
