const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: "#04C8BB",
        primaryDarker: "#027870",
        transparent: "transparent",
        bgDarkPrimary: "#0b0c10",
        bgDarkSecondary: "#121212",
        bgLightSecondary: "#fafafa",
        bgGoogle: "#df4a32",
      },
      colors: {
        primary: "#04C8BB",
        primaryDarker: "#027870",
        darkPrimary: "#66FCF1",
        darkPrimaryDarker: "#37FBEE",
      },
      fontFamily: {
        body: ["Prompt"],
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      zIndex: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
