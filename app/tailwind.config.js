/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#ff5533",
      "primary-hover": "#403538",
      "primary-content": "#ffffff",
      secondary: "#6A5FDB",
      "secondary-content": "#ffffff",
      neutral: "#494949",
      "neutral-content": "#ffffff",
      accent: "#03131a",
      "accent-content": "#e1e6eb",

      "base-100": "#14181c",
      "base-200": "#1e2328",
      "base-300": "#28323c",
      "base-content": "#dcebfa",
      muted: "#a0acb7",

      info: "#00e1ff",
      "info-content": "#000000",
      success: "#90ca27",
      "success-content": "#000000",
      warning: "#ff8800",
      "warning-content": "#000000",
      error: "#ff7f7f",
      "error-content": "#000000",
    },
    extend: {},
  },
  plugins: [],
};

// main bg: 2a2e32
// navbar bg: 15191e
// bg-base 14181c
// bg-base-2 (and hover for bg-base) 1e2328
// bg-base-3 (footer) 03131a
// bg-base-3-hover 192930
// border // hovers 282e32

// text dcebfa
// text-muted a0acb7
// text-base ffffff
// text-base-2 e1e6eb

// primary fc766a
// primary-bg 403538
