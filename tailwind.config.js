/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8F5F0",
        "card-back": "#E7DDCF",
        "card-front": "#FFFFFF",
        primary: "#2E2A27",
        accent: "#D97757",
        success: "#7BAE7F",
        border: "#D6CEC2",
        "muted": "#9C9189",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(46, 42, 39, 0.08), 0 1px 2px rgba(46, 42, 39, 0.06)",
        "card-hover": "0 8px 24px rgba(46, 42, 39, 0.12), 0 2px 4px rgba(46, 42, 39, 0.08)",
        "matched": "0 0 0 2px rgba(123, 174, 127, 0.4), 0 2px 8px rgba(46, 42, 39, 0.08)",
        modal: "0 24px 64px rgba(46, 42, 39, 0.18), 0 4px 12px rgba(46, 42, 39, 0.08)",
      },
    },
  },
  plugins: [],
};
