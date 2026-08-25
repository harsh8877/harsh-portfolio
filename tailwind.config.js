/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a0a1a",
          dark: "#05050f",
          card: "#11112b",
          light: "#18183d",
          border: "#242456",
        },
        electric: {
          blue: "#00d4ff",
          cyan: "#38ef7d",
        },
        violet: {
          accent: "#6c5ce7",
          light: "#8274f8",
          dark: "#5846c4",
        },
        accent: {
          violet: "#6c5ce7",
          blue: "#00d4ff",
        },
        background: "#0a0a1a",
        foreground: "#f8fafc",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
