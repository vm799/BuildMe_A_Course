/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest": "#04200f",
        "leaf-light": "#e8f5e9",
        "leaf-mid": "#4caf50",
        "terracotta": "#cc5500",
        "sun": "#fbbd08",
        "linen": "#f4efe6",
        "bark": "#4a3728",
        "primary": "#0df259",
        "accent-magenta": "#ff00ff",
        "accent-cyan": "#00ffff",
        "background-dark": "#020a05",
        "cyber-emerald": "#0df259",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "mono": ["Space Mono", "monospace"],
        "serif": ["Playfair Display", "serif"]
      }
    },
  },
  plugins: [],
}