/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppin: ["poppin"],
      },
      colors: {
        secondary: "#f1f5f9",
        third: "#e2e8f0",
        dkPrimary: "#1e293b",
        dkSecondary: "#0f172a",
        dkThird: "#334155",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
