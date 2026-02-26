/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F7F6F2",
        foreground: "#1C1C1C",
        accent: {
          blue: "#2F4A6D",
          green: "#5C7A64",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        paper: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
        "paper-hover":
          "0 4px 6px rgba(0,0,0,0.1), 0 10px 24px rgba(0,0,0,0.08)",
        "paper-deep":
          "0 10px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
