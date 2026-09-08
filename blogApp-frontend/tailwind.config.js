
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        ink: "#16213E",
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          50: "#eff6ff",
          100: "#dbeafe",
        },
        success: "#16A34A",
        error: "#DC2626",
        warning: "#D97706",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        "card-hover": "0 8px 24px -6px rgba(16, 24, 40, 0.12)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },

  plugins: [],
};
