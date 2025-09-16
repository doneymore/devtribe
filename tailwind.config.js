/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#1A3681",
        },
        secondary: {
          50: "#FFFFFF",
          100: "#B9C5D0",
          150: "#DADCE2",
        },
        neutral: {
          black: "#131212",
          gray: "#404040",
        },
        shades: {
          preto: "#141E28",
          azul: "#161374",
          azul_light: "#0C2873",
          azul_lighter: "#1A3681",
          azul_bright: "#c8e3fe",
        },
      },
      fontFamily: {
        orelega: ["var(--font-orelega)", "cursive"],
        gurajada: ["var(--font-gurajada)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        neuton: ["var(--font-neuton)", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-neuton)", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [],
};
