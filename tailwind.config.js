/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0F0F1A",
          card: "#1A1A2E",
          elevated: "#242440",
        },
        accent: {
          DEFAULT: "#E4A853",
          light: "#F5D08A",
          dark: "#C4892F",
        },
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#A0A0B8",
          muted: "#6B6B80",
        },
        rating: "#FFD700",
        danger: "#E74C3C",
      },
    },
  },
  plugins: [],
};
