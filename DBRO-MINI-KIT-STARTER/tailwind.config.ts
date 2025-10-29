import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "permanent-marker": ['"Permanent Marker"', "sans-serif"],
        chewy: ['"Chewy"', "cursive"],
        geist: ['"Geist"', "sans-serif"],
        vt323: ['"VT323"', "monospace"],
        orbitron: ['"Orbitron"', "sans-serif"],
      },
      colors: {
        primary: "#1bf696",
        secondary: "#FFFFFF",
        background: "#111111",
        foreground: "#ffffff",
        "foreground-muted": "#c8c8d1",
      },
      backgroundImage: {
        "gradient-black": "linear-gradient(135deg, #111111 0%, #232526 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "fade-out": "1s fadeOut 3s ease-out forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
