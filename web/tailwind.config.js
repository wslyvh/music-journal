import theme from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "index.html",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "6rem",
          "2xl": "8rem",
        },
      },
      fontFamily: {
        body: ["'Figtree'", "sans-serif"],
      },
      colors: {
        "my-gradient":
          "linear-gradient(102deg, rgba(3, 5, 29, 0.85) 2.11%, rgba(255, 0, 0, 0.85) 100%)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes").light,
          primary: "#FF5533",
          "primary-content": "#ffffff",
          secondary: "#494949",
          neutral: "#03131a",
          info: "#00e1ff",
          success: "#90ca27",
          warning: "#ff8800",
          error: "#ff7f7f",
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
        },
        dark: {
          ...require("daisyui/src/theming/themes").dark,
          primary: "#FF5533",
          "primary-content": "#ffffff",
          secondary: "#494949",
          neutral: "#03131a",
          "neutral-content": "#e1e6eb",
          info: "#00e1ff",
          success: "#90ca27",
          warning: "#ff8800",
          error: "#ff7f7f",
          "base-100": "#14181c",
          "base-200": "#1e2328",
          "base-300": "#28323c",
          "base-content": "#dcebfa",
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
